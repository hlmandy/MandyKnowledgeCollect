---
url: https://zhuanlan.zhihu.com/p/59738776
title: 如何更改 Jupyter Notebook 的默认工作路径？
date: 2024-03-11 11:14:21
tag: 
banner: "https://picx.zhimg.com/v2-12424062f8a6a3ae942529c2b9b8e587_720w.jpg?source=172ae18b"
banner_icon: 🔖
---
**点击以下链接可以快速访问全部我发表的 Python 相关文章：**

[Nick WU：Nick WU 的 python 文章目录（持续更新中...）](https://zhuanlan.zhihu.com/p/94596965)

每次我们打开 Jupyter Notebook 时，在弹出的浏览器界面上是系统默认的文件位置（工作路径），有时候我们想保存写好的 Python 文件到自己想要的位置时就非常的不方便，那么我们该如何修改 Jupyter Notebook 默认的工作路径呢？

1. 在 cmd 中输入命令使 Jupyter 产生配置文件：Jupyter_notebook_config.py

```
jupyter notebook --generate-config

```

![](https://pic1.zhimg.com/v2-0604da3672cc1fb26037a83333be4ccc_b.jpg)

2. 在我的文档里如下路径找到刚才生成的配置文件（nickw 是我的电脑的用户名）

C:\Users\nickw.jupyter

![](https://pic3.zhimg.com/v2-dbc0ffc4f0b95e3beb524588dc104cf6_b.jpg)

3. 用记事本打开此配置文档，并用搜索（Ctrl+F）找到如下字段：

```
#c.NotebookApp.notebook_dir =

```

![](https://pic4.zhimg.com/v2-36cecb4cfac0f09be45776ee0a868f9b_b.jpg)

4. 在后面的引号 “” 中输入想修改为的默认工作路径，删除前面的 #，保存文件

![](https://pic2.zhimg.com/v2-e73a7f4fb84c75940438a6228ac01611_b.jpg)

5. 修改 Jupyter Notebook 的快捷方式，删掉目标中的 %USERPROFILE% 并在后面添加上刚才设置好的默认工作路径

![](https://pic2.zhimg.com/v2-28441c201f7c4b68a855f5c6b5c79885_b.jpg)

大功告成！