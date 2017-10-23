import requests
from fake_useragent import UserAgent
from scrapy.selector import Selector

from core.write_to_mongo import Mongo


class Platform(object):
    """
    通过url获取详情页平台信息
    """

    def __init__(self):
        self.ua = UserAgent()

    def platform(self, url):
        html = requests.get(url, headers={'User-Agent': self.ua.random})
        response = Selector(text=html.text)
        header_info = response.xpath('//div[@class="box box1200"]/div/div/div[@class="info"]')
        img_url = response.xpath('//div[@class="box box1200"]/div/div/div[@class="cover"]/img/@src')
        abstract = response.xpath('//div[@class="tabBody"][2]/section')
        fee = response.xpath('//div[@class="tabBody"][3]/section')
        type = header_info.xpath('./div[@class="tag"]/a/@href').extract_first()
        result = {
            'name': header_info.xpath('./input/@value').extract_first().lower(),
            'img_url': img_url.extract_first(),
            'name_zh': header_info.xpath('./h1/text()').extract_first(),
            'star': header_info.xpath('./div[contains(@class,"star")]/@class').extract_first()[-1],
            'dsc': header_info.xpath('./div[@class="text"]/text()').extract_first(),
            'type': type[-1] if type else None,
            'url': header_info.xpath('./div[@class="web"]/span[1]/a/@href').extract_first(),
            'nation': header_info.xpath('./div[@class="web"]/span[2]/a/text()').extract_first(),
            'abstract': abstract.xpath('string(.)').extract_first(),
            'fee': fee.xpath('string(.)').extract_first(),
        }
        yield result


def platform_info():
    """
        这只是个运行脚本，与抓取逻辑无关
        :return:
        """
    platform = Platform()
    mongo = Mongo()
    mongo.drop(collection='platform')
    for plat in mongo.read(collection='platform_base'):
        for i in platform.platform(plat['url']):
            print(i)
            mongo.write(collection='platform', data=i)
