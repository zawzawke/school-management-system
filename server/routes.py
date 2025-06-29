from flask import request, jsonify
from server.models import db, Student

def register_routes(app):

    @app.route('/students', methods=['GET'])
    def get_students():
        students = Student.query.all()
        return jsonify([{
            "id": s.id,
            "full_name": s.full_name,
            "grade": s.grade,
            "email": s.email
        } for s in students])

    @app.route('/students', methods=['POST'])
    def create_student():
        data = request.get_json()
        new_student = Student(
            full_name=data['full_name'],
            grade=data.get('grade'),
            email=data['email']
        )
        db.session.add(new_student)
        db.session.commit()
        return jsonify({"message": "Student created", "student_id": new_student.id}), 201
