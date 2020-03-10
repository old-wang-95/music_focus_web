import os
from datetime import datetime

from flask import request


class VisitHistory:
    """
    浏览历史

    格式：时间   IP  url
    """

    def __init__(self, file_path):
        self.file_path = file_path
        self.visit_cnt = 0
        self.visitor_cnt = 0
        self.visitors = set()
        self.load()

    def write(self, url):
        with open(self.file_path, 'a', encoding='utf-8') as f:
            ip = request.headers.get('X-Real-Ip', request.remote_addr)
            dt = datetime.now().strftime('%Y/%m/%d-%H:%M:%S')
            f.write('\t'.join([dt, ip, url]) + '\n')

    def load(self):
        if not os.path.exists(self.file_path):
            return
        with open(self.file_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                dt, ip, url = line.split('\t')[:3]
                self.visit_cnt += 1
                if ip not in self.visitors:
                    self.visitor_cnt += 1
                    self.visitors.add(ip)
