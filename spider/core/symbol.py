import requests
from fake_useragent import UserAgent
from scrapy.selector import Selector

from core.write_to_mongo import Mongo


class Symbol(object):
    def __init__(self):
        self.ua = UserAgent()

    def symbol(self, url):
        html = requests.get(url, headers={'User-Agent': self.ua.random})
        response = Selector(text=html.text)
        table = response.xpath('//div[@class="tabBody"][last()]/table/tbody/tr')
        section = response.xpath('//div[@class="tabBody"][last()]/section')
        result = {
            'img_url': response.xpath('//h1/img/@src').extract_first(),
            'name': table.xpath('./td[1]/text()').extract_first().lower(),
            'name_zh': table.xpath('./td[2]/text()').extract_first(),
            'short_name': table.xpath('./td[3]/text()').extract_first(),
            'time': table.xpath('./td[4]/text()').extract_first(),
            'web': table.xpath('./td[5]/a/@href').extract(),
            'block': table.xpath('./td[6]/a/@href').extract(),
            'abstract': section.xpath('string(.)').extract_first(),
            'supply': response.xpath('//div[@class="cell"]/div[@class="num"][2]/text()').extract_first(),
        }

        yield result


def symbol_info():
    """
        这只是个运行脚本，与抓取逻辑无关
        :return:
        """
    symbol = Symbol()
    mongo = Mongo()
    mongo.drop(collection='symbol')
    for symb in mongo.read(collection='symbol_base'):
        for i in symbol.symbol(symb['url']):
            print(i)
            mongo.write(collection='symbol', data=i)
