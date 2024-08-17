# (44条消息) Python获取pi值的五种方法\_是丝豆呀的博客-CSDN博客\_python求pi

-   PI = 3.14152653589793 &#x20;

    hh，背不下来吧

```python
import math
print(math.pi)

```

输出结果：

-   3.141592653589793

```python
import math
print(atan(1)*4)  # atan(x)会计算x的反正切值，也就是说当正切值为1时的弧度值，就是45°的弧度制表示，然后乘4就是180°的弧度制表示

```

> **atan(x)会计算x的反正切值，也就是说当正切值为1时的弧度值，就是45°的弧度制表示，然后乘4就是180°的弧度制表示**

输出结果：

-   3.141592653589793’

```python
import numpy
print(numpy.pi)

```

输出结果：

-   3.141592653589793

```python
import scipy
print(scipy.pi)

```

输出结果：

-   3.141592653589793
