// src/pages/SchoolsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SchoolsPage() {
  const [schools, setSchools] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/schools/');
      setSchools(res.data);
    } catch (error) {
      console.error('Error fetching schools:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSchool = { name, location };
      const res = await axios.post('http://127.0.0.1:5000/schools/', newSchool);
      setSchools([...schools, res.data]);
      setName('');
      setLocation('');
    } catch (error) {
      console.error('Error adding school:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Register School</h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="School Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="block border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Add School</button>
      </form>

      <h3 className="text-lg font-semibold">All Schools</h3>
      <ul className="list-disc ml-6">
        {schools.map((school) => (
          <li key={school.id}>{school.name} - {school.location}</li>
        ))}
      </ul>
    </div>
  );
}

export default SchoolsPage;
