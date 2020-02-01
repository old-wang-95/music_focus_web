from flask import send_file

from driver import app


@app.route('/weibo.html')
def show_weibo():
    return send_file('html/weibo.html')


@app.route('/focus.html')
def show_focus():
    return send_file('html/focus.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
