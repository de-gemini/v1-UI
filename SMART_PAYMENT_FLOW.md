# Smart Payment Flow Implementation

## Overview

The Smart Payment Flow automatically determines whether to create a subscription or one-time payment based on the user's frequency selection during checkout.

## How It Works

### Frequency Mapping

| Frequency Selection | Backend Value | Payment Type | Interval |
|-------------------|---------------|--------------|----------|
| Weekly (0)        | "weekly"      | Subscription | 1 week   |
| Fortnightly (1)   | "fortnight"   | Subscription | 2 weeks  |
| Monthly (2)       | "monthly"     | Subscription | 1 month  |
| One-off (3)       | "onetime"     | One-time     | N/A      |

### Flow Logic

1. **User completes checkout** in `StepThree.tsx`
2. **Booking is created** in the backend
3. **Smart Payment Flow is triggered** automatically
4. **System checks frequency**:
   - If Weekly/Fortnightly/Monthly → **Subscription payment**
   - If One-off → **One-time payment**
5. **Appropriate payment form** is shown to user
6. **Payment is processed** using Stripe
7. **Success page** shows relevant information

## Components

### SmartPaymentFlow.tsx
- **Purpose**: Modal component that handles both subscription and one-time payments
- **Props**:
  - `bookingId`: ID of the created booking
  - `customerEmail`: User's email
  - `customerName`: User's full name
  - `selectedFrequency`: Frequency enum value (0-3)
  - `estimatedPrice`: Total price for the service
  - `bookingData`: Complete booking information
  - `onSuccess`: Callback for successful payment
  - `onError`: Callback for payment errors
  - `onClose`: Callback to close the modal

### Integration Points

#### StepThree.tsx Changes
- Removed direct navigation to `/stripe-card-payment`
- Added state for `showPaymentFlow` and `currentBookingId`
- After successful booking creation, shows `SmartPaymentFlow` modal
- Passes all necessary data to the payment component

#### API Integration
- **Subscriptions**: Uses `createDynamicStripeSubscription()` API
- **One-time**: Uses `createStripePaymentIntent()` API
- Both use the same Stripe Elements for card input

## User Experience

### For Subscriptions (Weekly/Fortnightly/Monthly)
1. User sees "Subscription Payment" modal
2. Shows frequency and amount
3. Displays "This will be charged [frequency] until cancelled"
4. Button says "Start Subscription"
5. Success message: "Subscription created successfully!"

### For One-time Payments (One-off)
1. User sees "One-time Payment" modal
2. Shows amount only
3. Button says "Pay Now"
4. Success message: "Payment successful!"

## Testing

### Test Cards
- **Success**: 4242 4242 4242 4242 (any future date, any CVC)
- **Decline**: 4000 0000 0000 0002 (any future date, any CVC)

### Test Scenarios
1. **Weekly subscription**: Select weekly frequency → Should create subscription
2. **Fortnightly subscription**: Select fortnightly frequency → Should create subscription
3. **Monthly subscription**: Select monthly frequency → Should create subscription
4. **One-time payment**: Select one-off frequency → Should create one-time payment

## Backend Requirements

### Dynamic Subscription Endpoint
```
POST /payments/create-dynamic-subscription
{
  "paymentMethodId": "pm_...",
  "customerEmail": "user@example.com",
  "customerName": "John Doe",
  "amount": 5000, // in cents
  "currency": "gbp",
  "interval": "week|month",
  "intervalCount": 1|2,
  "productName": "Cleaning Service",
  "metadata": {
    "bookingId": "...",
    "frequency": "0|1|2|3",
    "serviceType": "...",
    "rooms": "...",
    "addOns": "...",
    "address": "...",
    "scheduledDate": "..."
  }
}
```

### One-time Payment Endpoint
```
POST /payments/create-payment-intent
{
  "bookingId": "..."
}
```

## Benefits

1. **Automatic Detection**: No manual selection needed
2. **Seamless UX**: Single flow for all payment types
3. **Consistent UI**: Same payment form for both types
4. **Flexible**: Easy to modify frequency-to-payment mapping
5. **Scalable**: Can add more frequency options easily

## Future Enhancements

1. **Trial periods** for new subscriptions
2. **Proration** for mid-cycle changes
3. **Multiple payment methods** support
4. **Subscription management** dashboard
5. **Email notifications** for payment events 