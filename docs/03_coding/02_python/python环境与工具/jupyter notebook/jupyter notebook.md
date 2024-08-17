# jupyter notebook

## 目录

-   [Jupyter notebook 工作路径更改](#Jupyter-notebook-工作路径更改)
-   [Jupyter notebook 快捷键](#Jupyter-notebook-快捷键)
    -   [命令模式快捷键（按 Esc 键开启）:](#命令模式快捷键按-Esc-键开启)
    -   [编辑模式快捷键（ 按 Enter 键启动）:](#编辑模式快捷键-按-Enter-键启动)
-   [Jupyter notebook 字体修改](#Jupyter-notebook-字体修改)
    -   [简单修改版：](#简单修改版)
    -   [复杂修改版：](#复杂修改版)
-   [卸载Jupyter](#卸载Jupyter)
-   [jupyter 插件--](#jupyter-插件--)
    -   [Nbextensions 插件](#Nbextensions-插件)

## Jupyter notebook 工作路径更改

![.png](https://pic3.zhimg.com/50/v2-f33d4af892de558c7afd5a47d17f53f5_hd.jpg ".png")

![.png](https://pic3.zhimg.com/80/v2-f33d4af892de558c7afd5a47d17f53f5_hd.jpg ".png")

> 作者：Juzzzz丶
> 链接：[https://www.zhihu.com/question/31600197/answer/175554521](https://www.zhihu.com/question/31600197/answer/175554521 "https://www.zhihu.com/question/31600197/answer/175554521")
> 来源：知乎

## Jupyter notebook 快捷键

### 命令模式快捷键（按 Esc 键开启）:

| 快捷键         | 作用               | 说明                                                         |
| ----------- | ---------------- | ---------------------------------------------------------- |
| Enter       | 转入编辑模式           |                                                            |
| Shift-Enter | 运行本单元，选中下个单元     | 新单元默认为命令模式                                                 |
| Ctrl-Enter  | 运行本单元            |                                                            |
| Alt-Enter   | 运行本单元，在其下插入新单元   | 新单元默认为编辑模式                                                 |
| Y           | 单元转入代码状态         |                                                            |
| M           | 单元转入 markdown 状态 |                                                            |
| R           | 单元转入 raw 状态      |                                                            |
| 1           | 设定 1 级标题         | 仅在 markdown 状态下时建议使用标题相关快捷键，如果单元处于其他状态，则会强制切换到 markdown 状态 |
| 2           | 设定 2 级标题         |                                                            |
| 3           | 设定 3 级标题         |                                                            |
| 4           | 设定 4 级标题         |                                                            |
| 5           | 设定 5 级标题         |                                                            |
| 6           | 设定 6 级标题         |                                                            |
| Up          | 选中上方单元           |                                                            |
| K           | 选中上方单元           |                                                            |
| Down        | 选中下方单元           |                                                            |
| J           | 选中下方单元           |                                                            |
| Shift-K     | 连续选择上方单元         |                                                            |
| Shift-J     | 连续选择下方单元         |                                                            |
| A           | 在上方插入新单元         |                                                            |
| B           | 在下方插入新单元         |                                                            |
| X           | 剪切选中的单元          |                                                            |
| C           | 复制选中的单元          |                                                            |
| Shift-V     | 粘贴到上方单元          |                                                            |
| V           | 粘贴到下方单元          |                                                            |
| Z           | 恢复删除的最后一个单元      |                                                            |
| D,D         | 删除选中的单元          | 连续按两个 D 键                                                  |
| Shift-M     | 合并选中的单元          |                                                            |
| Ctrl-S      | 保存当前 NoteBook    |                                                            |
| S           | 保存当前 NoteBook    |                                                            |
| L           | 开关行号             | 编辑框的行号是可以开启和关闭的                                            |
| O           | 转换输出             |                                                            |
| Shift-O     | 转换输出滚动           |                                                            |
| Esc         | 关闭页面             |                                                            |
| Q           | 关闭页面             |                                                            |
| H           | 显示快捷键帮助          |                                                            |
| I,I         | 中断 NoteBook 内核   |                                                            |
| 0,0         | 重启 NoteBook 内核   |                                                            |
| Shift       | 忽略               |                                                            |
| Shift-Space | 向上滚动             |                                                            |
| Space       | 向下滚动             |                                                            |

### 编辑模式快捷键（ 按 Enter 键启动）:

| 快捷键                 | 作用             | 说明                                                 |
| ------------------- | -------------- | -------------------------------------------------- |
| Tab                 | 代码补全或缩进        |                                                    |
| Shift-Tab           | 提示             | 输出帮助信息，部分函数、类、方法等会显示其定义原型，如果在其后加 `?` 再运行会显示更加详细的帮助 |
| Ctrl-]              | 缩进             | 向右缩进                                               |
| Ctrl-\[             | 解除缩进           | 向左缩进                                               |
| Ctrl-A              | 全选             |                                                    |
| Ctrl-Z              | 撤销             |                                                    |
| Ctrl-Shift-Z        | 重做             |                                                    |
| Ctrl-Y              | 重做             |                                                    |
| Ctrl-Home           | 跳到单元开头         |                                                    |
| Ctrl-Up             | 跳到单元开头         |                                                    |
| Ctrl-End            | 跳到单元末尾         |                                                    |
| Ctrl-Down           | 跳到单元末尾         |                                                    |
| Ctrl-Left           | 跳到左边一个字首       |                                                    |
| Ctrl-Right          | 跳到右边一个字首       |                                                    |
| Ctrl-Backspace      | 删除前面一个字        |                                                    |
| Ctrl-Delete         | 删除后面一个字        |                                                    |
| Esc                 | 切换到命令模式        |                                                    |
| Ctrl-M              | 切换到命令模式        |                                                    |
| Shift-Enter         | 运行本单元，选中下一单元   | 新单元默认为命令模式                                         |
| Ctrl-Enter          | 运行本单元          |                                                    |
| Alt-Enter           | 运行本单元，在下面插入一单元 | 新单元默认为编辑模式                                         |
| Ctrl-Shift--        | 分割单元           | 按光标所在行进行分割                                         |
| Ctrl-Shift-Subtract | 分割单元           |                                                    |
| Ctrl-S              | 保存当前 NoteBook  |                                                    |
| Shift               | 忽略             |                                                    |
| Up                  | 光标上移或转入上一单元    |                                                    |
| Down                | 光标下移或转入下一单元    |                                                    |
| Ctrl-/              | 注释整行/撤销注释      | 仅代码状态有效                                            |

## Jupyter notebook 字体修改

**Win**

在本地jupyter的custom.css文件中粘贴文件内容。

文件路径:

> C:\Users\user\\.jupyter\custom\custom.css
> 或者：
> C:\Users\leihu\AppData\Local\Programs\Python\Python36\Lib\site-packages\notebook\static\custom\custom.css

### 简单修改版：

```text
body{font-family:'Arita Heiti M'} /* 这里用于修改非代码框框的字体*/
div.output_area pre{font-family:'Arita Heiti M'}/* 这里用于修改输出框框的字体*/
.CodeMirror-code {font-family:'Consolas'}/* 这里用于修改代码框框的字体*/
```

### 复杂修改版：

```text
/* Body *//* #notebook-container {
    width: 90%
} */

/* Markdown */div#notebook {
    font-family: san francisco, "PingFangSC-Medium", "Microsoft YaHei";
    line-height: 20px;
    -webkit-font-smoothing: antialiased !important;}

/* Markdown - h2 */div#notebook h2 {
    color: #007aff;}

/* Markdown - quote */div#notebook blockquote{
    background-color: #f8f8f8;
    color: #505050;
    padding: 8.5px;
    margin: 0.5em -0.5em 0.5em -0.4em;}

/* Markdown - code in paragraph */div#notebook p code, div#notebook li code {
    font-family: Consolas, "PingFangSC-Medium", "Microsoft YaHei";
    font-size: 1em !important;
    color: #111111;
    border: 0.5px solid #cfcfcf;
    border-radius: 2px;
    background-color: #f7f7f7;
    padding: .1em .2em;
    margin: 0px 2px;}

/* Markdown - code */div.text_cell_render pre {
    border: 1px solid #cfcfcf;
    border-radius: 2px;
    background: #f7f7f7;
    line-height: 1.21429em;
    padding: 8.5px;
    margin: 0.5em -0.5em 0.5em -0.4em;}div.text_cell_render code {
    background: #f7f7f7;}

/* Code */div.CodeMirror pre {
    font-family: Consolas, "PingFangSC-Medium", "Microsoft YaHei";
    font-size: 11pt;
    line-height: 140%;
    -webkit-font-smoothing: antialiased !important;}

/* Code - output */div.output pre {
    font-family: Consolas, "PingFangSC-Medium", "Microsoft YaHei";
    line-height: 20px;
    -webkit-font-smoothing: antialiased !important;}

/* Code - comment */span.cm-comment {
    font-family: san francisco, "PingFangSC-Medium", "Microsoft YaHei" !important;
    font-style: normal !important;}
```

高亮

```text
/* Code - highlighting */ .cm-s-ipython .CodeMirror-cursor { border-left: 1px solid #ff711a !important; } .cm-s-ipython span.cm-comment { color: #8d8d8d; font-style: italic; } .cm-s-ipython span.cm-atom { color: #055be0; } .cm-s-ipython span.cm-number { color: #ff8132; } .cm-s-ipython span.cm-property { color: #303030; } .cm-s-ipython span.cm-attribute { color: #303030; } .cm-s-ipython span.cm-keyword { color: #713bc5; font-weight: bold; } .cm-s-ipython span.cm-string { color: #009e07; } .cm-s-ipython span.cm-meta { color: #aa22ff; } .cm-s-ipython span.cm-operator { color: #055be0; } .cm-s-ipython span.cm-builtin { color: #e22978; } .cm-s-ipython span.cm-variable { color: #303030; } .cm-s-ipython span.cm-variable-2 { color: #de143d; } .cm-s-ipython span.cm-variable-3 { color: #aa22ff; } .cm-s-ipython span.cm-def { color: #e22978; font-weight: bold; } .cm-s-ipython span.cm-error { background: rgba(191, 97, 106, .40); } .cm-s-ipython span.cm-tag { color: #e22978; } .cm-s-ipython span.cm-link { color: #ff8132; } .cm-s-ipython span.cm-storage { color: #055be0; } .cm-s-ipython span.cm-entity { color: #e22978; } .cm-s-ipython span.cm-quote { color: #009e07; } div.CodeMirror span.CodeMirror-matchingbracket { color: #1c1c1c; background-color: rgba(30, 112, 199, .30); } div.CodeMirror span.CodeMirror-nonmatchingbracket { color: #1c1c1c; background: rgba(191, 97, 106, .40) !important; } .cm-s-default .cm-hr { color: #055be0; }

```

> 作者：万欣
> 链接：[https://www.zhihu.com/question/40012144/answer/363009024](https://www.zhihu.com/question/40012144/answer/363009024 "https://www.zhihu.com/question/40012144/answer/363009024")
> 来源：知乎

## 卸载Jupyter

```text
pip uninstall -y jupyter
pip uninstall -y jupyter_core
pip uninstall -y jupyter-client
pip uninstall -y jupyter-console
pip uninstall -y notebook
pip uninstall -y qtconsole
pip uninstall -y nbconvert
pip uninstall -y nbformat

pip uninstall -y jupyter jupyter_core jupyter-client jupyter-console notebook qtconsole nbconvert nbformat
```

> 原文链接：[https://blog.csdn.net/weixin\_39518371/article/details/84501597](https://blog.csdn.net/weixin_39518371/article/details/84501597 "https://blog.csdn.net/weixin_39518371/article/details/84501597")

## jupyter 插件--

### Nbextensions 插件

先安装

pip install jupyter\_contrib\_nbextensions \&amp;\&amp; jupyter contrib nbextension install

安装完成后重启jupyter notebookJupyter notebook

打开后标签栏会多一个Nbextensions标签

![](c1SmUpgbio8uk5TZsMcmsU_rbjw_MMzFf.png)

点进这个标签,我们选择几个选项打钩

1.\&nbsp;Hinterland(自动补全代码)
2.\&nbsp;table of Contents(将markdown转为目录)
3.\&nbsp;ExecuteTime(自动计算单元格运行时间)
4.\&nbsp;Variable Inspector(代码中的变量显示)
5.\&nbsp;Highlight selected word(选中高亮)

> [https://zhuanlan.zhihu.com/p/81160925](https://zhuanlan.zhihu.com/p/81160925 "https://zhuanlan.zhihu.com/p/81160925")

[如何更改Jupyter Notebook的默认工作路径？ - 知乎](如何更改Jupyter%20Notebook的默认工作路径？%20-%20知乎.md Notebook的默认工作路径？ -/如何更改Jupyter Notebook的默认工作路径？ - 知乎.md> "如何更改Jupyter Notebook的默认工作路径？ - 知乎")
