import json
import sys

from flask import redirect, send_file

from app.api import *
from app.driver import visit_history
from app.request_handler import RequestHandler


@app.route('/')
def index():
    return redirect('/weibo.html')


@app.route('/weibo.html')
def show_weibo():
    visit_history.write('/weibo.html')
    return send_file('html/weibo.html')


@app.route('/focus.html')
def show_focus():
    visit_history.write('/focus.html')
    return send_file('html/focus.html')


@app.route('/lizhi.html')
def show_lizhi():
    visit_history.write('/lizhi.html')
    return send_file('html/lizhi.html')


@app.route('/lizhi/album.html')
def show_album():
    visit_history.write('/lizhi/album.html')
    return send_file('html/album.html')


@app.route('/visit_cnt')
def show_visit_cnt():
    result = {
        'visit_cnt': visit_history.visit_cnt,
        'visitor_cnt': visit_history.visitor_cnt
    }
    return json.dumps(result, ensure_ascii=False, indent=2)


def start():
    host = '0.0.0.0'
    port = 8000
    if len(sys.argv) >= 3:
        host, port = sys.argv[1:3]
    if conf.is_debug:
        logger.warning('current is debug mode')
    app.run(host=host, port=port, debug=conf.is_debug, request_handler=RequestHandler)


if __name__ == '__main__':
    start()
