#!/usr/bin/env python
# encoding: utf-8

"""
@version: python3.6
@author: xiaofang
@file: main.py
@time: 2017/10/17 15:18
"""
import time
from threading import Thread, Lock
from core.write_to_mongo import Mongo
from core.ticker import Symbol


class MyThread(Thread):
    def __init__(self, url, time_now):
        super(MyThread, self).__init__()
        self.mongo = Mongo()
        self.symbol = Symbol()
        self.url = url
        self.lock = Lock()
        self.time_now = time_now

    def run(self):
        result = self.symbol.symbol(self.url, self.time_now)
        for data in result:
            self.lock.acquire()
            self.mongo.write(collection='ticker', data=data)
            print(data)
            self.lock.release()


def get_ticker_info():
    """
    这只是个运行脚本，与抓取逻辑无关
    :return:
    """
    for i in range(10000):
        time_now = round(time.time())  # 每一次启动时间为所有抓取时间
        db = Mongo()
        data_from_db = db.read(collection='platform_base')
        platform_urls = [plat['url'] for plat in data_from_db]
        thread_list = []
        for url in platform_urls:
            thread_list.append(MyThread(url, time_now))
        for thread in thread_list:
            thread.start()
        for thread in thread_list:
            thread.join()
        print("第{}次采集成功".format(i))
        time.sleep(60)
