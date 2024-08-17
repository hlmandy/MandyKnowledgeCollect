[TOC]

# 3. Model selection and evaluation[¶](https://scikit-learn.org/stable/model_selection.html#model-selection-and-evaluation)

### 3.3.1 scoring 模型评分标准

https://scikit-learn.org/stable/modules/model_evaluation.html



scoring = "" 参考

sklearn.metrics.SCORERS.keys()

```
['explained_variance', 'r2', 'max_error', 'neg_median_absolute_error', 'neg_mean_absolute_error', 'neg_mean_absolute_percentage_error', 'neg_mean_squared_error', 'neg_mean_squared_log_error', 'neg_root_mean_squared_error', 'neg_mean_poisson_deviance', 'neg_mean_gamma_deviance', 'accuracy', 'top_k_accuracy', 'roc_auc', 'roc_auc_ovr', 'roc_auc_ovo', 'roc_auc_ovr_weighted', 'roc_auc_ovo_weighted', 'balanced_accuracy', 'average_precision', 'neg_log_loss', 'neg_brier_score', 'adjusted_rand_score', 'rand_score', 'homogeneity_score', 'completeness_score', 'v_measure_score', 'mutual_info_score', 'adjusted_mutual_info_score', 'normalized_mutual_info_score', 'fowlkes_mallows_score', 'precision', 'precision_macro', 'precision_micro', 'precision_samples', 'precision_weighted', 'recall', 'recall_macro', 'recall_micro', 'recall_samples', 'recall_weighted', 'f1', 'f1_macro', 'f1_micro', 'f1_samples', 'f1_weighted', 'jaccard', 'jaccard_macro', 'jaccard_micro', 'jaccard_samples', 'jaccard_weighted']
```

## learning_curve

