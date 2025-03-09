import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const backend = import.meta.env.VITE_BACKEND_HOST;

const EditCourseForm = () => {
  const { courseId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    mode: "Online",
    status: "upcoming",
    programName: "",
    courseCode: "",
    description: "",
    image: null, // For new uploads
    imageAlt: "",
    faculties: [""],
    eligibility: [""],
    startDate: "",
    endDate: "",
    paymentInstructions: "",
    paymentLinks: [{ linkName: "", linkDescription: "", href: "" }],
    brocherLink: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch course data when component mounts
  useEffect(() => {
    if (courseId) {
      fetch(`${backend}/course/single/${courseId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            data = data?.data;
            // Populate fields for editing
            setFormData({
              ...data,
              faculties: data.faculties || [""],
              eligibility: data.eligibility || [""],
              paymentLinks: data.paymentLinks || [
                { linkName: "", linkDescription: "", href: "" },
              ],
              startDate: new Date(data.startDate).toISOString().split("T")[0],
              endDate: new Date(data.endDate).toISOString().split("T")[0],
            });
          }
          else{
            alert("Failed to fetch course data: "+ data.message)
          }

          //   console.log("this is data: ", data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching course:", error);
          setLoading(false);
        });
    }
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedChange = (e, index, field, key) => {
    const updatedArray = [...formData[field]];
    updatedArray[index][key] = e.target.value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleArrayChange = (e, index, field) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = e.target.value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const addNestedField = (field, emptyObject) => {
    setFormData({ ...formData, [field]: [...formData[field], emptyObject] });
  };

  const removeNestedField = (field, index) => {
    const updatedArray = [...formData[field]];
    updatedArray.splice(index, 1);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (let key in formData) {
      if (key === "image" && formData[key]) {
        formDataToSend.append(key, formData[key]);
      } else if (Array.isArray(formData[key])) {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    fetch(`${backend}/course/edit/${courseId}`, {
      method: "PUT",
      body: formDataToSend,
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.data){
          alert("Course updated successfully!");
        }
        else{
          alert("Failed to edit course: " + data.message)
        }
      })
      .catch((error) => console.error("Error updating course:", error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="bg-white text-gray-800 pt-28 flex flex-col gap-4 px-4"
    >
      <label>
        Course Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mx-2 bg-white p-2 border rounded-md"
        />
      </label>

      <label>
        Mode:
        <select name="mode" value={formData.mode} onChange={handleChange} className="mx-2 bg-white p-2 border rounded-md">
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </label>

      <label>
        Status:
        <select name="status" value={formData.status} onChange={handleChange} className="mx-2 bg-white p-2 border rounded-md">
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="previous">Previous</option>
        </select>
      </label>

      <label>
        Program Name:
        <input
          type="text"
          name="programName"
          value={formData.programName}
          onChange={handleChange}
          required
          className="mx-2 bg-white p-2 border rounded-md"
        />
      </label>

      <label>
        Course Code:
        <input
          type="text"
          name="courseCode"
          value={formData.courseCode}
          onChange={handleChange}
          required
          className="mx-2 bg-white p-2 border rounded-md"
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className=" mt-2 bg-white p-2 border rounded-md w-full"
        />
      </label>

      <label>
        Image (Optional):
        <input type="file" accept="image/*" onChange={handleFileChange} className="mx-2 bg-white p-2 border rounded-md" />
      </label>

      <label>
        Image Alt Text:
        <input
          type="text"
          name="imageAlt"
          value={formData.imageAlt}
          className="mx-2 bg-white p-2 border rounded-md"
          onChange={handleChange}
        />
      </label>

      <label>
        Faculties:
        {formData.faculties.map((faculty, index) => (
          <div key={index} className="mt-2">
            <input
              type="text"
              value={faculty}
              className=" bg-white p-2 border rounded-md"
              onChange={(e) => handleArrayChange(e, index, "faculties")}
            />
            <button
              type="button"
               className="bg-red-400 p-2 border rounded-md mx-2"
              onClick={() => removeNestedField("faculties", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addNestedField("faculties", "")}  className="bg-blue-400 mt-2 p-2 border rounded-md">
          Add Faculty
        </button>
      </label>

      <label>
        Eligibility:
        {formData.eligibility.map((eligibility, index) => (
          <div key={index}>
            <input
              type="text"
              className="mt-2 bg-white p-2 border rounded-md"
              value={eligibility}
              onChange={(e) => handleArrayChange(e, index, "eligibility")}
            />
            <button
              type="button"
               className="bg-red-400 mx-2 p-2 border rounded-md"
              onClick={() => removeNestedField("eligibility", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addNestedField("eligibility", "") }  className="bg-blue-400 mt-2 p-2 border rounded-md">
          Add Eligibility
        </button>
      </label>

      <label>
        Payment Instructions:
        <textarea
          name="paymentInstructions"
          value={formData.paymentInstructions}
          onChange={handleChange}
          required
          className="mt-2 bg-white p-2 border rounded-md w-full"
        />
      </label>

      <label>
        Payment Links:
        {formData.paymentLinks.map((link, index) => (
          <div key={index} className="mt-2">
            <input
              type="text"
              placeholder="Link Name"
              value={link.linkName}
              onChange={(e) =>
                handleNestedChange(e, index, "paymentLinks", "linkName")
              }
              required
              className=" bg-white p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Link Description"
              className="mx-2 bg-white p-2 border rounded-md"
              value={link.linkDescription}
              onChange={(e) =>
                handleNestedChange(e, index, "paymentLinks", "linkDescription")
              }
              required
            />
            <input
              type="url"
              placeholder="Link URL"
              className="mx-2 bg-white p-2 border rounded-md"
              value={link.href}
              onChange={(e) =>
                handleNestedChange(e, index, "paymentLinks", "href")
              }
              required
            />
            <button
              type="button"
              className="bg-red-400 p-2 border rounded-md"
              onClick={() => removeNestedField("paymentLinks", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
           className="bg-blue-400 mt-2 p-2 border rounded-md"
          onClick={() =>
            addNestedField("paymentLinks", {
              linkName: "",
              linkDescription: "",
              href: "",
            })
          }
        >
          Add Payment Link
        </button>
      </label>

      <label>
        Brochure Link:
        <input
          type="url"
          name="brocherLink"
          className="mx-2 bg-white p-2 border rounded-md"
          value={formData.brocherLink}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Start Date:
        <input
          type="date"
          name="startDate"
          className="mx-2 bg-white p-2 border rounded-md"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        End Date:
        <input
          type="date"
          name="endDate"
          className="mx-2 bg-white p-2 border rounded-md"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
      </label>
          <div className="mb-2">

      <button type="submit"  className="bg-green-400 p-2 border rounded-md">Update Course</button>
          </div>
    </form>
  );
};

export default EditCourseForm;
