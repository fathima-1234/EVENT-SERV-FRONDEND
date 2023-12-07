import React from 'react';
import {FaCheese } from "react-icons/fa6";
import {FaHamburger } from "react-icons/fa";
import {FaPizzaSlice } from "react-icons/fa6";
import homedelivery from '../../assets/homedelivery.jpg';
import corporate from '../../assets/corporate.jpg';
import wedding from '../../assets/wedding.jpg';
import bento from '../../assets/bento.jpg';
// import {FaWalking } from "react-icons/fa";
const Servicecard = () => {
    return (
        <div><h1 className='text-3xl text-center py-[30px]'>Our Services</h1>
        <div className='w-full  px-4 bg-white'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-4 gap-8'>
            <div className='w-full shadow-xl bg-customColorD flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                    <img className='w-100 mx-auto mt-[-3rem] bg-white' src={homedelivery} alt="/" />
                    {/* <FaWalking className='text-customColorA mx-auto' size={100}/> */}
                    <h2 className='text-2xl font-bold text-center font-serif py-8'>Home Delivery</h2>
                    
                    <div className='text-center font-medium'>
                        
                        <p className='py-2 border-b mx-8'>The way to a man's heart is through his stomach</p>
                    </div>
                    <button className='bg-customColorA w-[200px] rounded-md font-serif my-6 mx-auto px-6 py-3'>Read More</button>
                </div>
                <div className='w-full shadow-xl bg-customColorD flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                     <img className='w-100 mx-auto mt-[-3rem] bg-white' src={corporate} alt="/" />
                    {/* <FaPizzaSlice className='text-customColorA mx-auto' size={100}/> */}
                    <h2 className='text-2xl font-bold text-center font-serif py-8'>Corporate Catering</h2>
                    
                    <div className='text-center font-medium'>
                        
                        <p className='py-2 border-b mx-8'>The way to a man's heart is through his stomach</p>
                    </div>
                    <button className='bg-customColorA w-[200px] rounded-md font-serif my-6 mx-auto px-6 py-3'>Read More</button>
                </div>
                <div className='w-full shadow-xl bg-customColorD flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'> 
                    <img className='w-100 mx-auto mt-[-3rem] bg-white' src={wedding} alt="/" />  
                     {/* <FaCheese className='text-customColorA mx-auto' size={100}/>  */}
                    <h2 className='text-2xl font-bold text-center font-serif py-8'>Wedding Services</h2>
                    
                    <div className='text-center font-medium'>
                        
                        <p className='py-2 border-b mx-8'>The way to a man's heart is through his stomach</p>
                    </div>
                    <button className='bg-customColorA w-[200px] rounded-md font-serif my-6 mx-auto px-6 py-3'>Read More</button>
    </div>
                <div className='w-full shadow-xl bg-customColorD flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                    <img className='w-100 mx-auto mt-[-3rem] bg-white' src={bento} alt="/" />  
                    {/* <FaHamburger  className='text-customColorA mx-auto' size={100}/> */}
                    <h2 className='text-2xl font-bold text-center font-serif py-8'>Bento Catering</h2>
                    
                    <div className='text-center font-medium'>
                        
                        <p className='py-2 border-b mx-8'>The way to a man's heart is through his stomach</p>
                    </div>
                    <button className='bg-customColorA w-[200px] rounded-md font-serif my-6 mx-auto px-6 py-3'>Read More</button>
                </div>
               
            </div>
        </div>
        </div>
    );
};

export default Servicecard;