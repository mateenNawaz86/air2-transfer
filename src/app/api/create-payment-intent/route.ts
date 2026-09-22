import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

/**
 * Stripe is constructed lazily rather than at module scope. Next.js imports
 * every route module during the build's "collecting page data" step, so a
 * top-level `new Stripe(...)` runs at build time — where the secret is not
 * necessarily present. The previous `process.env.STRIPE_SECRET_KEY || ''`
 * turned a missing key into an empty one, which Stripe rejects on
 * construction, failing the build with an error that named neither the
 * variable nor the cause. Deferring to first request keeps the build free of
 * secrets and surfaces a missing key as a clear runtime error instead.
 */
let stripeClient: Stripe | null = null

function getStripe(): Stripe {
  if (!stripeClient) {
    const apiKey = process.env.STRIPE_SECRET_KEY
    if (!apiKey) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }
    stripeClient = new Stripe(apiKey, {
      apiVersion: '2025-10-29.clover',
    })
  }
  return stripeClient
}

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'gbp', bookingId, customerEmail } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    // Create payment intent
    const paymentIntent = await getStripe().paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to pence/cents
      currency: currency.toLowerCase(),
      metadata: {
        booking_id: bookingId || 'pending',
        customer_email: customerEmail || '',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to create payment intent' 
      },
      { status: 500 }
    )
  }
}

