import os

is_debug = True if os.environ.get('DEBUG', 'true').lower() == 'true' else False

posts_url = os.environ.get('POSTS_URL', 'http://music_focus_online:8000/api/v1/posts')
focuses_url = os.environ.get('FOCUSES_URL', 'http://music_focus_online:8000/api/v1/focuses')
