from flask import Blueprint, request, jsonify
from server.models import db, Course

course_bp = Blueprint('courses', __name__, url_prefix='/courses')

@course_bp.route('/', methods=['GET'])
def get_courses():
    return jsonify([c.to_dict() for c in Course.query.all()]), 200

@course_bp.route('/', methods=['POST'])
def create_course():
    data = request.get_json()
    course = Course(name=data['name'], school_id=data['school_id'])
    db.session.add(course)
    db.session.commit()
    return jsonify(course.to_dict()), 201

@course_bp.route('/<int:id>', methods=['PATCH'])
def update_course(id):
    course = Course.query.get(id)
    if not course:
        return jsonify({'error': 'Not found'}), 404
    data = request.get_json()
    course.name = data.get('name', course.name)
    course.school_id = data.get('school_id', course.school_id)
    db.session.commit()
    return jsonify(course.to_dict()), 200

@course_bp.route('/<int:id>', methods=['DELETE'])
def delete_course(id):
    course = Course.query.get(id)
    if not course:
        return jsonify({'error': 'Not found'}), 404
    db.session.delete(course)
    db.session.commit()
    return jsonify({'message': 'Deleted'}), 200

