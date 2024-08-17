# Python xlwt 操作 excel 表格基础（三）：单元格格式、字体格式、对齐方式、边框及填充等\_xlwt 填充\_YouMi Chou的博客-CSDN博客

#### 前言：

上一篇博客介绍了xlwt 模块设置 Excel 表格文件的 [窗口显示样式、默认打印格式等](https://blog.csdn.net/zhouz92/article/details/106811760 "窗口显示样式、默认打印格式等") 方法。

本篇博客主要对表格文件的 **单元格格式设置** 进行介绍，主要包括：

**1. 单元格数据类型；2. 字体设置；3. 对齐方式；4. 边框设置；5. 填充设置；6. 单元格保护。**&#x20;

#### 1、数据类型设置

这里还是用上一节的方式，先建立两个sheet表，写入数据，然后对Tset sheet表设置自定义的单元格格式，T2 sheet表以默认的单元格格式写入。

```python
import xlwt

work_book = xlwt.Workbook()
work_sheet = work_book.add_sheet('Test')
w2 = work_book.add_sheet('T2')

z = [[r,c] for r in range(20) for c in range(20)]
[l.append(str(i)) for i,l in enumerate(z)]

```

**单元格格式设置方法：**&#x20;

单元格格式设置也有一套固定的流程：

**创建单元格样式对象——设置样式（修改样式属性值）——将数据写入单元格时以创建的样式写入**

```python
my_style_1 = xlwt.XFStyle()

my_style_1.num_format_str = '0'

for info in z:
    
    work_sheet.write(info[0],info[1],info[2],my_style_1)
    w2.write(info[0],info[1],info[2])
    

work_book.save('Test3.xls')

```

**可设置的数据格式有：**&#x20;

```
`'''
           'general',
           '0',
           '0.00',
           '#,##0',
           '#,##0.00',
           '"$"#,##0_);("$"#,##0)',
           '"$"#,##0_);[Red]("$"#,##0)',
           '"$"#,##0.00_);("$"#,##0.00)',
           '"$"#,##0.00_);[Red]("$"#,##0.00)',
           '0%',
           '0.00%',
           '0.00E+00',
           '# ?/?',
           '# ??/??',
           'M/D/YY',
           'D-MMM-YY',
           'D-MMM',
           'MMM-YY',
           'h:mm AM/PM',
           'h:mm:ss AM/PM',
           'h:mm',
           'h:mm:ss',
           'M/D/YY h:mm',
           '_(#,##0_);(#,##0)',
           '_(#,##0_);[Red](#,##0)',
           '_(#,##0.00_);(#,##0.00)',
           '_(#,##0.00_);[Red](#,##0.00)',
           '_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"_);_(@_)',
           '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',
           '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',
           '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)',
           'mm:ss',
           '[h]:mm:ss',
           'mm:ss.0',
           '##0.0E+0',
           '@'

''` 


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
   29
   30
   31
   32
   33
   34
   35
   36
   37
   38
   39

```

#### 2、字体设置

先建立一个字体对象：

```python
font = my_style_1.font

```

然后对字体名称，字体高度、加粗等方面进行设置：

**可设置项（默认设置）：**&#x20;

实例：

```
`font.name = 'Times New Roman '

ont.height = 400

ont.italic = True

ont.struck_out = True

ont.outline = True

ont.shadow = True

ont.colour_index = 0x0C

ont.bold = True

ont.underline = 2


ont.charset = 0x86` 


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

```

**设置效果图：**&#x20;

![](https://img-blog.csdnimg.cn/20200618143454127.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3pob3V6OTI=,size_16,color_FFFFFF,t_70#pic_center)

**获取字体格式信息：**&#x20;

除了可以设置单元格格式外，还可以通过\_search\_ key() 方法来获取单元格样式信息。

```python
font_info = font._search_key()
print(font_info)

```

**字体格式设置说明：**&#x20;

上面的设置将字体颜色用，设置为蓝色：

```python
font.colour_index = 0x0C

```

字体颜色可选值：

```
`"""
qua 0x31
lack 0x08
lue 0x0C
lue_gray 0x36
right_green 0x0B
rown 0x3C
oral 0x1D
yan_ega 0x0F
ark_blue 0x12
ark_blue_ega 0x12
ark_green 0x3A
ark_green_ega 0x11
ark_purple 0x1C
ark_red 0x10
ark_red_ega 0x10
ark_teal 0x38
ark_yellow 0x13
old 0x33
ray_ega 0x17
ray25 0x16
ray40 0x37
ray50 0x17
ray80 0x3F
reen 0x11
ce_blue 0x1F
ndigo 0x3E
vory 0x1A
avender 0x2E
ight_blue 0x30
ight_green 0x2A
ight_orange 0x34
ight_turquoise 0x29
ight_yellow 0x2B
ime 0x32
agenta_ega 0x0E
cean_blue 0x1E
live_ega 0x13
live_green 0x3B
range 0x35
ale_blue 0x2C
eriwinkle 0x18
ink 0x0E
lum 0x3D
urple_ega 0x14
ed 0x0A
ose 0x2D
ea_green 0x39
ilver_ega 0x16
ky_blue 0x28
an 0x2F
eal 0x15
eal_ega 0x15
urquoise 0x0F
iolet 0x14
hite 0x09
ellow 0x0D

""` 


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
   29
   30
   31
   32
   33
   34
   35
   36
   37
   38
   39
   40
   41
   42
   43
   44
   45
   46
   47
   48
   49
   50
   51
   52
   53
   54
   55
   56
   57
   58
   59

```

**字体上下标设置、下划线设置、字符集设置：**&#x20;

```python
font.escapement = 1

font.underline = 2

font.charset = 0x86

```

**解析：**&#x20;

这里单元格默认的字体上下标设置是：

> **self.escapement = self.ESCAPEMENT\_NONE**

查下面的索引：ESCAPEMENT\_NONE = 0x00 &#x20;
如我们想将单元格设置为上标，上标是：ESCAPEMENT\_SUPERSCRIPT ，对应的值为：0x01（16位数字） &#x20;
及单元格格式设置为：

> **font.escapement = 0x01**或：**font.escapement = 1**

**下面出现的其他设置都是类似原理，如再次出现就不解释了。**&#x20;

**上下标、下划线、字符集索引：**&#x20;

```
`ESCAPEMENT_NONE         = 0x00

ESCAPEMENT_SUPERSCRIPT  = 0x01

ESCAPEMENT_SUBSCRIPT    = 0x02

UNDERLINE_NONE          = 0x00
UNDERLINE_SINGLE        = 0x01
UNDERLINE_SINGLE_ACC    = 0x21
UNDERLINE_DOUBLE        = 0x02
UNDERLINE_DOUBLE_ACC    = 0x22


CHARSET_ANSI_LATIN          = 0x00
CHARSET_SYS_DEFAULT         = 0x01
CHARSET_SYMBOL              = 0x02
CHARSET_APPLE_ROMAN         = 0x4D
CHARSET_ANSI_JAP_SHIFT_JIS  = 0x80
CHARSET_ANSI_KOR_HANGUL     = 0x81
CHARSET_ANSI_KOR_JOHAB      = 0x82
CHARSET_ANSI_CHINESE_GBK    = 0x86
CHARSET_ANSI_CHINESE_BIG5   = 0x88
CHARSET_ANSI_GREEK          = 0xA1
CHARSET_ANSI_TURKISH        = 0xA2
CHARSET_ANSI_VIETNAMESE     = 0xA3
CHARSET_ANSI_HEBREW         = 0xB1
CHARSET_ANSI_ARABIC         = 0xB2
CHARSET_ANSI_BALTIC         = 0xBA
CHARSET_ANSI_CYRILLIC       = 0xCC
CHARSET_ANSI_THAI           = 0xDE
CHARSET_ANSI_LATIN_II       = 0xEE
CHARSET_OEM_LATIN_I         = 0xFF` 


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
*   21
*   22
*   23
*   24
*   25
*   26
*   27
*   28
*   29
*   30
*   31

```

#### 3、单元格对齐方式

建立对齐方式对象，设置对齐方式属性：

**可设置项（默认设置）：**&#x20;

实例：

```python
alignment = my_style_1.alignment

alignment.horz = 2

alignment.vert = 1

alignment.rota = 45

alignment.shri = 1

```

**设置效果图：**&#x20;

![](https://img-blog.csdnimg.cn/202006181451133.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3pob3V6OTI=,size_16,color_FFFFFF,t_70#pic_center)

**获取对齐方式信息：**&#x20;

```python
alignment_info = alignment._search_key()
print(alignment_info)

```

**其他对齐方式索引：**&#x20;

```
`HORZ_GENERAL                = 0x00
ORZ_LEFT                   = 0x01
ORZ_CENTER                 = 0x02
ORZ_RIGHT                  = 0x03
ORZ_FILLED                 = 0x04
ORZ_JUSTIFIED              = 0x05 
ORZ_CENTER_ACROSS_SEL      = 0x06 
ORZ_DISTRIBUTED            = 0x07 

ERT_TOP                    = 0x00
ERT_CENTER                 = 0x01
ERT_BOTTOM                 = 0x02
ERT_JUSTIFIED              = 0x03 
ERT_DISTRIBUTED            = 0x04 

OTATION_0_ANGLE            = 0x00
OTATION_STACKED            = 0xFF


HRINK_TO_FIT               = 0x01
OT_SHRINK_TO_FIT           = 0x00` 


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

```

#### 4、单元格边框设置

建立单元格边框对象，设置属性值：

**可设置项（默认值）：**&#x20;

实例：

```
`borders = my_style_1.borders

borders.left = 1

borders.right = 2

borders.top = 3

borders.bottom = 4

borders.diag = 5

borders.left_colour = 0x0C

borders.right_colour = 0x33

borders.top_colour = 0x11

borders.bottom_colour = 0x0A


borders.diag_colour = 0x0D` 


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
*   21
*   22

```

**设置效果：**&#x20;

![](https://img-blog.csdnimg.cn/20200618150323973.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3pob3V6OTI=,size_16,color_FFFFFF,t_70#pic_center)

**获取边框设置信息：**&#x20;

```sql
borders_info = borders._search_key()
print(borders_info)

```

**边框线型索引：**&#x20;

```ybsz
NO_LINE = 0x00
THIN    = 0x01
MEDIUM  = 0x02
DASHED  = 0x03
DOTTED  = 0x04
THICK   = 0x05
DOUBLE  = 0x06
HAIR    = 0x07
#The following for BIFF8
MEDIUM_DASHED               = 0x08
THIN_DASH_DOTTED            = 0x09
MEDIUM_DASH_DOTTED          = 0x0A
THIN_DASH_DOT_DOTTED        = 0x0B
MEDIUM_DASH_DOT_DOTTED      = 0x0C
SLANTED_MEDIUM_DASH_DOTTED  = 0x0D

```

**注：边框颜色设置可参看字体颜色设置索引。**&#x20;

#### 5、填充设置

建立填充对象，设置属性：

**可设置项（默认值）：**&#x20;

实例：

```python
pat = my_style_1.pattern

pat.pattern = 1

pat.pattern_fore_colour = 0x14

pat.pattern_back_colour = 0x14

```

**效果图：**&#x20;

![](https://img-blog.csdnimg.cn/20200618151241285.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3pob3V6OTI=,size_16,color_FFFFFF,t_70#pic_center)

**注：xlwt 模块好像只提供了颜色填充设置方法，图案填充方法未提供。颜色索引见字体颜色索引。**&#x20;

#### 6、单元格保护

建立保护对象，设置属性：

**可设置项（默认设置）：**&#x20;

实例：

```python
protection.cell_locked = 1

protection.formula_hidden = 1

work_sheet.set_protect(1)

```

**注：只有在sheet表设置为保护时才有效，（效果可参考第二节表格保护内容）。**&#x20;

#### 结尾：

以上就是本篇全部内容，感谢阅读。

下一篇博客内容为：根据 xlwt 模块的一些方法，用面向对象的思想，自写一个类实现：[按行按列写入、自定义格式方法、自动调整列宽等](https://blog.csdn.net/zhouz92/article/details/106857122 "按行按列写入、自定义格式方法、自动调整列宽等") 等功能。

> 该专栏会对 Python 的第三方模块，如：xlwt，xlrd，python-docx等，操作 Office 办公软件（Word Excel PPT）的方法进行详细讲解。同时也会搭配一些实例演练，一方面强化知识点的理解与运用，另一方面也希望能起到，引导读者进行思考：如何用 python 提高 offic 办公软件办公效率的作用。感兴趣的朋友，可以点个 **关注** 或 **收藏** 。如在博客中遇到任何问题或想法，可留言或私信。**创作不易，你的支持是我最大的动力，感谢 ！**

> &#x20;**创作不易，你的支持是我最大的动力，感谢 ！**
