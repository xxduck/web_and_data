#!/usr/bin/env python
# encoding: utf-8

"""
@version: python3.6
@author: xiaofang
@file: go.py
@time: 2017/10/19 9:00
"""
from core import spider
from core import plat, symbol
from core import main
from core.spider import get_symbol_base

if __name__ == '__main__':
    """
    step1，step2，只是维护平台与币种基本信息，所以无需持续运行，
    每隔一定时间段更新即可，step3为动态获取市场信息，所以需要持续运行
    """
# step1:
    spider.get_platform_base()
#     spider.get_symbol_base()
# step2:
#     plat.platform_info()
#     symbol.symbol_info()

# step3:
#     main.get_ticker_info()
