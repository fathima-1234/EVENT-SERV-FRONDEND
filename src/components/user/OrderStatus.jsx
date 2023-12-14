// import React, { useEffect } from 'react';
// import { useLocation,Link } from 'react-router-dom';

// const OrderStatus = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const isPaymentCanceled = queryParams.get('canceled') === 'true';
//   const isSuccess = queryParams.get('success') === 'true';

//   useEffect(() => {
//     if (isPaymentCanceled) {
//       // Handle canceled payment logic
//       console.log('Payment canceled');
//     } else if (isSuccess) {
//       // Handle successful payment logic
//       console.log('Payment successful');
//     } else {
//       // Handle other cases or display a generic message
//       console.log('Unexpected order status');
//     }
//   }, [isPaymentCanceled, isSuccess]);

//   return (
//     <div className='text-center pt-20'>
//       {isPaymentCanceled && <h2>Order Canceled</h2>}
//       {isSuccess && <h2>Order Successful</h2>}
//       {/* Add additional content or messages as needed */}
//       <Link to='/mybookings'><button className='mt-4 mx-auto font-serif text-white bg-customColorA border border-rounded'>Back to Booking</button></Link>
//      <Link to='/'> <button className='mt-4 mx-auto  font-serif text-white bg-customColorA'>Home</button></Link>
//     </div>
//   );
// };

// export default OrderStatus;
import React, { useEffect } from 'react';
import { useLocation,Link } from 'react-router-dom';
const OrderStatus = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isPaymentCanceled = queryParams.get('canceled') === 'true';
  const isSuccess = queryParams.get('success') === 'true';
  const amount = queryParams.get('amount');
  const currency = queryParams.get('currency');

  useEffect(() => {
    if (isPaymentCanceled) {
      console.log('Payment canceled');
    } else if (isSuccess) {
      console.log('Payment successful');
      console.log('Amount:', amount);
      console.log('Currency:', currency);
    } else {
      console.log('Unexpected order status');
    }
  }, [isPaymentCanceled, isSuccess, amount, currency]);

  return (
    <div className='text-center'>
      {isPaymentCanceled && <h2>Order Canceled</h2>}
      {isSuccess && (
       <div className="flex flex-col items-center justify-center h-screen">
       <img
         src="https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif" 
         alt="Payment Success GIF"
         className="w-64 h-60"
       />
       <h2 className="text-2xl font-semibold text-blue-300 font-serif">Payment Successfully Completed</h2>
       <Link to="/" className="mt-4 bg-customColorA font-serif text-white px-4 py-2 rounded-lg">
         Go to Home
       </Link>
     </div>
      )}
      {/* <Link to='/mybookings'><button className='mt-2 mx-auto font-serif text-white bg-customColorA border border-rounded'>Back to Booking</button></Link> */}
     
    </div>
  );
};

export default OrderStatus;
