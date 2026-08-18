import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-10-29.clover',
})

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
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

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

