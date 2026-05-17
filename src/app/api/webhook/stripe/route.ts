import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getProductById, createPurchase, getPurchaseBySessionId } from '@/lib/db';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event;

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } else {
      // For development without webhook secret, parse the body directly
      event = JSON.parse(body);
    }
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Check if purchase already exists
    const existingPurchase = getPurchaseBySessionId(session.id);
    if (existingPurchase) {
      return NextResponse.json({ received: true });
    }

    const productSlug = session.metadata?.productSlug;
    const productId = session.metadata?.productId;

    if (productId) {
      const product = getProductById(productId);

      if (product) {
        // Generate secure download token
        const downloadToken = crypto.randomBytes(32).toString('hex');
        const tokenExpiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000); // 72 hours

        createPurchase({
          email: session.customer_email || session.customer_details?.email || '',
          amount: session.amount_total || product.price,
          currency: session.currency || 'usd',
          stripePaymentId: session.payment_intent as string || '',
          stripeSessionId: session.id,
          downloadToken,
          downloadCount: 0,
          maxDownloads: 5,
          tokenExpiresAt,
          productId: product.id,
        });

        console.log(`Purchase created for ${session.customer_email}`);
      }
    }
  }

  return NextResponse.json({ received: true });
}