sklearn.model_selection.learning_curve(*estimator*, *X*, *y*, ***, *groups=None*, *train_sizes=array([0.1, 0.33, 0.55, 0.78, 1.])*, *cv=None*, *scoring=None*, *exploit_incremental_learning=False*, *n_jobs=None*, *pre_dispatch='all'*, *verbose=0*, *shuffle=False*, *random_state=None*, *error_score=nan*, *return_times=False*, *fit_params=None*)[[source\]](https://github.com/scikit-learn/scikit-learn/blob/844b4be24/sklearn/model_selection/_validation.py#L1346)[¶](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.learning_curve.html#sklearn.model_selection.learning_curve)

```python
train_sizes, train_scores, test_scores, fit_times, _ = \
        learning_curve(estimator, X, y, cv=cv, n_jobs=n_jobs,
                       train_sizes=train_sizes,
                       return_times=True)
   ## 注：对于regression而言，默认的scoring是r2
```

先按照CV得到一组训练集-测试集。然后根据一组train_size，如默认的[0.1  , 0.325, 0.55 , 0.775, 1.   ]

取训练集的[:训练集大小*train_size]，和测试集进行训练和验证。



##  cross-validation交叉验证

### 数据集切分

#### 时间序列

```python
from sklearn.model_selection import TimeSeriesSplit
# 是k-fold的变体
# 参数 n_splits 切成几份；max_train_size; test_size; gap 测试集和训练集之间隔几个数。如果不隔则假设训练集和测试集独立，事实上无法保证。隔了之后就可以了（猜是利用马尔可夫性质）。

# 如果要实现逐步前进的预测，只需要令test_size=1
TimeSeriesSplit(n_splits=2,test_size=1)  # 根据n_splits, test_size 自动倒推得到train_size
# 示例
tscv = TimeSeriesSplit(n_splits=2,test_size=1)
for train_index, test_index in tscv.split(X):
    print("TRAIN:", train_index, "TEST:", test_index)
    X_train, X_test = X[train_index], X[test_index]
    y_train, y_test = y[train_index], y[test_index]
```



```python
from sklearn.model_selection import train_test_split
# test_size/train_size可以是float（比例），也可以是int

train, test = train_test_split(y, shuffle=False)
```

#### ShuffleSplit

所述[`ShuffleSplit`](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.ShuffleSplit.html#sklearn.model_selection.ShuffleSplit)迭代器将产生独立列车/测试数据集分割的一个用户定义的编号。样本首先被打乱，然后分成一对训练集和测试集。

通过明确地为`random_state`伪随机数生成器设置种子，可以控制结果可重复性的随机性。

shufflesplit的一个特点就是样本会被重复采样

这是一个使用示例：

n_splits: 表示生成多少个训练集--测试集

test_size: 生成的训练集的大小

\>>>

```
>>> from sklearn.model_selection import ShuffleSplit
>>> X = np.arange(10)
>>> ss = ShuffleSplit(n_splits=5, test_size=0.25, random_state=0)
>>> for train_index, test_index in ss.split(X):
...     print("%s %s" % (train_index, test_index))
[9 1 6 7 3 0 5] [2 8 4]
[2 9 8 0 6 7 4] [3 5 1]
[4 5 1 0 6 9 7] [2 3 8]
[2 7 5 8 0 3 4] [6 1 9]
[4 1 0 6 8 9 3] [5 2 7]
```

[`ShuffleSplit`](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.ShuffleSplit.html#sklearn.model_selection.ShuffleSplit)因此是[`KFold`](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.KFold.html#sklearn.model_selection.KFold)交叉验证的一个很好的替代方案，它允许更好地控制迭代次数和训练/测试拆分每一侧的样本比例。



#### 参数调节与验证

[`sklearn.model_selection`](https://scikit-learn.org/stable/modules/classes.html#module-sklearn.model_selection).[validation_curve](https://scikit-learn.org/stable/modules/classes.html#module-sklearn.model_selection) 

sklearn范例：https://scikit-learn.org/stable/auto_examples/model_selection/plot_validation_curve.html#sphx-glr-auto-examples-model-selection-plot-validation-curve-py

```python
print(__doc__)

import matplotlib.pyplot as plt
import numpy as np

from sklearn.datasets import load_digits
from sklearn.svm import SVC
from sklearn.model_selection import validation_curve

X, y = load_digits(return_X_y=True)

param_range = np.logspace(-6, -1, 5)
# 默认采育交叉验证k=5; scoring= 选择用来验证的参数
train_scores, test_scores = validation_curve(
    SVC(), X, y, param_name="gamma", param_range=param_range,
    scoring="accuracy", n_jobs=1)
# 根据交叉验证的k次结果（score）计算出均值和方差
train_scores_mean = np.mean(train_scores, axis=1)
train_scores_std = np.std(train_scores, axis=1)
test_scores_mean = np.mean(test_scores, axis=1)
test_scores_std = np.std(test_scores, axis=1)

plt.title("Validation Curve with SVM")
plt.xlabel(r"$\gamma$")
plt.ylabel("Score")
plt.ylim(0.0, 1.1)
lw = 2
# semilogx 是因为参数是指数级的，所以把x轴对数化
# fill_between: 均值±1个标准差
plt.semilogx(param_range, train_scores_mean, label="Training score",
             color="darkorange", lw=lw)
plt.fill_between(param_range, train_scores_mean - train_scores_std,
                 train_scores_mean + train_scores_std, alpha=0.2,
                 color="darkorange", lw=lw)
plt.semilogx(param_range, test_scores_mean, label="Cross-validation score",
             color="navy", lw=lw)
plt.fill_between(param_range, test_scores_mean - test_scores_std,
                 test_scores_mean + test_scores_std, alpha=0.2,
                 color="navy", lw=lw)
plt.legend(loc="best")
plt.show()
```



# 6. 数据转换

## 缺失值处理

[6.4. Imputation of missing values](https://scikit-learn.org/stable/modules/impute.html)

- 丢弃包含缺失值的整行/整列

  ```python
  df.dropna(subset=['col_name'])
  ```

  

- 估算缺失值

  

### 单变量插补 SimpleImputer

```python
>>> import numpy as np
>>> from sklearn.impute import SimpleImputer
## 均值插补
>>> imp = SimpleImputer(missing_values=np.nan, strategy='mean')
>>> imp.fit([[1, 2], [np.nan, 3], [7, 6]])
SimpleImputer()
>>> X = [[np.nan, 2], [6, np.nan], [7, 6]]
>>> print(imp.transform(X))
```



## 抽样

```python
# 分层抽样 Scikit-Learn’s StratifiedShuffleSplit
```

# 

# 1. 监督学习

## 线性回归

```python
from sklearn.linear_model import LinearRegression
lin_reg = LinearRegression()
lin_reg.fit(X,y)
## 截距和参数
lin_reg.intercept_
lin_reg.coef_
## R方
lin_reg.score(X,y)
```

adj R方--注意sklearn是没有的，可以自己算statsmodels有

ref: https://www.it1352.com/1585826.html (以下未经过测试)

```python
# 方法一：自己算
# compute with formulas from the theory
yhat = model.predict(X)
SS_Residual = sum((y-yhat)**2)       
SS_Total = sum((y-np.mean(y))**2)     
r_squared = 1 - (float(SS_Residual))/SS_Total
adjusted_r_squared = 1 - (1-r_squared)*(len(y)-1)/(len(y)-X.shape[1]-1)
print r_squared, adjusted_r_squared
# 0.877643371323 0.863248473832
# compute with sklearn linear_model, although could not find any function to compute adjusted-r-square directly from documentation
print model.score(X, y), 1 - (1-model.score(X, y))*(len(y)-1)/(len(y)-X.shape[1]-1)
# 0.877643371323 0.863248473832 
# 方法二：
# compute with statsmodels, another way, using formula
import statsmodels.formula.api as sm
result = sm.ols(formula="AverageNumberofTickets ~ NumberofEmployees + ValueofContract", data=df).fit()
#print result.summary()
print result.rsquared, result.rsquared_adj
# 0.877643371323 0.863248473832
```

