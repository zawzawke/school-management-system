from flask import Blueprint, jsonify
from server.models import db, Student, FeeStructure, FeePayment

fee_bp = Blueprint('fee_bp', __name__, url_prefix='/fees')

@fee_bp.route('/student/<int:student_id>', methods=['GET'])
def student_fee_status(student_id):
    student = Student.query.get_or_404(student_id)
    
    # Get fee structure for student's class level
    fee_structure = FeeStructure.query.filter_by(
        class_level=student.class_level,
        school_id=student.school_id
    ).first()
    
    total_fee = fee_structure.amount if fee_structure else 0.0

    # Get payments
    payments = FeePayment.query.filter_by(student_id=student.id).all()
    total_paid = sum([p.amount for p in payments])
    balance = total_fee - total_paid

    return jsonify({
        "student_id": student.id,
        "student_name": f"{student.first_name} {student.last_name}",
        "class_level": student.class_level,
        "school_id": student.school_id,
        "total_fee": total_fee,
        "total_paid": total_paid,
        "balance": balance,
        "payment_history": [p.to_dict() for p in payments]
    })
