import { NextRequest, NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/db';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { productSlug } = await request.json();

    if (!productSlug) {
      return NextResponse.json({ error: 'Product slug is required' }, { status: 400 });
    }

    const product = getProductBySlug(productSlug);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Special Needs Parent Guide - ${product.name}`,
              description: product.description,
              images: [],
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
      metadata: {
        productSlug: product.slug,
        productId: product.id,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}