# Stripe Payment Integration Setup

## Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key_here
STRIPE_SECRET_KEY=sk_live_your_secret_key_here
```

Get your actual keys from the Stripe Dashboard → Developers → API keys. Never commit real keys to source control.

## Database Schema Updates

You'll need to add a `payment_intent_id` column to your bookings tables:

### For `bookings` table:
```sql
ALTER TABLE bookings ADD COLUMN payment_intent_id TEXT;
```

### For `guest_bookings` table:
```sql
ALTER TABLE guest_bookings ADD COLUMN payment_intent_id TEXT;
```

## How It Works

1. When a user fills out the booking form and a price is calculated, the Stripe payment form appears
2. User enters their card details using Stripe Elements (secure, PCI-compliant)
3. Payment is processed through Stripe
4. Upon successful payment, the booking is automatically created with `status: 'confirmed'` and the `payment_intent_id` is stored
5. A confirmation email is sent to the customer

## Security Notes

- The Stripe secret key is only used server-side in API routes
- The publishable key is safe to use in client-side code
- Card details are never stored on your server - Stripe handles all PCI compliance
- Payment intents are created server-side to prevent tampering

## Testing

For testing, you can use Stripe's test mode with test keys:
- Test publishable key: `pk_test_...`
- Test secret key: `sk_test_...`

Test card numbers:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

