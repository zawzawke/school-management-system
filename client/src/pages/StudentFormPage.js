import { useState } from 'react';

function StudentFormPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    class_level: '',
    admission_number: '',
    school_id: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/students/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    alert('Student registered!');
    console.log(data);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Register Student</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(formData).map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.replace('_', ' ')}
            value={formData[field]}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        ))}
        <button type="submit" className="col-span-full bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default StudentFormPage;