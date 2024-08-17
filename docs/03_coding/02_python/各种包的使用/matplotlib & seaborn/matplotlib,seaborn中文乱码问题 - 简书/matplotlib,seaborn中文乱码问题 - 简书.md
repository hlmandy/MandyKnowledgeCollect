# matplotlib,seaborn中文乱码问题 - 简书

[matplotlib,seaborn中文乱码问题 - 简书](https://www.jianshu.com/p/b76481530472 "matplotlib,seaborn中文乱码问题 - 简书")&#x20;

\[

在windows下面，matplotlib画图中文会显示乱码，主要原因是matplotlib默认没有指定中文字体。

有两种解决方案。

### 在画图的时候指定字体

```
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties
font = FontProperties(fname=r"c:\windows\fonts\simsun.ttc", size=12)

plt.plot([1,2,3])
plt.title(u"测试",fontproperties=font) 

```

![](https://upload-images.jianshu.io/upload_images/2957100-84fbecf2b474f7f4.png)

测试中文字符.png

这种方法比较麻烦，每次画图的时候，都要指定字体位置。下面介绍一种一劳永逸的方法。

### 修改配置文件

1.  将C:\\\Windows\\\Fonts 下面的字体 simsun.ttf，微软雅黑字体 拷贝到D:\\\Programs\\\Anaconda\\\Lib\\\site-packages\\\matplotlib\\\mpl-data\\\fonts\\\ttf 文件夹下。（Anaconda文件夹和安装位置有关）
2.  用记事本打开D:\\\Programs\\\Anaconda\\\Lib\\\site-packages\\\matplotlib\\\mpl-data\\\matplotlibrc

找到如下两行：

    #font.family         : sans-serif
    #font.sans-serif     : Bitstream Vera Sans, Lucida Grande, Verdana, Geneva, Lucid, Arial, Helvetica, Avant Garde, sans-serif 

去掉这两行前面的#，并且在font.sans-serif的冒号后面加上SimHei，结果如下所示

    font.family         : sans-serif
    font.sans-serif     : SimHei,Bitstream Vera Sans, Lucida Grande, Verdana, Geneva, Lucid, Arial, Helvetica, Avant Garde, sans-serif 

重新启动python，matplotlib就可以输出中文字符了。

## seaborn字体问题

上面的方法对于matplotlib是可以用的，但是如果引入了seaborn，就又会出现乱码，现在研究出来的方法是，在程序中加入以下代码

    import seaborn as sns
    sns.set_style('whitegrid',{'font.sans-serif':['simhei','Arial']}) 

## mac os x系统的乱码问题

    import matplotlib.pyplot as plt
    import seaborn as sns
     
    plt.rcParams['font.family'] = ['Arial Unicode MS'] 
    plt.rcParams['axes.unicode_minus'] = False 
     
    sns.set_style('whitegrid',{'font.sans-serif':['Arial Unicode MS','Arial']}) 

更多精彩内容，就在简书APP

"小礼物走一走，来简书关注我"

还没有人赞赏，支持一下

\[

![](https://cdn2.jianshu.io/assets/default_avatar/9-cceda3cf5072bcdd77e8ca4f21c40998.jpg)

]\([https://www.jianshu.com/u/2f554f1573bb](https://www.jianshu.com/u/2f554f1573bb "https://www.jianshu.com/u/2f554f1573bb"))

### 被以下专题收入，发现更多相似内容

### 推荐阅读[更多精彩内容](https://www.jianshu.com/ "更多精彩内容")

-   最近想学习一些python数据分析的内容，就弄了个爬虫爬取了一些数据，并打算用Anaconda一套的工具（pand...

    \[

![](https://cdn2.jianshu.io/assets/default_avatar/1-04bbeead395d74921af6a4e8214b4f61.jpg)

-   关于环境与CODING 什么是终端（命令行窗口）？在哪里打开？终端是一个基于文本的用来查看、 处理、 和操作您的计...
-   Matplotlib的中文显示，折腾了好久，总算是搞定了。之前根据网上的教程配置了matplotlibrc文件，却...

    \[

![](https://upload-images.jianshu.io/upload_images/1791718-ae55bd579d6ad1b8.png?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240/format/webp)

-   1 源起 自从开始学习Python，就非常喜欢用来画图。一直没有需求画要中文显示信息的图，所以没有配置Pytho...

    \[

![](https://upload-images.jianshu.io/upload_images/8504322-a6abe67b53300dca.png?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240/format/webp)

-   叶老师第44讲 \\\[高空 \\] 什么样的人生值得拥有？ 要点如下: 1. 拥有什么人生？这需要你系统化的思维系统的方法...

    \[

![](https://upload.jianshu.io/users/upload_avatars/6795929/983f0ebf-5769-4748-be7c-2999845cc3cd.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/48/h/48/format/webp)

![](https://upload-images.jianshu.io/upload_images/6795929-93ca8f475dfcce9b.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240/format/webp)

-   偶然看到的三毛语集。 1 一个不欣赏自己的人，是难以快乐的。 2 知音，能有一两个已经很好了，实在不必太多。朋友之...

    \[

![](https://cdn2.jianshu.io/assets/default_avatar/3-9a2bcc21a5d89e21dafc73b39dc5f582.jpg)

![](https://upload-images.jianshu.io/upload_images/3012079-291fea5b131d729b.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240/format/webp)

懵琪琪7]\([https://www.jianshu.com/u/3a8f72dcaf6e](https://www.jianshu.com/u/3a8f72dcaf6e "https://www.jianshu.com/u/3a8f72dcaf6e"))阅读 11,744评论 1赞 7

]\([https://www.jianshu.com/p/ac00d44214d8](https://www.jianshu.com/p/ac00d44214d8 "https://www.jianshu.com/p/ac00d44214d8"))

]\([https://www.jianshu.com/p/aecaf11bcd0d](https://www.jianshu.com/p/aecaf11bcd0d "https://www.jianshu.com/p/aecaf11bcd0d"))

青亦青]\([https://www.jianshu.com/u/25efe289899c](https://www.jianshu.com/u/25efe289899c "https://www.jianshu.com/u/25efe289899c"))阅读 434评论 0赞 0

\[

]\([https://www.jianshu.com/p/bd08a2f1463f](https://www.jianshu.com/p/bd08a2f1463f "https://www.jianshu.com/p/bd08a2f1463f"))

逝事拾]\([https://www.jianshu.com/u/ca6afc92e202](https://www.jianshu.com/u/ca6afc92e202 "https://www.jianshu.com/u/ca6afc92e202"))阅读 118评论 0赞 0

\[

]\([https://www.jianshu.com/p/929352597bae](https://www.jianshu.com/p/929352597bae "https://www.jianshu.com/p/929352597bae"))
