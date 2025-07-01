from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

db = SQLAlchemy()

# School
class School(db.Model, SerializerMixin):
    __tablename__ = 'schools'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    location = db.Column(db.String)

    students = db.relationship('Student', backref='school', lazy=True)
    teachers = db.relationship('Teacher', backref='school', lazy=True)
    courses = db.relationship('Course', backref='school', lazy=True)
    fee_structures = db.relationship('FeeStructure', backref='school', lazy=True)



# Student
class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    gender = db.Column(db.String(10))
    admission_number = db.Column(db.String(20), unique=True, nullable=False)
    class_level = db.Column(db.String(20))

    school_id = db.Column(db.Integer, db.ForeignKey('schools.id'))

    enrollments = db.relationship('Enrollment', backref='student', lazy=True)
    payments = db.relationship('FeePayment', backref='student', lazy=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True)
    user = db.relationship('User', back_populates='student')

    def get_total_paid(self):
       return sum(payment.amount_paid for payment in self.payments)

    def get_fee_status(self):
       # Get the relevant fee structure
        from .models import FeeStructure
        fee_structure = FeeStructure.query.filter_by(
            school_id=self.school_id,
            class_level=self.class_level
        ).first()

        expected_fee = fee_structure.amount if fee_structure else 0
        total_paid = self.get_total_paid()
        balance = expected_fee - total_paid

        return {
            'expected_fee': expected_fee,
            'total_paid': total_paid,
            'balance': balance
        }


# Teacher
class Teacher(db.Model, SerializerMixin):
    __tablename__ = 'teachers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True)
    subject_specialty = db.Column(db.String(50))

    school_id = db.Column(db.Integer, db.ForeignKey('schools.id'))

    assignments = db.relationship('TeacherAssignment', back_populates='teacher')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True)
    user = db.relationship('User', back_populates='teacher')

# Course
class Course(db.Model, SerializerMixin):
    __tablename__ = 'courses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String)

    school_id = db.Column(db.Integer, db.ForeignKey('schools.id'))

    enrollments = db.relationship('Enrollment', backref='course', lazy=True)
    assignments = db.relationship('TeacherAssignment', backref='course', lazy=True)

# Enrollment (Student-Course)
class Enrollment(db.Model, SerializerMixin):
    __tablename__ = 'enrollments'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))
    grade = db.Column(db.String(5))



# TeacherAssignment (Teacher-Course)
class TeacherAssignment(db.Model, SerializerMixin):
    __tablename__ = 'teacher_assignments'

    id = db.Column(db.Integer, primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'))
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))

    teacher = db.relationship('Teacher', back_populates='assignments')
    course = db.relationship('Course', back_populates='assignments')


# Fee Structure
class FeeStructure(db.Model, SerializerMixin):
    __tablename__ = 'fee_structures'

    id = db.Column(db.Integer, primary_key=True)
    school_id = db.Column(db.Integer, db.ForeignKey('schools.id'))
    class_level = db.Column(db.String(20), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    term = db.Column(db.String(50), nullable=False)

# Fee Payment
class FeePayment(db.Model, SerializerMixin):
    __tablename__ = 'fee_payments'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    amount_paid = db.Column(db.Float, nullable=False)
    date_paid = db.Column(db.DateTime, default=datetime.utcnow)

    student = db.relationship('Student', back_populates='payments')

#User
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'admin', 'student', 'teacher'
    is_active = db.Column(db.Boolean, default=True)

    # One-to-one relationships
    student = db.relationship('Student', back_populates='user', uselist=False)
    teacher = db.relationship('Teacher', back_populates='user', uselist=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
