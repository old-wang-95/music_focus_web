from flask import Flask

from app.visit_history import VisitHistory

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

visit_history = VisitHistory('log/visit.txt')
