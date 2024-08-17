---
url: https://blog.csdn.net/PolarisRisingWar/article/details/116399648
title: PyG 的 Planetoid 无法直接下载 Cora 等数据集的 3 个解决方式 - CSDN 博客
date: 2024-04-02 10:28:13
tag: 
banner: "https://images.unsplash.com/photo-1711760102255-a5551e189fd5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0Njc1ODd8MHwxfHJhbmRvbXx8fHx8fHwxfHwxNzEyMDI0ODk3fA&ixlib=rb-4.0.3&q=85&fit=crop&w=1079&max-h=540"
banner_icon: 🔖
---
[诸神缄默不语 - 个人 CSDN 博文目录](https://blog.csdn.net/PolarisRisingWar/article/details/116396744)

本文仅考虑 DNS 污染情况下无法用 [torch_geometric](https://so.csdn.net/so/search?q=torch_geometric&spm=1001.2101.3001.7020).Planetoid 类下载 Cora 等数据集的情况。其他使用 GitHub 仓库下载数据的解决方式类似，在此文中不再赘述。  
三个解决问题的方式方式简介：

1.  修改 raw.githubcontent.com 在 hosts 中对应的 IP 地址，使本地电脑可以直接登上该网站
2.  直接将原始数据下载到本地：手动从 GitHub 或 gitee 下载数据，放到对应文件目录位置；或者用 Python 拉数据下来
3.  修改 torch_geometric 源代码

以下是对这些解决方式的详细介绍（仅以 Cora 为例，其他数据集类似，不再赘述）

#### 文章目录

*   [解决方式一：修改 hosts 文件](#hosts_28)
*   [解决方式二：从 GitHub 或 gitee 拉数据](#GitHubgitee_46)
*   *   [方法 1：直接下载整个项目](#1_55)
    *   [方法 2：直接下载所需的单个文件](#2_61)
    *   *   [1. 直接从网页下载](#1__62)
        *   [2. 用 Python 下载](#2_Python_70)
        *   [3. 用 wget 下载](#3_wget_91)
*   [解决方式三：直接修改 PyG 源码](#PyG_95)
*   [参考资料](#_99)

如果顺利的话，应该只需要执行类似这样的代码即可在对应根目录位置下载数据集：

```
from torch_geometric.datasets import Planetoid
dataset = Planetoid(root='./tmp/cora', name='Cora')

```

Planetoid 文档：[https://pytorch-geometric.readthedocs.io/en/latest/modules/datasets.html#torch_geometric.datasets.Planetoid](https://pytorch-geometric.readthedocs.io/en/latest/modules/datasets.html#torch_geometric.datasets.Planetoid)

在 [planetoid 源代码](https://github.com/rusty1s/pytorch_geometric/blob/master/torch_geometric/datasets/planetoid.py)中可以看到，这个类的大致逻辑就是从 GitHub 下载数据→处理数据。出现无法下载的情况时可能是由于 Planetoid 从 raw.githubcontent.com 这个域名下载数据，而这个域名在电脑上被 DNS 污染。  
本文仅考虑这种情况造成的无法下载情况。如果您发现您的机子没有这种问题，那么您可能无法通过本文的手段解决对应的问题。

测试是否是 DNS 污染的简单方式：ping 一下 raw.github.com  
（仅适用于 Windows 系统，Linux 等其他系统类似）使用 Win + R，出现如下弹窗：  

![](https://img-blog.csdnimg.cn/d296d6e42d0d4d8f8e63efcbc1bf30e4.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-456We57yE6buY5LiN6K-t,size_17,color_FFFFFF,t_70,g_se,x_16)

  
在输入框中输入 `cmd`，点击确定，出现 shell 窗口，输入 `ping raw.githubcontent.com`，回车运行。  
如果 ping 包能接收到，说明不是 DNS 污染的问题，一般可以通过多试几次的方式来解决问题，如果还解决不了那我也不知道了；如果 ping 包接收不到，说明就是 DNS 污染的问题，见下文。

## 解决方式一：修改 hosts 文件

可以通过[多个地点 Ping 服务器, 网站测速 - 站长工具](http://ping.chinaz.com/)这个网站获取 raw.githubcontent.com 对应的 IP 地址，选一个响应时间较短而且在大陆的响应 IP 就行。然后修改 hosts，就可以直接下载。  
（此处找 IP 地址还可以用 [The Best IP Address, Email and Networking Tools - IPAddress.com](https://www.ipaddress.com/) 这个网站，但是这个网站有的时候会突然上不了，所以作为备选提供）

2022.12.13 能用的 IP 地址：

```
173.208.96.46

```

直接挂代理一般也可以解决问题。  
我之所以没这么干是因为我用远程服务器跑的，我没法改 DNS 也没法挂代理……

修改 hosts 的方法：

1.  找到 hosts 文件的位置，Windows 一般为 `C:\Windows\System32\drivers\etc`
2.  打开 hosts 文件（用记事本之类的文本编辑器都行），在最后加一行，写你刚刚挑好的 IP 地址，然后按 tab 键，然后写 `raw.githubusercontent.com`。
3.  保存文件。如果不能保存就把内容复制到另一个同名文本文件中，复制过来，直接覆盖。
4.  在前文提及的 cmd 窗口中运行 `ipconfig /flushdns`。

## 解决方式二：从 GitHub 或 gitee 拉数据

[GitHub 项目](https://so.csdn.net/so/search?q=GitHub%E9%A1%B9%E7%9B%AE&spm=1001.2101.3001.7020)是 [https://github.com/kimiyoung/planetoid](https://github.com/kimiyoung/planetoid)，gitee 项目是 [https://gitee.com/jiajiewu/planetoid](https://gitee.com/jiajiewu/planetoid)。gitee 的话在国内会更快点，所以推荐用 gitee 的。

具体需要的数据是这些：  

![](https://img-blog.csdnimg.cn/20210504132549448.png#pic_center)

  
通过以下任一方法下载到需要的数据后，将其放到根目录下`Cora/raw`文件夹下，然后再运行`dataset = Planetoid(root, name='Cora')`。如无报错并显示如下输出则成功。

Processing…  
Done!  
Cora()

### 方法 1：直接下载整个项目

可以直接把整个项目 git clone 下来，然后直接从里面把对应的文件复制过去。  
git clone 的方法可参考我之前写的博文：[VSCode 上的 Git 使用手记（持续更新 ing…）](https://blog.csdn.net/PolarisRisingWar/article/details/116128331)

也可以直接从项目的网页下载项目的 zip 压缩包，跟 git clone 地址在差不多的位置。

### 方法 2：直接下载所需的单个文件

#### 1. 直接从网页下载

gitee 可以直接在网页上下载单个文件。直接修改网址也可以下载单个文件，具体网址见下面用 Python 下载数据部分。

要额外注意：PubMed 里面的 allx 文件可能因为文件太大，所以如果直接用 Gitee 远程拉的话会要求登录，如果没有登录就会重定向到网页，导致无法用这种方式下载数据。  
解决方法，我暂时也没有解决方法…… 就这一个文件就从本地登录了下载下来然后上传到服务器就算了。

GitHub 通过插件或者修改网址也可以下载单个文件，但是如果你能通过这种方式下载文件，你的 DNS 应该没有被污染。

#### 2. 用 Python 下载

直接把这个网址输到浏览器里面也能下载就是了……  
我使用的是这个方式。主要原因是我在服务器上跑的项目，直接把所有事都在 Python 代码里解决就会比较方便。  
base_url 参数：  
推荐使用 gitee 的：`https://gitee.com/jiajiewu/planetoid/raw/master/data/ind.cora.`  
github 的话可以二选一：`https://github.com/kimiyoung/planetoid/raw/master/data/ind.cora.`或 `https://raw.githubusercontent.com/kimiyoung/planetoid/master/data/ind.cora.`（但问题在于如果你能从这两个网址拉数据…… 那你…… 就不应该有不能下载的问题）  
注意，这里要通过 raw 下载数据，如果直接用网页下载数据（如`https://gitee.com/jiajiewu/planetoid/blob/master/data/ind.cora.allx`）的话就会下载成网页…… 我一开始就下载成了网页…… 这肯定是会报错的。要下数据文件。

可以尝试使用 [PyG](https://so.csdn.net/so/search?q=PyG&spm=1001.2101.3001.7020) 的`download_url()`方法下载数据（这是源代码中使用的方式）。其[文档地址](https://pytorch-geometric.readthedocs.io/en/latest/modules/data.html#torch_geometric.data.download_url)。  
我使用的是 requests。别的方式应该也行，就各种直接下载网页文件的方式应该都行。我这里给一个代码：

```
import requests

names = ['x', 'tx', 'allx', 'y', 'ty', 'ally', 'graph', 'test.index']
for name in names:
	file_url=base_url+name
    r=requests.get(file_url)
    with open('./tmp/cora/Cora/raw/ind.cora.'+name, 'wb') as f:
        f.write(r.content)

```

#### 3. 用 wget 下载

其实我推荐用 wget 下载，因为有输出。太简单我就不写了，这还不会百度怎么上的学。网址还是上面那个网址。  
如果稍稍对电脑有一点多的了解，还可以用 Python 写个批处理的 bat 或 sh 文件。

## 解决方式三：直接修改 PyG 源码

把 planetoid.py 里面第 48 行的 `url = 'https://github.com/kimiyoung/planetoid/raw/master/data'` 改成 `url='https://gitee.com/jiajiewu/planetoid/raw/master/data'`  
逻辑上就跟第二种解决方式里面从 gitee 拉数据一样。

## 参考资料

1.  [【PyG 学习入门】二：入门时遇到的问题](https://blog.csdn.net/TwT520Ly/article/details/105435947)
2.  [Cora 数据集不能下载](https://blog.csdn.net/u013313168/article/details/109460915)
3.  [用 torch_geometric 无法下载 Cora 数据怎么办？](https://www.zhihu.com/question/441507991)
4.  [torch_geometric 下载数据集 Cora 时报错](https://ask.csdn.net/questions/1102484)
5.  [修改 Hosts 解决 Github 访问失败马克 - 知乎](https://zhuanlan.zhihu.com/p/107334179)