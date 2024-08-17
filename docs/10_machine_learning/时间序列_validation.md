[TOC]

## 1. 时间序列特定的交叉验证方法

关于为何时间序列不能采用一般的K-FOLD校验，机器之心翻译的这篇文章说的很清楚：

[一文简述如何使用嵌套交叉验证方法处理时序数据](https://www.jiqizhixin.com/articles/052701)

时间序列一般采用递增时间窗交叉验证法，如下图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200824115855130.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1dIWWJlSEVSRQ==,size_16,color_FFFFFF,t_70#pic_center)

## 2. sklearn时间序列交叉验证包TimeSeriesSplit

时间序列交叉验证一般为递增窗口交叉验证。

sklearn.model_selection.TimeSeriesSplit的包默认为递增窗口交叉验证。

**官方doc及sample如下：**

*class* `sklearn.model_selection.TimeSeriesSplit`(*n_splits=5*, ***, *max_train_size=None*)

Parameters

- **n_splits***int, default=5*

  Number of splits. Must be at least 2.*Changed in version 0.22:* `n_splits` default value changed from 3 to 5.

- **max_train_size***int, default=None*

  Maximum size for a single training set.

### 递增窗口交叉验证Example

```python
>>> import numpy as np
>>> from sklearn.model_selection import TimeSeriesSplit
>>> X = np.array([[1, 2], [3, 4], [1, 2], [3, 4], [1, 2], [3, 4]])
>>> y = np.array([1, 2, 3, 4, 5, 6])
>>> tscv = TimeSeriesSplit()
>>> print(tscv)
TimeSeriesSplit(max_train_size=None, n_splits=5)
>>> for train_index, test_index in tscv.split(X):
...     print("TRAIN:", train_index, "TEST:", test_index)
...     X_train, X_test = X[train_index], X[test_index]
...     y_train, y_test = y[train_index], y[test_index]
TRAIN: [0] TEST: [1]
TRAIN: [0 1] TEST: [2]
TRAIN: [0 1 2] TEST: [3]
TRAIN: [0 1 2 3] TEST: [4]
TRAIN: [0 1 2 3 4] TEST: [5]
```

### 固定窗口交叉验证Example

如果想采用固定窗口交叉验证，可以限定max_train_size。

```python
>>> import numpy as np
>>> from sklearn.model_selection import TimeSeriesSplit
>>> X = np.array([[1, 2], [3, 4], [1, 2], [3, 4], [1, 2], [3, 4]])
>>> y = np.array([1, 2, 3, 4, 5, 6])
>>> tscv = TimeSeriesSplit(max_train_size=3, n_splits=3)  # 限定max_train_size
>>> for train_index, test_index in tscv.split(X):
...     print("TRAIN:", train_index, "TEST:", test_index)
...     X_train, X_test = X[train_index], X[test_index]
...     y_train, y_test = y[train_index], y[test_index]
TRAIN: [0 1 2] TEST: [3]
TRAIN: [1 2 3] TEST: [4]
TRAIN: [2 3 4] TEST: [5]
```

### sklearn TimeSeriesSplit包的局限性：

1. 从上述基于时间序列的数据集划分的时候，发现只能从过去N个时刻(N可自行设置)预测未来1个时刻的数据，不能满足我们想要的过去N个时刻预测未来M个时刻的数据。
2. 假设test那一期数据与前面的train独立

## 其他包&自己实现

### tscv包

[TSCV_ZHENGWENJIE](http://www.zhengwenjie.net/tscv/)：在Train和Test中间加入Gap，就不需要test与train独立的假设了。

[关于时间序列问题的交叉验证](https://zhuanlan.zhihu.com/p/99674163)：这篇专栏中包含了对TSCV内容的翻译。

### 自己写

有一篇看起来很牛X的可是好像和我需要的不太一样：[How to Convert a Time Series to a Supervised Learning Problem in Python](https://machinelearningmastery.com/convert-time-series-supervised-learning-problem-python/)

想实现和prophet一样的交叉验证法，便于用不同的模型和prophet比较，于是自己写了一个。

prophet Diagnostics，详见[prophet官方文档](https://facebook.github.io/prophet/docs/diagnostics.html)及[大佬翻译的博文](https://blog.csdn.net/anshuai_aw1/article/details/83412058)。

**实现思路及python代码：**

根据index分组，生成[train_test_index_list]；list中每个元素为一个dict：{'TRAIN':[train index list],'TEST':[test index list]}。

```python
def cv_split(data, horizon, initial=None, period=None):
    if period is None:
        period = int(horizon * 0.5)
    if initial is None:
        initial = horizon * 3    
    cv_list = []
    train = data.shape[0] - horizon
    while train>initial:
        data_train = data.iloc[:train]
        data_test = data.iloc[train:train+horizon]
        cv_list.insert(0,{'TRAIN':data_train.index,'TEST':data_test.index})
        train -= peroid
    return cv_list
```

但是结果和prophet不一样，因为prophet是基于时间的，并不是基于index。因此，，干脆把prophet开源代码拿来改改。如下：

```python
def generate_cutoffs(df, horizon, initial, period):
    """Generate cutoff dates

    Parameters
    ----------
    df: pd.DataFrame with historical data.
    horizon: pd.Timedelta forecast horizon.
    initial: pd.Timedelta window of the initial forecast period.
    period: pd.Timedelta simulated forecasts are done with this period.

    Returns
    -------
    list of pd.Timestamp
    """
    # Last cutoff is 'latest date in data - horizon' date
    cutoff = df['ds'].max() - horizon
    if cutoff < df['ds'].min():
        raise ValueError('Less data than horizon.')
    result = [cutoff]
    while result[-1] >= min(df['ds']) + initial:
        cutoff -= period
        # If data does not exist in data range (cutoff, cutoff + horizon]
        if not (((df['ds'] > cutoff) & (df['ds'] <= cutoff + horizon)).any()):
            # Next cutoff point is 'last date before cutoff in data - horizon'
            if cutoff > df['ds'].min():
                closest_date = df[df['ds'] <= cutoff].max()['ds']
                cutoff = closest_date - horizon
            # else no data left, leave cutoff as is, it will be dropped.
        result.append(cutoff)
    result = result[:-1]
    if len(result) == 0:
        raise ValueError(
            'Less data than horizon after initial window. '
            'Make horizon or initial shorter.'
        )
    logger.info('Making {} forecasts with cutoffs between {} and {}'.format(
        len(result), result[-1], result[0]
    ))
    return reversed(result)


def cv_split(df, horizon, period=None, initial=None):
    """Cross-Validation for time series.

    """
    cv_list = []
    horizon = pd.Timedelta(horizon)
    # Set period
    period = 0.5 * horizon if period is None else pd.Timedelta(period)
    initial = 3 * horizon if intial is None else pd.Timedelta(initial)

    cutoffs = generate_cutoffs(df, horizon, initial, period)
    
    for cutoff in list(cutoffs):
        train_index = (df['ds'] <= cutoff)
        test_index = (df['ds'] > cutoff) & (df['ds'] <= cutoff + horizon)
        cv_list.append({'CUTOFF':cutoff,'TRAIN':train_index,'TEST':test_index})
    
    return cv_list
```







## Ref:

[`sklearn.model_selection`](https://scikit-learn.org/stable/modules/classes.html#module-sklearn.model_selection).[TimeSeriesSplit](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.TimeSeriesSplit.html#sklearn-model-selection-timeseriessplit)

[TSCV_ZHENGWENJIE](http://www.zhengwenjie.net/tscv/)

[关于时间序列问题的交叉验证](https://zhuanlan.zhihu.com/p/99674163)

[How to Convert a Time Series to a Supervised Learning Problem in Python](https://machinelearningmastery.com/convert-time-series-supervised-learning-problem-python/)