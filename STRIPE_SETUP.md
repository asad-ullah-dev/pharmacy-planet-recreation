# Stripe Integration Setup

## Environment Variables

Create a `.env.local` file in your project root and add your Stripe publishable key:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

## Getting Your Stripe Keys

1. Sign up for a Stripe account at https://stripe.com
2. Go to the Stripe Dashboard
3. Navigate to Developers > API keys
4. Copy your **Publishable key** (starts with `pk_test_` for test mode or `pk_live_` for production)

## Test Card Numbers

For testing, you can use these Stripe test card numbers:

- **Visa**: `4242424242424242`
- **Visa (debit)**: `4000056655665556`
- **Mastercard**: `5555555555554444`
- **American Express**: `378282246310005`

**Test CVV**: Any 3 digits (e.g., `123`)
**Test Expiry**: Any future date (e.g., `12/25`)

## How It Works

1. User fills out the checkout form with payment details using Stripe Elements
2. When "Complete Order" is clicked:
   - Form validation is performed
   - Stripe token is created from the card element
   - Order data is sent to `/frontend/order` API with the token ID
   - API processes the payment and creates the order

## Implementation Details

The checkout now uses Stripe Elements for secure card input:
- Card information is collected using Stripe's `CardElement`
- Token is created using `stripe.createToken(cardElement)`
- All sensitive card data is handled by Stripe's secure infrastructure

## API Payload Format

The order API expects this payload:

```json
{
  "medicine_id": 4,
  "billing_first_name": "John",
  "billing_last_name": "Doe",
  "billing_address": "123 Main Street",
  "billing_city": "New York",
  "billing_state": "NY",
  "billing_zip": "10001",
  "billing_country": "United States",
  "user_address_id": 2,
  "stripe_token": "pm_1RjFbpEqYSOnfCSI0rsV6ORj"
}
```

**Note**: The `stripe_token` field contains a token ID (starts with `tok_`) that your backend can use to process the payment.

## Security Notes

- Never expose your Stripe secret key in the frontend
- The publishable key is safe to use in the browser
- All sensitive payment data is handled by Stripe's secure tokenization
- Your backend should use the secret key to process payments 