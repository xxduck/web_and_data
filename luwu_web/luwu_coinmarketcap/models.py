#!/usr/bin/env python

# encoding: utf-8

'''
 
@author: xiaofang
    
@file: computer.py
 
@time: 17-10-10 下午12:48
 
@desc:
 
'''
from flask_pymongo import PyMongo
from luwu_coinmarketcap import app
import setting
"""
这是一个计算网页中需要数据的模块
"""
app.config.update(
    MONGO_HOST='localhost',
    MONGO_PORT=27017,
    MONGO_DBNAME=setting.database_name
)
mongo = PyMongo(app)


class Luwu(object):
    def __init__(self):
        #  获取每个数据库中最后的一条时间
        self.ticker_time = mongo.db.ticker.find().sort([('time_now', -1)])[0]['time_now']
        self.symbol_time = mongo.db.symbol_base.find().sort([('time', -1)])[0]['time']
        self.platform_time = mongo.db.platform_base.find().sort([('time', -1)])[0]['time']

    def index(self):
        """
        首页
        :return:
        """
        result = mongo.db.symbol_base.find({'time': self.symbol_time})

        return result

    def symbol(self, name):
        """
        币种详情页
        :param name:
        :return:
        """
        result = mongo.db.symbol_base.find({'name': name, 'time': self.symbol_time})[0]
        return result

    def symbol_base_info(self, name):
        result = mongo.db.symbol.find({'name': name})[0]
        return result

    def index_platform(self):
        """
        平台列表页
        :return:
        """
        result = mongo.db.platform_base.find({'time': self.platform_time})
        return result

    def platform(self, name):
        """
        平台详情页
        :return:
        """
        result = mongo.db.platform.find({'name': name})[0]
        return result

    def sort_by_symbol(self):
        """
        以币种交易量为基准，排序
        :return:
        """
        symbols = mongo.db.symbol_base.find({'time': self.symbol_time})[:50]
        return symbols

    def sort_by_platform(self):
        """
        以币种交易量为基准，排序
        :return:
        """
        platforms = mongo.db.platform_base.find({'time': self.platform_time})[:50]
        return platforms

    def ticker_symbol(self, name):
        """
        通过币种名获取ticker信息
        :param name:
        :return:
        """
        result = mongo.db.ticker.find({'name': name, 'time_now': self.ticker_time})
        return result

    def ticker_platform(self, name):
        """
        通过平台名获取ticker信息
        :param name:
        :return:
        """
        result = mongo.db.ticker.find({'name_plat': name, 'time_now': self.ticker_time})
        return result

