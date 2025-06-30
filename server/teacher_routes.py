from flask import Blueprint, request, jsonify
from server.models import db, Teacher

teacher_bp = Blueprint('teachers', __name__, url_prefix='/teachers')

@teacher_bp.route('/', methods=['GET'])
def get_teachers():
    return jsonify([t.to_dict() for t in Teacher.query.all()]), 200

@teacher_bp.route('/', methods=['POST'])
def create_teacher():
    data = request.get_json()
    teacher = Teacher(name=data['name'], subject=data['subject'], school_id=data['school_id'])
    db.session.add(teacher)
    db.session.commit()
    return jsonify(teacher.to_dict()), 201

@teacher_bp.route('/<int:id>', methods=['PATCH'])
def update_teacher(id):
    teacher = Teacher.query.get(id)
    if not teacher:
        return jsonify({'error': 'Not found'}), 404
    data = request.get_json()
    for attr in ['name', 'subject', 'school_id']:
        if attr in data:
            setattr(teacher, attr, data[attr])
    db.session.commit()
    return jsonify(teacher.to_dict()), 200

@teacher_bp.route('/<int:id>', methods=['DELETE'])
def delete_teacher(id):
    teacher = Teacher.query.get(id)
    if not teacher:
        return jsonify({'error': 'Not found'}), 404
    db.session.delete(teacher)
    db.session.commit()
    return jsonify({'message': 'Deleted'}), 200
