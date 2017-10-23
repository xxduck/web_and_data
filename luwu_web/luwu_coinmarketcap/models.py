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


def index():
    """
    首页
    :return:
    """
    result = mongo.db.symbol_base.find()[:100]

    return result


def symbol(name):
    """
    币种详情页
    :param name:
    :return:
    """
    result = mongo.db.symbol_base.find({'name': name})[0]
    return result


def symbol_base_info(name):
    result = mongo.db.symbol.find({'name': name})[0]
    return result


def index_platform():
    """
    平台列表页
    :return:
    """
    result = mongo.db.platform.find()
    return result


def platform(name):
    """
    平台详情页
    :return:
    """
    result = mongo.db.platform.find({'name': name})[0]
    return result


def sort_by_symbol():
    """
    以币种交易量为基准，排序
    :return:
    """
    # time_now = mongo.db.symbol_base.find()  # 获取数据库中最新的时间
    symbols = mongo.db.symbol_base.find()
    return symbols


def sort_by_platform():
    """
    以币种交易量为基准，排序
    :return:
    """
    # time_now = mongo.db.symbol_base.find()  # 获取数据库中最新的时间
    platforms = mongo.db.platform_base.find()
    return platforms


def ticker_symbol(name):
    """
    通过币种名获取ticker信息
    :param name:
    :return:
    """
    result = mongo.db.ticker.find({'name': name})
    return result


def ticker_platform(name):
    """
    通过平台名获取ticker信息
    :param name:
    :return:
    """
    result = mongo.db.ticker.find({'name_plat': name})
    return result

