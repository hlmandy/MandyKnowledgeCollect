# python format用法详解

format 基本语法是通过 {} 和 : 来代替以前的 % 。

format 函数可以接受不限个参数，位置可以不按顺序。

format基本用法

"Hello {0} {1}".format("Chen","xin") # 引用第一个参数

\# 输出 "Hello Chen xin"

"{} is cute".format("Chen xin") # 引用第一个参数

\# 输出 "Chen xin is good"

"My name is {name}".format(name="Chen xin") # 引用名字为name的参数

\# 输出 "My name is Chen xin"

1\\. 类型转换

!s

!r

"Chen xin is a cute {!s}".format("baby") # !s 相当于对于参数调用str()

\# 输出 "Peppa pig is a cute baby"

"Chen xin is a cute {!r}".format("baby") # !r 相当于对于参数调用repr()

\# 输出 "Peppa pig is a cute "baby""

2\\. 通过位置来填充字符串

print("{0}, {1}, {2}".format("a", "b", "c"))  # a, b, c

print("{}, {}, {}".format("a", "c"))     # a, c

print("{2}, {0}".format("a", "c"))  # c, a

print("{2}, {0}".format(\ \*"abc"))         # c, a

print("{0} {1} {0}".format("aa", "bb"))         # aa bb aa

同一个参数可以填充多次，这个是format比%先进的地方

3\\. 按名称访问参数

print("name: {last\_name}{first\_ name}".format(last\_name="chen", first\_ name="xin"))

\# name: chenxin

name= {"last\_name": "chen", "first\_ name": "xin"}

print("name: {last\_name}, {first\_ name}".format(\ \*\* name))

\# name: chenxin

4. 通过参数属性访问

class MyList:

def \ \_\_ init\ \_\_(self, x, y):

self.x, self.y = x, y

def \ \_\_ str\ \_\_(self):

return "MyList({self.x}, {self.y})".format(self = self)

print(str(MyList("陈新明", "[www.chenxm.cc](http://www.chenxm.cc "www.chenxm.cc")")))

\# 网站名：陈新明, 地址 [www.chenxm.cc](http://www.chenxm.cc "www.chenxm.cc")

5\\. 通过参数的items访问

my\_list = \["陈新明", "[www.chenxm.cc](http://www.chenxm.cc "www.chenxm.cc")"]

print("网站名：{0\\\[0\\]}, 地址 {0\\\[1\\]}".format(my\\\_list))  # "0" 是必须的

\# 网站名：陈新明, 地址 [www.chenxm.cc](http://www.chenxm.cc "www.chenxm.cc")

6. 对齐字符串

"{:>5}".format(1) # 设置宽度为5，右对齐

"{:>5}".format(10)

"{:>5}".format(100)

"{:>5}".format(1000)

\# 输出下面的结果

"    1"

"   10"

"  100"

" 1000"

print("{:\ \_<30}".format("left aligned"))

\#"left aligned\ \_\_\ \_\_\ \_\_\ \_\_\ \_\_\ \_\_\ \_\_\ \_\_\ \_\_"

print("{:\ \_>30}".format("right aligned"))

\#"\ \_\_\ \_\_\ \_\_\ \_\_\ \_\_\ \_\_\ \_\_\ \_\_\ \_\_ right aligned"

print("{:\ \_^30}".format("centered"))

\#"\ \_\_\ \_\_\ \_\_\ \_\_\ \_\_\ \_\_\ \_\_\ \_\_\ \_\_ centered\ \_\_\ \_\_\ \_\_\ \_\_\ \_\_\ \_\_\ \_\_\ \_\_\ \_\_"

^   居中     后面带宽度，

<   左对齐 后面带宽度，

\\>   右对齐 后面带宽度，

:   号后面带填充的字符，只能是一个字符，不指定则默认是用空格填充。

7. 截断字符串

"{:.5}".format("Hello Chen") # 截取前5个字符

\# 输出 "Hello"

8. 数字格式化

print("{:.2f}".format(3.1415926));

\# 3.14

\\+ 表示在正数前显示 +，

\\-  负数

（空格） 表示在正数前加空格

b  二进制

d  十进制

o  八进制

x  十六进制

更多样式

9. 使用逗号作为千位分隔符

print("{:,}".format(1234567890))

\#"1,234,567,890"

10\\. 表示一个百分比

print("number: {:.2%}".format(0.61898))

\# number: 61.90%

11. 时间格式化

import datetime

d = datetime.datetime(2018, 7, 31, 15, 58, 58)

print("{:%Y-%m-%d %H:%M:%S}".format(d))

\# 2018-07-31 15:58:58

12. 访问元组中的元素

a = (1,2)

"X: {0\\\[0\\]};  Y: {0\\\[1\\]}".format(a)

\# 输出 "X: 1;  Y: 2"

\# 注意：用%格式化字符串不支持此功能

13. 访问字典中的元素

people = {"name": "Chen", "age": 18}

"My name is {p\\\[name\\]} and my age is {p\\\[age\\]}".format(p=people )

\# 输出 "My name is Chen and my age is 18"

\# 注意：用%格式化字符串不支持此功能
