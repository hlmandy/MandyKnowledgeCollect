# Python xlwt 操作 excel 表格基础（二）：冻结窗口、设置加密保护、打印设置等\_xlwt 冻结\_YouMi Chou的博客-CSDN博客

#### 前言：

上一篇博客对Python 的第三方模块 xlwt 对Excel表格的一些基础操作如：[新建工作簿、增加sheet表、插入位图等](https://blog.csdn.net/zhouz92/article/details/106789137 "新建工作簿、增加sheet表、插入位图等") 进行了讲解。

本篇博客介绍 xlwt 模块设置 Excel表格文件的窗口显示样式、默认打印格式，主要内容包括：

**1. 设置冻结窗口；2. 表格的常用显示设置；3. 设置文档保护及密码；4. 表格打印设置详解。**&#x20;

#### 1、设置冻结窗口

Excel表格对于数据的显示非常直观，其冻结窗口的设置就是对用户阅读数据非常友好的一个功能。 &#x20;
我们先写如下一个代码，创建一个Excel表格，并写入数据：

```python
import xlwt

work_book = xlwt.Workbook()
work_sheet = work_book.add_sheet('Test')
w2 = work_book.add_sheet('T2')

z = [[r,c] for r in range(20) for c in range(20)]
[l.append(str(i)) for i,l in enumerate(z)]
for info in z:
    work_sheet.write(info[0],info[1],info[2])
    w2.write(info[0],info[1],info[2])
    

work_book.save('Test2.xls')

```

我们在当前工作路径下创建了一个 Test2.xls 表格文件，文件中有Test，T2两个sheet表，表中数据一样。

**文件截图：**&#x20;

![](https://img-blog.csdnimg.cn/20200617194125332.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3pob3V6OTI=,size_16,color_FFFFFF,t_70#pic_center)

后续我们对 Test2.xls 文件的 Test sheet 对象进行操作，大家可和 T2 sheet 对象进行对比，看看一些设置的效果。

**设置冻结窗口：**&#x20;

```python
work_sheet.set_panes_frozen('1')

work_sheet.set_horz_split_pos(2)

work_sheet.set_vert_split_pos(1)

```

**解析：设置冻结窗口需先将sheet表的冻结属性设置为真，然后再对水平、垂直需冻结行数、列数进行设置。**&#x20;

上面的代码将表格文件的Test sheet 的前两行、第一列设置冻结窗口，效果如下：

![](https://img-blog.csdnimg.cn/20200617194715885.gif#pic_center)

#### 2、sheet表常用显示设置

1、设置隐藏行、列标签（默认为显示）：

```python
work_sheet.set_show_headers(0)

```

2、设置隐藏网格线（默认为显示）：

```python
work_sheet.set_show_grid(0)

```

3、设置表格右排列（默认为左排列）：

```python
work_sheet.set_cols_right_to_left(1)

```

设置后的表格截图：

![](https://img-blog.csdnimg.cn/20200617195404471.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3pob3V6OTI=,size_16,color_FFFFFF,t_70#pic_center)

可以看到：**sheet表没有了ABCD…行标签、1 2 3 4…列标签，网格线也被隐藏。数据开始方向变为，从右到左。**&#x20;

#### 3、设置表格保护及密码：

设置文档保护及密码，不允许修改（默认不保护）：

```python
work_sheet.set_protect(1)
work_sheet.set_password('123456')

```

**效果图：**&#x20;

![](https://img-blog.csdnimg.cn/20200617200016674.gif#pic_center)

#### 4、设置默认打印格式

xlwt 模块提供了设置 sheet 表默认打印样式的方法，而这一部分资料在网上基本上找不到…。

#### 4.1、基础设置：

设置打印行、列标签（默认不打印）：

```python
work_sheet.set_print_headers(1)

```

设置打印网格线（默认不打印）：

```python
work_sheet.set_print_grid(1)

```

设置表格数据打印垂直居中（默认不居中）：

```python
work_sheet.set_print_centered_vert(1)

```

设置表格数据打印水平不居中（默认居中）：

```python
work_sheet.set_print_centered_horz(0)

```

**上述四种设置后，表格打印预览：**&#x20;

![](https://img-blog.csdnimg.cn/20200617201045367.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3pob3V6OTI=,size_16,color_FFFFFF,t_70#pic_center)

#### 4.2、页眉页脚设置：

日常工作中在Excel表格打印时，一般不会去设置表格文件的页眉页脚，但是 xlwt 模块还是提供了设置页眉页脚的方法：

设置页眉（默认为页码数）：

```python
work_sheet.set_header_str('TestPageNO. &P'.encode())

```

设置页脚（默认为文件名称）：

```python
work_sheet.set_footer_str('FileName:&F'.encode())

```

页眉打印预览：

![](https://img-blog.csdnimg.cn/20200617212816316.png#pic_center)

页脚打印预览：

![](https://img-blog.csdnimg.cn/20200617212850366.png#pic_center)

**注：这里的眉设置的 ‘TestPageNO. \&P’.encode() 中 \&P 代表页码数，页脚中的 \&F 表示，不包含文件路径的文件名称。**&#x20;

其他的代码还有：

```
`Command         Contents
&&              The "&" character itself
&L              Start of the left section
&C              Start of the centred section
&R              Start of the right section
&P              Current page number
&N              Page count
&D              Current date
&T              Current time
&A              Sheet name (BIFF5-BIFF8)
&F              File name without path
&Z              File path without file name (BIFF8X)
&G              Picture (BIFF8X)
&B              Bold on/off (BIFF2-BIFF4)
&I              Italic on/off (BIFF2-BIFF4)
&U              Underlining on/off
&E              Double underlining on/off (BIFF5-BIFF8)
&S              Strikeout on/off
&X              Superscript on/off (BIFF5-BIFF8)

&Y              Subscript on/off (BIFF5-BIFF8)` 


![](https://csdnimg.cn/release/blogv2/dist/pc/img/newCodeMoreWhite.png)


*   1
*   2
*   3
*   4
*   5
*   6
*   7
*   8
*   9
*   10
*   11
*   12
*   13
*   14
*   15
*   16
*   17
*   18
*   19
*   20

```

比如我们想要设置：页眉为空，页脚为sheet名称 + 当前日期+ 页码。

```python
work_sheet.set_header_str(''.encode())

work_sheet.set_footer_str('NAME:&A DATE:&D No.: &P'.encode())

```

**打印预览：**

![](https://img-blog.csdnimg.cn/20200617204608662.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3pob3V6OTI=,size_16,color_FFFFFF,t_70#pic_center)

#### 4.3、设置页边距：

设置左边距（默认0.3）、右边距（默认0.3）：

```python
work_sheet.set_left_margin(0.5)
work_sheet.set_right_margin(0.5)

```

设置上边距（默认：0.61）、下边距（默认：0.37）：

```python
work_sheet.set_top_margin(0.5)
work_sheet.set_bottom_margin(0.5)

```

设置页眉边距（默认：0.1）、页脚边距（默认：0.1）：

```python
work_sheet.set_header_margin(0.5)
work_sheet.set_footer_margin(0.5)

```

#### 4.4、设置默认纸张、打印方向等：

将打印纸张设置为A3（默认A4，9）：

```python
work_sheet.set_paper_size_code(8)

```

常用纸张编码代号：

```
8       A3                      297mm x 420mm
9       A4                      210mm x 297mm
10      A4 small                210mm x 297mm
11      A5                      148mm x 210mm
12      B4 (JIS)                257mm x 364mm
13      B5 (JIS)                182mm x 257mm
33      B4 (ISO)                250mm x 353mm
34      B5 (ISO)                176mm x 250mm
35      B6 (ISO)                125mm x 176mm
66      A2                      420mm x 594mm
70      A6                      105mm x 148mm

```

设置横向打印（默认纵向打印）：

```python
work_sheet.set_portrait(0)

```

设置页面缩放比例为90% （默认100%）：

```python
work_sheet.set_print_scaling(90)

```

设置是否单色打印（默认单色）：

```python
work_sheet.set_print_colour(0)

```

以上设置，打印预览：

![](https://img-blog.csdnimg.cn/20200617210232568.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3pob3V6OTI=,size_16,color_FFFFFF,t_70#pic_center)

#### 4.5 设置打印区域：

设置垂直打印区域：

```python
work_sheet.set_vert_page_breaks([[5,0,0],[11,0,0]])

```

**注：第一页为5列，第二列为6列。**&#x20;

设置水平打印区域：

```python
work_sheet.set_horz_page_breaks([[6,0,0],[12,0,0]])

```

**注：第一页为6行，第2页为6行。**&#x20;

上述设置，分页预览图：

![](https://img-blog.csdnimg.cn/20200617210722598.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3pob3V6OTI=,size_16,color_FFFFFF,t_70#pic_center)

#### 4.6、其他设置：

以草稿质量打印（默认非草稿）：

```python
work_sheet.set_print_draft(1)

```

草稿打印，打印出来的效果会很模糊，不常用。

设置打印批注、批注在文档结尾显示（默认不打印批准）：

```python
work_sheet.set_print_notes(1)
work_sheet.set_print_notes_at_end(1)

```

设置打印单元格错误显示值为：#N/A（默认打印显示值）：

```python
work_sheet.set_print_omit_errors(3)

```

> 0 设置打印显示值； &#x20;
> 1 设置为空白； &#x20;
> 2 设置为–； &#x20;
> 3 设置为：#N/A。

设置打印质量为600 dpi （默认300dpi）：

```python
work_sheet.set_print_hres(600)
work_sheet.set_print_vres(600)

```

#### 结尾：

以上就是本篇博客全部内容，感谢阅读。

下一篇博客内容为：介绍 xlwt 模块设置 Excel表格文件 [单元格格式、字体格式、对齐方式、边框及填充等](https://blog.csdn.net/zhouz92/article/details/106833511 "单元格格式、字体格式、对齐方式、边框及填充等") 方法。

> 该专栏会对 Python 的第三方模块，如：xlwt，xlrd，python-docx等，操作 Office 办公软件（Word Excel PPT）的方法进行详细讲解。同时也会搭配一些实例演练，一方面强化知识点的理解与运用，另一方面也希望能起到，引导读者进行思考：如何用 python 提高 offic 办公软件办公效率的作用。感兴趣的朋友，可以点个 **关注** 或 **收藏** 。如在博客中遇到任何问题或想法，可留言或私信。**创作不易，你的支持是我最大的动力，感谢 ！**

> &#x20;**创作不易，你的支持是我最大的动力，感谢 ！**
