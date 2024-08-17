# 如何更改Jupyter Notebook的默认工作路径？ - 知乎

**点击以下链接可以快速访问全部我发表的Python相关文章：**&#x20;

[Nick WU：Nick WU的python文章目录（持续更新中...）7 赞同 · 1 评论文章](https://zhuanlan.zhihu.com/p/94596965 "Nick WU：Nick WU的python文章目录（持续更新中...）7 赞同 · 1 评论文章")

-   \* \*

每次我们打开Jupyter Notebook时，在弹出的浏览器界面上是系统默认的文件位置（工作路径），有时候我们想保存写好的Python文件到自己想要的位置时就非常的不方便，那么我们该如何修改Jupyter Notebook默认的工作路径呢？

1.在cmd中输入命令使Jupyter产生配置文件：Jupyter\_notebook\_ config.py

```text
jupyter notebook --generate-config

```

![](https://pic1.zhimg.com/v2-0604da3672cc1fb26037a83333be4ccc_b.jpg)

2.在我的文档里如下路径找到刚才生成的配置文件（nickw是我的电脑的用户名）

C:\\\Users\\\nickw\.jupyter

![](https://pic3.zhimg.com/v2-dbc0ffc4f0b95e3beb524588dc104cf6_b.jpg)

3.用记事本打开此配置文档，并用搜索（Ctrl+F）找到如下字段：

```text
#c.NotebookApp.notebook_dir =

```

![](https://pic4.zhimg.com/v2-36cecb4cfac0f09be45776ee0a868f9b_b.jpg)

4.在后面的引号“”中输入想修改为的默认工作路径，删除前面的#，保存文件

![](https://pic2.zhimg.com/v2-e73a7f4fb84c75940438a6228ac01611_b.jpg)

5.修改Jupyter Notebook的快捷方式，删掉目标中的%USERPROFILE%并在后面添加上刚才设置好的默认工作路径

![](https://pic2.zhimg.com/v2-28441c201f7c4b68a855f5c6b5c79885_b.jpg)

大功告成！
