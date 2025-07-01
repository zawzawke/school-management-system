// src/components/TeacherAssignmentForm.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherAssignmentForm = () => {
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teacherId, setTeacherId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/teachers/')
      .then(res => setTeachers(res.data))
      .catch(err => console.error(err));

    axios.get('http://127.0.0.1:5000/courses/')
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/assignments/', {
      teacher_id: teacherId,
      course_id: courseId
    })
    .then(res => setMessage('Assignment successful!'))
    .catch(err => {
      console.error(err);
      setMessage('Error assigning teacher.');
    });
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Assign Course to Teacher</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Select Teacher:</label>
          <select value={teacherId} onChange={e => setTeacherId(e.target.value)} className="w-full border rounded p-2">
            <option value="">-- Choose --</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.first_name} {teacher.last_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block">Select Course:</label>
          <select value={courseId} onChange={e => setCourseId(e.target.value)} className="w-full border rounded p-2">
            <option value="">-- Choose --</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Assign</button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default TeacherAssignmentForm;