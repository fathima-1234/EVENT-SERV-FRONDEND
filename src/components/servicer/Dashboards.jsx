import React from 'react'
import Sidebar from './Sidebar.jsx'
import Banner from './Banner.jsx'

import { Toaster } from 'react-hot-toast'
import { useState } from 'react';
import instance from '../../utils/axios.js';
import { useEffect } from "react";
import { getServicerDataFromLocalStorage } from '../../utils/servicerutils.jsx';


export default function Dashboard() {
  const[events,setevents]=useState([]);
  const[servicer,setServicer]=useState([]);
 
  const { servicer_id, servicer_is_active } = getServicerDataFromLocalStorage();



 

  


  return (
    <>
    <Sidebar/>
   
    <Banner/>
       
        </>
  
  )
}