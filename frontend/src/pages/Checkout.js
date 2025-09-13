import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Checkout.css'; // Create this file

const stripePromise = loadStripe('pk_test_51S6oQIHOxRtajr68QrD0VwUmgMPK9DxqqwU59IyIikBeQ10KEYIiXeXvc2ECUpe845W2big6mExQ1jaeF76eULRV00nkUqGXF2');

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#a0aec0",
      },
      padding: "10px 12px",
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

function CheckoutForm({ cartItems }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card details are missing");
      setIsProcessing(false);
      return;
    }

    const { error: cardError } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (cardError) {
      setError(cardError.message);
      setIsProcessing(false);
      return;
    }

    const res = await fetch('http://localhost:5000/api/v1/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Math.round(cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0) * 100),
      }),
    });

    const data = await res.json();

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: { card: cardElement }
    });

    if (result.error) {
      setError(result.error.message);
      setIsProcessing(false);
    } else if (result.paymentIntent.status === 'succeeded') {
      setSuccess(true);
    }
  };

  return success ? (
    <h2>Payment Successful!</h2>
  ) : (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="card-input-container">
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>
      <button type="submit" disabled={!stripe || isProcessing} className="pay-btn">
        {isProcessing ? "Processing..." : "Pay"}
      </button>
      {error && <p className="error-text">{error}</p>}
    </form>
  );
}

export default function Checkout({ cartItems }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm cartItems={cartItems} />
    </Elements>
  );
}
