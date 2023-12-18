import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Navbar1 from './Navbar1';
import instance from '../../utils/axios';
import Swal from 'sweetalert2';

import { useLocation } from 'react-router-dom';

import { loadStripe } from '@stripe/stripe-js';
function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState([]);
  const [cancellationInProgress, setCancellationInProgress] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const stripePromise = loadStripe('pk_test_51OETQdSIwzdmVhzBauVaeNDhXEW06fX5JB6XGaF4BrFmWcg4zyjkfB6slzIvhsVDNlRbK9yW4MBalU1yQkbFOnW900fGKOwaX9')



  const navigate = useNavigate();
  

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.userID) {
      setUser(userData.userID);
    }

  }, []);

  async function getbookings(userId) {
    try {
      const token = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('user'));
      const userId = userData.userID
      if (token) {
        // Use the global Axios instance directly here
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      const response = await instance.get(`api/stripe/bookings/?user=${userId}`);
      console.log('Bookings Response:', response.data);
      setBookings(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('could not fetch data', error);
      console.error('API error response:', error.response);
      if (error.response && error.response.status === 401) {
        // Unauthorized, redirect to login page
        navigate('/login'); // Redirect to your login page route
      } //
    }
  }
  useEffect(() => {
    if (user) {
      getbookings();
    }
  }, [user]);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      setCancellationInProgress(true); 
      const token = localStorage.getItem('token');
      if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      const statusToUpdate = newStatus || 'cancelled';

      // API endpoint for updating status
      const response = await instance.put(`api/stripe/cancelbooking/${bookingId}/`, {
        status: statusToUpdate,

      });

      // Handle success
      toast.success('Status updated successfully');
      // Refresh bookings after successful status update
      getbookings();
    } catch (error) {
      console.error('could not update status', error);
      console.error('API error response:', error.response);
      if (error.response && error.response.status === 401) {
        // Unauthorized, redirect to login page
        navigate('/login'); // Redirect to your login page route
      }
    } finally {
      setCancellationInProgress(false); 
    }
  };

  
  

  const handleSearch = () => {
    const filteredbookings = bookings.filter(booking =>
      booking?.event?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredbookings;
  };

  const filteredbookings = handleSearch();
 

  
  const handleCheckout = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
  
      console.log('Request Payload:', { booking_id: bookingId });
  
      const response = await instance.post(
        'api/stripe/create-checkout-session/',
        { booking_id: bookingId ,
        // cancel_url: `${BASE_URL}/order-status/?canceled=true`,
        // success_url: `${BASE_URL}/order-status/?success=true`,
      },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      if (response.data.error) {
        console.error('Error creating checkout session:', response.data.error);
        // Handle the error, e.g., show an alert to the user
      } else {
        const stripe = await stripePromise;
        try {
          const { error } = await stripe.redirectToCheckout({
            sessionId: response.data.session_id,
          });
  
          if (error) {
            console.error('Error redirecting to Checkout:', error);
            // Handle error, e.g., show an alert to the user
          }
        } catch (error) {
          console.error('Error during redirectToCheckout:', error);
  
          if (error.response) {
            console.error('Response data:', error.response.data);
          } else if (error.request) {
            console.error('No response received. Request details:', error.request);
          } else {
            console.error('Unexpected error:', error.message);
          }
        }
      }
      
    } catch (error) {
      console.error('Unexpected error:', error.message);
    }
  };
  




  
	
  return (
    <div className='w-full h-full  relative'>
      <Toaster position='top-center' limit={3} />
      <div className='w-full h-20 flex items-center bg-primaryBlue text-white'>
        <Navbar1 />
      </div>
  
      <div className='px-5 w-full h-auto min-h-screen mx-5 mt-2 py-8 font-serif flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
        <div className='w-full h-screen px-3 '>
          <div className="w-full p-5 flex justify-between">
            <h1 className='  text-3xl text-start  ms-4'>My Bookings</h1>
            <input
              type="text"
              placeholder='&#x1F50D; Search '
              className="border border-primaryBlue border-solid focus:outline-none px-2 w-1/5 rounded-lg "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="overflow-hidden rounded-lg border border-customColorD shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-customColorD">
                <tr>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">Event Name</th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">Booking date</th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">Number Of Members</th>

                  <th scope="col" className="px-6 py-4 font-large text-gray-900">Amount</th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">Payment Status</th>
                  
          
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">Cancel Order</th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">Payment</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100 border-t border-gray-100'>
                {filteredbookings?.length > 0 ? (
                  filteredbookings?.slice().sort((a, b) => new Date(b.booking_date) - new Date(a.booking_date)).map((booking, index) => (
                    <tr className='hover:bg-gray-50' key={index}>
                    <td className='px-6 py-4'>
                    <p>
                    <div>{booking.event.name}</div>

                    </p>
                  </td>{/* ...Your other table data cells... */}
                      <td className='px-6 py-4'>
                        <p>
                          {new Date(booking.slot.date).toLocaleDateString()}
                        </p>
                      </td>
                      <td className='px-6 py-4'>
                    <p>
                    <div>{booking.numberOfMembers}</div>

                    </p>
                  </td>
                      <td className='px-6 py-4'>
                        <p>
                        <div>&#8377; {(booking.event.price_per_person*booking.numberOfMembers)}</div>

                        </p>
                      </td>
                    
                      <td className='px-6 py-4'>
                        <p>
                          <div
                            className={
                              booking.status === 'pending' ||
                              booking.status === 'completed'|| 
                              booking.status === 'cancelled' 
                              
                                ? 'text-red-500'
                                : 'text-green-500'
                            }
                          >
                            {booking.status.toUpperCase()}
                          </div>
                        </p>
                      </td>
                     
                    <td className='px-6 py-4'>
                    {/* Cancel Order button */}
                    {booking.status === 'pending' || booking.status === 'completed' ? (
                      <button
  className={`${
    cancellationInProgress
      ? 'bg-red-500 text-white font-semibold py-2 px-4 rounded cursor-not-allowed'
      : 'bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
  }`}
  onClick={() => {
    if (!cancellationInProgress) {
      Swal.fire({
        title: 'Cancel Order',
        text: 'Are you sure you want to cancel this order?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.isConfirmed) {
          // Proceed with canceling the order
          handleStatusUpdate(booking.id);
        }
      });
    }
  }}
>
  {cancellationInProgress ? 'Processing...' : 'Cancel Order'}
</button>

                    ) : (
                      <button
                        className='bg-gray-300 text-gray-600 font-semibold py-2 px-4 rounded cursor-not-allowed'
                        disabled
                      >
                         Cancel Order 
                      </button>
                    )}
                  </td>
      

<td>
  {booking.status === 'pending' ? (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCheckout(booking.id);
      }}
    >
      <button className='button bg-green-600 text-white py-2 px-4 rounded' type='submit'>
        Checkout
      </button>
    </form>
  ) : (
    <button
                        className='bg-gray-300 text-black font-semibold py-2 px-4 rounded cursor-not-allowed'
                        disabled
                      >
                        Checkout
                      </button>
  )}
</td>


                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan='6'
                      className='px-6 py-4 text-center text-red-500 font-bold'
                    >
                      No related bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Bookings;
