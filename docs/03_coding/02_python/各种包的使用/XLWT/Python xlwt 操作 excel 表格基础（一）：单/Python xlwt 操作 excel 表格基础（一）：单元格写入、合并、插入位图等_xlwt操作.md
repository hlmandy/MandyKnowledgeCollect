# Python xlwt 操作 excel 表格基础（一）：单元格写入、合并、插入位图等\_xlwt操作\_YouMi Chou的博客-CSDN博客

#### 前言：

**xlwt 模块简介：**&#x20;

Python 操作 Excel 表格的模块有很多，主要有：

1、**xlrd：**  读取 xls 格式Excel文件数据；2、**xlwt：**  将数据写入 xls 格式Excel文件；3、**openpyxl：**  读取、写入 xlsx 格式Excel文件；4、**pandas：**  通过 xlrd 与 xlwt 模块实现xls 格式Excel文件的读写操作；5、**win32com：**  获取 Excel 应用接口，实现Excel 文件的读写。

Python操作Excel表格的方法有很多，都是工具没必要每个都学。xlrd 和 xlwt 两个模块用的人比较多，接下来的几篇博客也是重点介绍 xlrd 与 xlwt 两个模块对Excel表格的操作方法。

本篇博客主要介绍Python xlwt 模块将数据写入Excel表格的一些基础操作，包括：

**1. 建立工作簿，增加sheet表；2. 单元格写入数据、单元格合并；3. 插入位图；4. 获取sheet表对象属性。**&#x20;

#### 1、建立工作簿，增加sheet表对象

用 xlwt模块 将数据写入Excel 表格，有个固定操作流程：

**建立工作簿对象——新建sheet表——将数据写入——保存文件**

注：xlwt 模块是Python 的第三方模块，安装 xlwt 模块，命令行输入：pip install xlwt

代码：

```
`import xlwt

ork_book = xlwt.Workbook()
__init__(self, encoding='ascii', style_compression=0):"

ork_sheet = work_book.add_sheet('Test')

add_sheet(self, sheetname, cell_overwrite_ok=False):"

Exception: Attempt to overwrite cell: sheetname='Test' rowx=0 colx=0"


ork_book.save('Test.xls')` 


[](https://csdnimg.cn/release/blogv2/dist/pc/img/newCodeMoreWhite.png)


   1
   2
   3
   4
   5
   6
   7
   8
   9
   10
   11
   12
   13
   14
   15
   16
   17
   18

```

add\_sheet方法中的cell\_ overwrite\_ok 形参默认值为False，表示：当之前单元格内容已写入内容，再在相同单元格写入内容时，会抛出：\
(Exception: Attempt to overwrite cell: sheetname=‘Test’ rowx=x colx=x ) 错误。\
True：不会提示上错误，会直接改写原单元格数据。

#### 2、单元格操作

写入数据（write）：

```python
work_sheet.write(0,0,'Hello Word')

"write(self, r, c, label="", style=Style.default_style)"

```

将列表数据写入一个单元格（write\_rich\_ text）：

```python
test_list = [str(i) for i in range(5)]
work_sheet.write_rich_text(1,0,test_list)
"write_rich_text(self, r, c, rich_text_list, style=Style.default_style):"

```

合并单元格（merge）：

```python
work_sheet.merge(2,3,0,3)
"merge(self, r1, r2, c1, c2, style=Style.default_style):"

```

合并单元格并写入数据（write\_merge）：

```python
work_sheet.write_merge(4,4,0,3,'合并单元格数据')
"write_merge(self, r1, r2, c1, c2, label="", style=Style.default_style):"

```

#### 3、插入位图

```python
work_sheet.insert_bitmap('01.bmp',5,0)
"insert_bitmap(self, filename, row, col, x = 0, y = 0, scale_x = 1, scale_y = 1):"

```

图像： &#x20;

