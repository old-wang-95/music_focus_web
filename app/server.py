import sys

from flask import send_file

from app.api import *


@app.route('/weibo.html')
def show_weibo():
    return send_file('html/weibo.html')


@app.route('/focus.html')
def show_focus():
    return send_file('html/focus.html')


def start():
    host = '0.0.0.0'
    port = 8000
    if len(sys.argv) >= 3:
        host, port = sys.argv[1:3]
    if conf.is_debug:
        logger.warning('current is debug mode')
    app.run(host=host, port=port, debug=conf.is_debug)


if __name__ == '__main__':
    start()
