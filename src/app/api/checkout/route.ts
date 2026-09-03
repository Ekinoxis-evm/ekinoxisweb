import { NextRequest, NextResponse } from 'next/server';
import { getCourse } from '@/lib/courses';
import { getStripe, siteUrl } from '@/lib/stripe';

/**
 * POST { slug, language } → { url }
 * Creates a hosted Stripe Checkout Session for a course. The price id comes from
 * the env var named on the course (never hardcoded), so test and live stay separate.
 */
export async function POST(request: NextRequest) {
  let body: { slug?: string; language?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const course = body.slug ? getCourse(body.slug) : undefined;
  if (!course) return NextResponse.json({ error: 'Unknown course' }, { status: 404 });
  if (course.status !== 'open' || !course.stripePriceEnv) {
    return NextResponse.json({ error: 'Course is not open for enrollment' }, { status: 409 });
  }

  const priceId = process.env[course.stripePriceEnv];
  if (!priceId) {
    return NextResponse.json({ error: `Missing ${course.stripePriceEnv}` }, { status: 500 });
  }

  const locale = body.language === 'es' ? 'es' : 'en';
  const base = siteUrl();

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${base}/courses/${course.slug}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/courses/${course.slug}`,
      locale,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_creation: 'always',
      metadata: { course_slug: course.slug, course_code: course.code },
      client_reference_id: course.slug,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe error';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
