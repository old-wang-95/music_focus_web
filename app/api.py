import json

import requests
from flask import request

from app import conf
from app import driver
from app import logger
from app.driver import app
from app.driver import visit_history

API_VERSION = 'v1'


@app.route('/api/{}/posts'.format(API_VERSION), methods=['GET'])
def call_posts():
    try:
        res = requests.get(conf.posts_url)
        assert res.status_code == 200, "status_code is: {}, not 200!".format(res.status_code)
        return res.text
    except Exception as e:
        logger.exception(e)
        return 'error: {}'.format(e)


@app.route('/api/{}/focuses'.format(API_VERSION), methods=['GET'])
def call_focuses():
    try:
        res = requests.get(conf.focuses_url)
        assert res.status_code == 200, "status_code is: {}, not 200!".format(res.status_code)
        return res.text
    except Exception as e:
        logger.exception(e)
        return 'error: {}'.format(e)


@app.route('/api/{}/visit_cnt'.format(API_VERSION), methods=["GET"])
def show_visit_cnt():
    result = {
        'visit_cnt': visit_history.visit_cnt,
        'visitor_cnt': visit_history.visitor_cnt
    }
    return json.dumps(result, ensure_ascii=False, indent=2)


@app.route('/api/{}/feedback'.format(API_VERSION), methods=["POST"])
def feedback():
    try:
        with open(driver.feedback_path, 'a', encoding='utf-8') as f:
            f.write(json.dumps(request.form, ensure_ascii=False) + '\n')
        return 'OK'
    except Exception as e:
        logger.exception(e)
        return 'ERROR'
