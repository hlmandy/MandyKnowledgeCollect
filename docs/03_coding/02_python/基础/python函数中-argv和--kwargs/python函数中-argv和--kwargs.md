# python函数中\*argv和\*\*kwargs

[https://blog.csdn.net/qq\_42942961/article/details/109722023](https://blog.csdn.net/qq_42942961/article/details/109722023 "https://blog.csdn.net/qq_42942961/article/details/109722023")

## python函数参数`*args`以及`**kwargs`

-   在学习python函数时，你是不是会在源码调用中看到`*args`和`**kwargs`，例如`function(n,*args,*kwargs):`,还有不懂得小伙伴赶紧打开你的python IDE

```python
def func(n,*args,**kwargs):
  
  ...

```

#### 一、\*[args](https://so.csdn.net/so/search?q=args\&spm=1001.2101.3001.7020 "args")

> 其实很好理解的，首先对于`*args`来说：\*   你就把`*args`理解成函数除参数`n`外的多个参数，也就是一个列表

```python
def func(n,*args):
  print("这是参数n:{}".format(n))
  for i in args:
    print("这是参数*args:{}".format(i))
    

```

执行函数：

```python
func(1,1,2,3)

```

结果：

> 这是参数n:1 &#x20;
> 这是参数\_args:1 &#x20;
> 这是参数\_args:2 &#x20;
> 这是参数\\\*args:3

\\=============================================================================

#### 二、\\\*kwargs

> 对于`*kwargs`来说：\*   你就把`*kwargs`理解为参数为字典

```python
def func(n,*argv,**kwargs):
  
  print("n为：{}".format(n))
  
  
  for i in args:
    print("args为：{}".format(i))
    
  
  for key,value in kwargs.items():
    print("kwags为：{}===={}".format(key,value))

```

运行

```python
func(1,2,3,name="小爱同学",age=18)

```

结果

> n为：1 &#x20;
> argv为：2 &#x20;
> args为：3 &#x20;
> kwags为：name====小爱同学 &#x20;
> kwags为：age====18

#### 总结：

#### `*args`多个参数时，传递一个列表

#### `*kwargs`参数中有键值对时，通过\*kwargs以字典形式传参
