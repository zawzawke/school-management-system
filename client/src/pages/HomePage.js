import React from 'react';
import { Link } from 'react-router-dom';
import {
  School,
  Users,
  BookOpenText,
  LayoutDashboard,
  UserPlus,
  PlusCircle,
  Building2,
  FilePlus,
  Activity,
  ClipboardList
} from 'lucide-react';

function HomePage() {
  const cards = [
    {
      title: 'Students',
      description: 'Manage student information and enrollment.',
      link: '/students',
      icon: <Users className="w-6 h-6 text-blue-600" />,
    },
    {
      title: 'Teachers',
      description: 'View and assign teachers to subjects.',
      link: '/teachers',
      icon: <BookOpenText className="w-6 h-6 text-green-600" />,
    },
    {
      title: 'Schools',
      description: 'Register and manage schools.',
      link: '/schools',
      icon: <School className="w-6 h-6 text-purple-600" />,
    },
    {
      title: 'Courses',
      description: 'Create and manage courses offered.',
      link: '/courses',
      icon: <LayoutDashboard className="w-6 h-6 text-orange-600" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">Welcome to SchoolSys</h1>
      <p className="text-center text-gray-600 mb-10">Manage your entire school system in one place</p>

      {/* Main Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cards.map((card, index) => (
          <Link
            to={card.link}
            key={index}
            className="bg-white shadow rounded-xl p-6 hover:shadow-md transition"
          >
            <div className="flex items-center space-x-4 mb-4">
              {card.icon}
              <h2 className="text-xl font-semibold text-gray-800">{card.title}</h2>
            </div>
            <p className="text-gray-600">{card.description}</p>
          </Link>
        ))}
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <span className="text-sm text-gray-500">Total Students</span>
          <div className="text-2xl font-bold text-blue-600 mt-2">1,247</div>
          <div className="text-green-600 text-sm mt-1">+12% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <span className="text-sm text-gray-500">Active Teachers</span>
          <div className="text-2xl font-bold text-green-600 mt-2">89</div>
          <div className="text-green-600 text-sm mt-1">+5% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <span className="text-sm text-gray-500">Schools</span>
          <div className="text-2xl font-bold text-purple-600 mt-2">12</div>
          <div className="text-yellow-600 text-sm mt-1">0% change</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <span className="text-sm text-gray-500">Courses</span>
          <div className="text-2xl font-bold text-orange-600 mt-2">156</div>
          <div className="text-green-600 text-sm mt-1">+8% from last month</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/register-student" className="bg-blue-50 p-5 rounded-xl shadow hover:shadow-md">
            <div className="flex items-center mb-3 text-blue-600">
              <UserPlus className="mr-2" />
              <span className="font-semibold">Add New Student</span>
            </div>
            <p className="text-sm text-gray-600">Register a new student to the system.</p>
          </Link>
          <Link to="/teachers" className="bg-green-50 p-5 rounded-xl shadow hover:shadow-md">
            <div className="flex items-center mb-3 text-green-600">
              <PlusCircle className="mr-2" />
              <span className="font-semibold">Add Teacher</span>
            </div>
            <p className="text-sm text-gray-600">Onboard new teaching staff.</p>
          </Link>
          <Link to="/schools" className="bg-purple-50 p-5 rounded-xl shadow hover:shadow-md">
            <div className="flex items-center mb-3 text-purple-600">
              <Building2 className="mr-2" />
              <span className="font-semibold">Register School</span>
            </div>
            <p className="text-sm text-gray-600">Add a new school to the network.</p>
          </Link>
          <Link to="/courses" className="bg-orange-50 p-5 rounded-xl shadow hover:shadow-md">
            <div className="flex items-center mb-3 text-orange-600">
              <FilePlus className="mr-2" />
              <span className="font-semibold">Create Course</span>
            </div>
            <p className="text-sm text-gray-600">Set up new educational courses.</p>
          </Link>
        </div>
      </div>

      {/* Enrollment Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-bold mb-2 flex items-center text-blue-700">
            <Activity className="w-5 h-5 mr-2" /> Recent Enrollments
          </h3>
          <p className="text-3xl font-bold text-blue-600">24</p>
          <p className="text-gray-500">this week</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-bold mb-2 flex items-center text-yellow-700">
            <ClipboardList className="w-5 h-5 mr-2" /> Pending Applications
          </h3>
          <p className="text-3xl font-bold text-yellow-600">8</p>
          <p className="text-gray-500">awaiting review</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
