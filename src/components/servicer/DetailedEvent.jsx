import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './Sidebar';
import instance from '../../utils/axios';
// import { Event } from 'react-toastify/dist/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ServicerSingleEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getEventDetails() {
      try {
        const response = await instance.get(`http://127.0.0.1:8000/events/single-event/${id}/`);
        setEvent(response.data);
      } catch (error) {
        console.error('Failed to fetch event details:', error);
      }
      setLoading(false);
    }
    getEventDetails();
  }, [id]);

  return (
    <div className=''>
      <Sidebar />

      <div className='w-full p-6'>
        <Toaster position='top-center' limit={3} />

        {loading ? (
          <h1 className='text-3xl font-bold text-center text-primaryBlue'>Loading...</h1>
        ) : event ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div>
              <img className='w-full h-auto rounded-md shadow-lg' src={event?.image} alt='event' />
            </div>

            <div>
              <div className='bg-white w-full h-full rounded-lg shadow-lg p-6'>
                <h1 className='text-3xl font-bold text-primaryBlue mb-4'>{event?.name}</h1>
                <p className='text-gray-600'>{event?.description}</p>
                <div className='grid grid-cols-2 gap-6 mt-6'>
                  <div>
                    <p className='text-gray-600'>
                      <span className='font-semibold'>Price Per Person:</span> {'₹ ' + event?.price_per_person}
                    </p>
                    <p className='text-gray-600'>
                      <span className='font-semibold'>City:</span> {event?.city}
                    </p>
                    <p className='text-gray-600'>
                      <span className='font-semibold'>Year Manufactured:</span> {event?.year_manufactured}
                    </p>
                    
                    <p className='text-gray-600'>
                      <span className='font-semibold'>Seating Capacity:</span> {event?.seating_capacity}
                    </p>
                    <p className='text-gray-600'><span className='font-semibold'>Veg/NonVeg:</span> {event?.is_veg ? 'Veg' : 'Non Veg'}</p>
                    <p className='text-gray-600'>
                      <span className='font-semibold'>Event_starting_date:</span> {event?.start_time}
                    </p>
                    <p className='text-gray-600'>
                      <span className='font-semibold'>Event_ending_date:</span> {event?.ending_time}
                    </p>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center h-full'>
            <p className='text-xl font-semibold text-primaryBlue mt-4'>Event not found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServicerSingleEvent;