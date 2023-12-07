import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { toast, Toaster } from "react-hot-toast";
import { AiOutlineSearch } from 'react-icons/ai';
import { FaEnvelope } from 'react-icons/fa'; 


function Navbar() {
  return (
    <div className='w-full h-20 flex items-center justify-between font-poppins px-5   bg-customColorD'>
    <Toaster position="top-center" reverseOrder={false} />

      <div className='flex items-center gap-12'>
        <h1 className='font-playball text-2xl text-white'>caterserv</h1>
        {/* <div className='flex px-10 rounded-3xl border-2 border-white py-2 place-items-center ms-3 transition duration-300 ease-in-out transform hover:scale-105'>
          <AiOutlineSearch className='text-black' size={20} />
          <input
            type='text'
            className='focus:outline-none ms-2 bg-transparent placeholder:text-white text-white'
            value={search}
            placeholder='Search for Cars'
          
            onKeyPress={(e) => {
              searchCar(e);
            }}
          />
        </div> */}
      </div>

      


      <div className='flex gap-3 items-center'>
        <Link to='/'>
          <li className='px-1 list-none text-white hover:text-customColorC transition duration-300'>
            Home
          </li>
        </Link>
        {/* {user_auth ? ( */}
          <>
            {/* <Link to='/mybookings'>
              <li className='px-1 list-none text-white hover:text-customColorC transition duration-300'>
                My Bookings
              </li>
            </Link>
            <Link to='/profile'>
              <li className='px-1 list-none text-white hover:text-customColorC transition duration-300'>
                Profile
              </li>
            </Link> */}
          </>
        {/* ) : null} */}
        <Link to='/home-list-car'>
          <li className='px-1 list-none text-white hover:text-customColorC transition duration-300'>
            Services
          </li>
        </Link>
        <Link to='/menu'>
          <li className='px-1 list-none text-white hover:text-customColorC transition duration-300'>
            Menu
          </li>
        </Link>
       
      </div>
{/* 
      {user_auth ? ( */}
        <div className='flex gap-2 items-center'>
        <Link to='/chat'>
            <FaEnvelope className='text-white text-2xl  hover:text-customColorC transition duration-300' />
          </Link>
          {/* <button
            className='px-4 py-2 bg-green-400 mx-2 text-black shadow-xl rounded-xl transition duration-300 ease-in-out transform hover:scale-105'
            onClick={logout}
          >
            Logout
          </button> */}
        </div>
      {/* ) : ( */}
        <div className='flex gap-2'>
          <Link to='/login'>
            <button className='px-3 py-1 bg-gradient-to-r from-customColorB to-customColorA text-white shadow-xl rounded-xl transition duration-300 ease-in-out transform hover:scale-105'>
              User Login
            </button>
          </Link>
          <Link to='/servicersignin'>
            <button className='px-3 py-1 bg-gradient-to-r from-customColorB to-customColorA text-white shadow-xl rounded-xl transition duration-300 ease-in-out transform hover:scale-105'>
              Servicer Login
            </button>
          </Link>
        </div>
      {/* )} */}
    </div>
  )
}

export default Navbar