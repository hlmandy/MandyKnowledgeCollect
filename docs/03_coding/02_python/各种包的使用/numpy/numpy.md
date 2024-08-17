# numpy

## 目录

-   [1. numpy](#1-numpy)
    -   [1）点乘](#1点乘)
    -   [2）矩阵乘](#2矩阵乘)

## 1. numpy

#### 1）点乘

```python
import numpy as np

w = np.array([[0.4], [1.2]])
x = np.array([range(1,6), range(5,10)])

print w
print x
print w*x
```

运行结果如下图：

![](https://images2018.cnblogs.com/blog/733271/201807/733271-20180719120005463-1539984894.png)

#### 2）矩阵乘

```python
import numpy as np

w = np.array([[0.4, 1.2]])
x = np.array([range(1,6), range(5,10)])

print w
print x
print np.dot(w,x)
```

运行结果如下：

![](https://images2018.cnblogs.com/blog/733271/201807/733271-20180719115610502-1009074786.png)
