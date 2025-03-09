import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const backend = import.meta.env.VITE_BACKEND_HOST;

const EditProgramForm = ({ programId = "" }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    featuresDescription: "",
    features: [{ featureTitle: "", featureDescription: "" }],
    name: "",
    importantLinks: [{ linkName: "", linkDescription: "", href: "" }],
    description: "",
    faqs: [{ question: "", answer: "" }],
  });

  // Fetch the program data to prefill the form
  useEffect(() => {
    fetch(`${backend}/program/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if(data.data){
          console.log("This is data: ", data)
          setFormData(data.data);
          
        }
        else{
          console.log("This is data: ", data)
          alert("Failed to get program: "+ data.message)
        }
      })
      .catch((error) => console.error("Error fetching program data:", error));
  }, [programId]);

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle nested array fields dynamically
  const handleNestedChange = (e, index, field, key) => {
    const updatedArray = [...formData[field]];
    updatedArray[index][key] = e.target.value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  // Add a new feature/faq/link
  const addNestedField = (field) => {
    const newItem =
      field === "features"
        ? { featureTitle: "", featureDescription: "" }
        : field === "faqs"
        ? { question: "", answer: "" }
        : { linkName: "", linkDescription: "", href: "" };
    setFormData({ ...formData, [field]: [...formData[field], newItem] });
  };

  const removeNestedFeature = (field, index) => {
    console.log("Field and Index: ", index, field);
    const data = formData[field];
    let modifiedData = data?.filter((elem, i) => index !== i);
    console.log("modifiedData: ", modifiedData);
    if (modifiedData) {
      setFormData({ ...formData, [field]: modifiedData });
    }
  };

  // Submit the updated program
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${backend}/program/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.data){
          console.log("Program updated:", data)
        }
        else{
          alert("Failed to edit program:" + data.message)
        }
      })
      .catch((error) => console.error("Error updating program:", error));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-gray-800 pt-28 flex flex-col gap-4 px-4"
    >
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          className="mx-4 bg-white p-2 border rounded-md"
          onChange={handleChange}
        />
      </label>

      <label>
        Name:
        <input
          type="text"
          name="name"
          className="mx-4 bg-white p-2 border rounded-md"
          value={formData.name}
          onChange={handleChange}
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          className="min-h-32 w-full mt-2 bg-white p-2 border rounded-md"
          onChange={handleChange}
        />
      </label>

      <h3>Features:</h3>
      {formData.features.map((feature, index) => (
        <div key={index}>
          <label>
            Feature Title:
            <input
              type="text"
              className="mx-4 bg-white p-2 border rounded-md"
              value={feature.featureTitle}
              onChange={(e) =>
                handleNestedChange(e, index, "features", "featureTitle")
              }
            />
          </label>
          <label>
            Feature Description:
            <input
              className="mx-4 bg-white p-2 border rounded-md"
              type="text"
              value={feature.featureDescription}
              onChange={(e) =>
                handleNestedChange(e, index, "features", "featureDescription")
              }
            />
          </label>
          <button
            type="button"
            onClick={() => removeNestedFeature("features", index)}
            className="border p-2 rounded-md  bg-red-400"
          >
            Remove
          </button>
        </div>
      ))}
      <div>
        <button
          type="button"
          onClick={() => addNestedField("features")}
          className="bg-blue-500 p-2 rounded-md "
        >
          Add Feature
        </button>
      </div>

      <h3>Important Links:</h3>
      {formData.importantLinks.map((link, index) => (
        <div key={index}>
          <label>
            Link Name:
            <input
              type="text"
              className="mx-4 bg-white p-2 border rounded-md"
              value={link.linkName}
              onChange={(e) =>
                handleNestedChange(e, index, "importantLinks", "linkName")
              }
            />
          </label>
          <label>
            Link Description:
            <input
              type="text"
              className="mx-4 bg-white p-2 border rounded-md"
              value={link.linkDescription}
              onChange={(e) =>
                handleNestedChange(
                  e,
                  index,
                  "importantLinks",
                  "linkDescription"
                )
              }
            />
          </label>
          <label>
            Href:
            <input
              type="text"
              className="mx-4 bg-white p-2 border rounded-md"
              value={link.href}
              onChange={(e) =>
                handleNestedChange(e, index, "importantLinks", "href")
              }
            />
          </label>
          <button
            type="button"
            onClick={() => removeNestedFeature("importantLinks", index)}
            className="border p-2 rounded-md  bg-red-400"
          >
            Remove
          </button>
        </div>
      ))}
      <div>
        <button
          className="bg-blue-500 p-2 rounded-md "
          type="button"
          onClick={() => addNestedField("importantLinks")}
        >
          Add Link
        </button>
      </div>
      <h3>FAQs:</h3>
      {formData.faqs.map((faq, index) => (
        <div key={index}>
          <label>
            Question:
            <input
              className="mx-4 bg-white p-2 border rounded-md"
              type="text"
              value={faq.question}
              onChange={(e) => handleNestedChange(e, index, "faqs", "question")}
            />
          </label>
          <label>
            Answer:
            <input
              type="text"
              className="mx-4 bg-white p-2 border rounded-md"
              value={faq.answer}
              onChange={(e) => handleNestedChange(e, index, "faqs", "answer")}
            />
          </label>
          <button
            type="button"
            onClick={() => removeNestedFeature("faqs", index)}
            className="border p-2 rounded-md  bg-red-400"
          >
            Remove
          </button>
        </div>
      ))}
      <div>
        <button
          className="bg-blue-500 p-2 rounded-md"
          type="button"
          onClick={() => addNestedField("faqs")}
        >
          Add FAQ
        </button>
      </div>
      <div className="">
        <button type="submit" className="bg-blue-500 p-2 rounded-md">
          Update Program
        </button>
      </div>
    </form>
  );
};

export default EditProgramForm;
