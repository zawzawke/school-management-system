from flask import Blueprint, request, jsonify
from server.models import db, School

school_bp = Blueprint('schools', __name__, url_prefix='/schools')

@school_bp.route('/', methods=['GET'])
def get_schools():
    return jsonify([s.to_dict() for s in School.query.all()]), 200

@school_bp.route('/', methods=['POST'])
def create_school():
    data = request.get_json()
    school = School(name=data['name'])
    db.session.add(school)
    db.session.commit()
    return jsonify(school.to_dict()), 201

@school_bp.route('/<int:id>', methods=['PATCH'])
def update_school(id):
    school = School.query.get(id)
    if not school:
        return jsonify({'error': 'Not found'}), 404
    data = request.get_json()
    school.name = data.get('name', school.name)
    db.session.commit()
    return jsonify(school.to_dict()), 200

@school_bp.route('/<int:id>', methods=['DELETE'])
def delete_school(id):
    school = School.query.get(id)
    if not school:
        return jsonify({'error': 'Not found'}), 404
    db.session.delete(school)
    db.session.commit()
    return jsonify({'message': 'Deleted'}), 200