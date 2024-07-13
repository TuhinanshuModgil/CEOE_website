import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/functional/ScrollToTo'

function Layout() {
  return (
    <>
    <Navbar/>
    <ScrollToTop/>
    <Outlet />
    <Footer/>
    </>
  )
}

export default Layout