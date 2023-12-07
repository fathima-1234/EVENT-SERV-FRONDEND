import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckoutForm from './StripeCheckoutForm'; // Create this component separately

const stripePromise = loadStripe('pk_test_51OETQdSIwzdmVhzBauVaeNDhXEW06fX5JB6XGaF4BrFmWcg4zyjkfB6slzIvhsVDNlRbK9yW4MBalU1yQkbFOnW900fGKOwaX9'); // Replace with your actual Stripe publishable key

const PaymentPage = ({ event, bookedSlot, numberOfMembers, menus, setShowPayment,orderId }) => {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Fetch the Stripe Checkout session ID from your Django backend
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/payment/pay1/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order_id: orderId, // Replace with the actual order ID
          }),
        });

        const data = await response.json();

        if (data.session_id) {
          setSessionId(data.session_id);
        } else {
          console.error('Failed to fetch Stripe Checkout session ID');
        }
      } catch (error) {
        console.error('Error fetching Stripe Checkout session ID:', error);
      }
    };

    fetchData();
  }, [orderId]);

  return (
    <div>
      {sessionId ? (
        <div>
          <Elements stripe={stripePromise}>
            <StripeCheckoutForm sessionId={sessionId} />
          </Elements>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PaymentPage ;
