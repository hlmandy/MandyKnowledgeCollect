# 一定要看的Tensorflow-GPU+Keras安装教程 - 知乎

做机器学习的朋友一定绕不开Tensorflow和Keras，跑模型又会要用到GPU的CUDA框架，其中各种版本兼容问题经常导致刚从一个坑里出来，又立刻掉到另一个坑里.....

于是，踩坑无数的我，总结了一篇教程，希望可以帮助到大家少走些弯路。

## 1\\. 确认显卡是否支持CUDA

NVIDIA官网有明确标出支持CUDA的显卡都有哪些，直接去官网查询自己的显卡型号是最高效的（只要在列表里出现了就是支持的），附链接：

![](https://pic2.zhimg.com/v2-b79d4fa54664a9ca112c10973931a385_b.jpg)

我自己的是GTX 2070s，可以查到是支持CUDA的

确认显卡支持就可以进入下一步了；如果显卡不支持，Tensorflow也提供了cpu版本供大家使用（就那个没有-gpu后缀的）

## 2\\. 安装VS

CUDA运行的时候需要VS的环境，所以要先安装Visual Studio，下载链接：

![](https://pic4.zhimg.com/v2-951ccf49101f6131fec572d670da22ff_b.jpg)

选择Community版本就行了

下载完成，开始安装：

![](https://pic3.zhimg.com/v2-c2f5e226b0ab6f0fb0abf092e553a2d2_b.jpg)

选择这三个部件就行

安装完毕:

![](https://pic4.zhimg.com/v2-38d8bf9ecc8d601918599e305c6ec773_b.jpg)

现在可以开始准备安装CUDA了

## 3\\. 检查显卡支持的CUDA版本号

在下载驱动之前要先检查一下自家显卡支持什么版本的CUDA。

查询步骤：开始菜单 - 设置 - 控制面板 - 硬件和声音 - NVIDIA控制面板 - 帮助 - 系统信息 - 组件 - 查‘NVCUDA ALL’后面跟的产品名称：

![](https://pic4.zhimg.com/v2-293c8cd06e4c30e78243153fcc64f9e3_b.jpg)

只要能打开控制面板就行，打开过程随意

![](https://pic3.zhimg.com/v2-b9a434b211d6acce071ed0390c81198a_b.jpg)

找到NVDIA的控制面板，这里没有的话可以去任务栏合并的图标里翻翻

![](https://pic1.zhimg.com/v2-9ae1dde1b5400f0135795787cce79248_b.jpg)

帮助里有显卡的系统设置

![](https://pic2.zhimg.com/v2-5f078318c8ca946304cc9ef72ea908f1_b.jpg)

## 4\\. 下载CUDA Toolkit工具

再次前往NVIDIA官网，附上链接：

这次我们去下载显卡驱动。

依次选择：操作系统，构架，CUDA Toolkit版本（版本号对应上一步查到的产品名称），安装方式（选择本地即可）：

![](https://pic2.zhimg.com/v2-bb73d7cc8edfa24010ab59ca456a3529_b.jpg)

我的是cuda 10，这里直接选择Base Installer下载

安装步骤：

![](https://pic4.zhimg.com/v2-423bbbc19db062ece16095f02c042443_b.jpg)

修改路径后，点击OK

![](https://pic4.zhimg.com/v2-b1a5d77445694b6699b7661cc85d3ae7_b.jpg)

惯例的许可协议，同意并接受

![](https://pic2.zhimg.com/v2-0f24021ae08860115e830694e35fb4b1_b.jpg)

之后一直点击下一步即可

## 5\\. 下载cuDNN

还是在NVIDIA官网，这次是这个链接：

cuDNN在下载的时候需要登陆账号，如果没有注册过帐号的小伙伴需要注册一下账号（如果注册过的小伙伴请忽略）。

![](https://pic3.zhimg.com/v2-45038a03ae4be57839815cf14b25e86a_b.jpg)

注册之后需要填填问卷，一步一步按要求来就行

注册好了之后，根据CUDA Toolkit工具的版本选择cuDNN版本，找到操作系统对应的Library版本，点击下载：

![](https://pic2.zhimg.com/v2-04f0d27afe8c1b43bacd74b3cb0f95d1_b.jpg)

![](https://pic3.zhimg.com/v2-e6933b8f75aa1dc4a0c9c650c576fbda_b.jpg)

我的是10.1，windows 10

下载下来的是个压缩包，先解压：

![](https://pic2.zhimg.com/v2-0ed9f24bf46d736627566a243605a1e5_b.png)

然后需要把bin文件添加到环境变量里：

![](https://pic2.zhimg.com/v2-36ab697a8d02813c667bedbbdea18ee5_b.jpg)

![](https://pic4.zhimg.com/v2-d08ab6d4d2e84ad02306491b859e8ac3_b.jpg)

## 6\\. 安装Anaconda

之所以安装Anaconda而不是pycharm，是因为Anaconda可以针对不同版本的python配置不同的环境，并且可以避免很多依赖问题，使用体验极佳。

依旧，附上官网下载链接：

![](https://pic2.zhimg.com/v2-689fe679c21f37a17ba9342dc1594145_b.jpg)

选择对应平台即可

按部就班的安装，最后配置环境变量：

![](https://pic1.zhimg.com/v2-0f669f391c4b26bfdca8c1fca13ffee8_b.jpg)

我自己用Anaconda给Tensorflow单独配了个环境，这个网上教程很多，在这里就不细说了。

## 7\\. 安装Tensorflow-GPU

还是先检查对应关系，根据自己安装的CUDA版本，找到适合的Tensorflow-GPU版本，这里需要留意一下自己的python版本是否合适。

ps：原则上Tensorflow-GPU选择尽量新的版本较好。

pps：python还是安装3以上的吧，毕竟2现在不更新了。

查到了适合自己的Tensorflow-GPU版本后，就可以开始安装啦，管理员身份打开CMD，开始pip，我已经提前从清华镜像上下载好了，所以写入了本地路径：

```text
pip3 install --upgrade  E:/Documents/tensorflow_gpu-2.2.0rc4-cp37-cp37m-win_amd64.whl
```

清华的镜像 [https://pypi.tuna.tsinghua.edu.cn/simple/tensorflow-gpu](https://link.zhihu.com/?target=https%3A//pypi.tuna.tsinghua.edu.cn/simple/tensorflow-gpu/ "https://pypi.tuna.tsinghua.edu.cn/simple/tensorflow-gpu")

漫长的等待后：

![](https://pic2.zhimg.com/v2-341169af780f430224d4c8d12ad6b191_b.png)

测试一下：

```text
import tensorflow as tf
a = tf.random_normal((10,10))

```

![](https://pic3.zhimg.com/v2-ca81166bde139089bd073ff4715ba45a_b.jpg)

成功！可喜可贺！

## 8\\. 安装Keras

下面就是Keras的安装了，还是先查找对应关系，链接见7：

![](https://pic4.zhimg.com/v2-430322a18c154f9c59d2845ad972f457_b.jpg)

我的是2.3.1

还是熟悉的pip：

```text
pip3 install --upgrade  E:/Documents/Keras-2.3.1-py2.py3-none-any.whl
```

安装完成：

![](https://pic4.zhimg.com/v2-cea03b7bc13a0a3a29bcb5aae6684e9f_b.png)

测试一下：

```text
import keras
keras.__version__

```

![](https://pic1.zhimg.com/v2-4a00bbe27cf8e736b35136934697494c_b.jpg)

成功运行！大功告成！

## 9\\. 最后总结一下我之前碰到的坑

我最开始是在笔记本上安装Tensorflow-GPU的。当时Anaconda，python都安装完了，按照教程直接安了Tensorflow-GPU，然后是Keras，结果运行的时候各种报错。。。

后来查了各种资料才知道还有这么多兼容问题。

下面贴出一些我碰到的坑，希望可以帮到大家：

首先是Keras报错问题：

-   Keras requires TensorFlow 2.2 or higher.
-   ModuleNotFoundError: No module named 'tensorflow\.python.eager'
-   AttributeError: module 'keras.backend.tensorflow\_backend' has no attribute '\_ is\_tf\_ 1'
-   ImportError: cannot import name 'np\\\_utils'

以上这4个都是因为 **tensorflow和keras的版本不对应** 导致的，具体对应关系可以查看教程的7和8步

然后是Tensorflow的问题：

```text
import tensorflow as tf
ImportError: No module named 'numpy.core._multiarray_umath'
ImportError: numpy.core.multiarray failed to import
```

解决方案：

```text
pip install numpy --upgrade
```

2\.

```text
Your CPU supports instructions that this TensorFlow binary was not compiled to use: AVX2
```

下载TensorFlow的版本不支持cpu的AVX2编译导致（版本问题），解决方案：

卸载了重新安装正确的tf版本

最后祝大家都能一次成功！
