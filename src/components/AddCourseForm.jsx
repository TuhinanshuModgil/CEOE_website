import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const backend = import.meta.env.VITE_BACKEND_HOST;

const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mode: "Online",
    status: "upcoming",
    programName: "",
    courseCode: "",
    description: "",
    image: null,
    imageAlt: "",
    faculties: [""],
    eligibility: [""],
    startDate: "",
    endDate: "",
    paymentInstructions: "",
    paymentLinks: [{ linkName: "", linkDescription: "", href: "" }],
    brocherLink: "",
  });


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

    fetch(`${backend}/course/add`, {
      method:"POST",
      credentials: "include", 
      body: formDataToSend,
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.data) {
          alert(
            "Course added successfully!"
            );

          // reset form when course is added successfully 
          setFormData({
            name: "",
            mode: "Online",
            status: "upcoming",
            programName: "",
            courseCode: "",
            description: "",
            image: null,
            imageAlt: "",
            faculties: [""],
            eligibility: [""],
            startDate: "",
            endDate: "",
            paymentInstructions: "",
            paymentLinks: [{ linkName: "", linkDescription: "", href: "" }],
            brocherLink: "",
          })

        }
        else{
          alert("Failed to add course: "+ data.message)
        }
        
      })
      .catch((error) => console.error("Error submitting form:", error));
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white text-gray-800 pt-28 flex flex-col gap-4 px-4 py-2">
      <label>
        Course Name:
        <input type="text" name="name" className="bg-white p-2 border rounded-md  ml-2" value={formData.name} onChange={handleChange} required  />
      </label>

      <label>
        Mode:
        <select name="mode" value={formData.mode} onChange={handleChange} className="bg-white p-2 border rounded-md  ml-2">
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </label>

      <label>
        Status:
        <select name="status" value={formData.status} onChange={handleChange} className="bg-white p-2 border rounded-md  ml-2">
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="previous">Previous</option>
        </select>
      </label>

      <label>
        Program Name:
        <input type="text" name="programName" value={formData.programName} onChange={handleChange} required className="bg-white p-2 border rounded-md  ml-2"/>
      </label>

      <label>
        Course Code:
        <input type="text" name="courseCode" value={formData.courseCode} onChange={handleChange} required className="bg-white p-2 border rounded-md  ml-2" />
      </label>

      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} required   className="bg-white p-2 border rounded-md  ml-2"/>
      </label>

      <label>
        Image (Optional):
        <input type="file" accept="image/*" onChange={handleFileChange}   className="bg-white p-2 border rounded-md  ml-2"/>
      </label>

      <label>
        Image Alt Text:
        <input type="text" name="imageAlt" value={formData.imageAlt} onChange={handleChange}  className="bg-white p-2 border rounded-md  ml-2" />
      </label>

      <label>
        Faculties:
        {formData.faculties.map((faculty, index) => (
          <div key={index}>
            <input
              type="text"
              value={faculty}
              onChange={(e) => handleArrayChange(e, index, "faculties")} className="bg-white p-2 border rounded-md "
            />
            <button type="button" onClick={() => removeNestedField("faculties", index)} className="bg-red-400 p-1 border rounded-md ml-2">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addNestedField("faculties", "")} className="bg-green-300 p-1 border rounded-md mt-2">
          Add Faculty
        </button>
      </label>

      <label>
        Eligibility:
        {formData.eligibility.map((eligibility, index) => (
          <div key={index}>
            <input
              type="text"
              value={eligibility}
              onChange={(e) => handleArrayChange(e, index, "eligibility")} className="bg-white p-2 border rounded-md  ml-2"
            />
            <button type="button" onClick={() => removeNestedField("eligibility", index)} className="bg-red-400 p-1 border rounded-md ml-2">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addNestedField("eligibility", "")} className="bg-green-300 p-1 border rounded-md mt-2">
          Add Eligibility 
        </button>
      </label>

      <label>
        Payment Instructions:
        <textarea
          name="paymentInstructions"
          value={formData.paymentInstructions}
          onChange={handleChange}
          required className="bg-white p-2 border rounded-md  ml-2"
        />
      </label>

      <label>
        Payment Links:
        {formData.paymentLinks.map((link, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Link Name"
              value={link.linkName}
              onChange={(e) => handleNestedChange(e, index, "paymentLinks", "linkName")}
              required className="bg-white p-2 border rounded-md  ml-2"
            />
            <input
              type="text"
              placeholder="Link Description"
              value={link.linkDescription}
              onChange={(e) => handleNestedChange(e, index, "paymentLinks", "linkDescription")}
              required className="bg-white p-2 border rounded-md  ml-2"
            />
            <input
              type="url"
              placeholder="Link URL"
              value={link.href}
              onChange={(e) => handleNestedChange(e, index, "paymentLinks", "href")}
              required className="bg-white p-2 border rounded-md  ml-2"
            />
            <button type="button" onClick={() => removeNestedField("paymentLinks", index)} className="bg-red-400 p-1 border rounded-md ml-2">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addNestedField("paymentLinks", { linkName: "", linkDescription: "", href: "" })} className="bg-green-300 p-1 border rounded-md mt-2">
          Add Payment Link
        </button>
      </label>

      <label>
        Brochure Link:
        <input
          type="url"
          name="brocherLink"
          value={formData.brocherLink}
          onChange={handleChange}
          required className="bg-white p-2 border rounded-md  ml-2"
        />
      </label>

      <label>
        Start Date:
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required  className="bg-white p-2 border rounded-md  ml-2"/>
      </label>

      <label>
        End Date:
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required  className="bg-white p-2 border rounded-md  ml-2"/>
      </label>
        <div >

        <button  type="submit" className="bg-purple-400 p-2 border border-gray-500 rounded-md ">Add Course</button>
        </div>
    </form>
  );
};

export default AddCourseForm;
