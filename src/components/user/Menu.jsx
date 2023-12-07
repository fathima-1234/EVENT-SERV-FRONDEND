import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import instance,  { BASE_URL } from '../../utils/axios';
import Navbar1 from './Navbar1';
import Footer from './Footer';

function Menu() {
  const [menuData, setMenuData] = useState([]);
 
 
 
  const navigate = useNavigate();

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

  
  
 
  

  // const handleCategoryClick = (categoryId) => {
  //   navigate(`/home-list-event?category=${categoryId}`);
  // };  

  // console.log("categories: ", categoryData)

  return (
    <div className="w-full">
      <Navbar1 />
  
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
          
    
   
      
     

     

      <Footer />
    </div>
  );
}

export default Menu;