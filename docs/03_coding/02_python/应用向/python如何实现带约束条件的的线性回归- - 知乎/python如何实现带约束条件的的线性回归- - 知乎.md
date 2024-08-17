# python如何实现带约束条件的的线性回归? - 知乎

# python 如何实现带约束条件的的线性回归?

一般的线性回归在 python 中有多种实现方式，例如 scipy，statsmodel，np 都可以实现，但最近遇到一个对回归系数有范围限制，例如 0\&lt;w\&lt;1, 我就不知道该用 python 的什么解决问题了。我想到了可以将其转化求解最小二乘法的二次规划问题，用 scipy.optimize.minimize() 函数解决，但总感觉对于这种带系数约束的多元线性回归 python 应该有更简单的解决方案，找了一圈也没发现，所以在此求高人帮助～

#### 2 个回答

默认排序

\[

]\([//www.zhihu.com/people/dilab](//www.zhihu.com/people/dilab "//www.zhihu.com/people/dilab"))

[半个冯博士](//www.zhihu.com/people/dilab "半个冯博士")

机器学习和数学

14 人赞同了该回答

乍一看的时候想错了，脑子里想的是如何用 matrix 直接实现。

`scipy`里其实提供得有相应的方法：

具体是：[scipy.optimize.lsq\_linear](https://link.zhihu.com/?target=https%3A//docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.lsq_linear.html "scipy.optimize.lsq_linear")

## 官网的说法是在解决这个问题：

```text
minimize 0.5 * ||A x - b||**2
subject to lb <= x <= ub
```

其实也就是你说的问题。

## 最小二乘可以这样子表示：

![](https://www.zhihu.com/equation?tex=\min+\frac{1}{2}\\|Xw-Y+\\|^2++\\\\++\text{s.+t.}+\quad+\\|w\\|\le+a)

-

![](https://www.zhihu.com/equation?tex=X%2CY)

![](https://www.zhihu.com/equation?tex=X)

> 如果回归方法有一个偏差值，就在&#x20;

![](https://www.zhihu.com/equation?tex=X)

> 的最后一列插入一个全为 1 的列向量就行。

-

![](https://www.zhihu.com/equation?tex=w)

-   上面这个式子里的&#x20;

![](https://www.zhihu.com/equation?tex=a)

用这个形式基本上可以解决你的问题了。

## 更高级的需求分析

如果你想解决的问题是这种就比较麻烦了：

比如模型是：&#x20;

![](https://www.zhihu.com/equation?tex=y%3Dax%2Bb)

只要求&#x20;

![](https://www.zhihu.com/equation?tex=l\le+a\le+u)

![](https://www.zhihu.com/equation?tex=b)

其实题主的问题我以前也考虑过，不过这种实现在本框架下稍有点麻烦，所以稍加一点分析。

先说`scipy`里的方法，几个参数要注意一下：

-   **A -** array\_like, sparse matrix of LinearOperator, shape (m, n)

一个&#x20;

![](https://www.zhihu.com/equation?tex=m\times+n)

![](https://www.zhihu.com/equation?tex=X)

-   bounds 2 - **tuple of array\_like**, optionalLower and upper bounds on independent variables. Defaults to no bounds. Each array must have shape (n,) or be a scalar, in the latter case a bound will be the same for all variables. Use np.inf with an appropriate sign to disable bounds on all or some variables.

这一段要仔细一点，**上下限也可以是数组（向量）**。

那么再把数学式子写出来就是:

![](https://www.zhihu.com/equation?tex=\min+\frac{1}{2}\\|Xw-Y+\\|^2++\\\\++\text{s.+t.}+\quad+l_i+\le+w_i\le+u_i+\\\\+i+%3D+1%2C2%2C...%2Cd)

这里比较好的一点就是对**优化变量的每一个分量都可以限制**。

所以一种**退而求其次**的思路是：对你想要限制的变量设置上下限，而其它的变量取一个很大的范围。

那么体现在程程序上就简单了，比如还是一维的例子就直接放大对&#x20;

![](https://www.zhihu.com/equation?tex=b)

```python
lb = np.array([-1.,-1000.])
ub = np.array([1.,1000.])
```

> 另外一种看起来更合理的方法上把上下限分别设为正负的 `np.inf`。虽然简单测试了下没有问题，但会不会在一些比较极端的情况出错就不敢保证了。

另外，理论上的分析可以参考这些论文：

1.  Hans Joachim Werner,On inequality constrained generalized least-squares estimation,Linear Algebra and its Applications,Volume 127,1990,Pages 379-392,ISSN 0024-3795, [https://doi.org/10.1016/0024-3795(90)90351-C](https://link.zhihu.com/?target=https%3A//doi.org/10.1016/0024-3795%2890%2990351-C "https://doi.org/10.1016/0024-3795(90)90351-C").
2.  Jodi L. Mead, Rosemary A. Renaut,Least squares problems with inequality constraints as quadratic constraints,Linear Algebra and its Applications,Volume 432, Issue 8,2010,Pages 1936-1949,ISSN 0024-3795,[https://doi.org/10.1016/j.laa.2009.04.017.](https://link.zhihu.com/?target=https%3A//doi.org/10.1016/j.laa.2009.04.017.%28http%3A//www.sciencedirect.com/science/article/pii/S0024379509002341 "https://doi.org/10.1016/j.laa.2009.04.017.")

PS:

1、 最后一种情况数学上的理想形式是没有的（至少目前我没发现，各位如果有发现请告知）。这个问题要去推导也好办，把目标函数设成&#x20;

![](https://www.zhihu.com/equation?tex=z%3Df\(w\))

2、另外从应用的角度上来讲个人觉得还是直接用 Ridge, Lasso 一类的要好些。也就是直接让&#x20;

![](https://www.zhihu.com/equation?tex=w)

3、题主直接用`scipy.optimize`的思路个人觉得没问题。当然如果题主用的是我说的这种方法，也就当我没说吧。哈哈哈。

4、另外代码我就不粘了。有些时候还是不能惯着伸手党。（题主查了很多资料也做了很多尝试，相信肯定不是）。

[编辑于 2020-09-08 17:49](//www.zhihu.com/question/419906696/answer/1459176181 "编辑于 2020-09-08 17:49")

真诚赞赏，手留余香

赞赏

还没有人赞赏，快来当第一个赞赏的人吧！

赞同 14添加评论

分享

收藏喜欢

收起

\[

![](https://pica.zhimg.com/v2-210d2b308bba1bd12447718a52b5f5db_xs.jpg?source=1940ef5c)

]\([//www.zhihu.com/people/yun-pu-xian-sheng](//www.zhihu.com/people/yun-pu-xian-sheng "//www.zhihu.com/people/yun-pu-xian-sheng"))

[清海](//www.zhihu.com/people/yun-pu-xian-sheng "清海")

28 人赞同了该回答

在工作中碰到了一个需要在 python 里实现带约束的多元线性回归问题，只是这个问题是实现一个大类资产配置，也就是要求各自资产的权重，除了提出说到的每一个权重 w 在\[0,1]之间，**还包括所有权重的和也要小于等于 1**，单单是这一个约束条件的添加，我就想了很久，也做了很多探索尝试，终于还是解决了，我最终编写了一个多元回归的函数，这个函数可以实现带有上述两种约束条件的（任意自变量个数）的线性回归。

```python3
import numpy as np
from scipy.optimize import shgo

#写一个通用的多元一次回归的算法模型，自变量个数不确定
def my_general_linear_model_func(A1,b1):
    num_x = np.shape(A1)[1]
    def my_func(x):
        ls = 0.5*(b1-np.dot(A1,x))**2
        result = np.sum(ls)
        return result
    def g1(x):
        return np.sum(x) #sum of X >= 0
    def g2(x):
        return 1-np.sum(x) #sum of X <= 1
    cons = ({'type': 'ineq', 'fun': g1}
            ,{'type': 'ineq', 'fun': g2})
    x0 = np.zeros(num_x)
    bnds = [(0,1)]
    for i in range(num_x-1):
        bnds.append((0,1))
    res1 = shgo(my_func, 
                bounds = bnds, 
                constraints=cons)
    
    return res1

#测试
A1 = np.array([[0.12,5.96,3.14],[0.68,7.89,4.56]])
b1 = np.array([3,5])

my_general_linear_model_func(A1,b1)#测试通过！
```

在金融界工作的朋友，如果在工作中也遇到了这个问题，希望我这段代码能够给您启发

[发布于 2021-05-07 16:15](//www.zhihu.com/question/419906696/answer/1873308445 "发布于 2021-05-07 16:15")

赞同 28收起评论
