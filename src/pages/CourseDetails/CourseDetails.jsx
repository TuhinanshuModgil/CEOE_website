import { useEffect, useState } from "react";
import {
  CheckIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import ImportantLinks from "../../components/ImportantLinks";

const backend = import.meta.env.VITE_BACKEND_HOST;

// const courseDetails = {
//   name: 'Course Title',
//   mode: 'Online',
//   href: '#',
//   courseCode: 'CBF1020',
//   description:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi earum unde est minima, similique voluptatum. Earum placeat, corporis vero quo hic obcaecati dolorem nulla at? Dicta, aperiam eligendi dolorum repudiandae consectetur magnam molestiae quia nemo accusantium eveniet cum deleniti distinctio. Ut eveniet quos officia minima culpa sed aliquid nam ex?",
//   imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-04-featured-product-shot.jpg',
//   imageAlt: 'Model wearing light green backpack with black canvas straps and front zipper pouch.',
//   faculties: ["Faculty 1", "Faculty 2"],
//   eligibility: [
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, molestias.",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. .",
//     "Lorem ipsum dolor sit amet  adipisicing elit. Quisquam, molestias.",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, molestias.",
//   ],
//   startDate: "29/10/2024",
//   endDate: "31/12/2024",
//   paymentInstructions: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum corporis, totam, consectetur mollitia autem sunt dicta similique at qui omnis consequatur blanditiis temporibus esse rem, incidunt laudantium laboriosam maxime neque.",
//   paymentLinks: [
//     { linkTitle: 'Payment Brocher', linkDescription: 'djsja dsjkajda djajd dadasdsj djajd adjdsj djs jsadas djsadsj', href: '#' },
//     { linkTitle: 'SBI Collect Link', linkDescription: 'djsja dsjkajda djajd dadasdsj djajd adjdsj djs jsadas djsadsj', href: '#' },

//   ],
//   brocherLink: 'https://google.com'
// }
const reviews = { average: 4, totalCount: 1624 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CourseDetails() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [courseDetails, setCourseDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${backend}/course/single/${id}`, {
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

          setCourseDetails({
            ...data?.data,
            startDate: new Date(data?.data?.startDate).toISOString().split("T")[0],
            endDate: new Date(data?.data?.endDate).toISOString().split("T")[0],
          });

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
    fetchCourses();
  }, []);
  //   const [selectedSize, setSelectedSize] = useState(courseDetails.sizes[0])

  return (
    <div className="bg-white mt-16">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          {/* <nav aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
              {product.breadcrumbs.map((breadcrumb, breadcrumbIdx) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center text-sm">
                    <a href={breadcrumb.href} className="font-medium text-gray-500 hover:text-gray-900">
                      {breadcrumb.name}
                    </a>
                    {breadcrumbIdx !== product.breadcrumbs.length - 1 ? (
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="ml-2 size-5 shrink-0 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </nav> */}

          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {courseDetails.name}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Course Information
            </h2>

            <div className="flex items-center">
              <p className="text-gray-700 ">
                {" "}
                <span className="text-gray-600">Course Code: </span>{" "}
                {courseDetails.courseCode}
              </p>

              <div className="ml-4 border-l border-gray-300 pl-4">
                <h2 className="sr-only">Mode</h2>
                <div className="flex items-center">
                  <span className="text-gray-600">
                    Mode: {courseDetails.mode}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-600">
                {courseDetails.description}
              </p>
              <h3 className="text-gray-600">
                <span className="font-semibold text-gray-600">
                  {" "}
                  Faculties:{" "}
                </span>{" "}
                {courseDetails?.faculties?.join(", ")}
              </h3>
            </div>

            <div className="mt-4 text-base text-gray-500">
              <h3>
                <span className="font-semibold text-gray-600">
                  Start Date:{" "}
                </span>
                {courseDetails?.startDate ?? "-"}
              </h3>
              <h3>
                <span className="font-semibold text-gray-600">End Date: </span>
                {courseDetails?.endDate ?? "-"}
              </h3>
            </div>
            <div className="mt-6 text-base text-gray-500">
              <h3 className="font-semibold text-gray-800 text-lg">
                Eligibility{" "}
              </h3>
              <ul className="list-disc">
                {courseDetails?.eligibility?.map((element, idx) => (
                  <li className="" key={idx}>
                    {element}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* courseDetails image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <img
            alt={courseDetails.imageAlt}
            src={courseDetails?.image?.data}
            className="aspect-square w-full rounded-lg object-cover"
          />
        </div>

        {courseDetails.brocherLink ? (
          <a
            href={courseDetails.brocherLink}
            target="_blank"
            className="text-blue-500 underline mt-4"
          >
            Downlaod Brocher
          </a>
        ) : (
          <></>
        )}
        {/* courseDetails form */}
      </div>

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 border-t">
        <div className="mt-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Payment Instructions
          </h1>
        </div>

        <section aria-labelledby="information-heading" className="mt-4">
          <h2 id="information-heading" className="sr-only">
            Payment Instructions
          </h2>

          <div className="mt-4 space-y-6">
            <p className="text-base text-gray-600">
              {courseDetails?.paymentInstructions}
            </p>
          </div>

          {/* <div className='mt-4 text-base text-gray-500'>
                <h3><span className='font-semibold text-gray-600'>Start Date: </span>{courseDetails?.startDate?? "-"}</h3>
                <h3><span className='font-semibold text-gray-600'>End Date: </span>{courseDetails?.startDate?? "-"}</h3>
            </div> */}

          <ImportantLinks importantLinks={courseDetails?.paymentLinks ?? []} />
        </section>
      </div>
    </div>
  );
}
