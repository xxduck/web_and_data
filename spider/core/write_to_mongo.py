#!/usr/bin/env python
# encoding: utf-8

"""
@version: python3.6
@author: xiaofang
@file: write_to_mongo.py
@time: 2017/10/17 15:12
"""
import pymongo


class Mongo(object):
    def __init__(self):
        self.con = pymongo.MongoClient()
        self.db = self.con.feixiaohao

    def write(self, data, collection):
        col = self.db[collection]
        col.insert_one(data)   #  这边在后期的优化的时候更改为insert_many

    def read(self, collection):
        col = self.db[collection]
        return col.find()

    def drop(self, collection):
        col = self.db[collection]
        col.remove()
        print("即将开始更新该集合，请等待")


if __name__ == "__main__":
    m = Mongo()
    n = m.read(collection='platform')
    for i in n:
        print(i)
