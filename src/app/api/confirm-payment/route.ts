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
    const { paymentIntentId } = await request.json()

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment intent ID is required' },
        { status: 400 }
      )
    }

    // Retrieve payment intent to confirm status
    const paymentIntent = await getStripe().paymentIntents.retrieve(paymentIntentId)

    return NextResponse.json({
      success: paymentIntent.status === 'succeeded',
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100, // Convert back to pounds
      metadata: paymentIntent.metadata,
    })
  } catch (error) {
    console.error('Error confirming payment:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to confirm payment' 
      },
      { status: 500 }
    )
  }
}

