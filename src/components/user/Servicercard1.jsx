import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import instance,  { BASE_URL } from '../../utils/axios';

function Servicercard1() {
  const [categoryData, setCategoryData] = useState([]);
 
 
 
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const categories = await instance.get('http://127.0.0.1:8000/events/categories/');
       

        setCategoryData(categories.data);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  
  
 
  

  const handleCategoryClick = (categoryId) => {
    navigate(`/home-list-event?category=${categoryId}`);
  };  

  console.log("categories: ", categoryData)

  return (
    <div className="w-full">
  
     <h1 className='text-center py-12 text-3xl font-Playball'> Our Events</h1>
     
        

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            { categoryData.map((category) => (
              <div
                key={category.id}
                className="w-full bg-black rounded-lg p-12 flex flex-col justify-center items-center black-cover"
                style={{
                  backgroundImage: `url(${BASE_URL}${category.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="mb-8"></div>
                <div className="text-center relative">
                  <p className="text-xl text-white font-serif mb-2">{category.name}</p>
                </div>
              </div>
            ))}
          </div>
    
   
      <div className='text-center mb-10'>
        <Link to='/home-list-event' className="p-2 overflow-hidden rounded-md bg-customColorD hover:bg-customColorA text-sm font-serif text-black">
          See All Events
        </Link>
      </div>
     

     

      
    </div>
  );
}

export default Servicercard1;