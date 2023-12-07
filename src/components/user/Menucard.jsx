import React from 'react';
import menu from '../../assets/menu.jpg';
import menu5 from '../../assets/menu5.jpg';
import menu6 from '../../assets/menu6.jpg';
import menu4 from '../../assets/menu4.jpg';
import { Link} from 'react-router-dom';
import {HiArrowSmRight } from "react-icons/hi";
const Menucard = () => {
    return (
        <div className='w-full  px-4  bg-white'>
        <div><h1 className='text-xl  text-center py-[15px] font-serif text-customColorA'>OUR MENU</h1>
        <h1 className='text-3xl mb-[70px] text-center '>Most Popular Food in the World</h1>
        
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-4 gap-8'>
            <div className='w-full shadow-xl bg-customColorD flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                   <img className='w-100 h-[250px]  bg-white' src={menu} alt="/" />
                   
                    <h2 className='text-2xl font-bold text-center font-serif py-4'>Main Course</h2>
                    
                   
                   
                    
                   <Link to={'/menu'}><button className='bg-customColorA w-[50px] rounded-lg  mx-24 '><HiArrowSmRight size={20}/></button></Link>
                </div>
                <div className='w-full shadow-xl bg-customColorD flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                   <img className='w-100 h-[250px] bg-white' src={menu5} alt="/" />
                   
                    <h2 className='text-2xl font-bold text-center font-serif py-4'>Starter</h2>
                    
                   
                   
                   <Link to={'/menu'}> <button className='bg-customColorA w-[50px] rounded-lg  mx-24 '><HiArrowSmRight size={20}/></button></Link>
                </div>
                <div className='w-full shadow-xl bg-customColorD flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                   <img className='w-100 h-[250px] bg-white' src={menu6} alt="/" />
                   
                    <h2 className='text-2xl font-bold text-center font-serif py-4'>Drinks</h2>
                    
                   
                   
                    
                   <Link to={'/menu'}><button className='bg-customColorA w-[50px] rounded-lg  mx-24 '><HiArrowSmRight size={20}/></button></Link>
                </div>
                <div className='w-full shadow-xl bg-customColorD flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                   <img className='w-100 h-[250px] bg-white' src={menu4} alt="/" />
                   
                    <h2 className='text-2xl font-bold text-center font-serif py-4'>Our Specials</h2>
                    
                   
                   
                   
                    <Link to={'/menu'}> <button className='bg-customColorA w-[50px] rounded-lg  mx-24 '><HiArrowSmRight size={20}/></button></Link>
                </div>
               
            </div>
        </div>
        </div>
    );
};

export default Menucard;