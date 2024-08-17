官网：https://pandas.pydata.org/pandas-docs/stable/reference/io.html

[TOC]

# 1. 创建、读、写

## 1.1 创建



```python
d = {'col1': [1, 2], 'col2': [3, 4]}
df = pd.DataFrame(data=d)
```





## 1.2 读

### 1.2.1 从csv/excel读取

```python
apt_list = pd.read_csv("./QW机场.csv",encoding="utf-8")
flight_sch = pd.read_excel("../raw_data_210428/实时航班计划表6.7-6.13.xlsx",dtype={'班期':str})
##跳过第一行
pd.read_excel("各基地间航材陆运时间表(1)(1).xlsx",skiprows=[0])
```

### 1.2.2 从数据库读取

[pandas.read_sql_query](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_sql_query.html)

> pandas.read_sql_query(sql, con, index_col=None, coerce_float=True, params=None, parse_dates=None, chunksize=None, dtype=None)

```python
pd.read_sql_query
```



## 1.3 写

```python
flight_sch.to_csv('flight_schedule.csv',encoding='gbk',index=False)
flight_sch.to_csv('flights.txt',encoding='gbk',index=False,sep='\t')
```

# 2. DataFrame描述性

```python
# 查看index
DataFrame.index
# 查看columns
DataFrame.columns
# 查看数据类型
DataFrame.dtypes
# shape
DataFrame.shape

# 数据描述
DataFrame.info()	# 显示每个column的缺失值情况、dtype
DataFrame.describe()	# 可以看到 count，均值、方差、四分位点

```

## 每一列series的描述属性

```python
DataFrame[col].value_counts()	# or Series.value_counts()

```



## 相关性分析

得到相关系数矩阵

```python
corr_matrix = data.corr()	# 得到相关系数矩阵
corr_matrix['y'].sort_values(ascending=False)
```

作图

```python
from pandas.plotting import scatter_matrix
attributes = ["median_house_value", "median_income", "total_rooms",
"housing_median_age"]
scatter_matrix(housing[attributes], figsize=(12, 8))
```

## 数据清洗

### 缺失值处理

```python
housing.dropna(subset=["total_bedrooms"]) # option 1
housing.drop("total_bedrooms", axis=1) # option 2
median = housing["total_bedrooms"].median() # option 3
housing["total_bedrooms"].fillna(median, inplace=True)
```



## 某一列的取值：

```python
# 某一列取值转为list
data0['ac_type_short'].drop_duplicates().to_list()
```





# 3. 更改

## 3.1 改变某一个值

例如，对df，找到 key = value的那一行，对那一行的target列进行修改。

首选，需要找到行的index，然后再调用df.loc

```python
row_idx = df[df['key']=="value"].index.tolist()
df.loc[row_idx,'target']=70
```



## 3.2 换列名

```python
df.rename(columns={"code3": "arr_code3", "code4": "arr_code4"}, inplace=True)
```



## 删除一列



```python
df = df.drop('col',axis=1)
```





## 3.3 排序

```python
df.sort_values('data_month', ascending=True, inplace=False )
```





## 日期转换

```python
df["datetime"]= pd.to_datetime(df['datetime'],errors='coerce')

df["datetime"]= pd.to_datetime(df['datetime'],format="%m/%d/%Y")
## 获取年月日
df['Year'] = df['date'].dt.year 
df['Month'] = df['date'].dt.month 
df['dow'] = df['date'].dt.dayofweek+1

## 日期相减得到秒
(tmp1['deptime_2'] - tmp1['arrtime_1'])/pd.Timedelta(1, 'S')
#得到minutes
(tmp1['deptime_2'] - tmp1['arrtime_1'])/pd.Timedelta(1, 'm')
# 得到hours
(delay_flight_df['Sd'] - delay_flight_df['Td'])/pd.Timedelta(1, 'h')

```



## 列截取部分

```python
flight['fltno'].str[-4:]
```





# 4. 选择

## 4.1 选择部分列

```python
df = df[['date','is_domestic','flight', 'dpt_code4']]
```



## 4.2 数据筛选



```python
data = data[data['ac_type_short']=='A320']
data=data[data['ac_type_short'].isin(['A319','A320','A321'])]
```



## 条件筛选赋值

```python
## 多重条件：或
df.y[(df['x']<= 10) | (df['x']>=100)] = 1

# 且
all_data[(all_data['User_id'] == 1439408) & (all_data['Date'].isna())]
```







# 5. stack()

![img](https://img-blog.csdn.net/20180704191137494?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1Nfb19sX29fbg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

```python
tmp1 = tmp.stack().reset_index()
```



# merge

 ```python
 pd.merge(left, right, how='inner', on=None, left_on=None, right_on=None,
          left_index=False, right_index=False, sort=True,
          suffixes=('_x', '_y'), copy=True, indicator=False,
          validate=None)
 ————————————————
 版权声明：本文为CSDN博主「brucewong0516」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
 原文链接：https://blog.csdn.net/brucewong0516/article/details/82707492
 ```



# 拼接、增加行

append是series和dataframe的方法，使用它就是默认沿着列进行凭借（axis = 0，列对齐）

```python
result = df1.append(df2)
```

![这里写图片描述](img/20160913195644364.png)

```python
new=pd.DataFrame({'name':'lisa',
                  'gender':'F',
                  'city':'北京',
                  'age':19,
                  'score':100},
                 index=[1])   # 自定义索引为：1 ，这里也可以不设置index
print(new)

print("-------在原数据框df1最后一行新增一行，用append方法------------")
df1=df1.append(new,ignore_index=True)   # ignore_index=True,表示不按原来的索引，从0开始自动递增
```





## list拼接

```
pd.concat([df1,df2,df3],axis=0)
```





# 其他

## 连续数据离散化

```python
pandas.cut()
```



# 时间序列：

参考：https://www.cnblogs.com/zhangyafei/p/10513893.html

```python
# # 使用上一期
df.shift(1)

# 使用 t 期移动平均
train.rolling(window=t).mean()


```



# group by

#### 分组
``` python
for keys,group in order_data.groupby(["warehouse","product_id","color"]):
    print(keys)
    print(group)
    
# 获取一个group
sample=test.get_group(('东莞总仓','FK0CA5','丈青'))
```

#### count,sum
```python
# 对direction分组，对view_num求和
df.groupby(['direction'])['view_num'].sum()

# 数个数
df.groupby(['direction'])['view_num'].count()

# 求平均
df.groupby(['direction'])['view_num'].mean()

# 求最大等
df.groupby('direction').agg({'floor':{'max','min','mean'}})

test_data.groupby(by=['Carrier_Cd']).agg({'Cap_Qty':'sum','Pax_Qty':'sum'})
```

#### 自定义函数
```python
# 
store_wh.groupby('store')['wh'].agg(lambda x : ','.join(x.apply(str)))

# group.apply()
# 根据sku订单数据汇总成skc数据
order = pd.read_csv('./order.csv')
def skc_sum(data):
    size_list = '_'.join(data['size'].astype('str').to_list())
    qty = data['order_qty'].sum()
    sum_data_dict = {'size_list': size_list, 'qty': qty}
    sum_data = pd.DataFrame([sum_data_dict])
    return sum_data
order_skc_data = order.loc[:,['store','skc','size','order_qty']].\
    groupby(by=['store','skc']).apply(skc_sum).reset_index().loc[:,['store','skc','size_list','qty']]
order_skc_data.to_csv("order_skc.csv", sep=',', encoding='gbk', index=False)

```

# apply

```python
df.apply(func,axis=1)

# 带参数
data_df['remark'].apply(segment_sentence, args=(word_list,))
```

