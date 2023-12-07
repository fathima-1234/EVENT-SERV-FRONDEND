import React from 'react';
import hero from '../../assets/hero.png';

const Blog= () => {
    return (
      <div className='w-full bg-customColorD py-16 px-4'>
         <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 hover:scale-105 duration-500'>
          <div className='flex flex-col justify-center'>
            <p className='text-black font-serif mb-4'>WELCOME TO EVENTSERV</p>
            <p  className='text-5xl'>
           
           
             Book <span className='text-customColorA'>EventServ</span> <br></br>For Your Dream Event
            </p>
            <button className='bg-customColorA font-serif text-black w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Book Now</button>
            </div>
           
          <img className='w-[500px] mx-auto my-4' src={hero} alt='/' />
          
        </div>
      </div>
    );
  };
  

export default Blog;