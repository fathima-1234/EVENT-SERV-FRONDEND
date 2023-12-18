import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import instance from '../../utils/axios';

const CreateSlot = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getEventDetails() {
      try {
        const response = await instance.get(`events/single-event/${id}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEvent(response.data);
      } catch (error) {
        console.error('Failed to fetch event details:', error);
      }
      setLoading(false);
    }
    getEventDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date) {
      toast.error('Please select both starting and ending dates.');
      return;
    }
    setLoading(true);
    try {
     
      const userId = JSON.parse(localStorage.getItem('user')).userID;
      const response = await instance.post(
        'events/createslots/',
        {
          event: event.id,
          date: date,   // Update field name here
         
          status,
        },
        {
          params: { servicer: userId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      navigate(`/eventservicer`);
      toast.success('Slots created successfully');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 403) {
        toast.error('You do not have permission to create slots.');
      } else if (error.response && error.response.status === 400) {
        toast.error('Slots already exist for the selected date range.');
      } else {
        toast.error('Failed to create slots. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-2/4 '>
      <Toaster position='top-center' reverseOrder='false' limit={1}></Toaster>
      <div className='w-3/4 mt-16 mx-auto p-6 bg-white rounded-lg shadow-md'>
        <h2 className='text-xl font-bold mb-4'>Create Slot</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='date' className='block font-medium mb-1'>
               Date:
            </label>
            <input
              type='date'
              id='date'
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              className='w-full border-gray-300 border-2 rounded-md py-2 px-3'
            />
          </div>
         
        

          <div className='mb-4'>
            <label htmlFor='status' className='block font-medium mb-1'>
              Status:
            </label>
            <input
              type='checkbox'
              id='status'
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
              className='mr-2'
            />
            <span className='text-gray-700'>Active</span>
          </div>

          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded'
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSlot;