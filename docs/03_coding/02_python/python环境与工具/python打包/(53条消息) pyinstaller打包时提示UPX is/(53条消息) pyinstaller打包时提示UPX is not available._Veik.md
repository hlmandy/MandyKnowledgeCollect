# (53条消息) pyinstaller打包时提示UPX is not available.\_Veiko的博客-CSDN博客\_pyinstaller upx不可用

pyinstaller打包时提示UPX is not available.
\=====================================

![](https://csdnimg.cn/release/blogv2/dist/pc/img/original.png)

[Veiko](https://blog.csdn.net/chentianveiko "Veiko")&#x20;

![](https://csdnimg.cn/release/blogv2/dist/pc/img/newCurrentTime2.png)

![](https://csdnimg.cn/release/blogv2/dist/pc/img/articleReadEyes2.png)

分类专栏： [python](https://blog.csdn.net/chentianveiko/category_7060641.html "python") 文章标签： [python](https://so.csdn.net/so/search/s.do?q=python\&t=blog\&o=vip\&s=\&l=\&f=\&viparticle= "python") [PyQt](https://so.csdn.net/so/search/s.do?q=PyQt\&t=blog\&o=vip\&s=\&l=\&f=\&viparticle= "PyQt") [pyinstaller](https://so.csdn.net/so/search/s.do?q=pyinstaller\&t=blog\&o=vip\&s=\&l=\&f=\&viparticle= "pyinstaller") [打包](https://so.csdn.net/so/search/s.do?q=%E6%89%93%E5%8C%85\&t=blog\&o=vip\&s=\&l=\&f=\&viparticle= "打包")

版权声明：本文为博主原创文章，遵循 [CC 4.0 BY-SA](http://creativecommons.org/licenses/by-sa/4.0/ "CC 4.0 BY-SA") 版权协议，转载请附上原文出处链接和本声明。

本文链接：[https://blog.csdn.net/chentianveiko/article/details/107083912](https://blog.csdn.net/chentianveiko/article/details/107083912 "https://blog.csdn.net/chentianveiko/article/details/107083912")

版权

\[

![](https://img-blog.csdnimg.cn/20201014180756928.png?x-oss-process=image/resize,m_fixed,h_64,w_64)

8 篇文章 0 订阅

订阅专栏

我开发PyQt应用程序时, 开发环境是由Anaconda来管理的, 开发完一个窗口应用程序, 在进行打包时有个奇怪的提示:

![](https://img-blog.csdnimg.cn/20200702143651204.png)

显然, 这条有这个提示, 后面的打包肯定不能正常完成了。

查了一下, 原来是pyinstaller使用UPX压缩, 所以根据下面的步骤安装了一个UPX就好了:

(1) 到官网 [https://upx.github.io/](https://upx.github.io/ "https://upx.github.io/") 下载了UPX(我的是Window 32版本), 下载下来是一个压缩包

(2) 解压得到 upx.exe文件

(3) 把exe文件拷贝到pyinstaller目录下, 我的是 E:\ProgramData\Anaconda3\envs\v\_pyqt\_ 0001\Scripts

![](https://img-blog.csdnimg.cn/20200702144434261.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW50aWFudmVpa28=,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/20200702144503667.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW50aWFudmVpa28=,size_16,color_FFFFFF,t_70)

然后再重新运行pyinstaller命令就会提示: UPX is available了。

文章知识点与官方知识档案匹配，可进一步学习相关知识

[Python入门技能树桌面应用开发PyQT](https://edu.csdn.net/skill/python/python-3-175 "Python入门技能树桌面应用开发PyQT")40534 人正在系统学习中

\$(function() { setTimeout(function () { var mathcodeList = document.querySelectorAll('.htmledit\\\_views img.mathcode'); if (mathcodeList.length > 0) { var testImg = new Image(); testImg.onerror = function () { mathcodeList.forEach(function (item) { \$(item).before('\<span class="img-codecogs">\\\\\\\\(' + item.alt + '\\\\\\\\)\</span>'); \$(item).remove(); }) MathJax.Hub.Queue(\\\["Typeset",MathJax.Hub\\]); } testImg.src = mathcodeList\\\[0\\].src; } }, 1000) })

于 2020-07-02 14:46:07 发布&#x20;

![](https://csdnimg.cn/release/blogv2/dist/pc/img/tobarCollect2.png)

![](https://csdnimg.cn/release/blogv2/dist/pc/img/tobarCollectionActive2.png)

收藏  86&#x20;

python 专栏收录该内容]\([https://blog.csdn.net/chentianveiko/category\_7060641.html](https://blog.csdn.net/chentianveiko/category_7060641.html "https://blog.csdn.net/chentianveiko/category_7060641.html") "python")&#x20;
