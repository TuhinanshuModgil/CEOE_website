import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Layout from "./Layout.jsx";
import {
  AboutUs,
  FAQ,
  Hero,
  OurTeam,
  Services,
  UpcomingCourses,
} from "./pages/Home";

import CertificateForm from "./pages/Certificate/CertificateForm.jsx";
import ContactUs from "./pages/ContactUs/ContactUs.jsx";
import Announcements from "./pages/Home/Announcements.jsx";
import Registration from "./pages/Authentication/Registration.jsx";
import CourseDetails from "./pages/CourseDetails/CourseDetails.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
// import CourseForm from "./components/CourseForm.jsx";
import Program_Page from "./pages/Program_Page/Program_Page.jsx";
import EditProgramForm from "./components/EditProgramForm.jsx";
import AddProgramForm from "./components/AddProgramForn.jsx";
import EditCourseForm from "./components/EditCourseForm.jsx";
import AddCourseForm from "./components/AddCourseForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <div>
            <Hero />
            <AboutUs />
            <Services />
            <Announcements />
            {/* <UpcomingCourses /> */}
            <OurTeam />
            <FAQ />
          </div>
        ),
      },
      {
        path: "/program/:id",
        element: <Program_Page />,
      },
      {
        path: "/certificate",
        element: <CertificateForm />,
      },
      {
        path: "/contactus",
        element: <ContactUs />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/course/:id",
        element: <CourseDetails />,
      },
      {
        path: "/courseEditForm/:courseId",
        element: <EditCourseForm/>,
      },
      {
        path: "/courseAddForm",
        element: <AddCourseForm/>,
      },
      {
        path: "/programEditForm/:id",
        element: <EditProgramForm />,
      },
      {
        path: "/programAddForm",
        element: <AddProgramForm/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
