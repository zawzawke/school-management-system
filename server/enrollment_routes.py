from flask import Blueprint, request, jsonify
from server.models import db, Enrollment

enrollment_bp = Blueprint('enrollments', __name__, url_prefix='/enrollments')

@enrollment_bp.route('/', methods=['GET'])
def get_enrollments():
    enrollments = Enrollment.query.all()
    return jsonify([e.to_dict() for e in enrollments])

@enrollment_bp.route('/', methods=['POST'])
def create_enrollment():
    data = request.get_json()
    enrollment = Enrollment(**data)
    db.session.add(enrollment)
    db.session.commit()
    return enrollment.to_dict(), 201

@enrollment_bp.route('/<int:id>', methods=['PATCH'])
def update_enrollment(id):
    enrollment = Enrollment.query.get_or_404(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(enrollment, key, value)
    db.session.commit()
    return enrollment.to_dict()

@enrollment_bp.route('/<int:id>', methods=['DELETE'])
def delete_enrollment(id):
    enrollment = Enrollment.query.get_or_404(id)
    db.session.delete(enrollment)
    db.session.commit()
    return {'message': 'Deleted successfully'}