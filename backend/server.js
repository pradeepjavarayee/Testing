const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory user store for demonstration
const users = {};

app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  if (users[email]) {
    return res.status(400).json({ error: 'User already exists' });
  }
  users[email] = { password };
  res.json({ message: 'Signup successful' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users[email];
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ message: 'Login successful' });
});

// Stripe subscription prices (replace with real price IDs)
const prices = {
  monthly: 'price_monthly_id',
  yearly: 'price_yearly_id',
};

app.post('/create-checkout-session', async (req, res) => {
  const { priceId } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: 'https://your-app.example.com/success',
      cancel_url: 'https://your-app.example.com/cancel',
    });
    res.json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

app.post('/create-portal-session', async (req, res) => {
  const { customerId } = req.body;
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: 'https://your-app.example.com/',
    });
    res.json({ url: portalSession.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create portal session' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
