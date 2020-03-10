from werkzeug.serving import WSGIRequestHandler


class RequestHandler(WSGIRequestHandler):
    def address_string(self):
        if 'X-Real-Ip' in self.headers:
            return self.headers['X-Real-Ip']
        else:
            return super(RequestHandler, self).address_string()
