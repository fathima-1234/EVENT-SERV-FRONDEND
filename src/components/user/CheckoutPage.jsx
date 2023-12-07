// import React, { useState, useEffect } from "react";
// import bento from '../../assets/bento.jpg';
// import  { API_URL } from '../../utils/index';

// const CheckoutPage = () => {
//   // const [message, setMessage] = useState("");
//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);

//     if (query.get("success")) {
//       console.log("Order placed! You will receive an email confirmation.");
//     }

//     if (query.get("canceled")) {
//       console.log(
//         "Order canceled -- continue to shop around and checkout when you're ready."
//       );
//     }
//   }, []);

 





//   return (
//   <section>
//   <div className="product">
//     <img
//       src={bento}
//       alt="The cover of Stubborn Attachments"
//     />
//     <div className="description">
//     <h3>Stubborn Attachments</h3>
//     <h5>20.00</h5>
//     </div>
//   </div>
//   <form action={`${API_URL}/api/stripe/checkout/`} method="POST">
//     <button type="submit">
//       Checkout
//     </button>
//   </form>
// </section>
//   );
// }
// export default CheckoutPage;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from '../../utils/index';

const CheckoutPage = () => {
  const [productPrice, setProductPrice] = useState(20.00); // Set default price or fetch dynamically

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log("Order canceled -- continue to shop around and checkout when you're ready.");
    }
  }, []);

  const handleCheckout = async () => {
    try {
      const response = await fetch(`${API_URL}/api/stripe/checkout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: productPrice, // Send the dynamically retrieved price
        }),
      });
      console.log(response);
      if (!response.ok) {
        console.error('Error during checkout. Response not OK:', response);
        return;
      }
      const result = await response.json();

      // Handle the result as needed, e.g., redirect to the checkout session URL
      window.location.href = result.url;
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <section>
      <div className="product">
        {/* <img src={bento} alt="Product Image" /> */}
        <div className="description">
          <h3>Your Product Name</h3>
          <h5>${productPrice.toFixed(2)}</h5>
        </div>
      </div>
      <button onClick={handleCheckout}>Checkout</button>
    </section>
  );
};

export default CheckoutPage;