![](https://img-blog.csdnimg.cn/20200616162636202.bmp?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3pob3V6OTI=,size_16,color_FFFFFF,t_70)

> insert\_bitmap(self, filename, row, col, x = 0, y = 0, scale\_ x = 1,scale\_y = 1):

**形参说明：**&#x20;

-   filename：文件名称；
-   row：行，col：列；
-   x，y：设定距单元格的x，y 距离；
-   scale\_x ，scale\_ y：缩放比例。

```python
work_sheet.insert_bitmap('01.bmp',5,8,x=50,y=50,scale_x=0.5,scale_y=0.5)

```

**注：图片必须为bmp位图，且需为24位真色彩，会PhotoShop的可以自己调整一下图片。**&#x20;

**完整代码：**&#x20;

```
`import xlwt

ork_book = xlwt.Workbook()

ork_sheet = work_book.add_sheet('Test')

ork_sheet.write(0,0,'Hello Word')

est_list = [str(i) for i in range(5)]
ork_sheet.write_rich_text(1,0,test_list)

ork_sheet.merge(2,3,0,3)

ork_sheet.write_merge(4,4,0,3,'合并单元格数据')

ork_sheet.insert_bitmap('01.bmp',5,0)
ork_sheet.insert_bitmap('01.bmp',5,8,x=50,y=50,scale_x=0.5,scale_y=0.5)


ork_book.save('Test.xls')` 


[](https://csdnimg.cn/release/blogv2/dist/pc/img/newCodeMoreWhite.png)


   1
   2
   3
   4
   5
   6
   7
   8
   9
   10
   11
   12
   13
   14
   15
   16
   17
   18
   19
   20
   21
   22
   23
   24
   25
   26
   27
   28

```

**Excel文件截图：**&#x20;

![](https://img-blog.csdnimg.cn/20200616164302338.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3pob3V6OTI=,size_16,color_FFFFFF,t_70#pic_center)

#### 4、获取sheet表对象属性

**注：以下代码都是在上面代码基础上写的。**&#x20;

获取、设置当前sheet表对象名称：

```python
print(work_sheet.get_name())

work_sheet.set_name('Test_rename')

```

获取sheet对象的父对象（获取工作中的sheet表的Excel文件对象）：

```python
print(work_book)
print(work_sheet.get_parent())

```

获取所有当前sheet对象中的有效行、列对象：

```python
print(work_sheet.get_rows())

'''
{0: <xlwt.Row.Row object at 0x000000000B0E1048>, 
1: <xlwt.Row.Row object at 0x000000000B0E11A8>,
2: <xlwt.Row.Row object at 0x000000000B0E1308>,
3: <xlwt.Row.Row object at 0x000000000B0E1468>, 
4: <xlwt.Row.Row object at 0x000000000B0E15C8>}
'''

print(work_sheet.get_cols())

```

**注：xlwt 模块中对列对象的获取方法有些问题！如上面的 get\_cols() 方法只获取到一个列对象。**&#x20;

获取合并单元格对象的起始合并位置信息：

```python
print(work_sheet.get_merged_ranges())

```

#### 结尾：

以上就是本篇全部内容，感谢阅读。下一篇博客内容为 Excel 文件 sheet 表 [常用显示设置、窗口冻结、表格保护、默认打印样式](https://blog.csdn.net/zhouz92/article/details/106811760 "常用显示设置、窗口冻结、表格保护、默认打印样式") 等内容。

> 该专栏会对 Python 的第三方模块，如：xlwt，xlrd，python-docx等，操作 Office 办公软件（Word Excel PPT）的方法进行详细讲解。同时也会搭配一些实例演练，一方面强化知识点的理解与运用，另一方面也希望能起到，引导读者进行思考：如何用 python 提高 offic 办公软件办公效率的作用。感兴趣的朋友，可以点个 **关注** 或 **收藏** 。如在博客中遇到任何问题或想法，可留言或私信。**创作不易，你的支持是我最大的动力，感谢 ！**

> &#x20;**创作不易，你的支持是我最大的动力，感谢 ！**
