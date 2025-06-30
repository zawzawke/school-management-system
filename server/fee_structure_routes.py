from flask import Blueprint, request, jsonify
from server.models import db, FeeStructure

fee_structure_bp = Blueprint('fee_structures', __name__, url_prefix='/fee_structures')

@fee_structure_bp.route('/', methods=['GET'])
def get_fees():
    return jsonify([f.to_dict() for f in FeeStructure.query.all()])

@fee_structure_bp.route('/', methods=['POST'])
def create_fee():
    data = request.get_json()
    fee = FeeStructure(**data)
    db.session.add(fee)
    db.session.commit()
    return fee.to_dict(), 201

@fee_structure_bp.route('/<int:id>', methods=['PATCH'])
def update_fee(id):
    fee = FeeStructure.query.get_or_404(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(fee, key, value)
    db.session.commit()
    return fee.to_dict()

@fee_structure_bp.route('/<int:id>', methods=['DELETE'])
def delete_fee(id):
    fee = FeeStructure.query.get_or_404(id)
    db.session.delete(fee)
    db.session.commit()
    return {'message': 'Deleted successfully'}