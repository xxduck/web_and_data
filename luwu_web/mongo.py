import pymongo
import setting

client = pymongo.MongoClient('mongodb://localhost:27017')
db = client[setting.database_name]


def insert_platform():
    data = {
        'name': 'bithum',
        'name_zh': '比特币',
        'desc': "世界前五强",
        'create_at': "2017",
        'status': 'open',
        'nation': '韩国',
        'star': 5,
        'url': "https://www.baidu.com",
        'fee_url': "https://www.163.com",
        'img': '',
        'fee': '',
        'label': 1,
        }
    db.platform.insert_one(data)


def insert_ticker():
    data = {
        'ask': 4768,
        'bid': 6758,
        'volume': 87865,
        'base_volume': 79889,
        'last': 5657,
        'high': 9766,
        'low': 6788,
        'symbol': 'btc-htc',
        'base': "https://www.baidu.com",
        'pix': "https://www.163.com",
        'abbreviation': 'bth',
        'abbreviation_1': 'bth',
        'platform': 'bithum',
        'quote': 'bitcoin'
        }
    db.ticker.insert_one(data)


def insert_symbol():
    data = {
        'desc': "这是一个币种",
        'abbreviation': "莱特币",
        'coins_tokens': 0,
        'mineable': 0,
        'supply': 5657,
        'circulating_supply': 9766,
        'name_zh': "莱特币",
        'name': 'bitcoin',
        'website': "https://www.baidu.com",
        'explorer': "https://www.163.com",
        'date': 'bth',
        'img': 'bth',
        'create_at': '8848',
        }
    db.symbol.insert_one(data)


if __name__ == "__main__":
    for i in range(1000):
        insert_ticker()
        insert_platform()
        insert_symbol()
