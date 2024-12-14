import React, { useEffect, useState } from 'react'
import Exec_Training_Content from "./Exec_Training_Content";
import Exec_Training_FAQs from "./Exec_Training_FAQs";
import Exec_Training_Features from "./Exec_Training_Features";
import Exec_Training_ImportantLinks from "./Exec_Training_ImportantLinks";
import Exec_Training_PreviousCourses from "./Exec_Training_PreviousCourses";
import Exec_Training_UpcomingCourses from "./Exec_Training_UpcomingCourses";
import CourseDisplaySection from '../../components/CourseDisplaySection';

const backend = import.meta.env.VITE_BACKEND_HOST;


function Exec_Training_Page() {
    const [previousCourses, setPreviousCourses] = useState([]);
    const [upcomingCourses, setupcomingCourses] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
  
  
    useEffect(() => {
      // function defination to get the courses form backend
    
      async function fetchCourses() {
        try {
          const response = await fetch(`${backend}/course/ETP`, {
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
          <Exec_Training_Content />
          <Exec_Training_Features />
          {/* <Exec_Training_UpcomingCourses /> */}
          <CourseDisplaySection courses={upcomingCourses} sectionTitle='Upcoming Executive Courses'/>
          <Exec_Training_ImportantLinks />
          <CourseDisplaySection courses={previousCourses} sectionTitle='Previous Executive Courses'/>
          {/* <Exec_Training_PreviousCourses /> */}
          <Exec_Training_FAQs />
        </div>
  )
}

export default Exec_Training_Page
