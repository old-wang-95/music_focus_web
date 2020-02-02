import logging

from flask import Flask

app = Flask(__name__)
logger = logging.getLogger('flask.app')
