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
import time


class Platform(object):
    """
    通过非小号网站的平台列表，获取平台详情页中的币种信息
    """
    start_url = 'http://www.feixiaohao.com/exchange/'

    def __init__(self):
        self.ua = UserAgent()
        self.time_now = round(time.time())

    def platform(self, url=start_url):
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
                'img_url': li.xpath('./div/a/img/@src').extract_first(),
                'url': 'http://www.feixiaohao.com{}'.format(li.xpath('./div/div[@class="info"]/div[1]/a/@href').extract_first()),
                'name': name.xpath('./@href').extract_first().split('/')[-2],
                'name_zh': name.xpath('./b/text()').extract_first(),
                'star': li.xpath('./div/div[@class="info"]/div[2]/@class').extract_first(),
                'des': li.xpath('./div/div[@class="info"]/div[3]/text()').extract_first(),
                'type': li.xpath('./div/div[@class="info"]/div[5]/a/i/@title').extract_first(),
                'arb': li.xpath('./div/div[@class="info"]/div[@class="detal"]/a[1]/text()').extract_first(),
                'nation': li.xpath('./div/div[@class="info"]/div[@class="detal"]/a[2]/text()').extract_first(),
                'volume': li.xpath('./div/div[@class="info"]/div[@class="detal"]/a[4]/text()').extract_first(),
                'time': self.time_now,
            }
            yield result

        page_url_list = response.xpath('//a[@class="btn btn-white"]/@href').extract()
        next_page_url = page_url_list[-1]

        if next_page_url != '#':
            next_page_url = 'http://www.feixiaohao.com{}'.format(next_page_url)
            yield from self.platform(next_page_url)


class Symbol(object):
    def __init__(self):
        self.ua = UserAgent()

    def symbol(self):
        url = 'http://www.feixiaohao.com/all/'
        html = requests.get(url, headers={'User-Agent': self.ua.random})
        response = Selector(text=html.text)
        infos = response.xpath('//table[@class="table maintable"]/tbody/tr')
        time_now = round(time.time())
        for info in infos:
            name_show = info.xpath('./td[2]/a/img/@alt').extract_first()
            result = {
                'url': 'http://www.feixiaohao.com{}'.format(info.xpath('./td[2]/a/@href').extract_first()),
                'img_url': info.xpath('./td[2]/a/img/@src').extract_first(),
                'name_show': name_show,
                'name_short': name_show.split('-')[0] if '-' in name_show else name_show,
                'name': info.xpath('./@id').extract_first().lower(),
                'market_volume': info.xpath('./td[@class="market-cap"]/text()').extract_first(),
                'market_volume_cny': info.xpath('./td[@class="market-cap"]/@data-cny').extract_first(),
                'market_volume_usd': info.xpath('./td[@class="market-cap"]/@data-usd').extract_first(),
                'market_volume_btc': info.xpath('./td[@class="market-cap"]/@data-btc').extract_first(),
                'price': info.xpath('./td[4]/a/text()').extract_first(),
                'price_cny': info.xpath('./td[4]/a/@data-cny').extract_first(),
                'price_usd': info.xpath('./td[4]/a/@data-usd').extract_first(),
                'price_btc': info.xpath('./td[4]/a/@data-btc').extract_first(),
                'supply': info.xpath('./td[5]/text()').extract_first(),
                'volume': info.xpath('./td[6]/a/text()').extract_first(),
                'volume_cny': info.xpath('./td[6]/a/@data-cny').extract_first(),
                'volume_usd': info.xpath('./td[6]/a/@data-usd').extract_first(),
                'volume_btc': info.xpath('./td[6]/a/@data-btc').extract_first(),
                'rose': info.xpath('./td[@class="change"]/span/text()').extract_first(),
                'time': time_now,
            }
            yield result


def get_platform_base():
    """
    这只是个运行脚本，与抓取逻辑无关
    :return:
    """
    mongo = Mongo()
    platform = Platform()
    r = platform.platform()
    for i in r:
        mongo.write(collection='platform_base', data=i)
        print(i)


def get_symbol_base():
    """
    这只是个运行脚本，与抓取逻辑无关
    :return:
    """
    mongo = Mongo()
    symbol = Symbol()
    r = symbol.symbol()
    for i in r:
        mongo.write(collection='symbol_base', data=i)
        print(i)


