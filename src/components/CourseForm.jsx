import React, { useState } from 'react';

const CourseForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mode: 'Online',
    courseCode: '',
    description: '',
    image: null, // For file input
    imageAlt: '',
    faculties: '',
    eligibility: '',
    startDate: '',
    endDate: '',
    paymentInstructions: '',
    paymentLinks: '',
    brocherLink: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const data = new FormData();
    data.append('name', formData.name);
    data.append('mode', formData.mode);
    data.append('courseCode', formData.courseCode);
    data.append('description', formData.description);
    data.append('image', formData.image); // File upload
    data.append('imageAlt', formData.imageAlt);
    data.append('faculties', JSON.stringify(formData.faculties.split(','))); // Split and store as JSON array
    data.append('eligibility', JSON.stringify(formData.eligibility.split(','))); // Split and store as JSON array
    data.append('startDate', formData.startDate);
    data.append('endDate', formData.endDate);
    data.append('paymentInstructions', formData.paymentInstructions);
    data.append('paymentLinks', formData.paymentLinks); // Placeholder, ideally parse JSON
    data.append('brocherLink', formData.brocherLink);

    try {
      const response = await fetch('http://your-backend-url.com/api/courses', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Course submitted successfully:', result);
        alert('Course submitted successfully!');
      } else {
        console.error('Error submitting course:', response.statusText);
        alert('Failed to submit course.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the course.');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-4 mt-20 space-y-4 bg-white text-gray-800">
      <div>
        <label className="block font-medium">Course Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Mode:</label>
        <select
          name="mode"
          value={formData.mode}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Course Code:</label>
        <input
          type="text"
          name="courseCode"
          value={formData.courseCode}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Image:</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Image Alt Text:</label>
        <input
          type="text"
          name="imageAlt"
          value={formData.imageAlt}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Faculties (comma-separated):</label>
        <input
          type="text"
          name="faculties"
          value={formData.faculties}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Eligibility (comma-separated):</label>
        <input
          type="text"
          name="eligibility"
          value={formData.eligibility}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Payment Instructions:</label>
        <textarea
          name="paymentInstructions"
          value={formData.paymentInstructions}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Brochure Link (Google Drive):</label>
        <input
          type="url"
          name="brocherLink"
          value={formData.brocherLink}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default CourseForm;
