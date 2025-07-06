# Backend

This is a simple Express server that handles user authentication and Stripe subscription payments.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `STRIPE_SECRET_KEY` environment variable with your Stripe secret key.
3. Run the server:
   ```bash
   node server.js
   ```

The server exposes endpoints for signing up, logging in, creating a Stripe Checkout session, and creating a Billing Portal session for cancellations.
