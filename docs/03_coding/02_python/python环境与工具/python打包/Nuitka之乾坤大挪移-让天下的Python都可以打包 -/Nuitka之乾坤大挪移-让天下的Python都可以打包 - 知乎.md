# Nuitka之乾坤大挪移-让天下的Python都可以打包 - 知乎

[Nuitka之乾坤大挪移-让天下的Python都可以打包 - 知乎](https://zhuanlan.zhihu.com/p/137785388 "Nuitka之乾坤大挪移-让天下的Python都可以打包 - 知乎")&#x20;

## &#x20;我们的目标是：*只要能运行的py，就一定能成功打包*

上一篇文章《[Python打包exe的王炸-Nuitka](https://zhuanlan.zhihu.com/p/133303836 "Python打包exe的王炸-Nuitka")》反响很热烈，风扇顶不住的，打包一下午的，Golang秀优越感的，不够pyinstaller好欺负的，cxfreeze抽筋的都纷纷表示不服，Nuitka：这锅得你自己来背！！！

![](https://pic4.zhimg.com/v2-8237938d6f4a9c47b981c54d1d72a93f_b.jpg)

老规矩先奉上视频(***这次笔记本可以放心操作***)

在你学完本篇秘籍之后，pyinstaller打包时代的顽固份子numpy cv2 keras scipy sklearn等,可以尽情地将它们按在地上来回摩擦了

![](https://pic3.zhimg.com/v2-2866c2cd69fa166bd60c0c3fd98754da_b.jpg)

本着我的问题是我的，你的问题也是我的，bug才能改好。那么新问题来了:我的钱是我的，你的钱也是···ni de, 社会才能和谐

![](https://pic4.zhimg.com/v2-5c50170282704a8c03eb4e2de1d4075f_b.gif)

别跑了，进入正题了，以下是一份常见PyQT5的import和文件夹内容,常规下都会打包到文件夹中去，绿色部分比如PyQT5，numpy，PIL，cv2，Tensorflow,Sklearn这些要是转换成C/C++意义不大，并且打包时间会延长到几个小时，风扇狂响，笔记本小概率上会撑不到新exe的到来(So we have to change)

![](https://pic3.zhimg.com/v2-b96713cbd02c0ea67c2ebd395966faee_b.jpg)

![](https://pic4.zhimg.com/v2-5e88ad7ac2895d4f5be0994860a18d6f_b.jpg)

从效率和反编译的角度来看，绿色的部分直接让打包好的exe文件夹内的python3x.dll来执行，不用去理会各个模块的版本依赖和江湖恩怨，实现高度自治

黄色部分是UI界面和数据库的连接以及函数和功能实现，需要加密和快速反应的，用户的体验就在这里，这部分借助Nuitka来实现。

如果能做到双兼顾，不得不说这是一个天才编程师的构思，接下来我们看看Nuitka提供的功能(CMD窗口输入 nuitka --help)

![](https://pic1.zhimg.com/v2-05b0cc5e98ac4478c034fb53a9e08830_b.jpg)

![](https://pic4.zhimg.com/v2-f1a25b613136ce5b2dac63a2e4deb5d3_b.jpg)

以下是Nuitka的关键命令段

-   **--nofollow-imports #所有的import全部不使用，交给python3x.dll执行**
-   **--follow-import-to=need #need为你需要编译成C/C++的py文件夹命名**

文件修改前：

![](https://pic4.zhimg.com/v2-364552fe28341c40da675be8d394f6eb_b.jpg)

修改后：

![](https://pic1.zhimg.com/v2-4391f83f9b1a43a13166f71f9a197c18_b.jpg)

从视频中看Nuitka打包exe的时间和Pyinstaller基本上已经一样了，几分钟内就可以解决，复杂的程序不需要像Pyinstaller来回调试依赖版本和import的deep层级，难易程度不在一个级别。python能运行的Nuitka打包后照样运行

调试前的命令行(need为文件夹名称，可自行修改)：

```text
nuitka --standalone --mingw64 --show-memory --show-progress --nofollow-imports --plugin-enable=qt-plugins --include-qt-plugins=sensible,styles --follow-import-to=need --output-dir=o 你的.py
```

调试后的命令行(need为文件夹名称，可自行修改)：

```text
nuitka --standalone --windows-disable-console --mingw64 --nofollow-imports --show-memory --show-progress --plugin-enable=qt-plugins --include-qt-plugins=sensible,styles --follow-import-to=need --output-dir=o 你的.py
```

这种结构的巧妙之处在于避开了pyinstaller经常不稳定的状况，比如numpy版本更新的太快，Scipy和Sklearn,Kearas还没有更新，或者彼此的版本差异导致的依赖出错，在pycharm或者VSCode运行时并不会报错，在exe模式下会报错导致打包一直无法成功，也使得pyinstaller的体验一直不怎么好

Pyinstaller的天生缺陷也注定密码和IP不能直接写入到PyQT中去，反编译不解决就不能上更高的台阶，Pyinstaller的历史作用也就仅此而已，Nuitka的优势因此显而易见

文末回答一个老生常谈的问题，Nuitka到底比Pyinstaller快多少？这里没有记录纸质数据，从大家的反馈总结来看，最少30%，最多150%。

重点是到目前为止Nuitka( 版本0.6.8rc5 )并没有做性能的优化，预计Nuitka1.0的正式版本性能比python版本exe最少提升80%

打包出现Bug的请私信截图或者在群内询问，公众号有入口；这里的评论我没法解决大家的提问。

下一篇文章我们继续聊Nuitka的优化和其他小技巧，敬请期待！
