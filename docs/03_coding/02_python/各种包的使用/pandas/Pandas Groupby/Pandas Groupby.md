# Pandas Groupby

## 目录

-   [group by](#group-by)
    -   [分组](#分组)
    -   [count,sum](#countsum)
    -   [自定义函数](#自定义函数)
    -   [分组取最大/最小](#分组取最大最小)

# group by

#### 分组

```python
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
## --- 这种的结果是df而不是series
tmp_df.groupby(['起飞机场四字码'])[['起飞机场四字码']].count()

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

## 分组取最大/最小

[Python3 pandas库(13) nlargest()分组取最大多行并求和 - 知乎](Python3%20pandas库(13)%20nlargest()分组取最大多行并求和%20-%20知乎.md pandas库(13) nlargest()/Python3 pandas库(13) nlargest()分组取最大多行并求和 - 知乎.md> "Python3 pandas库(13) nlargest()分组取最大多行并求和 - 知乎")

```python
## --- 最大
df.groupby(by='区域').apply(lambda x:x.nlargest(3,'销售'))

## --- 最小
nsmallest
```
