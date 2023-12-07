import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import {FaHamburger } from "react-icons/fa";
import {FaCheese } from "react-icons/fa6";
import { CiLogout } from 'react-icons/ci';

import { FiCalendar } from 'react-icons/fi';
import { FaFolder } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
// import { FiPlus, FiMessageSquare } from "react-icons/fi";
export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    toast.success('Servicer Logged Out');
  };

  return (
    <div className='w-full h-20 flex items-center justify-between font-poppins px-5 bg-customColorD'>
      <Toaster position='top-center' reverseOrder={false} />

      <div className='flex items-center gap-12'>
        <h1 className='font-Playball text-2xl text-customColorA'>CS Servicer</h1>
      </div>

      <div className='flex gap-3 items-center'>
        <NavLink
          to='/dashboards'
          className='px-1 list-none text-black font-serif hover:text-customColorC transition duration-300'
        >    <FaHamburger size={20} className='px-3' />
          Home
        </NavLink>
       
       
        <NavLink
          to='/eventservicer'
          className='px-1 list-none text-black hover:text-customColorC transition duration-300'
          
        >
        < FaCheese size={20} className='px-3 text-black' />
     
        <h3 className='font-serif'>My Events</h3>
        </NavLink>
      
        <NavLink
          to='/servicerbookings'
          className='px-1 list-none text-black hover:text-customColorC transition duration-300'
         
        > 
        <FiCalendar size={20} className='px-3' />
        <h3 className='font-serif text-black'>Bookings</h3>
        </NavLink>
        <NavLink
          to='/servicerdashboard'
          className='px-1 list-none text-black font-serif hover:text-customColorC transition duration-300'
        >    <FaHamburger size={20} className='px-3' />
          Dashborad
        </NavLink>
        <CiLogout
          size={30}
          className='cursor-pointer text-black hover:text-customColorC transition duration-300'
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}