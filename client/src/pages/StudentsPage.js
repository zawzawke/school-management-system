import { useEffect, useState } from 'react';
import axios from 'axios';

function StudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/students/')
      .then(response => setStudents(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>{student.first_name} {student.last_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentsPage;
