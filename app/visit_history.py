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

        self.today_visit_cnt = 0
        self.today_visitor_cnt = 0
        self.today_visitors = set()
        self.last_dt = self._get_today_dt()  # 最后访问的时间，默认为服务启动时间

        self.load()

    def write(self, url):
        with open(self.file_path, 'a', encoding='utf-8') as f:
            ip = request.headers.get('X-Real-Ip', request.remote_addr)
            dt = self._get_today_dt()
            f.write('\t'.join([dt, ip, url]) + '\n')
            self._update_cnt(ip)
            self.last_dt = dt

    def load(self):
        if not os.path.exists(self.file_path):
            return
        with open(self.file_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                dt, ip, url = line.split('\t')[:3]
                self.last_dt = dt
                self._update_cnt(ip)

    def _update_cnt(self, ip):
        self.visit_cnt, self.visitor_cnt, self.visitors = \
            self._increase_cnt(ip, self.visit_cnt, self.visitor_cnt, self.visitors)

        if self.last_dt[:10] != self._get_today_dt()[:10]:  # 新的一天，重置
            self.today_visit_cnt = 0
            self.today_visitor_cnt = 0
            self.today_visitors = set()
        else:
            self.today_visit_cnt, self.today_visitor_cnt, self.today_visitors = \
                self._increase_cnt(ip, self.today_visit_cnt, self.today_visitor_cnt, self.today_visitors)

    @staticmethod
    def _increase_cnt(ip, visit_cnt, visitor_cnt, visitors):
        """
        根据ip增加两个计数器
        """
        visit_cnt += 1
        if ip not in visitors:
            visitor_cnt += 1
            visitors.add(ip)
        return visit_cnt, visitor_cnt, visitors

    @staticmethod
    def _get_today_dt():
        return datetime.now().strftime('%Y/%m/%d-%H:%M:%S')
