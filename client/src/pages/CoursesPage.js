import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/courses/');
      setCourses(res.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCourse = {
        name: courseName,
        description,
      };
      const res = await axios.post('http://127.0.0.1:5000/courses/', newCourse);
      setCourses([...courses, res.data]);
      setCourseName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add Course</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="block w-full p-2 border"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full p-2 border"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Add Course</button>
      </form>

      <h3 className="text-lg font-semibold">All Courses</h3>
      <ul className="list-disc ml-6">
        {courses.map((c) => (
          <li key={c.id}>
            {c.name} - {c.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CoursesPage;
