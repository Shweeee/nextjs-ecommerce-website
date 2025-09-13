const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create Payment Intent
router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  console.log('Amount received from frontend:', amount); // ✅ Debug log

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    console.log('Stripe PaymentIntent:', paymentIntent); // ✅ Debug log

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe error:', err.message); // ✅ Debug log
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 