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
        alert("Course updated successfully!");
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
        />
      </label>

      <label>
        Mode:
        <select name="mode" value={formData.mode} onChange={handleChange}>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </label>

      <label>
        Status:
        <select name="status" value={formData.status} onChange={handleChange}>
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
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Image (Optional):
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>

      <label>
        Image Alt Text:
        <input
          type="text"
          name="imageAlt"
          value={formData.imageAlt}
          onChange={handleChange}
        />
      </label>

      <label>
        Faculties:
        {formData.faculties.map((faculty, index) => (
          <div key={index}>
            <input
              type="text"
              value={faculty}
              onChange={(e) => handleArrayChange(e, index, "faculties")}
            />
            <button
              type="button"
              onClick={() => removeNestedField("faculties", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addNestedField("faculties", "")}>
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
              onChange={(e) => handleArrayChange(e, index, "eligibility")}
            />
            <button
              type="button"
              onClick={() => removeNestedField("eligibility", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addNestedField("eligibility", "")}>
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
              onChange={(e) =>
                handleNestedChange(e, index, "paymentLinks", "linkName")
              }
              required
            />
            <input
              type="text"
              placeholder="Link Description"
              value={link.linkDescription}
              onChange={(e) =>
                handleNestedChange(e, index, "paymentLinks", "linkDescription")
              }
              required
            />
            <input
              type="url"
              placeholder="Link URL"
              value={link.href}
              onChange={(e) =>
                handleNestedChange(e, index, "paymentLinks", "href")
              }
              required
            />
            <button
              type="button"
              onClick={() => removeNestedField("paymentLinks", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
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
          value={formData.endDate}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Update Course</button>
    </form>
  );
};

export default EditCourseForm;
