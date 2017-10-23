from flask import render_template
from luwu_coinmarketcap import models
from luwu_coinmarketcap import app


@app.route('/index/')
def index():
    return render_template('index.html', body=models.index())


@app.route('/currencies/<name>/')
def symbol(name):
    """
    name : 币种名称
    币种详情页
    :param name:
    :return:
    """
    return render_template('symbol.html', body=models.symbol(name), footer=models.symbol_base_info(name), table=models.ticker_symbol)


@app.route('/exchange/')
def exchange():
    """
    交易平台列表页
    :return:
    """
    return render_template('exchange.html', body=models.index_platform())


@app.route('/exchange/<name>/')
def platform(name):
    """
    name : 平台名称
    交易平台详情页
    :param name:
    :return:
    """

    return render_template('platform.html', body=models.platform(name), footer=models.ticker_platform)


@app.route('/vol/')
def vol():
    """
    交易量排名展示页
    :param
    :return:
    """
    return render_template('vol.html', body=models.sort_by_symbol(), footer=models.ticker_symbol)


@app.route('/vol/exchange/')
def vol_platform():
    """
    :param
    :return:
    """
    return render_template('vol_platform.html', body=models.sort_by_platform(), footer=models.ticker_platform)


if __name__ == '__main__':
    app.run()
