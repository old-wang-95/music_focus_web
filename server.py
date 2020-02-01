from flask import Flask, send_file

app = Flask(__name__)


@app.route('/')
@app.route('/weibo.html')
def show_weibo():
    return send_file('weibo.html')


@app.route('/focus.html')
def show_focus():
    return send_file('focus.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
