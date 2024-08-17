# pandas to\_csv()写入函数参数详解\_副本

[pandas](https://so.csdn.net/so/search?q=pandas\&spm=1001.2101.3001.7020 "pandas") to\_csv()写入函数参数详解

```python
DataFrame.to_csv(path_or_buf=None, sep=',', na_rep='', float_format=None, columns=None, header=True, index=True, index_label=None, mode='w', encoding=None, compression='infer', quoting=None, quotechar='"', line_terminator=None, chunksize=None, date_format=None, doublequote=True, escapechar=None, decimal='.', errors='strict')

```

**path\_or\_buf=None** 字符串或文件目录，文件路径或对象，如果未提供，结果将作为字符串返回。如果传递了一个文件对象，应该用换行= ’ '，禁用通用换行符。

**sep=’,’** 输出文件的字段分隔符,默认点

**na\_rep**=’’,缺失数据填充

**float\_format=None**，小数点保留几位

**columns=None**, 要写入的字段

**header=True**，列名的别名

**index=True**,写行名(索引)

**index\_label=None**，索引列的列标签。如果没有给出，并且[header](https://so.csdn.net/so/search?q=header\&spm=1001.2101.3001.7020 "header")和index为True，则使用索引名。如果对象使用多索引，应该给出一个序列。如果不打印索引名称的字段。使用index \_ label = Falser以便在R中更容易导入

**mode=‘w’** 写入模式，默认为w，r : 只能读, 必须存在, 可在任意位置读取

w : 只能写, 可以不存在, 必会擦掉原有内容从头写

a : 只能写, 可以不存在, 必不能修改原有内容, 只能在结尾追加写, 文件指针无效

r+ : 可读可写, 必须存在, 可在任意位置读写, 读与写共用同一个指针

w+ : 可读可写, 可以不存在, 必会擦掉原有内容从头写

a+ : 可读可写, 可以不存在, 必不能修改原有内容, 只能在结尾追加写, 文件指针只对读有效 (写操作会将文件指针移动到文件尾)

**encoding=None** , 表示输出文件中使用的编码的字符串，默认为“utf-8”

一、编码方式不同UTF-8编码采用的是一种多字节编码，在英文中8位代表一个字节，而中文字是24位代表一个字节。而GBK编码方式都是通过双字节来表达，不管文字是英文还是中文字符都是一概而论，当然在区分中文的时候，会定位最高位为1。 &#x20;
二、UIF-8及GBK的兼容性这两种编码都是系统的字符编码，GBK是在国家标准GB2312基础上扩容后兼容GB2312的标准,UTF-8编码的文字可以在各国各种支持UTF8字符集的浏览器上显示。 &#x20;
也就是说如果你的网站使用的是UTF-8编码，在国外观看你的网站浏览器上就会帮你切换到中文状态，而使用GBK编码的话，在国外浏览网页就必须要下载中文语言支持包，如果没有下载就会出现乱码的现象。 &#x20;
三、UIF-8好还是GBK编码好？UTF-8在英文站点中所占用的字节是1个字节，而GBK编码所占用的是2个字节，这样如果是在英文网站或者你的网站英文字符过多的话，建议使用UTF-8编码，这样能节省一些空间。 &#x20;
对于中文比较多的论坛 ，使用GBK则每个字符占用2个字节，而使用UTF－8中文却只占3个字节。可以采用GBK版本，但是UIF-8在所以浏览器都能正常显示，而GBK可能有些浏览器会有不兼容的现象，所以根据实际情况来衡量网站到底使用哪种编码。

**compression=‘infer’** 如果是字符串，表示压缩模式。如果为dict，则’ method '处的值是压缩模式。压缩模式可以是以下任何可能的值:{ ’ infer ‘，’ gzip ‘，’ bz2 ‘，’ zip ‘，’ xz ‘，’ None}。如果压缩模式是“推断”和path\_or\_buf类似于路径，则从以下扩展中检测压缩模式:“”。gz ‘，. bz2 ‘，’。zip’ or '。xz’。(否则不压缩)。如果给定的dict和模式是{‘zip ‘，’ gzip ‘，’ bz2’}之一，或根据上述推断，则其他条目作为附加压缩选项传递

**quoting=None**, 默认为to csv.QUOTE\_MINIMAL。如果你设置了一个浮点格式(\_ f)然后浮点被转换成字符串，从而转换成csv.QUOTE\_MINIMALl将会将它们视为非数字

**quotechar=’"’** 用于引用字段的字符

**line\_terminator=None** 输出文件中使用的换行符或字符序列。默认为os.linesep，这取决于调用此方法的操作系统(例如，对于linux为“n”，对于Windows为“rn”)

**chunksize=None** 一次写入行

**date\_format=None** , 日期时间对象的格式字符串

**doublequote=True,** 引用路径在双引号内

**escapechar=None,** 用于转义的字符

**decimal=’.’,** 识别为十进制分隔符的字符

**errors=‘strict’** 指定如何处理编码和解码错误
