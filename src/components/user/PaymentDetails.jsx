import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
// import PaymentPage from "./Payment";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
export default function PaymentDetails(props) {
const {
  event,
  bookedSlot,
  numberOfMembers,
  requirements,
  menus,
  setShowPayment,
  userEmail
} = props;

console.log(bookedSlot[0].id, 'booked slot');
console.log(numberOfMembers, ': number of members');
console.log(requirements, ': requirements');
console.log(menus, ': menus');

const slot = bookedSlot[0];
const navigate = useNavigate();
const handleConfirmBooking = async () => {
  try {
    if (!bookedSlot || bookedSlot.length === 0) {
      console.error('No booked slots available.');
      return;
    }
   
    // Prepare the booking data
    const bookingData = {
      // user: props.currentUser?.id,
      // event: event.id, // Assuming event.id is the identifier for the event
      // slot: bookedSlot[0].id, // Assuming bookedSlot[0].id is the identifier for the slot
      user: userEmail ? { email: userEmail } : null,
      event: event ? { id: event.id } : null,
      slot: bookedSlot[0] ? { id: bookedSlot[0].id } : null,
      numberOfMembers,
      requirements,
      menus,
    };

    // Make API request to add booking details to the backend
    const response = await fetch('http://127.0.0.1:8000/api/stripe/confirm-booking/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      const result = await response.json();
      // Assuming the backend returns a booking ID or relevant information
      console.log('Booking successful:', result);

      // Navigate to the booking page after successful booking
      navigate('/mybookings');
    } else {
      // Handle error case
      console.error('Error confirming booking:', response.status, response.statusText);
      // You can add additional error handling here
    }
  } catch (error) {
    console.error('Error confirming booking:', error.message);
    // You can add additional error handling here
  }
};


  
  return (
    <div className="flex items-center justify-center  bg-gradient-to-br from-indigo-800 to-indigo-600">
      <div className="w-96 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-indigo-600 p-4">
          <AiOutlineCloseCircle
            onClick={() => setShowPayment(false)}
            className="text-white w-6 h-6 ml-auto cursor-pointer"
          />
        </div>
        <div className="text-center py-8">
       
          <h2 className="text-2xl text-indigo-800 font-semibold mb-2">{event?.name}</h2>
          <p className="text-gray-600 mb-2">Servicer Name: {event?.servicer_name}</p>
          <p className="text-gray-600 mb-2">Number of menmbers: {numberOfMembers}</p>
        </div>
        <div className="px-6 py-4">
          <h3 className="text-lg text-gray-700 font-medium">Booking Fee</h3>
          <p className="text-3xl text-indigo-700 mt-2"> {event.price_per_person * numberOfMembers }</p>
          <h3 className="text-lg text-gray-700 font-medium mt-4">Booking Date</h3>
          
        {bookedSlot?.map((slot) => (
          <p key={slot.id}>Slot ID: {slot.id}, Date: {slot.date}</p>
      ))}
          
          <div>
        <h3>Selected Menus</h3>
       <ul>
         {menus.map((menu) => (
             <li key={menu.id}>{menu.name}</li>
          ))}
        </ul>
       </div> 
       <p>Requirements: {requirements}</p>
      
          {/* <div className="w-full flex items-center justify-center mt-6">
            <PaymentPage  event={event} bookedSlot={bookedSlot} menus={menus} numberOfMembers={numberOfMembers}/>
          </div> */}
           <div className="w-full flex items-center justify-center mt-6">
            <button
              onClick={handleConfirmBooking}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
}