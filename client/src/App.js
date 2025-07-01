import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SchoolsPage from './pages/SchoolsPage';
import TeachersPage from './pages/TeachersPage';
import TeacherAssignmentForm from './components/TeacherAssignmentForm';
import CoursesPage from './pages/CoursesPage';
import FeeStructureFormPage from './pages/FeeStructureFormPage';
import StudentFeeStatusPage from './pages/StudentFeeStatusPage';
import StudentsPage from './pages/StudentsPage';
import StudentFormPage from './pages/StudentFormPage';
import StudentsListPage from './pages/StudentsListPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Router>
        <Navbar />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/register-student" element={<StudentFormPage />} />
            <Route path="/students-list" element={<StudentsListPage />} />
            <Route path="/schools" element={<SchoolsPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/assign-teacher" element={<TeacherAssignmentForm />} />
            <Route path="/fee-structure" element={<FeeStructureFormPage />} />
            <Route path="/students/:studentId/fee-status" element={<StudentFeeStatusPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
