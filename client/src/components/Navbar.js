// src/components/Navbar.jsx
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded hover:bg-blue-100 transition ${
      isActive ? 'bg-blue-600 text-white' : 'text-blue-700'
    }`;

  return (
    <nav className="bg-white shadow-md p-4 mb-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          SchoolSys
        </Link>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-blue-600 focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`md:flex space-x-4 ${isOpen ? 'block' : 'hidden'} md:block`}>
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/students" className={linkClass}>Students</NavLink>
          <NavLink to="/register-student" className={linkClass}>Add Student</NavLink>
          <NavLink to="/schools" className={linkClass}>Schools</NavLink>
          <NavLink to="/teachers" className={linkClass}>Teachers</NavLink>
          <NavLink to="/courses" className={linkClass}>Courses</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;