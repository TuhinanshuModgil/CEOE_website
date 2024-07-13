import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import Layout from './Layout.jsx'
import Hero from './pages/Home/Hero.jsx'
import AboutUs from './pages/Home/AboutUs.jsx'
import Services from './pages/Home/Services.jsx'
import UpcomingCourses from './pages/Home/UpcomingCourses.jsx'
import OurTeam from './pages/Home/OurTeam.jsx'
import FAQ from './pages/Home/FAQ.jsx'
import CEP_Content from './pages/CEP_Page/CEP_Content.jsx'
import CEP_Features from './pages/CEP_Page/CEP_Features.jsx'
import CEP_UpcomingCourses from './pages/CEP_Page/CEP_UpcomingCourses.jsx'
import CEP_ImportantLinks from './pages/CEP_Page/CEP_ImportantLinks.jsx'
import CEP_FAQs from './pages/CEP_Page/CEP_FAQs.jsx'
import CEP_PreviousCourses from './pages/CEP_Page/CEP_PreviousCourses.jsx'
import { 
  QIP_FAQs,
  QIP_Features,
  QIP_ImportantLinks,
  QIP_PreviousCourses,
  QIP_UpcomingCourses,
  QIP_content
 } from "./pages/QIP_Page/index.js";
import Exec_Training_Content from './pages/Exec_Training_Page/Exec_Training_Content.jsx'
import Exec_Training_Features from './pages/Exec_Training_Page/Exec_Training_Features.jsx'
import Exec_Training_UpcomingCourses from './pages/Exec_Training_Page/Exec_Training_UpcomingCourses.jsx'
import Exec_Training_ImportantLinks from './pages/Exec_Training_Page/Exec_Training_ImportantLinks.jsx'
import Exec_Training_FAQs from './pages/Exec_Training_Page/Exec_Training_FAQs.jsx'
import Exec_Training_PreviousCourses from './pages/Exec_Training_Page/Exec_Training_PreviousCourses.jsx'

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
          {/* <Footer/> */}
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
      },
      {
        path:"/QIP",
        element: <div>
          <QIP_content/>
          <QIP_Features/>
          <QIP_UpcomingCourses/>
          <QIP_ImportantLinks/>
          <QIP_PreviousCourses/>
          <QIP_FAQs/>
        </div>
      },
      {
        path:"/Exec_Training",
        element: <div>
          <Exec_Training_Content/>
          <Exec_Training_Features/>
          <Exec_Training_UpcomingCourses/>
          <Exec_Training_ImportantLinks/>
          <Exec_Training_PreviousCourses/>
          <Exec_Training_FAQs/>
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
