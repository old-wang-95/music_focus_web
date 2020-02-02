import os

posts_url = os.environ.get('POSTS_URL', 'http://127.0.0.1:8000/api/v1/posts')
focuses_url = os.environ.get('FOCUSES_URL', 'http://127.0.0.1:8000/api/v1/focuses')
