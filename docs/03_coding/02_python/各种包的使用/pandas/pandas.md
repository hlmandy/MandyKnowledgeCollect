# pandas

## 目录

-   [其他](#其他)
    -   [连续数据离散化](#连续数据离散化)
-   [时间序列：](#时间序列)
-   [apply](#apply)
-   [乘法](#乘法)
-   [一些application:](#一些application)
    -   [pandas 实现coalesce](#pandas-实现coalesce)
    -   [处理时间序列](#处理时间序列)

&#x20;python\_pandas

官网：[https://pandas.pydata.org/pandas-docs/stable/reference/io.html](https://pandas.pydata.org/pandas-docs/stable/reference/io.html "https://pandas.pydata.org/pandas-docs/stable/reference/io.html")

\*\* 常用code：\*\* ​

```python
df["flight_date"]= pd.to_datetime(df['flight_date'],errors='coerce')

df = df[df['fltno']=='3U8703']

df.to_csv(fname,index=False,date_format="%Y/%m/%d %H:%M")

```

[创建、读、写](创建、读、写.md "创建、读、写")

[DataFrame描述性](DataFrame描述性.md "DataFrame描述性")

[更改值](更改值.md "更改值")

[选择&筛选](选择&筛选.md "选择&筛选")

[合并](合并.md "合并")

[Pandas Groupby](Pandas%20Groupby.md Groupby/Pandas Groupby.md> "Pandas Groupby")

[pandas & numpy](pandas%20&%20numpy.md & numpy/pandas & numpy.md> "pandas & numpy")

[日期](日期.md "日期")

# 其他

## 连续数据离散化

```python
pandas.cut()
```

# 时间序列：

参考：[https://www.cnblogs.com/zhangyafei/p/10513893.html](https://www.cnblogs.com/zhangyafei/p/10513893.html "https://www.cnblogs.com/zhangyafei/p/10513893.html")

```python
# # 使用上一期
df.shift(1)

# 使用 t 期移动平均
train.rolling(window=t).mean()

```

# apply

```python
df.apply(func,axis=1)

# 带参数
data_df['remark'].apply(segment_sentence, args=(word_list,))
```

# 乘法

```python
import pandas as pd
df=pd.read_csv("csv.csv")
df['mul']=df['num'].mul(df['sale'])
print(df)

'''
   num  sale  mul
0    2    49   98
1    2    93  186
2    1    78   78
3    2    67  134
4    1    89   89
5    1    50   50

'''

```

# 一些application:

## pandas 实现coalesce

我想得到这样的一列数据，如果a列有数，就取a中的值，如果空缺，就取b列中的值。

效果类似于sql里的coalesce函数。这个功能在pandas里怎么实现？

```python
df["a"].fillna(df["b"])

df['a'].combine_first(df['b'])
```

[Python3 pandas库(13) nlargest()分组取最大多行并求和 - 知乎](Python3%20pandas库(13)%20nlargest()分组取最大多行并求和%20-%20知乎.md pandas库(13) nlargest()/Python3 pandas库(13) nlargest()分组取最大多行并求和 - 知乎.md> "Python3 pandas库(13) nlargest()分组取最大多行并求和 - 知乎")

[python - 计算多列的平均值，而忽略NaN pandas numpy - IT工具网](python%20-%20计算多列的平均值，而忽略NaN%20pandas%20numpy%20-%20IT工具网.md - 计算多列的平均值，而忽略NaN panda/python - 计算多列的平均值，而忽略NaN pandas numpy - IT工具网.md> "python - 计算多列的平均值，而忽略NaN pandas numpy - IT工具网")

## 处理时间序列

[13.Pandas处理时间序列](13.Pandas处理时间序列.md "13.Pandas处理时间序列")
