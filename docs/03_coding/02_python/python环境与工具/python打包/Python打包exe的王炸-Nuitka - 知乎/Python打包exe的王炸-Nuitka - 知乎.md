# Python打包exe的王炸-Nuitka - 知乎

python写代码很爽，一直写一直爽！打包的时候就不一定爽鸟***目前最稳定版本-0.6.15(2021-6-6更新 )***

常见稳定版本（0.6.8.4 ，0.6.15，0.6.11.6） &#x20;
Python唯二的难题运行速度和源代码反编译，一直是被众多语言所诟病。今天我们解决这个问题，享受C++的速度，免于反编译的担忧，更多打包技巧与nuitka教程请关注，以下是已经打包成功解决的python模块，包含Win，Linux，MacOS三大系统

-   Pytorch
-   Tensorflow
-   Keras
-   Pandas
-   Scipy
-   **Numpy ==1.20.0(尽量使用这个版本，无数人栽在numpy，就是因为版本问题)**
-   PyqtGraph
-   Pywin32
-   Tkinter
-   Wxpython
-   Matplotlib
-   PyQt5-QtWebEngine
-   PySimpleGUI
-   Pyside2
-   Openpyxl
-   Opencv-python
-   PythonOCC
-   Pyvista -VTK
-   Fiona

> 废话不多说，直接上视频，打包出现Bug的请提供命令和报错信息，有问题请在Github官网提issues。新的Nuitka文章还是会继续总结和更新的，如果有打包失败的模块(上面没有列出来)请留言，可能会成为我们的下一个教程目标。QQ群：365072404

***更新高阶版，95%的打包问题在这里可以解决***

**如果入门还是没有成功，不妨看看其他入门者的心得**

***遇到常见的bug，解决方案也给你留下（三百群友们的集体智慧）***

顺便去github查看其它开发者提的问题，少走弯路

Stack Overflow上面的提问也很多，不失为一个参考，我经常在上面查找

![](https://pic2.zhimg.com/v2-60fcfd5d427b443717c6efac3c3ffdad_b.jpg)

网上可用可操作的例子的不多，实战的更不多，这篇文章将翔实的介绍Nuitka打包python文件,祝各位早日用上Nuitka，不再被其他语言给鄙视 &#x20;
Nuitka项目就是解决这两个难题而生的，看看Nuitka作者Kay Hayen怎么说的，各位想一睹仙容的，去Youtube上去看看历次Pycon DE分享)

