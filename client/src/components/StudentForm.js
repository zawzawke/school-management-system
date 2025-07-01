// src/components/StudentForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function StudentForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    admission_number: '',
    class_level: '',
    school_id: '',
  });

  const [message, setMessage] = useState('');

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

async function handleSubmit(e) {
  e.preventDefault();
  try {
    await axios.post('http://127.0.0.1:5000/students/', formData);
    setMessage('Student registered successfully!');
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      admission_number: '',
      class_level: '',
      school_id: '',
    });
  } catch (error) {
    console.error(error);
    setMessage('Failed to register student.');
  }
}


  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Register New Student</h2>
      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" required className="border p-2 rounded" />
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" required className="border p-2 rounded" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="border p-2 rounded" />
        <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" required className="border p-2 rounded" />
        <input type="text" name="admission_number" value={formData.admission_number} onChange={handleChange} placeholder="Admission Number" required className="border p-2 rounded" />
        <input type="text" name="class_level" value={formData.class_level} onChange={handleChange} placeholder="Class Level" required className="border p-2 rounded" />
        <input type="number" name="school_id" value={formData.school_id} onChange={handleChange} placeholder="School ID" required className="border p-2 rounded" />

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
}

export default StudentForm;