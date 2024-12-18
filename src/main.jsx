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
import {
  QIP_FAQs,
  QIP_Features,
  QIP_ImportantLinks,
  QIP_PreviousCourses,
  QIP_UpcomingCourses,
  QIP_content,
} from "./pages/QIP_Page/index.js";
import CertificateForm from "./pages/Certificate/CertificateForm.jsx";
import ContactUs from "./pages/ContactUs/ContactUs.jsx";
import Announcements from "./pages/Home/Announcements.jsx";
import Registration from "./pages/Authentication/Registration.jsx";
import CourseDetails from "./pages/CourseDetails/CourseDetails.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import CourseForm from "./components/CourseForm.jsx";
import CEP_Page from "./pages/CEP_Page/CEP_Page.jsx";
import Exec_Training_Page from "./pages/Exec_Training_Page/Exec_Training_Page.jsx";
import Program_Page from "./pages/Program_Page/Program_Page.jsx";
import EditProgramForm from "./components/EditProgramForm.jsx";
import AddProgramForm from "./components/AddProgramForn.jsx";

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
        path: "/CEP",
        element: <CEP_Page />,
      },
      {
        path: "/QIP",
        element: (
          <div>
            <QIP_content />
            <QIP_Features />
            {/* <QIP_UpcomingCourses /> */}
            {/* <QIP_ImportantLinks /> */}
            {/* <QIP_PreviousCourses /> */}
            <QIP_FAQs />
          </div>
        ),
      },
      {
        path: "/Exec_Training",
        element: <Exec_Training_Page />,
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
        path: "/courseForm",
        element: <CourseForm />,
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
