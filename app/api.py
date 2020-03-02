import requests

from app import conf
from app import logger
from app.driver import app


@app.route('/api/v1/posts', methods=['GET'])
def call_posts():
    try:
        res = requests.get(conf.posts_url)
        assert res.status_code == 200, "status_code is: {}, not 200!".format(res.status_code)
        return res.text
    except Exception as e:
        logger.exception(e)
        return 'error: {}'.format(e)


@app.route('/api/v1/focuses', methods=['GET'])
def call_focuses():
    try:
        res = requests.get(conf.focuses_url)
        assert res.status_code == 200, "status_code is: {}, not 200!".format(res.status_code)
        return res.text
    except Exception as e:
        logger.exception(e)
        return 'error: {}'.format(e)
