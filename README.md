# School Management System

A full-stack web application to manage schools, students, teachers, courses, enrollments, fees, and more. Built with **Flask** (backend) and **React + TailwindCSS** (frontend).

## Features

- School registration
- Student and teacher management
- Course enrollment
- Fee structure & payments
- Teacher-course assignment
- Role-based authentication: Admin, Teacher, Student
- React frontend with TailwindCSS
- API powered by Flask & SQLAlchemy

## Tech Stack
| Layer      | Tech                          |
|------------|-------------------------------|
| Frontend   | React, TailwindCSS            |
| Backend    | Flask, Flask-RESTful          |
| Database   | SQLAlchemy + SQLite/PostgreSQL|
| Auth       | Flask-Login or JWT (WIP)      |
| Styling    | TailwindCSS                   |
| Faker      | For seed data                 |

## Setup Instructions
### 1.Clone the repo
git clone https://github.com/your-username/school-management-system
cd school-management-system

### 2.Backend Setup(flask)
cd server
pipenv install
pipenv shell
flask db upgrade
python seed.py
flask run

### 3.Frontend Setup(React + Tailwindcss)
cd client
npm install
npm run dev   # or npm start (if CRA)

## Project Structure
school-management-system/
│
├── client/             # React frontend
│   ├── src/
│   └── tailwind.config.js
│
├── server/             # Flask backend
│   ├── models/
│   ├── routes/
│   ├── app.py
│   └── seed.py
│
├── README.md
└── ...

## Notes
-Run python seed.py anytime you want to reset & seed the database.
-TailwindCSS is fully configured.
-Role-based access is still expanding.

## Author
Made with ❤️ by Paul Simiyu