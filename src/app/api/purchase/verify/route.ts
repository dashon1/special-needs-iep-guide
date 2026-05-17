import { NextRequest, NextResponse } from 'next/server';
import { getPurchaseBySessionId } from '@/lib/db';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    // Check if we already have this purchase
    let purchase = getPurchaseBySessionId(sessionId);

    if (purchase) {
      return NextResponse.json({
        success: true,
        email: purchase.email,
        downloadToken: purchase.downloadToken,
        tokenExpiresAt: purchase.tokenExpiresAt,
        maxDownloads: purchase.maxDownloads,
        downloadCount: purchase.downloadCount,
      });
    }

    // If not, verify with Stripe
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === 'paid') {
        return NextResponse.json({
          success: true,
          verified: true,
          customerEmail: session.customer_email || session.customer_details?.email,
        });
      }

      return NextResponse.json({ success: false, error: 'Payment not completed' });
    } catch (stripeError) {
      console.error('Stripe verification error:', stripeError);
      return NextResponse.json({ success: false, error: 'Verification failed' });
    }
  } catch (error) {
    console.error('Error verifying purchase:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}