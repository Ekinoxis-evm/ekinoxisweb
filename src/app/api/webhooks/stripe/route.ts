import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { createServiceClient } from '@/lib/supabase/server';
import { ACCIONES_COURSE_SLUG, ACCIONES_PAYMENT_LINKS } from '@/lib/acciones/onboarding';
import { sendWorkshopOnboardingEmail } from '@/lib/notify';

/** Payment Link sessions carry no course metadata; the link id says which course was bought. */
function courseSlug(session: Stripe.Checkout.Session): string {
  const link = typeof session.payment_link === 'string' ? session.payment_link : session.payment_link?.id;
  if (link && (ACCIONES_PAYMENT_LINKS as readonly string[]).includes(link)) return ACCIONES_COURSE_SLUG;
  return session.metadata?.course_slug ?? session.client_reference_id ?? 'unknown';
}

/** j***@domain.com — never log a full address. */
const maskEmail = (email: string) => email.replace(/^(.).*(@.*)$/, '$1***$2');

/**
 * Stripe → course_enrollments. Fulfilment lives here, never on the success page.
 * Idempotent: the row is keyed on the Checkout Session id, so a retried event is a no-op, and the
 * onboarding email goes out only when this call inserted the row.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get('stripe-signature');
  if (!secret || !signature) return new NextResponse('Missing signature', { status: 400 });

  const rawBody = await request.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, secret);
  } catch {
    return new NextResponse('Bad signature', { status: 400 });
  }

  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status !== 'paid') return NextResponse.json({ received: true });

    const db = createServiceClient();
    const email = session.customer_details?.email ?? session.customer_email ?? null;
    const slug = courseSlug(session);
    const { data: inserted, error } = await db.from('course_enrollments').upsert(
      {
        stripe_session_id: session.id,
        stripe_customer_id: typeof session.customer === 'string' ? session.customer : session.customer?.id ?? null,
        stripe_payment_intent: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id ?? null,
        course_slug: slug,
        email,
        name: session.customer_details?.name ?? null,
        amount_total: session.amount_total,
        currency: session.currency,
        status: 'paid',
        livemode: session.livemode,
      },
      { onConflict: 'stripe_session_id', ignoreDuplicates: true },
    ).select('id');
    if (error) {
      console.error('[stripe webhook] enrollment insert failed', error.message);
      return new NextResponse('DB error', { status: 500 });
    }

    // A retry finds the row already there: `inserted` is empty and nobody is mailed twice.
    // The row is saved, so a failed email is logged, never turned into a 500 that makes Stripe retry.
    if (slug === ACCIONES_COURSE_SLUG && inserted && inserted.length > 0 && email) {
      const sent = await sendWorkshopOnboardingEmail({ sessionId: session.id, email, name: session.customer_details?.name ?? null }).catch(() => false);
      if (!sent) console.error('[stripe webhook] onboarding email not sent', maskEmail(email), session.id);
    }
  }

  return NextResponse.json({ received: true });
}
