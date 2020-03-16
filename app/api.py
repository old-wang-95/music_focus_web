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
    return _call_biz(conf.posts_url, 50)


@app.route('/api/{}/focuses'.format(API_VERSION), methods=['GET'])
def call_focuses():
    return _call_biz(conf.focuses_url, 50)


@app.route('/api/{}/videos'.format(API_VERSION), methods=['GET'])
def call_videos():
    return _call_biz(conf.videos_url, 30)


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


def _call_biz(url, max_cnt):
    try:
        res = requests.get(url, params=dict(request.args, max_cnt=max_cnt))
        assert res.status_code == 200, "status_code is: {}, not 200!".format(res.status_code)
        return res.text
    except Exception as e:
        logger.exception(e)
        return 'error: {}'.format(e)
