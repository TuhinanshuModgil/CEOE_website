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
import CEP_Content from './components/CEP_Page/CEP_Content.jsx'
import CEP_Features from './components/CEP_Page/CEP_Features.jsx'
import CEP_UpcomingCourses from './components/CEP_Page/CEP_UpcomingCourses.jsx'
import CEP_ImportantLinks from './components/CEP_Page/CEP_ImportantLinks.jsx'
import CEP_FAQs from './components/CEP_Page/CEP_FAQs.jsx'
import CEP_PreviousCourses from './components/CEP_Page/CEP_PreviousCourses.jsx'


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
      },
      {
        path:"/COE",
        element: <div>
          <CEP_Content/>
          <CEP_Features/>
          <CEP_UpcomingCourses/>
          <CEP_ImportantLinks/>
          <CEP_PreviousCourses/>
          <CEP_FAQs/>
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
