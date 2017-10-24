#!/usr/bin/env python
# encoding: utf-8

"""
@version: python3.6
@author: xiaofang
@file: go.py
@time: 2017/10/19 9:00
"""
from core import plat, symbol
from core import main
from core import spider
from core.entrance import run_platform_entrance, run_symbol_entrance
from multiprocessing import Process
import time

if __name__ == '__main__':

    while True:
        n = input("""
        1: 获取程序后面所依赖的最基础信息
        2：获取币种的基本介绍信息
        3： 获取平台的基本介绍信息
        4： 获取实时动态信息以供展示
        q: 退出
        """)
        if n == 'q':
            break
        elif n == '1':
            run_platform_entrance()
            run_symbol_entrance()
            print("必要信息抓取完成")
        elif n == '2':
            symbol.symbol_info()
            print('币种基本信息抓取完成')
        elif n == '3':
            plat.platform_info()
            print('平台基本信息抓取完毕')
        elif n == '4':
            while True:
                p1 = Process(target=main.get_ticker_info, args=())
                p2 = Process(target=spider.get_platform_base, args=())
                p3 = Process(target=spider.get_symbol_base, args=())
                p1.start()
                p2.start()
                p3.start()
                p1.join()
                p2.join()
                p3.join()
                print("等待60秒")
                time.sleep(60)
        else:
            print("输入有误，按q可以退出")
