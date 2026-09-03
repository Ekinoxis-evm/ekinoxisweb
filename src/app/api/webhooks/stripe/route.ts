import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { createServiceClient } from '@/lib/supabase/server';

/**
 * Stripe → course_enrollments. Fulfilment lives here, never on the success page.
 * Idempotent: the row is keyed on the Checkout Session id, so a retried event is a no-op.
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
    const { error } = await db.from('course_enrollments').upsert(
      {
        stripe_session_id: session.id,
        stripe_customer_id: typeof session.customer === 'string' ? session.customer : session.customer?.id ?? null,
        stripe_payment_intent: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id ?? null,
        course_slug: session.metadata?.course_slug ?? session.client_reference_id ?? 'unknown',
        email: session.customer_details?.email ?? session.customer_email ?? null,
        name: session.customer_details?.name ?? null,
        amount_total: session.amount_total,
        currency: session.currency,
        status: 'paid',
        livemode: session.livemode,
      },
      { onConflict: 'stripe_session_id', ignoreDuplicates: true },
    );
    if (error) {
      console.error('[stripe webhook] enrollment insert failed', error.message);
      return new NextResponse('DB error', { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
