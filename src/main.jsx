import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import Layout from './Layout.jsx'
import Hero from './components/Hero.jsx'
import AboutUs from './components/AboutUs.jsx'
import Services from './components/Services.jsx'
import Footer from './components/Footer.jsx'
import UpcomingCourses from './components/UpcomingCourses.jsx'
import OurTeam from './components/OurTeam.jsx'
import FAQ from './components/FAQ.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children:[
      {
        path:"",
        element: <div>
          <Hero/>
          <AboutUs/>
          <Services/>
          <UpcomingCourses/>
          <OurTeam/>
          <FAQ/>
          <Footer/>
        </div>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
