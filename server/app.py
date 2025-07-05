from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager  

from server.models import db
from server.config import Config

# Import route blueprints
from server.school_routes import school_bp
from server.student_routes import student_bp
from server.teacher_routes import teacher_bp
from server.course_routes import course_bp
from server.enrollment_routes import enrollment_bp
from server.fee_structure_routes import fee_structure_bp
from server.fee_payment_routes import fee_payment_bp
from server.teacher_assignment_routes import teacher_assignment_bp
from server.fee_routes import fee_bp
from server.auth_routes import auth_bp 

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt = JWTManager(app)  
    Migrate(app, db)
    CORS(app)

    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(school_bp)
    app.register_blueprint(student_bp)
    app.register_blueprint(teacher_bp)
    app.register_blueprint(course_bp)
    app.register_blueprint(enrollment_bp)
    app.register_blueprint(fee_structure_bp)
    app.register_blueprint(fee_payment_bp)
    app.register_blueprint(fee_bp)
    app.register_blueprint(teacher_assignment_bp)

    @app.route('/')
    def index():
        return {'message': 'School Management System Backend'}

    return app

app = create_app()
