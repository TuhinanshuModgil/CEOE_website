import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import Layout from './Layout.jsx'
import { 
  AboutUs, 
  FAQ, 
  Hero,
  OurTeam, 
  Services, 
  UpcomingCourses 
} from "./pages/Home";
import { 
  CEP_Content, 
  CEP_FAQs, 
  CEP_Features, 
  CEP_ImportantLinks, 
  CEP_PreviousCourses, 
  CEP_UpcomingCourses 
} from "./pages/CEP_Page";
import {
  QIP_FAQs,
  QIP_Features,
  QIP_ImportantLinks,
  QIP_PreviousCourses,
  QIP_UpcomingCourses,
  QIP_content
} from "./pages/QIP_Page/index.js";
import { 
  Exec_Training_Content,
  Exec_Training_FAQs,
  Exec_Training_Features,
  Exec_Training_ImportantLinks,
  Exec_Training_PreviousCourses,
  Exec_Training_UpcomingCourses
 } from "./pages/Exec_Training_Page";
import CertificateForm from './pages/Certificate/CertificateForm.jsx'
import ContactUs from './pages/ContactUs/ContactUs.jsx'
import Announcements from './pages/Home/Announcements.jsx'
import Registration from './pages/Authentication/Registration.jsx'
import CourseDetails from './pages/CourseDetails/CourseDetails.jsx'
import { AuthContextProvider } from './context/authContext.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "",
        element: <div>
          <Hero />
          <AboutUs />
          <Services />
          <Announcements/>
          {/* <UpcomingCourses /> */}
          <OurTeam />
          <FAQ />
        </div>
      },
      {
        path: "/CEP",
        element: <div>
          <CEP_Content />
          <CEP_Features />
          <CEP_UpcomingCourses />
          <CEP_ImportantLinks />
          <CEP_PreviousCourses />
          <CEP_FAQs />
        </div>
      },
      {
        path: "/QIP",
        element: <div>
          <QIP_content />
          <QIP_Features />
          {/* <QIP_UpcomingCourses /> */}
          {/* <QIP_ImportantLinks /> */}
          {/* <QIP_PreviousCourses /> */}
          <QIP_FAQs />
        </div>
      },
      {
        path: "/Exec_Training",
        element: <div>
          <Exec_Training_Content />
          <Exec_Training_Features />
          <Exec_Training_UpcomingCourses />
          <Exec_Training_ImportantLinks />
          <Exec_Training_PreviousCourses />
          <Exec_Training_FAQs />
        </div>
      },
      {
        path: "/certificate",
        element: <CertificateForm/>
      },
      {
        path: "/contactus",
        element: <ContactUs/>
      },
      {
        path: "/register",
        element: <Registration/>
      } ,
      {
        path: "/course/:id",
        element: <CourseDetails/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>,
)
