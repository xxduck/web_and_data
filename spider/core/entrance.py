#!/usr/bin/env python
# encoding: utf-8

"""
@version: python3.6
@author: xiaofang
@file: spider.py
@time: 2017/10/17 11:00
"""
import requests
from fake_useragent import UserAgent
from scrapy.selector import Selector
from core.write_to_mongo import Mongo


class PlatformEntrance(object):
    """
    通过非小号网站的平台列表，获取平台url
    """
    start_url = 'http://www.feixiaohao.com/exchange/'

    def __init__(self):
        self.ua = UserAgent()

    def platform_entrance(self, url=start_url):
        """
        获取平台列表
        :return:
        """
        html = requests.get(url, headers={'User-Agent': self.ua.random})
        response = Selector(text=html.text)

        ul = response.xpath('//ul[@class="plantList"]/li')
        for li in ul:
            name = li.xpath('./div/div[@class="info"]/div[1]/a')
            result = {
                'url': 'http://www.feixiaohao.com{}'.format(li.xpath('./div/div[@class="info"]/div[1]/a/@href').extract_first()),
                'name_zh': name.xpath('./b/text()').extract_first(),
            }
            yield result

        page_url_list = response.xpath('//a[@class="btn btn-white"]/@href').extract()
        next_page_url = page_url_list[-1]

        if next_page_url != '#':
            next_page_url = 'http://www.feixiaohao.com{}'.format(next_page_url)
            yield from self.platform_entrance(next_page_url)


class SymbolEntrance(object):
    def __init__(self):
        self.ua = UserAgent()

    def symbol_entrance(self):
        url = 'http://www.feixiaohao.com/all/'
        html = requests.get(url, headers={'User-Agent': self.ua.random})
        response = Selector(text=html.text)
        infos = response.xpath('//table[@class="table maintable"]/tbody/tr')
        for info in infos:
            name_show = info.xpath('./td[2]/a/img/@alt').extract_first()
            result = {
                'url': 'http://www.feixiaohao.com{}'.format(info.xpath('./td[2]/a/@href').extract_first()),
                'name_show': name_show,
                'name': info.xpath('./@id').extract_first().lower(),
            }
            yield result


def run_platform_entrance():
    """
    这只是个运行脚本，与抓取逻辑无关
    :return:
    """
    mongo = Mongo()
    mongo.drop(collection='platform_entrance')
    platform = PlatformEntrance()
    r = platform.platform_entrance()
    for i in r:
        mongo.write(collection='platform_entrance', data=i)
        print(i)


def run_symbol_entrance():
    """
    这只是个运行脚本，与抓取逻辑无关
    :return:
    """
    mongo = Mongo()
    mongo.drop(collection='symbol_entrance')
    symbol = SymbolEntrance()
    r = symbol.symbol_entrance()
    for i in r:
        mongo.write(collection='symbol_entrance', data=i)
        print(i)
