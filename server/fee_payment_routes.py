from flask import Blueprint, request, jsonify
from server.models import db, FeePayment

fee_payment_bp = Blueprint('fee_payments', __name__, url_prefix='/fee_payments')

@fee_payment_bp.route('/', methods=['GET'])
def get_payments():
    return jsonify([p.to_dict() for p in FeePayment.query.all()])

@fee_payment_bp.route('/', methods=['POST'])
def create_payment():
    data = request.get_json()
    payment = FeePayment(**data)
    db.session.add(payment)
    db.session.commit()
    return payment.to_dict(), 201

@fee_payment_bp.route('/<int:id>', methods=['PATCH'])
def update_payment(id):
    payment = FeePayment.query.get_or_404(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(payment, key, value)
    db.session.commit()
    return payment.to_dict()

@fee_payment_bp.route('/<int:id>', methods=['DELETE'])
def delete_payment(id):
    payment = FeePayment.query.get_or_404(id)
    db.session.delete(payment)
    db.session.commit()
    return {'message': 'Deleted successfully'}