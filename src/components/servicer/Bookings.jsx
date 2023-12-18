import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import instance from '../../utils/axios';
import {
    Button,
    Input,
  } from "@material-tailwind/react";
import Sidebar from "./Sidebar";
// import LateChargesDialog from './LateCharges';


export default function ServicerBookings() {
  console.log('Component rendering...');
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState('');

  
  
  const userData = JSON.parse(localStorage.getItem('user'));
  const userId = userData.userID
  console.log(userId)

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.userID) {
      setUser(userData.userID);
      getbookings(userData.userID);
    }
    // if (user) {
    //   getbookings(user);
    // }
  }, []);
  // useEffect(() => {
  //   if (user) {
  //     getbookings();
  //   }
  // }, [user]);

  async function getbookings(userId) {
    try {
      const token = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('user'));
      const userId = userData.userID
      if (token) {
        // Use the global Axios instance directly here
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      const response = await instance.get(`api/stripe/servicerbookings/?user=${userId}`);
      console.log('API Response:', response.data); 
      setBookings(response.data);
    } catch (error) {
      console.error('could not fetch data', error);
      console.error('API error response:', error.response); //
    }
  }
 
 
  
  
 
  

 

  const handleSearch = () => {
    const filteredbookings = bookings.filter(booking =>
      booking?.event?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredbookings;
  };

  const filteredbookings = handleSearch()


  const handleStatusChange = async (newStatus, bookingId) => {
    try {
      const token = localStorage.getItem('token');
  
      if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
  
      // Make an API request to update the booking status
      const response = await instance.patch(`api/stripe/updateBookingStatus/${bookingId}/`, {
        status: newStatus,
      });
  
      // Handle success or display a notification
      toast.success(`Booking status updated to ${newStatus}`);
      
      // Fetch bookings again to update the UI
      getbookings(userId);
    } catch (error) {
      console.error('Could not update booking status', error);
      console.error('API error response:', error.response);
      // Handle error or display a notification
      toast.error('Failed to update booking status');
    }
  };
  
  
  
  
  
 
 

  return (

<div className="">
<Sidebar />
<div className='flex h-full bg-acontent mt-3'>
  <Toaster position='top-center' reverseOrder={false} limit={1} />

  <div className='px-5 w-full h-auto font-serif min-h-screen mx-5 mt-2 py-8  flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
    <div className='w-full h-screen px-3 '>
      <div className="w-full p-5 flex justify-between">
        <h1 className='  text-3xl font-bold text-center text-custom-red '>My Bookings</h1>
        <input
          type="text"
          placeholder='&#x1F50D; Search for bookings'
          className="border border-primaryBlue border-solid focus:outline-none px-2 w-1/5 rounded-lg "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-large text-gray-900">Event Name</th>
              <th scope="col" className="px-6 py-4 font-large text-gray-900">Booking date</th>
              <th scope="col" className="px-6 py-4 font-large text-gray-900">Amount</th>
              <th scope="col" className="px-6 py-4 font-large text-gray-900">Status</th>
              <th scope="col" className="px-6 py-4 font-large text-gray-900">Action</th>
            
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
                  </td>
                  <td className='px-6 py-4'>
                    <p>
                      {new Date(booking.slot.date).toLocaleDateString()}
                    </p>
                  </td>
                  <td className='px-6 py-4'>
                    <p>
                      <div>&#8377; {(booking.event.price_per_person * booking.numberOfMembers).toFixed(0)}</div>
                    </p>
                  </td>
                  <td className='px-6 py-4'>
                    <p>
                      <div
                        className={
                          booking.status === 'pending' ||
                          booking.status === 'completed' ||
                          booking.status === 'cancelled'
                        }
                      >
                        {booking.status.toUpperCase()}
                      </div>
                    </p>
                  </td>
                  <td className='px-6 py-4'>
  <div>
    <select
      value={booking.status}
      onChange={(e) => handleStatusChange(e.target.value, booking.id)}
      className="border border-primaryBlue border-solid focus:outline-none px-2 rounded-lg"
    >
      <option value="pending">Pending</option>
      <option value="completed">Completed</option>
      <option value="rejected">Rejected</option>
      <option value="given">Given</option>
    </select>
  </div>
</td>
{/* <td className='px-6 py-4'>
  <p>
    <div className={booking.status}>
      {booking.status.toUpperCase()}
    </div>
  </p>
</td> */}



                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan='4'
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
</div>
);
}