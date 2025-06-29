from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from server.models import db
from server.config import Config

def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)
    Migrate(app, db)
    CORS(app)

    @app.route('/')
    def index():
        return {'message': 'School Management System Backend'}

    return app

app = create_app()
