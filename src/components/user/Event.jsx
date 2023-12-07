import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar1 from './Navbar1';
import Footer from './Footer';
import notfound from '../../assets/notfound.jfif';
import instance,  { BASE_URL } from '../../utils/axios';
import {  AiOutlineEnvironment } from 'react-icons/ai';
import { AiOutlineFilter, AiOutlineSortAscending, AiOutlineSortDescending , AiOutlineCloseCircle } from 'react-icons/ai';
// import './loader.css';
import queryString from 'query-string';
function Event() {
  const [events, setEvents] = useState([]);
  const [load, setLoad] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOptionsVisible, setFilterOptionsVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const queryParams = queryString.parse(locations.search);
  const selectedCategoryId = queryParams.category || '';
  const [eventsData, setEventsData] = useState([]);
  const [filteredEventsData, setFilteredEventsData] = useState([])
  const [sortBy, setSortBy] = useState('lowToHigh');


  const toggleSortOrder = () => {
    setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
  
  //   if (selectedValue === '') {
  //     const activeEvents = eventsData.filter((event) => event.is_active === true);
  //     setFilteredEventsData(activeEvents);
  //   } else {
  //     const filteredEvents = eventsData.filter(
  //       (event) => event.category.id === parseInt(selectedValue) && event.is_active === true
  //     );
  //     setFilteredEventsData(filteredEvents);
  //   }
  // };
    if (!eventsData) {
    // Handle the case where eventsData is empty or undefined.
    // You may want to set an appropriate value or show a message.
  } else if (selectedValue === '') {
    const activeEvents = eventsData.filter((event) => event.is_active === true);
    setFilteredEventsData(activeEvents);
  } else {
    const filteredEvents = eventsData.filter(
      (event) => event.category.id === parseInt(selectedValue) && event.is_active === true
    );
    setFilteredEventsData(filteredEvents);
  }
};

  const toggleFilterOptions = () => {
    setFilterOptionsVisible(!filterOptionsVisible);
  };
 

  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await instance.get('http://127.0.0.1:8000/events/home-list-locations/'); 
        setLocations(response.data);
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      }
    }
    fetchLocations();
  }, []);

  useEffect(() => {
    async function getEvents() {
      setLoad(true);
  
      
      setTimeout(async () => {
        try {
          const response = await instance.get('http://127.0.0.1:8000/events/home-list-event/');
          setEvents(response.data);
        } catch (error) {
          console.error('Failed to fetch event:', error);
        }
        setLoad(false);
      }, 1000); 
    }
    
    getEvents();
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const gigs = await instance.get('http://127.0.0.1:8000/events/user-events/');
        const categories = await instance.get('http://127.0.0.1:8000/events/categories/');
        
        setEventsData(events.data);
        setFilteredEventsData(events.data);
        setCategoryData(categories.data);

       

        if (selectedCategoryId !== '') {
            const filteredEvents = events.data.filter(
              (event) => event.category.id === parseInt(selectedCategoryId) && event.is_active === true
            );
            setFilteredEventsData(filteredEvents);
        }

      } catch (error) {
        console.error('Error fetching events or categories:', error);
      }
    }
    fetchData();
  }, [ selectedCategoryId]);

  const filterEventByPriceRange = (event) => {
    const eventPrice = parseFloat(event.price_per_person);
    if (selectedPriceRange === '0-100') {
      return eventPrice >= 0 && eventPrice <= 100;
    } else if (selectedPriceRange === '100-above') {
      return eventPrice > 100;
    } else if (selectedPriceRange === '1000-above') {
      return eventPrice > 1000;
    }
    return true;
  };



  const filteredEvents = events.filter(event => {
    const matchesLocation = !selectedLocation || event.category.name === selectedLocation;
    const matchesPriceRange = filterEventByPriceRange(event);
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesLocation && matchesPriceRange && matchesSearch;
  });

  const sortedEvents = filteredEvents.slice().sort((a, b) => {
    const priceA = parseFloat(a.price_per_person);
    const priceB = parseFloat(b.price_per_person);
    if (sortOrder === 'asc') {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  });

  return (
   
//     <div className='w-full h-full font-poppins relative'>
//       <Toaster position='top-center' limit={3} />
      
//       <div className='w-full h-20 flex items-center bg-primaryBlue text-white'>
//         <Navbar1 />
//       </div>
   
          
            
//       <div className='p-5 w-full h-full min-h-screen'>

//         <div className='w-full mt-10'>
//              <div className='flex items-center justify-between mb-4'>
//         <div className='flex items-center'>
//           <div className="group inline-block  sm:w-1/2 lg:w-1/4 mb-2 sm:mb-0 mr-4">
//                 <select
//                 onChange={handleCategoryChange}
//                 value={selectedCategory}
//                 className="outline-none focus:outline-none border px-3 py-1 mr-[100px] bg-white rounded-sm flex items-center "
//                 >
//                 <option value="">All Categories</option>
//                 {categoryData
//                     .filter((category) => category.is_active)
//                     .map((category) => (
//                     <option key={category.id} value={category.id}>
//                         {category.name}
//                     </option>
//                     ))}
//                 </select>
//             </div>
     
//         <button
//         onClick={toggleSortOrder}
//         className='bg-black text-white rounded-md px-4 py-2 mr-4 hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-400 flex items-center'
//         style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease-in-out' }}
//       >
//         {sortOrder === 'asc' ? <AiOutlineSortAscending className='mr-1' /> : <AiOutlineSortDescending className='mr-1' />}
//         Sort by Price {sortOrder === 'asc' ? '(Low-High)' : '(High-Low)'}
//       </button>
//       <button
//         onClick={toggleFilterOptions}
//         className={`bg-black text-white rounded-md px-4 py-2 ${filterOptionsVisible ? '' : ''} hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-400 flex items-center`}
//         style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease-in-out' }}
//       >
//         {filterOptionsVisible ? <AiOutlineFilter className='mr-2' /> : <AiOutlineFilter className='mr-2' />}
//         Filters ({[selectedLocation, selectedPriceRange].filter(Boolean).length})
//       </button>
      

      
      
           
      
//         {filterOptionsVisible && (
//           <div className='flex items-center border rounded-lg p-2 bg-gray-100 ml-4'>
//             <div className='flex items-center border rounded-lg p-2 bg-gray-100'>
//   <AiOutlineEnvironment size={20} className='text-gray-500 mr-2' />
//   <select
//     value={selectedLocation}
//     onChange={handleLocationChange}
//     className='bg-transparent text-gray-600 focus:outline-none'
//   >
//     <option value=''>Select Location</option>
//     {locations.map((location) => (
//       <option key={location.id} value={location.name}>
//         {location.name}
//       </option>
//     ))}
//   </select>
// </div>
//             <div className='flex items-center border rounded-lg p-2 bg-gray-100 ml-4'>
// <select
//   value={selectedPriceRange}
//   onChange={handlePriceRangeChange}
//   className='bg-transparent text-gray-600 focus:outline-none'
// >
//   <option value=''>Select Price Range</option>
//   <option value='0-1000'>0 - 100</option>
//   <option value='1000-above'>100 above</option>
//   <option value='10000-above'>1000 above</option>
// </select>
// </div>
            
//           </div>
//         )}
//       </div>
//       <div className='flex items-center border rounded-lg bg-gray-100 px-3 py-2 transition duration-300 ease-in-out transform hover:scale-105 focus-within:ring focus-within:ring-gray-400'>
//       <input
//         type='text'
//         value={searchQuery}
//         onChange={handleSearchChange}
//         placeholder='Search for Cars'
//         className='bg-transparent text-gray-600 focus:outline-none placeholder-gray-400'
//       />
//       <button
//         className='ml-2 text-gray-500 hover:text-gray-700 focus:outline-none'
//         onClick={() => setSearchQuery('')}
//       >
//       <AiOutlineCloseCircle size={18} />
//       </button>
//     </div>
    
//   </div>
        
//           {load ? (
//             <div className='flex flex-col items-center justify-center align-center h-full'>
           
//             <div class="jelly"></div> </div>
//           ) : (
//             <>
              
//               {sortedEvents?.length > 0 ? (
//                 <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
//                   {sortedEvents.map(event => (
//                     <Link
//                       to={`/cardetail/${event?.id}`}
//                       className='bg-white shadow-xl rounded-lg p-4 transition-transform transform hover:-translate-y-1'
//                       key={event.id}
//                     >
//                        <img className='w-full h-40 object-cover rounded-md' src={`${BASE_URL}${event.image}`}  alt='event_image1' /> 
//                       <div className='mt-4'>
//                         <h1 className='text-xl font-semibold text-primaryBlue'>{event?.name}</h1>
//                         <p className='text-lg font-semibold text-primaryBlue mt-2'>{event?.price_per_person}</p>
//                         <p className='text-gray-600 mt-2'>{event?.category.name}</p>
                       
                        
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               ) : (
//                 <div className='flex flex-col items-center justify-center h-full'>
//                  <img className='w-1/2' src={notfound} alt='no_results_found' /> 
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
    
//   )
// }
// export default Event
 <div>
      <Navbar1 />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div className="text-center pb-12">
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900 mt-20">
            Find and Hire Freelancers
          </h1>
          <h2 className="text-sm sm:text-base font-bold text-blue-500 mt-3">
            We found 1500 Freelancers offering 2300 services online.
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <form className="flex items-center" onSubmit={handleSearch}>
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              {/* <input
                type="text"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Search Freelancers"
                required
                value={gigsSearch}
                onChange={handleGigsSearchChange}
              /> */}
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-600 rounded-lg border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <svg
                className="mr-2 -ml-1 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              Search
            </button>
          </form>

          <div className="flex flex-wrap mt-5">
            <div className="group inline-block w-full sm:w-1/2 lg:w-1/4 mb-2 sm:mb-0">
                <select
                onChange={handleCategoryChange}
                value={selectedCategory}
                className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center w-full"
                >
                <option value="">All Categories</option>
                {categoryData
                    .filter((category) => category.is_active)
                    .map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                    ))}
                </select>
            </div>
            <div className="group inline-block w-full sm:w-1/2 lg:w-1/4 mb-2 sm:mb-0">
                <select
                onChange={handleStateChange}
                value={selectedState}
                className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center w-full"
                >
                <option value="">All Locations</option>
                {uniqueStates.map((state, index) => (
                    <option key={index} value={state}>
                    {state}
                    </option>
                ))}
                </select>
            </div>
            <div className="group inline-block w-full sm:w-1/2 lg:w-1/4 mb-2 sm:mb-0">
                <select
                onChange={handleSortChange}
                value={sortBy}
                className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center w-full"
                >
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                </select>
            </div>
            <div className="group inline-block w-full sm:w-1/2 lg:w-1/4 mb-2 sm:mb-0">
                <select
                onChange={handlePriceRangeChange}
                value={priceRange}
                className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center w-full"
                >
                <option value="">Price Range: Any</option>
                <option value="0-5000">Below ₹5000</option>
                <option value="5000-10000">₹5000 - ₹10000</option>
                <option value="10000-15000">₹10000 - ₹15000</option>
                <option value="15000-20000">₹15000 - ₹20000</option>
                <option value="20000-above">₹20000 and above</option>
                </select>
            </div>
            </div>
        </div>

        {filteredEventsData.length === 0 ? (
          <div className="col-span-1 flex justify-center items-center">
            <img
              src="/images/2953962.jpg"
              alt="Image"
              className="w-full h-auto max-w-lg"
            />
          </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {filteredEventsData
              .filter((event) => event.is_active === true)
              .map((events) => (
              <div
                key={events.id}
                className="w-full bg-gray-200 rounded-lg p-4 flex flex-col justify-center items-center"
              >
                <Link to={`/single-view/${events.id}`}>
                  <div className="mb-2">
                    <img
                      className="object-center object-cover rounded-xl h-56 w-80"
                      src={events.image}
                      alt={events.title}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-lg text-gray-700 font-bold">{events.name}</p>
                    <p className="text-sm text-gray-400 font-normal">
                      {events.category.name}
                    </p>
                  </div>
                  <div className="mt-2 text-base text-gray-600 font-normal w-80 sm:w-64 md:w-80">
                    <p className="mb-3">{events.description}</p>
                    <div className="flex flex-wrap justify-between">
                      <p className="w-1/2">from: ₹{events.price_per_person}</p>
                      <div className="w-1/2 flex bg-gray-500 rounded-xl">
                        <p className="mx-12 font-semibold text-sm text-white">
                          {events.servicer.first_name}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default Event;