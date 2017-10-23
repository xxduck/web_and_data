#!/usr/bin/env python

# encoding: utf-8

'''
 
@author: xiaofang
    
@file: runserver.py
 
@time: 17-10-13 上午11:15
 
@desc:
 
'''
import setting
from luwu_coinmarketcap import app
from luwu_coinmarketcap import views

app.run(debug=setting.debug)