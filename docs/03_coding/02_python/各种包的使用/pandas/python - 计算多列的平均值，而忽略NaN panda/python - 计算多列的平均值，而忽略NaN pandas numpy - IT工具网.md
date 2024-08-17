# python - 计算多列的平均值，而忽略NaN pandas numpy - IT工具网

我有一个基本的值表: &#x20;

```
import pandas as pd
import numpy as np
test = pd.read_csv('mean_test.csv')
test.replace('n/a',np.nan)
test

value1  value2  value3
1   9   5
5   NaN 4
9   55  NaN
NaN 4   9

```

我想计算三个值的平均值，而忽略NaN，因此对于第二行，它将是(5 + 4)/2。因此，我无法使用.replace函数在NaN的位置放置零。我搜索了其他一些问题，但找不到任何涵盖此问题的内容。我缺少明显的东西吗？

**最佳答案**

Pandas 会为您处理`NaN`: &#x20;

```
>>> df
value1  value2  value3
0       1       9       5
1       5     NaN       4
2       9      55     NaN
3     NaN       4       9

>>> df.mean(axis=1)
0     5.0
1     4.5
2    32.0
3     6.5
dtype: float64

```
