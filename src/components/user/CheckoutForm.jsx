// CheckoutForm.js

import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ clientSecret, event, bookedSlot, numberOfMembers, requirements, menus, setShowPayment }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Cardholder Name',
        },
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      // Payment succeeded
      // You can save the booking details and navigate to the success page
      console.log('Payment succeeded:', result.paymentIntent);

      // Example: Save booking details to the server
      await axios.post('http://localhost:8000/event-book', {
        event,
        bookedSlot,
        numberOfMembers,
        requirements,
        menus,
        paymentIntent: result.paymentIntent,
      });

      // Example: Redirect to a success page
      setShowPayment(false); // Close the payment details modal or component
      // Redirect or navigate to the success page
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add your form fields for number of members, requirements, etc. here */}
      {/* Include the CardElement from @stripe/react-stripe-js */}
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
