'use client'

import { useState, useEffect } from 'react'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { CreditCard, Lock, AlertCircle, Loader2 } from 'lucide-react'

// Get the publishable key from environment variables
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

// Only initialize Stripe if we have a valid key
const stripePromise = stripePublishableKey && stripePublishableKey.trim() !== '' 
  ? loadStripe(stripePublishableKey) 
  : null

interface StripePaymentFormProps {
  amount: number
  onPaymentSuccess: (paymentIntentId: string) => void
  onPaymentError: (error: string) => void
  disabled?: boolean
}

function PaymentForm({
  amount,
  onPaymentSuccess,
  onPaymentError,
  disabled = false,
  clientSecret
}: StripePaymentFormProps & { clientSecret: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePayment = async () => {
    if (!stripe || !elements || !clientSecret) {
      return
    }

    setProcessing(true)
    setError(null)

    try {
      // First, submit the elements to validate the form
      const { error: submitError } = await elements.submit()
      
      if (submitError) {
        setError(submitError.message || 'Please check your payment details')
        onPaymentError(submitError.message || 'Please check your payment details')
        setProcessing(false)
        return
      }

      // Then confirm the payment
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: 'if_required',
      })

      if (stripeError) {
        setError(stripeError.message || 'Payment failed')
        onPaymentError(stripeError.message || 'Payment failed')
        setProcessing(false)
        return
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        onPaymentSuccess(paymentIntent.id)
      } else {
        setError('Payment was not successful')
        onPaymentError('Payment was not successful')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      onPaymentError(errorMessage)
    } finally {
      setProcessing(false)
    }
  }


  if (!stripe || !elements) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-jet2-orange mr-2" />
        <span className="text-gray-600">Loading payment form...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center mb-3">
          <Lock className="h-5 w-5 text-jet2-orange mr-2" />
          <span className="text-sm font-medium text-gray-700">Secure Payment</span>
        </div>
        <div 
          id="stripe-payment-element-container"
          className="bg-white p-4 rounded border border-gray-300" 
          style={{ 
            pointerEvents: 'auto', 
            position: 'relative',
            zIndex: 10,
            minHeight: '200px',
            width: '100%',
            overflow: 'visible'
          }}
        >
          <div style={{ pointerEvents: 'auto', width: '100%', position: 'relative', zIndex: 10 }}>
            <PaymentElement 
              options={{
                layout: 'tabs',
                fields: {
                  billingDetails: 'auto'
                }
              }}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg text-red-800">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <button
        type="button"
        onClick={handlePayment}
        disabled={!stripe || processing || disabled || amount <= 0}
        className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-jet2-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jet2-orange disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {processing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="h-5 w-5 mr-2" />
            Pay £{amount.toFixed(2)}
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Your payment is secured by Stripe. We never store your card details.
      </p>
    </div>
  )
}

export default function StripePaymentForm(props: StripePaymentFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Create payment intent when component mounts
    const createPaymentIntent = async () => {
      if (props.amount <= 0) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: props.amount,
            currency: 'gbp',
          }),
        })

        const data = await response.json()

        if (data.error) {
          console.error('Payment intent creation error:', data.error)
          setError(data.error)
          setLoading(false)
          return
        }

        if (!data.clientSecret) {
          console.error('No clientSecret returned:', data)
          setError('Failed to initialize payment. Please try again.')
          setLoading(false)
          return
        }

        console.log('Payment intent created successfully, clientSecret received')
        setClientSecret(data.clientSecret)
      } catch (err) {
        setError('Failed to initialize payment. Please try again.')
        console.error('Error creating payment intent:', err)
      } finally {
        setLoading(false)
      }
    }

    createPaymentIntent()
  }, [props.amount])

  // Only create options when we have a clientSecret
  const options: StripeElementsOptions = clientSecret ? {
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#ff6b1c',
        colorBackground: '#ffffff',
        colorText: '#1a1a1a',
        colorDanger: '#ef4444',
        fontFamily: 'Inter, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
    locale: 'en',
    clientSecret: clientSecret,
  } : {
    appearance: {
      theme: 'stripe',
    },
    locale: 'en',
  }

  if (!stripePublishableKey || !stripePromise) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          Stripe is not configured. Please add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to your .env.local file and restart the dev server.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-jet2-orange mr-2" />
        <span className="text-gray-600">Initializing payment...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm text-red-800">{error}</p>
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          Unable to initialize payment. Please try again.
        </p>
      </div>
    )
  }

  return (
    <Elements 
      stripe={stripePromise} 
      options={options}
      key={clientSecret} // Force re-render when clientSecret changes
    >
      <PaymentForm {...props} clientSecret={clientSecret} />
    </Elements>
  )
}

