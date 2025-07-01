import { useEffect, useState } from 'react';
import axios from 'axios';

function StudentsListPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/students/')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">All Students</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-2">ID</th>
                <th className="p-2">First Name</th>
                <th className="p-2">Last Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Gender</th>
                <th className="p-2">Class</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id} className="border-t">
                  <td className="p-2">{student.id}</td>
                  <td className="p-2">{student.first_name}</td>
                  <td className="p-2">{student.last_name}</td>
                  <td className="p-2">{student.email}</td>
                  <td className="p-2">{student.gender}</td>
                  <td className="p-2">{student.class_level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentsListPage;