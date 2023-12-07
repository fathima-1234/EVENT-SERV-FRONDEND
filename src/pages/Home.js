import React from 'react'
import Navbar1 from '../components/user/Navbar1'
import Blog from '../components/user/Blog'
import Servicercard1 from '../components/user/Servicercard1'
import Menucard from '../components/user/Menucard'
import Footer from '../components/user/Footer'


function Home() {
  return (
   <>
   
   <Navbar1/>
   
   <Blog />
   
  
   <Servicercard1  />
   <Menucard/>
   <Footer/>

  
   </>
  )
}

export default Home