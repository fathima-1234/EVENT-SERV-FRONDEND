import React, { useState, useEffect } from 'react';
import Navbar1 from './Navbar1';
import EventCarousel from './EventCarousel';
import instance,  { BASE_URL } from '../../utils/axios';
import { Link, useParams } from 'react-router-dom';
import Footer from './Footer';
import Feedback from './Feedback';
import Menucard from './Menucard';

function SingleView(props) {
  const { id } = useParams();
 
  const [event, setEvent] = useState({});
  const [menuData, setMenuData] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
 
  
 
  

  useEffect(() => {
    // Fetch event details
    instance.get(`http://127.0.0.1:8000/events/user-events/${id}/`)
      .then((response) => {
         
        setEvent(response.data);
      })
      .catch((error) => {
        console.error(error);
      })});

      useEffect(() => {
        async function fetchData() {
          try {
            const menu = await instance.get('http://127.0.0.1:8000/events/menu/');
           
    
            setMenuData(menu.data);
           
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        fetchData();
      }, []);
    
      useEffect(() => {
        // Fetch feedbacks for the event
        instance.get(`http://127.0.0.1:8000/events/feedback/?event=${id}`)
            .then((response) => {
              console.log('Feedbacks response:', response.data);
                setFeedbacks(response.data);
            })
            .catch((error) => {
                console.error('Error fetching feedbacks:', error);
            });
    }, [id]);
    
    const handleFeedbackSubmit = (newFeedback) => {
      console.log('New feedback submitted:', newFeedback);
        setFeedbacks((prevFeedbacks) => [...prevFeedbacks, newFeedback]);
    };    
      


  return (
    <div>
      <Navbar1 />
     
      {event ? <EventCarousel event={event} /> : <Navbar1 />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-36">
        <div className="flex flex-col md:flex-row -mx-4">
         
          
          <div className="md:flex-1 text-center">
            <h2 className="mb-2 leading-tight tracking-tight font-bold text-green-500 text-2xl md:text-3xl">
              {event.name}
            </h2>
           
            <div className="font-serif text-black max-w-7xl text-center  mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                {event.category && event.category.name ? (
                    <span className="flex item-center px-[510px] mb-1">
                    {event.category.name && (
                        <h3 >Category : {event.category.name}</h3>
                    )}
                    </span>
                ) : (
                    'Unknown Category'
                )}
                
                <h3 className="mb-1 font-serif text-black">Place :  {event.city}</h3>
    <p className='text-black font-serif'>
  Servicer name:{event.servicer_name} 
</p>

<p className='text-black'> {event.is_veg ? 'Vegitarian' : 'Veg&NonVeg'}</p>
                {/* <p className='text-gray-600'>Servicer name: {event.servicer.user.email}</p> */}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 my-4 sm:w-1/2">
            <div>
            <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                <span className="text-blue-400 mr-1 mt-1">₹</span>
                <span className="font-bold text-blue-500 text-3xl">
                {event.price_per_person}
                </span>
            </div>
            </div>
            <div className="flex-1 flex justify-between">
            <div>
                <p className="text-black text-sm sm:text-xl font-semibold mt-3 sm:mt-0">price per person</p>
                <p className="text-gray-400 text-xs sm:text-sm">
                Inclusive of all Taxes.
                </p>
            </div>
            <div className='px-[800px]'>
                <Link to={`/orderconfirmation/${event.id}`}
                type="button"
                className="md:h-10 px-10 py-2 mt-3 sm:mt-0 font-serif sm:font-bold rounded-xl bg-customColorA hover:customColorD text-Black"
                >
                    Booking
                </Link>
            </div>
            </div>
        </div>

        <h3 className="text-2xl font-serif mt-8 mb-2">About this Event</h3>
        <p className="text-black font-serif mb-8">{event.description}</p>
        
        <div className=''>
        
        <h1 className='text-center py-12 text-3xl font-Playball'> Our Menus</h1>
     
        

     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
       { menuData.map((menu) => (
         <div
           key={menu.id}
           className="w-full bg-black rounded-lg p-12 flex flex-col justify-center items-center black-cover"
           style={{
             backgroundImage: `url(${BASE_URL}${menu.image})`,
             backgroundSize: "cover",
             backgroundPosition: "center",
             backgroundRepeat: "no-repeat",
           }}
           // onClick={() => handleCategoryClick(category.id)}
         >
           
           <div className="text-center relative">
             <p className="text-xl text-white font-serif mb-2">{menu.name}</p>
           </div>
           </div>
       
         
       ))}
      </div> 
     


 
        </div>
        
        
        </div>
          <Feedback eventId={id} onFeedbackSubmit={handleFeedbackSubmit} />
          <div>
              <h3>Comments:</h3>
              <ul>
                  {feedbacks.map((feedback) => (
                      <li key={feedback.id}>{feedback.comment}</li>
                  ))}
              </ul>
          </div>
       
        <Footer />
        
    </div>
  );
}

export default SingleView;