#!/usr/bin/env python
# encoding: utf-8

"""
@version: python3.6
@author: xiaofang
@file: symbol.py
@time: 2017/10/17 14:21
"""
import requests
from fake_useragent import UserAgent
from scrapy.selector import Selector


class Ticker(object):
    """
    通过url获取详情页币种信息
    """
    url = 'http://www.feixiaohao.com/exchange/bithumb/'

    def __init__(self):
        self.ua = UserAgent()

    def ticker(self, url, num):
        html = requests.get(url, headers={'User-Agent': self.ua.random})
        response = Selector(text=html.text)
        header_info = response.xpath('//div[@class="box box1200"]/div/div/div[@class="info"]')
        response = response.xpath('//table[@class="table noBg"]/tbody/tr')
        for info in response:
            # 有些网页arb标签,name标签有特殊情况
            arb = info.xpath('./td[3]/a/text()').extract_first(None)
            name_base = info.xpath('./td[2]/a/img/@alt').extract_first()

            if arb is None:
                arb = info.xpath('./td[3]/text()').extract_first()
            if len(name_base.split('-')) == 1:
                name_base = 'None-{}'.format(name_base)
            result = {
                'img_url': info.xpath('./td[2]/a/img/@src').extract_first(),
                'name_plat': header_info.xpath('./input/@value').extract_first().lower(),
                'url': url,
                'name_zh': name_base.split('-')[0],
                'name': name_base.split('-')[1].lower(),
                'arb': arb.strip(),
                'base': arb.split('/')[0].strip(),
                'quote': arb.split('/')[1],
                'price': info.xpath('./td[4]/text()').extract_first(),
                'price_cny': info.xpath('./td[4]/@data-cny').extract_first(),
                'price_usd': info.xpath('./td[4]/@data-usd').extract_first(),
                'price_btc': info.xpath('./td[4]/@data-btc').extract_first(),
                'price_native': info.xpath('./td[4]/@data-native').extract_first(),
                'volume': info.xpath('./td[5]/text()').extract_first(),
                'volume_cny': info.xpath('./td[5]/@data-cny').extract_first(),
                'volume_usd': info.xpath('./td[5]/@data-usd').extract_first(),
                'volume_btc': info.xpath('./td[5]/@data-btc').extract_first(),
                'volume_native': info.xpath('./td[5]/@data-native').extract_first(),
                'percent': info.xpath('./td[6]/text()').extract_first(),
                'time': info.xpath('./td[7]/text()').extract_first(),
                'time_now': num,
            }
            yield result

