##  非小号网站数据分钟级抓取

## 功能（Features）

- 实现对非小号网站数据的分钟级抓取


Free,open-source based on python

## 功能特点（Features）

* 简单易用（Simple and easy to use）
* 菜单管理（Menu Manager）
* 操作管理（Action Manager）
* 模型视图分层，代码解耦（Repository && Presenters && Services）



## 环境要求（Requirements）

- **Python : 3.**
- **Scrapy : 1.3.3***
- **Composer**

## 我的开发环境（My Development Environment）

- Linux
- Python - 3.5.4
- mongodb - 3.2.11
- Scrapy - 1.3.3
- PyMongo - 3.5.1

## 安装步骤（Installation）

1. **`git clone 项目到本地`**
2. **`解压，或者直接进入项目目录（go.py所在的目录）`** # 进入目录
3. **`pip3 install requests scrapy fake_useragent pymongo`** # 安装运行环境
3. **`python3 go.py`** # 运行程序
4. ** 根据命令行提示参考不同需求进行抓取

> 注：如果是在windows平台，而且只安装了Python3版本的话，所有pip以及python的命令后面可以不用加3
> 例如：pip install Flask

## 各模块功能

- [ ] entrance.py
 **从网站获取所需要的币种链接以及平台链接，是后面抓取不可缺少的基础性数据**
- [ ] symbol.py
 **获取币种的各种不需要高频次更新的数据，比如币种的简介**
- [ ] plat.py
 **获取平台的各种不需要高频次更新的数据，例如平台的链接，以及平台的介绍，费率等**
- [ ] spider.py
 **需要高频更新，获取币种和平台的需要实时更新的信息**
- [ ] ticker.py
 **需要高频更新，获取币种动态信息，是动态数据的主要来源**
- [ ] main.py
 **多线程模块，动态分配ticker.py使其多线程运行**
- [ ] write_to_mongo.py
 **负责接管与数据库相关的操作**
- [ ] go.py
 **多进程模块，统一调用main.py（内部为多线程）与spider.py为两个进程同时运行进行动态高频抓取**




## 开源协议（License）

[MIT License](http://opensource.org/licenses/MIT)
