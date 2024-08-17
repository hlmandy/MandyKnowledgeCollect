[TOC]
参考资料：

[python logging模块](http://www.cnblogs.com/dahu-daqing/p/7040764.html)

[以打印日志为荣之logging模块详细使用](https://www.cnblogs.com/deeper/p/7404190.html)


[Python + logging 输出到屏幕，将log日志写入文件](https://www.cnblogs.com/nancyzhu/p/8551506.html)



## 1. logging日志框架
主要包括四部分：

* Loggers: 可供程序直接调用的接口，app通过调用提供的api来记录日志
* Handlers: 决定将日志记录分配至正确的目的地
* Filters:对日志信息进行过滤， 提供更细粒度的日志是否输出的判断
* Formatters: 制定最终记录打印的格式布局
### 1）loggers
loggers 就是程序可以直接调用的一个日志接口，可以直接向logger写入日志信息。logger并不是直接实例化使用的，而是通过 **logging.getLogger(name)** 来获取对象，事实上logger对象是单例模式，logging是多线程安全的，也就是无论程序中哪里需要打日志获取到的logger对象都是同一个。但是不幸的是logger并不支持多进程，这个在后面的章节再解释，并给出一些解决方案。【注意】loggers对象是有父子关系的，当没有父logger对象时它的父对象是root，当拥有父对象时父子关系会被修正。
举个例子，logging.getLogger(&quot;abc.xyz&quot;) 会创建两个logger对象，一个是abc父对象，一个是xyz子对象，同时abc没有父对象，所以它的父对象是root。但是实际上abc是一个占位对象（虚的日志对象），可以没有handler来处理日志。但是root不是占位对象，如果某一个日志对象打日志时，它的父对象会同时收到日志，所以有些使用者发现创建了一个logger对象时会打两遍日志，就是因为他创建的logger打了一遍日志，同时root对象也打了一遍日志。
### 2）Handlers
Handlers 将logger发过来的信息进行准确地分配，送往正确的地方。举个栗子，送往控制台或者文件或者both或者其他地方(进程管道之类的)。它决定了每个日志的行为，是之后需要配置的重点区域。每个Handler同样有一个日志级别，一个logger可以拥有多个handler也就是说logger可以根据不同的日志级别将日志传递给不同的handler。当然也可以相同的级别传递给多个handlers这就根据需求来灵活的设置了。
### 3）Filters
Filters 提供了更细粒度的判断，来决定日志是否需要打印。原则上handler获得一个日志就必定会根据级别被统一处理，但是如果handler拥有一个Filter可以对日志进行额外的处理和判断。例如Filter能够对来自特定源的日志进行拦截or修改甚至修改其日志级别（修改后再进行级别判断）。logger和handler都可以安装filter甚至可以安装多个filter串联起来。
### 4） Formatters
Formatters 指定了最终某条记录打印的格式布局。Formatter会将传递来的信息拼接成一条具体的字符串，默认情况下Format只会将信息%(message)s直接打印出来。Format中有一些自带的LogRecord属性可以使用，如下表格:![88285ea42a814000a91de29a15a4afca.png](en-resource://database/4791:1)

一个Handler只能拥有一个Formatter 因此如果要实现多种格式的输出只能用多个Handler来实现。上图只是一部分，更详细的在docs.python.org里找logging模块：![3144d0895e0b179d0c03aa00a4d2ca48.png](en-resource://database/4793:1)


## 2. 日志级别
在记录日志时, 日志消息都会关联一个级别(“级别”本质上是一个非负整数)。系统默认提供了6个级别，它们分别是：![d89acf9b82462a9414cefe5800bd167a.png](en-resource://database/4795:1)
可以给日志对象(Logger Instance)设置日志级别，低于该级别的日志消息将会被忽略，也可以给Hanlder设置日志级别，对于低于该级别的日志消息, Handler也会忽略。![395e1b7186128afa8cb2c4ccb5ab3df6.png](en-resource://database/4797:1)


| 级别     | 何时使用                                                     | 数字值 |
| -------- | ------------------------------------------------------------ | ------ |
| DEBUG    | 详细信息，一般只在调试问题时使用。                           | 10     |
| INFO     | 证明事情按预期工作。                                         | 20     |
| WARNING  | 某些没有预料到的事件的提示，或者在将来可能会出现的问题提示。例如：磁盘空间不足。但是软件还是会照常运行。 | 30     |
| ERROR    | 由于更严重的问题，软件已不能执行一些功能了。                 | 40     |
| CRITICAL | 严重错误，表明软件已不能继续运行了。                         | 50     |





## 3. 常用函数
### 1）logging.basicConfig([**kwargs]):
为日志模块配置基本信息。设置后可以直接使用logging来打印日志
kwargs 支持如下几个关键字参数：
**filename** ：日志文件的保存路径。如果配置了些参数，将自动创建一个FileHandler作为Handler；
**filemode** ：日志文件的打开模式。 默认值为’a’，表示日志消息以追加的形式添加到日志文件中。如果设为’w’, 那么每次程序启动的时候都会创建一个新的日志文件；
**format** ：设置日志输出格式；
**datefmt** ：定义日期格式；
**level** ：设置日志的级别.对低于该级别的日志消息将被忽略；
**stream** ：设置特定的流用于初始化StreamHandler；
```python
logging.basicConfig(level=log_level, format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s', datefmt='%a, %d %b %Y %H:%M:%S', filename='parser_result.log', filemode='w')
logging.debug('This is debug message')
logging.info('This is info message')
logging.warning('This is warning message'
```

### 2）logging.getLogger([name])
创建Logger对象。日志记录的工作主要由Logger对象来完成。在调用getLogger时要提供Logger的名称（注：多次使用相同名称来调用getLogger，返回的是同一个对象的引用。），Logger实例之间有层次关系，这些关系通过Logger名称来体现，如：
p = logging.getLogger(“root”)
c1 = logging.getLogger(“root.c1”)
c2 = logging.getLogger(“root.c2”)
例子中，p是父logger, c1,c2分别是p的子logger。c1, c2将继承p的设置。如果省略了name参数, getLogger将返回日志对象层次关系中的根Logger。



## json配置法

```python
import logging, logging.config
import os
import json

CONFIG_LOGGING = 'logging.json'
if os.path.exists(CONFIG_LOGGING):    
    with open(CONFIG_LOGGING, "r") as f:        
        config = json.load(f)        
        logging.config.dictConfig(config)
logging.debug("This is debug message")
logging.info("This is info message")
logging.warning("This is warning message")

```
logging.json
``` json
{
    "version": 1,
    "disable_existing_loggers": "False",
    "formatters": {
        "verbose": {
            "format": "[%(asctime)s] %(filename)s  %(funcName)s [%(levelname)s]: %(message)s ",
            "datefmt": "%Y-%m-%d %H:%M:%S"
        },
        "simple": {
            "format": "[%(asctime)s] %(filename)s  %(funcName)s [%(levelname)s]: %(message)s"
        }
    },
    "handlers": {
        "console": {
            "level": "INFO",
            "class": "logging.StreamHandler",
            "formatter": "simple"
        },
        "file": {
            "level": "DEBUG",
            "class": "logging.handlers.TimedRotatingFileHandler",
            "filename": "handler.log",
            "formatter": "verbose",
            "backupCount": 30,
            "encoding": "utf-8",
            "when": "D"
        }
    },
    "loggers": {
        "": {
            "handlers": ["file", "console"],
            "level": "DEBUG"
        }
    }
}
```