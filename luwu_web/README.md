##  BTC网站数据监控实时展示

## 功能（Features）

- 实现世界各大比特币网站数据的监控抓取后不同维度的展示


Free,open-source based on python

## 功能特点（Features）

* 简单易用（Simple and easy to use）
* 菜单管理（Menu Manager）
* 操作管理（Action Manager）
* 模型视图分层，代码解耦（Repository && Presenters && Services）



## 环境要求（Requirements）

- **Python : 3.**
- **Flask : 0.12.***
- **Composer**

## 我的开发环境（My Development Environment）

- Linux
- Python - 3.5.4
- mongodb - 3.2.11
- Flask - 0.12.2
- Flask-PyMongo - 0.5.1
- jinja2 - 2.9.6
- flask-bootstrap-3.3.7.1

## 安装步骤（Installation）

1. **`git clone http://dadanliao.com/big-data/luwu_coinmarketcap.git`**
2. **`cd luwu_coinmarketcap`** # 进入目录
3. **`pip3 install Flask Flask-PyMongo flask-bootstrap`** # 安装运行环境
3. **`python3 mongo.py`** # 填充数据
4. **`python3 main.py`** # 开启服务，当命令行显示`Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)`时，即为环境部署成功，最后浏览器打开地址"http://127.0.0.1:5000/index/观看效果

> 注：如果是在windows平台，而且只安装了Python3版本的话，所有pip以及python的命令后面可以不用加3
> 例如：pip install Flask

## 计划新增功能（Todo）

- [ ] 发送邮件（Send Email）




## 开源协议（License）

[MIT License](http://opensource.org/licenses/MIT)


## 关于（About）

time：2017-09-27
