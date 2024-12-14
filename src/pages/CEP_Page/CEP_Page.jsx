import React, { useEffect, useState } from 'react'
import CEP_Content from "./CEP_Content";
import CEP_FAQs from "./CEP_FAQs";
import CEP_Features from "./CEP_Features";
import CEP_ImportantLinks from "./CEP_ImportantLinks";
import CourseDisplaySection from '../../components/CourseDisplaySection';

const backend = import.meta.env.VITE_BACKEND_HOST;


function CEP_Page() {

  const [previousCourses, setPreviousCourses] = useState([]);
  const [upcomingCourses, setupcomingCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    // function defination to get the courses form backend
  
    async function fetchCourses() {
      try {
        const response = await fetch(`${backend}/course/CEP`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Data fetching Succesfully", data);
          setSuccessMessage(data.message);
          const tempUpcomingCourses = []
          const tempPreviousCourses = []
          data?.data?.forEach((course)=>{
            if(course.status === "upcoming"){
              tempUpcomingCourses.push(course)
            }
            else if(course.status === 'previous'){
              tempPreviousCourses.push(course)
            }
          })


          setupcomingCourses(tempUpcomingCourses);
          setPreviousCourses(tempPreviousCourses);
          // console.log(This )
          return true;
          // localStorage.setItem('token', data.token); // Save token for authentication
        } else {
          const errorData = await response.json();
          console.log("failed to fetch data", errorData);
          setErrorMessage(errorData.message || "An error occurred");
          return false;
        }
      } catch (error) {
        console.log("Error in fetching courses: ", error.message);
      }
    }
    fetchCourses()
  }, []);
  return (
    <div>
    <CEP_Content />
    <CEP_Features />
    <CourseDisplaySection courses={upcomingCourses} sectionTitle='Upcoming CEP Courses' />
    <CEP_ImportantLinks />
    <CourseDisplaySection courses={previousCourses} sectionTitle='Previous CEP Courses' />
    <CEP_FAQs />
  </div>
  )
}

export default CEP_Page
