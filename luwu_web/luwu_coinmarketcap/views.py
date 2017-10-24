from flask import render_template
from luwu_coinmarketcap.models import Luwu
from luwu_coinmarketcap import app


@app.route('/index/')
def index():
    return render_template('index.html', body=Luwu().index())


@app.route('/currencies/<name>/')
def symbol(name):
    """
    name : 币种名称
    币种详情页
    :param name:
    :return:
    """
    return render_template('symbol.html', body=Luwu().symbol(name), footer=Luwu().symbol_base_info(name), table=Luwu().ticker_symbol)


@app.route('/exchange/')
def exchange():
    """
    交易平台列表页
    :return:
    """
    return render_template('exchange.html', body=Luwu().index_platform())


@app.route('/exchange/<name>/')
def platform(name):
    """
    name : 平台名称
    交易平台详情页
    :param name:
    :return:
    """

    return render_template('platform.html', body=Luwu().platform(name), footer=Luwu().ticker_platform)


@app.route('/vol/')
def vol():
    """
    交易量排名展示页
    :param
    :return:
    """
    return render_template('vol.html', body=Luwu().sort_by_symbol(), footer=Luwu().ticker_symbol)


@app.route('/vol/exchange/')
def vol_platform():
    """
    :param
    :return:
    """
    return render_template('vol_platform.html', body=Luwu().sort_by_platform(), footer=Luwu().ticker_platform)


if __name__ == '__main__':
    app.run()
