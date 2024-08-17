# pandas groupby apply 并行处理

## test1\_暂未成功

```python
from joblib import Parallel, delayed
def processParallel(df,name):
#处理数据,如果不加name，return的data没有group信息
    return data
def applyParallel(dfGrouped, func):    
    retLst = Parallel(n_jobs=6)(delayed(func)(group,name) for name, group in dfGrouped)
    return pd.concat(retLst)
multi_res = applyParallel(df.groupby('col'), processParallel)
```

用于实现[pandas](https://so.csdn.net/so/search?q=pandas\&spm=1001.2101.3001.7020 "pandas") groupby apply 并行Parallel处理

发现没有并行成功

## test2\_暂未成功

```python
$ pip install pandarallel [--user]

# Import
from pandarallel import pandarallel

# Initialization
pandarallel.initialize()

df.groupby(column1).column2.rolling(4).parallel_apply(func)

```

> 不成功的原因是好像不能引用pandas外部的包
