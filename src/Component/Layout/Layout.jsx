import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from '../Footer/Footer'

export default function Layout() {
  return (
    <div>
        <Navbar/>

        <div className="container mt-25">
            <Outlet/>
        </div>

        <Footer/>
      
    </div>
  )
}
