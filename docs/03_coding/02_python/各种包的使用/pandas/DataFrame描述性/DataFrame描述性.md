# DataFrame描述性

## 目录

-   [每一列series的描述属性](#每一列series的描述属性)
-   [相关性分析](#相关性分析)
-   [数据清洗](#数据清洗)
    -   [缺失值处理](#缺失值处理)
-   [某一列的取值：](#某一列的取值)

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
DataFrame.info()  # 显示每个column的缺失值情况、dtype
DataFrame.describe()  # 可以看到 count，均值、方差、四分位点

```

## 每一列series的描述属性

```python
# 方法1：
DataFrame[col].value_counts()  # or Series.value_counts()
# 方法2：
df.groupby(['direction'])['view_num'].count()


## --- 如果显示不全
# 显示所有列
pd.set_option('display.max_columns',None)
# 显示所有行
pd.set_option('display.max_rows',None)


```

## 相关性分析

得到相关系数矩阵

```python
corr_matrix = data.corr()  # 得到相关系数矩阵
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
