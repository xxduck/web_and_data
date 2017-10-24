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
from core.ticker import Ticker


class MyThread(Thread):
    def __init__(self, url, num):
        super(MyThread, self).__init__()
        self.mongo = Mongo()
        self.ticker = Ticker()
        self.url = url
        self.lock = Lock()
        self.num = num

    def run(self):
        result = self.ticker.ticker(self.url, self.num)
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
    num = round(time.time())  # 每一次启动时间为所有抓取时间
    db = Mongo()
    data_from_db = db.read(collection='platform_entrance')
    platform_urls = [plat['url'] for plat in data_from_db]
    thread_list = []
    for url in platform_urls:
        thread_list.append(MyThread(url, num=num))
    for thread in thread_list:
        thread.start()
    for thread in thread_list:
        thread.join()
    print("采集成功")
