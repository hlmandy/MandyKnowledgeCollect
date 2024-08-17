# Nuitka入门指南-新手必备 - 知乎

[Nuitka入门指南-新手必备 - 知乎](https://zhuanlan.zhihu.com/p/341099225 "Nuitka入门指南-新手必备 - 知乎")&#x20;

这年头不提Nuitka都不好意思说会Python打包，感谢 2020年对Nuitka的大力宣传，然而**Nuitka入门**依然困扰着许多Python爱好者，本文内容来自群友(QQ:2963237571)的**Nuitka入门心得**，秉承着独乐不如众乐来记录的入门过程

> 致敬所有分享并热爱Python的朋友，**世界会因为知识的分享与传播变得公平和宽容。**&#x20;

新手入门注意：

-   不要使用Anaconda和其他多版本Python管理工具下的电脑来入门，实在没办法使用虚拟机或者其他干净电脑进行入门
-   Nuitka使用版本为0.6.10.4，稳定版本我会一直这里更新，mingw64主要的版本和其他文件全部放在这里，很多朋友反馈下载不了，我放在网盘里面了，阿里云网盘不支持压缩文件，只能将就了链接：[https://pan.baidu.com/s/1CpdGxZj2hRsU\_Z0ukp6kqg](https://link.zhihu.com/?target=https%3A//pan.baidu.com/s/1CpdGxZj2hRsU_Z0ukp6kqg "https://pan.baidu.com/s/1CpdGxZj2hRsU_Z0ukp6kqg")

提取码：8888

-   调试的时候--windows-disable-console这个命令不要加入，否则看不到报错
-   打包超过3分钟就有问题
-   不要修改文章提供的标准命令
-   命令中out-dir和py路径不要有盘符，盘符和过多的文件夹路径意味着起始文件的路径不在当前下，对其他静态文件的引用是致命的错误

以下是正文：

-   \* \*

虽然号称新人，但是在Python程序编码上还是得有一定基础的。这里的基础明确指的是会用某UI设计模块如PyQt5等，编出自己想编的UI界面。如下本人基于PyQt5自己编的简单界面：

![](https://pic2.zhimg.com/v2-0b2337d91a0eb93c6b4d8d79e27b7801_b.jpg)

本人因为业务要进行商用，所以必须对代码进行封装。网上对于Python代码进行封装，见得最多的是Pyinstaller和Nuitka。相对来讲Pyinstaller更容易上手一些，我在封装的过程中，首先接触的也是Pyinstaller，并且同样实现将上述UI界面实现封装打包，但是要进行下一步代码和包的添加时，迟迟无法往下走，本质原因也许是没有深入了解Pyinstaller的各个命令，没有办法把握Pyinstaller的“脾气”。当面对Pyinstaller无论如何都能打包出来的.exe文件，结果却是没有办法正常运行时，本人深感无力，不知道应该如何改善。

这样的情况下我只能寻求他法，Nuitka就这样走入我的视野。这里必须得感谢知乎大神 ，我本人是按照专栏“Nuitka-Python打包exe”一步一步深入，最终花了两天时间解决所有封装问题。

废话少说，这就开始吧！

第一步，按照文章

所述，安装MinGW64 8.1，并运行成功。(附：还有更高的GCC版本可用，MinGW8.1是目前最稳定的版本)

![](https://pic2.zhimg.com/v2-8e61ac6f00f8a03c2d8d415bb80ff069_b.jpg)

第二步，安装Nuitka，直接pip install nuitka，结果如下：

![](https://pic3.zhimg.com/v2-9564e94fd43cb13e4ddba8ea1b73271a_b.jpg)

第三步，写一段简单python程序，[命名为hello.py](http://xn--hello-dq1h016auza.py "命名为hello.py")，并存放到给定文件夹下，程序代码如下：

```text
def talk(message:str):
    return "Talk " + message
def main():
    print(talk("Hello World"))
if __name__ == "__main__":
    main()
```

第四步，在hello.py存放文件夹下，地址栏输入cmd,弹出命令行窗口，直接运行nuitka [hello.py](http://hello.py "hello.py")，结果如下(附：**如果窗口内有黄色字体提示需要下载depends.zip，请输入Yes，这是dll和exe文件依赖的分析工具,用来查找文件；如果出现下面的You are not using ccache提示，可以在群文件里下载或者官网下载后解压放在python3x/Scripts的目录下，这个c++编译后的缓存文件二次利用，有一点点作用，不装也是可以的)**

![](https://pic3.zhimg.com/v2-1aa7e50af5451ec491be0b28f5a51e96_b.jpeg)

![](https://pic3.zhimg.com/v2-3ebca8ac6b656742fd9062ff0fae0486_b.jpg)

第五步，当前文件夹下生成hello.exe，继续在命令行窗口运行 hello.exe，结果如下

![](https://pic3.zhimg.com/v2-cfe6f0597d6958dd7c83e9e786eaf67e_b.jpeg)

以上代码和步骤参考文章

如果新人一步步走到这里，说明你对Python和Nuitka有了初步的了解，这是保证你后面继续成功的关键步骤。

接下来，我就强迫自己学着去打包上面提到的pyqt5简单UI界面。由于各方面原因这里不能给出UI源代码，新人自己在网上可以找到pyqt5简单UI界面源代码，随便找一个自己已经成功在python环境下运行的源代码就行。记住，这里的关于简单UI界面源代码，一定要保证简单，即import的包除了系统相关之外，只有一个UI界面的包，比如只有一行

from PyQt5.QtWidgets import QMainWindow, QApplication

这样一个加载包的代码，后面就是界面代码了。（这里本质上就要求新人能写出python用户界面，要求有点高，但是没有办法，因为只有能写出新人自己的用户界面程序，才能真正证明新人在Python上入门了……..）(附：**本群不加Python和Nuitka小白,这是保证群能够正常讨论的必要，手动dog**)

然后，按照文章中所提的命令

```text
“nuitka --mingw64 --standalone --show-progress --show-memory --plugin-enable=qt-plugins --output-dir=out 你的.py”
```

在“[你的.py](http://xn--6qq176g.py "你的.py")”所在文件夹下的命令行窗口进行编译，应该就能得到第一个简单exe程序，双击运行之后应该就是新人自己的用户界面，如图1所示。**也许你一上来不明白这一长串编译命令到底是干什么的（我一开始也不明白），但是，干就完事了**。

接下来第二步，就是在已经成功的UI界面程序中添加别的常用包，比如numpy，panda等，如

```text
import numpy as np
import pandas as pd
```

然后用这些包写一些简单的代码，保证调用这些包，并在Python环境中能正常运行，如

```text
Print(np.array(range(10), dtype=np.float))
```

为什么要这么反复的一步步走？目的是为了保证你每一步都能知道你在干什么，如果打包失败，肯定是因为这些新添加的代码引起，如果一下子添加过多代码，不好找到错误的地方。

接下来按照文章

进行操作，首先一定一定一定要深入了解这个文章的含义，从中慢慢了解编译命令中各项的含义，并且要看文章中所包含的视频，不用急着跳着看，仔细观察视频中的内容和细节，然后用调试编译命令：

```text
nuitka --standalone --mingw64 --show-memory --show-progress --nofollow-imports --plugin-enable=qt-plugins --follow-import-to=need --output-dir=o 你的.py
```

在“[你的.py](http://xn--6qq176g.py "你的.py")”所在文件夹下的命令行窗口进行编译。

注意，**这里已经不适用上面提到的第一个编译命令了，而是改用这个新的编译命令**，这个新的编译命令能保证让你在几分钟之内出来一个封装结果，存在一个名字为o的文件夹里面，一般情况下里面会有两个文件夹，这些细节你都可以从文章里包含的视频中看出。

接下来，就是最为关键也是最为耗时的阶段了。首先，到”. \o\UI\_test1.dist”文件夹下，打开命令行窗口，运行.exe文件（这些细节都可以从文章里包含的视频中看出）。一般情况下，命令行窗口会提示缺少模块，这时候，就应该到安装python的文件下的“\Python38\Lib\site-packages”去找相对应的文件或者文件夹，然后直接复制到之前提到的”. \o\UI\_test1.dist”文件夹下（这些细节都可以从文章里包含的视频中看出），每完成一个模块的添加，那么运行.exe文件时命令行提示窗口中就会进行到下一个步骤，**直到你把每一个需要的模块都添加完毕，你的经过初步修改用户界面程序才能完整运行（这些细节都可以从文章里包含的视频中看出）。**&#x20;

注意，这个时候，你应该能敏锐的感觉到，**这个手动添加模块的过程，实际上就相当于重建了一个python程序运行的环境**（其中的理论上述文章均有涉略）。既然如此，你完全可以先对你要使用到的各个模块在程序中添加完毕，然后就去封装打包，在调试过程中，所有手动添加的模块都复制到一个新的文件夹中（模块手动添加完毕之后，在\o\UI\_test1.dist文件夹下按照创建时间排序，就可以把这一段时间手动添加的模块或者文件全部找到，复制一份即可），在之后添加所有代码完毕之后，再次进行封装时，直接将之前手动添加的文件直接复制到\o\UI\_test1.dist文件夹下即可。所以，调试过程中手动添加文件是最重要最耗时阶段，**从本人经验来讲，也是很重要的编译阶段，至少让我重新过滤一遍代码，重新了解自己写的代码，这对python变成exe很重要。**&#x20;

手动调试过程中，常会遇到一些比较奇怪的问题，部分问题在文章

都有提到，也都有解决方案。我本人见到一个比较特殊的问题如下

![](https://pic4.zhimg.com/v2-6734fea3f019097e207d53d2c92c952f_b.jpg)

命令行提示最后一行，它的意思是该路径上缺少一个文件夹，于是就按照它的意思在该路径上创建一个名为Lib的文件夹就行。当然，还有一些我自己独有的问题，在调试过程中还修改了部分代码，但这些都已经与模块、文件添加没有关系了。当所有提示都解决时，程序就运行成功了，编译的过程基本上和平时给python改bug差不多吧。

**一定一定要注意文章中视频里面提到的各个细节**。实在搞不定可以加群，群主就是 ，群主很热心，基本上用Nuitka打包过程中出现的问题都能解决。本人在封装打包的过程中用到numpy、panda、scipy、pyqtgraph、matplotlib等包，我自己需要的是vtk、pyvista包，还有一些自己写的多线程程序段，基本上按照上述过程都封装成功了。
