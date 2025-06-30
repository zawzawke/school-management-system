from flask import Blueprint, request, jsonify
from server.models import db, TeacherAssignment

teacher_assignment_bp = Blueprint('teacher_assignments', __name__, url_prefix='/teacher_assignments')

@teacher_assignment_bp.route('/', methods=['GET'])
def get_assignments():
    return jsonify([a.to_dict() for a in TeacherAssignment.query.all()])

@teacher_assignment_bp.route('/', methods=['POST'])
def create_assignment():
    data = request.get_json()
    assignment = TeacherAssignment(**data)
    db.session.add(assignment)
    db.session.commit()
    return assignment.to_dict(), 201

@teacher_assignment_bp.route('/<int:id>', methods=['PATCH'])
def update_assignment(id):
    assignment = TeacherAssignment.query.get_or_404(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(assignment, key, value)
    db.session.commit()
    return assignment.to_dict()

@teacher_assignment_bp.route('/<int:id>', methods=['DELETE'])
def delete_assignment(id):
    assignment = TeacherAssignment.query.get_or_404(id)
    db.session.delete(assignment)
    db.session.commit()
    return {'message': 'Deleted successfully'}