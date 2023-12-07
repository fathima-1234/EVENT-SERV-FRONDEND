import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from "react-hot-toast";
import { AiOutlineSearch,AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaEnvelope } from 'react-icons/fa'; 
import { InvalidTokenError, jwtDecode } from 'jwt-decode';



function NavBar1() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  function searchCar(e) {
    if (e.key === 'Enter') {
      navigate(`/events?key=${search}`);
    }
  }

  const user_auth =  localStorage.getItem('token');
  let user_name;
  if (user_auth) {
    user_name = jwtDecode(user_auth);
  }

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success("Logged Out ");

    navigate('/');
  };

  return (
    <div className='w-full h-20 flex items-center justify-between font-poppins px-5 bg-customColorD'>
    <Toaster position="top-center" reverseOrder={false} />

      <div className='flex items-center gap-12'>
        <h1 className='font-Playball text-5xl text-customColorA'>Event<span className='text-black'>Serv</span> </h1>
        <div className='hidden md:flex px-5 rounded-3xl border-2 border-black py-2 place-items-center ms-3 transition duration-300 ease-in-out transform hover:scale-105'>
          <AiOutlineSearch className='text-black' size={20} />
          
          <input
            type='text'
            className='focus:outline-none ms-2 bg-transparent placeholder:text-black text-customColorC'
            value={search}
            placeholder='Search'
          
            onKeyPress={(e) => {
              searchCar(e);
            }}
          />
        </div>
      </div>

      


      <div className='hidden md:flex  gap-3 items-center'>
        <Link to='/'>
          <li className='px-1 list-none font-serif text-black hover:text-customColorC transition duration-300'>
            Home
          </li>
        </Link>
        {user_auth ? (
          <>
            <Link to='/mybookings'>
              <li className='px-1 list-none font-serif text-black hover:text-customColorC transition duration-300'>
                My Bookings
              </li>
            </Link>
            <Link to='/profile'>
              <li className='px-1 list-none font-serif text-black hover:text-customColorC transition duration-300'>
                Profile
              </li>
            </Link>
         
          <Link to='/menu'>
          <li className='px-1 list-none font-serif text-black hover:text-customColorC transition duration-300'>
           Menu
          </li>
        </Link>
      </>
        ) : null}
        <Link to='/home-list-event'>
          <li className='px-1 list-none text-black font-serif hover:text-customColorC transition duration-300'>
            Events
          </li>
        </Link>
       
      </div>

      {user_auth ? (
        <div className='flex gap-2 items-center'>
        {/* <Link to='/chat'>
            <FaEnvelope className='text-black text-2xl  hover:text-customColorC transition duration-300' />
          </Link> */}
          <button
            className='px-4 py-2 font-serif bg-customColorA mx-2 text-black shadow-xl rounded-xl transition duration-300 ease-in-out transform hover:scale-105'
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className='flex gap-2'>
          <Link to='/login'>
            <button className='px-3 py-1 font-serif bg-gradient-to-r from-customColorA to-customColorD text-black shadow-xl rounded-xl transition duration-300 ease-in-out transform hover:scale-105'>
              User Login
            </button>
          </Link>
          <Link to='/servicersignin'>
            <button className='px-3 py-1 font-serif bg-gradient-to-r from-customColorA to-customColorD text-blck shadow-xl rounded-xl transition duration-300 ease-in-out transform hover:scale-105'>
              Servicer Login
            </button>
          </Link>
        </div>
         
      )}
      <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-customColorA ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold text-[#d4a762] m-4'>Caterserv</h1>
        <Link to='/'><li className='p-4 border-b border-gray-600'>Home</li></Link>
        <Link to='/'><li className='p-4 border-b border-gray-600'>Events</li></Link>
        <Link to='/'><li className='p-4 border-b border-gray-600'>Booking</li></Link>
        <Link to='/'><li className='p-4 border-b border-gray-600'>Profile</li></Link>
        
      </ul>
        
      
     
    </div>
  );
}

export default NavBar1;