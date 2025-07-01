// src/pages/TeachersPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetchTeachers();
    fetchSchools();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/teachers/');
      setTeachers(res.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

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
      const newTeacher = {
        first_name: firstName,
        last_name: lastName,
        email,
        school_id: schoolId,
      };
      const res = await axios.post('http://127.0.0.1:5000/teachers/', newTeacher);
      setTeachers([...teachers, res.data]);
      setFirstName('');
      setLastName('');
      setEmail('');
      setSchoolId('');
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Register Teacher</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="block w-full p-2 border"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="block w-full p-2 border"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 border"
          required
        />
        <select
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
          className="block w-full p-2 border"
          required
        >
          <option value="">Select School</option>
          {schools.map((school) => (
            <option key={school.id} value={school.id}>{school.name}</option>
          ))}
        </select>
        <button type="submit" className="bg-green-600 text-white px-4 py-2">Add Teacher</button>
      </form>

      <h3 className="text-lg font-semibold">All Teachers</h3>
      <ul className="list-disc ml-6">
        {teachers.map((t) => (
          <li key={t.id}>
            {t.first_name} {t.last_name} - {t.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeachersPage;
