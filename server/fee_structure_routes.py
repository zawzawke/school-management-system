from flask import Blueprint, request, jsonify
from server.models import db, FeeStructure

fee_structure_bp = Blueprint('fee_structures', __name__, url_prefix='/fee_structures')

# GET all fee structures
@fee_structure_bp.route('/', methods=['GET'])
def get_fees():
    fees = FeeStructure.query.all()
    return jsonify([f.to_dict() for f in fees]), 200

# POST new fee structure
@fee_structure_bp.route('/', methods=['POST'])
def create_fee():
    data = request.get_json()

    # Optional: Validate fields
    required_fields = ['school_id', 'class_level', 'amount']
    for field in required_fields:
        if field not in data:
            return {'error': f'Missing field: {field}'}, 400

    fee = FeeStructure(**data)
    db.session.add(fee)
    db.session.commit()
    return fee.to_dict(), 201

# PATCH existing fee structure
@fee_structure_bp.route('/<int:id>', methods=['PATCH'])
def update_fee(id):
    fee = FeeStructure.query.get_or_404(id)
    data = request.get_json()

    for key, value in data.items():
        if hasattr(fee, key):
            setattr(fee, key, value)

    db.session.commit()
    return fee.to_dict(), 200

# DELETE fee structure
@fee_structure_bp.route('/<int:id>', methods=['DELETE'])
def delete_fee(id):
    fee = FeeStructure.query.get_or_404(id)
    db.session.delete(fee)
    db.session.commit()
    return {'message': 'Fee structure deleted successfully'}, 200