![](https://pic4.zhimg.com/v2-4ea9ba97a1f0044e49d36978657a0f37_b.jpg)

经测试，Nuitka打包后的exe比Pyinstaller打包后的exe运行速度提升30%，PyQT5的UI文件转换成py文件转换成C语言后，界面秒开呀。

-   **Numpy等类似c程式和pyd的调用还是忽略编译好**，不要一咕噜全梭哈啦，编译后反而更慢。重点事项是要小本本记上，别说本豪猪没有提醒呀
-   **Nuitka的优化命令阅读本文后再了解下**[**《Nuitka之乾坤大挪移-让天下的Python都可以打包》**](https://zhuanlan.zhihu.com/p/137785388 "《Nuitka之乾坤大挪移-让天下的Python都可以打包》")**，打包和调试时间节省到5分钟内。** PyQT,Numpy,Scipy,Pandas,Opencv,OpenpyXL等pyd的模块不编译，交给python3x.dll来调用，避免模块依赖失败。生成的UI\_xxx.py文件和你编写的py模块(可以包含IP,密码)放到一个下一级的文件夹，设置为必须编译为C/C++。***从此你的打包成功率提升到95%，exe打开速度提升到一秒左右***。

```text
--nofollow-imports  # 所有的import不编译，交给python3x.dll执行
--follow-import-to=need  # need为你需要编译成C/C++的py文件夹命名
```

-   其他电脑在使用编译完成后的exe文件，**VC运行库至少升级到2015**
-   编译完成后的**文件夹名称不能有或修改成中文**
-   打包单个exe的工具
-   打包单个pyd，***加密源码或者密码和IP,也改善打包exe的失败概率***
-   nuitka打包pyd进阶版，根据很多群友打包成功，使用失败的案例，更新打包pyd视频解答，解释pyd的运行机制和import须知内容(科普pyd和python的依赖关系，这方面的误解太多太深)
-   MacOS系统下的打包，不需要配置gcc
-   Anaconda和Miniconda也有相当的用户基础
-   PythonOCC也是工业界的刚需
-   Linux下的打包是必经之路

近来关注和点赞的朋友好多都是python新手，新手入门nuitka好处是没有pyinstaller的包袱，养成步步为营的科学思维；坏处是要一步步对照这来遇到报错有点慌，下面的文章详细讲解到python新手遇到报错如何处理的思路，希望能帮助到大家

来我们开始吧

1.  下载MinGW64 8.1(MinGW编译器比MSVS编译器要快，并且不需要下载一堆20多G的安装文件到C盘)，市面上有新的版本，目前为止还是这个版本最稳定 &#x20;

    [https://sourceforge.net/projects/mingw-w64/files/](https://link.zhihu.com/?target=https%3A//sourceforge.net/projects/mingw-w64/files/ "https://sourceforge.net/projects/mingw-w64/files/") &#x20;

    版本不要弄错(最低的是8.1.0版本，32和64位的版本要注意) &#x20;

    很多朋友反馈MinGW64下载失败，我整理压缩包后，放在百度网盘方便大家：[https://pan.baidu.com/s/1CpdGxZj2hRsU\_Z0ukp6kqg](https://link.zhihu.com/?target=https%3A//pan.baidu.com/s/1CpdGxZj2hRsU_Z0ukp6kqg "https://pan.baidu.com/s/1CpdGxZj2hRsU_Z0ukp6kqg")

提取码：8888

![](https://pic2.zhimg.com/v2-f0aa64092f3233af20cfb35a140969cd_b.jpg)

![](https://pic2.zhimg.com/v2-7c7d77220cfbb331d58d5d63ccbfbc59_b.jpg)

2\\. 解压后放在C盘目录下，查询gcc.exe是否有效

输入gcc.exe --version 检查是否有版本显示

![](https://pic4.zhimg.com/v2-3eb80238f0770e8dfc5e9d58928938ef_b.jpg)

3\\. 设置环境变量

![](https://pic4.zhimg.com/v2-c0b7270c11bff8e63fa2bff7feb0068b_b.jpg)

4.安装 Nuitka

pip install nuitka

或者安装最新版本(根据使用经验发现新版本修复问题多，兼容性更好)

pip install -U "[https://github.com/Nuitka/Nuitka/archive/develop.zip](https://link.zhihu.com/?target=https%3A//github.com/Nuitka/Nuitka/archive/develop.zip "https://github.com/Nuitka/Nuitka/archive/develop.zip")"

![](https://pic4.zhimg.com/v2-1c65333bd27c448e9ffa780e3b73ce0f_b.jpg)

5.编译文件，**以下是常用命令，仅限入门使用，仅限入门使用，仅限入门使用，** 高级部分看另一篇教程

\\--mingw64 #默认为已经安装的vs2017去编译，否则就按指定的比如mingw(官方建议)

\\--standalone 独立环境，这是必须的(否则拷给别人无法使用)

\\--windows-disable-console 没有CMD控制窗口

\\--output-dir=out 生成exe到out文件夹下面去

\\--show-progress 显示编译的进度，很直观

\\--show-memory 显示内存的占用

> **--include-qt-plugins=sensible,styles 打包后PyQt的样式就不会变了**

\\--plugin-enable=qt-plugins 需要加载的PyQt插件

\\--plugin-enable=tk-inter 打包tkinter模块的刚需

\\--plugin-enable=numpy 打包numpy,pandas,matplotlib模块的刚需

\\--plugin-enable=torch 打包pytorch的刚需

\\--plugin-enable=tensorflow 打包tensorflow的刚需

\\--windows-icon-from-ico=你的.ico 软件的图标

\\--windows-company-name=Windows下软件公司信息

\\--windows-product-name=Windows下软件名称

\\--windows-file-version=Windows下软件的信息

\\--windows-product-version=Windows下软件的产品信息

\\--windows-file-description=Windows下软件的作用描述

\\--windows-uac-admin=Windows下用户可以使用管理员权限来安装

\\--linux-onefile-icon=Linux下的图标位置

\\--onefile 像pyinstaller一样打包成单个exe文件(2021年我会再出教程来解释)

**--include-package=复制比如numpy,PyQt5 这些带文件夹的叫包或者轮子**

**--include-module=**[**复制比如when.py**](http://xn--when-kn9fh67apxa858h.py "复制比如when.py")\*\* 这些以.py结尾的叫模块\*\*​

如下是一条完整的命令 [编译的py文件为index.py](http://xn--pyindex-g73kr8ct00j0bzbhrvr01b.py "编译的py文件为index.py")（注意这是入门命令）

nuitka --mingw64 --standalone --show-progress --show-memory --plugin-enable=qt-plugins --include-qt-plugins=sensible,styles --output-dir=out [index.py](http://index.py "index.py")

看视频中的exe运行是不是很快，动手试试吧。可以放心用Python写代码了，也不用担心源码被别人看见，速度慢也不见得哦，现在可是C语言的代码了。著名的Blender就是用Nuitka编译的

![](https://pic4.zhimg.com/v2-b928f5eadc1f6c699ede2b5328d2f003_b.jpg)

这些文章都是我花费了好久的时间不断测试与探索，后期的一些bug总结文章是我们群的极客们总结的，顺手点个赞，与我们一起祝python从此走出反编译和速度慢的魔域！！！
