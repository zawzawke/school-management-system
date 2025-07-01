from flask import Blueprint, request, jsonify
from server.models import db, Student

student_bp = Blueprint('student_bp', __name__, url_prefix='/students')

# CREATE student
@student_bp.route('/', methods=['POST'])
def create_student():
    data = request.get_json()

    required_fields = ['first_name', 'last_name', 'email', 'admission_number', 'school_id']
    if not all(field in data for field in required_fields):
        return {'error': 'Missing required student fields'}, 400

    try:
        new_student = Student(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            gender=data.get('gender'),
            admission_number=data['admission_number'],
            class_level=data.get('class_level'),
            school_id=data['school_id']
        )
        db.session.add(new_student)
        db.session.commit()

        return jsonify(new_student.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return {'error': str(e)}, 500

# READ all students
@student_bp.route('/', methods=['GET'])
def get_students():
    students = Student.query.all()
    return jsonify([student.to_dict() for student in students])
def fee_status(student_id):
    student = Student.query.get_or_404(student_id)
    return student.get_fee_status()