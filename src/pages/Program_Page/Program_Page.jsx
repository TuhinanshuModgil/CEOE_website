import React, { useEffect, useState } from "react";
import CEP_Content from "./CEP_Content";
import CEP_FAQs from "./CEP_FAQs";
import CEP_Features from "./CEP_Features";
import CEP_ImportantLinks from "./CEP_ImportantLinks";
import CourseDisplaySection from "../../components/CourseDisplaySection";
import { useParams } from "react-router-dom";

const backend = import.meta.env.VITE_BACKEND_HOST;

async function fetchProgram(programName) {
  try {
    const response = await fetch(`${backend}/program/${programName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Program Data Fetched", data);
      return data;
      // localStorage.setItem('token', data.token); // Save token for authentication
    } else {
      const errorData = await response.json();
      console.log("failed to fetch data", errorData);
      setErrorMessage(errorData.message || "An error occurred");
      return errorData;
    }
  } catch (error) {
    console.log(
      "Erro while fetching programe ",
      programName,
      " ",
      error.message
    );
    throw new Error("Failed to get program");
  }
}

function Program_Page() {
  const { id } = useParams();

  const [previousCourses, setPreviousCourses] = useState([]);
  const [upcomingCourses, setupcomingCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [programData, setProgramData] = useState("");

  useEffect(() => {
    // function defination to get the courses form backend

    async function fetchCourses(programId) {
      try {
        const response = await fetch(`${backend}/course/${programId}`, {
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
          const tempUpcomingCourses = [];
          const tempPreviousCourses = [];
          data?.data?.forEach((course) => {
            if (course.status === "upcoming") {
              tempUpcomingCourses.push(course);
            } else if (course.status === "previous") {
              tempPreviousCourses.push(course);
            }
          });

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
    fetchProgram(id)
      .then((data) => {
        if (data?.data) {
          console.log("reached here: ", data.data);
          setProgramData(data.data || {});
        } else {
          setErrorMessage(data?.message || "Failed to load data");
        }
      })
      .catch((err) => console.log("Error in fetching program: ", err.message));
    fetchCourses(id);
  }, [id]);
  return (
    <div>
      <CEP_Content
        title={programData.title}
        description={programData.description}
      />
      {programData?.features?.length !== 0 ? (
        <CEP_Features
          title={programData.title}
          features={programData.features}
          featureDescription={programData.featuresDescription}
        />
      ) : (
        <></>
      )}
      {upcomingCourses?.length !== 0 ? (
        <CourseDisplaySection
          courses={upcomingCourses}
          sectionTitle="Upcoming CEP Courses"
        />
      ) : (
        <></>
      )}

      {programData?.importantLinks?.length !== 0 ? (
        <CEP_ImportantLinks
          importantLinks={programData?.importantLinks ?? []}
        />
      ) : (
        <></>
      )}
      {previousCourses?.length !== 0 ? (
        <CourseDisplaySection
          courses={previousCourses}
          sectionTitle="Previous CEP Courses"
        />
      ) : (
        <></>
      )}

      {programData?.faqs?.length !== 0 ? (
        <CEP_FAQs faqs={programData?.faqs ?? []} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Program_Page;
