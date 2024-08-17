# sklearn之交叉验证 - 知乎

https://zhuanlan.zhihu.com/p/52515873

为了避免过拟合，通常的做法是划分训练集和测试集，sklearn可以帮助我们随机地将数据划分成训练集和测试集：

```python3
>>> import numpy as np
>>> from sklearn.model_selection import train_test_split
>>> from sklearn import datasets
>>> from sklearn import svm

>>> iris = datasets.load_iris()
>>> iris.data.shape, iris.target.shape
((150, 4), (150,))

>>> X_train, X_test, y_train, y_test = train_test_split(
...     iris.data, iris.target, test_size=0.4, random_state=0)

>>> X_train.shape, y_train.shape
((90, 4), (90,))
>>> X_test.shape, y_test.shape
((60, 4), (60,))

>>> clf = svm.SVC(kernel='linear', C=1).fit(X_train, y_train)
>>> clf.score(X_test, y_test)                           
0.96...
```

这里是划分了60%的数据作为训练集，剩下40%作为测试集。

但有的时候为了调整超参数（比如这里SVM的C），仍然有可能在测试集上过拟合。因为为了调整超参数，测试集的数据会“泄漏”给模型。为了解决这个问题，需要有一个验证集，在训练集上训练，在验证集上评估，如果表现不错的话，就可以在测试集上进行最终的评估了。

但是把数据集划分成三部分的话，训练模型的数据就大大减少了，并且结果会取决于（训练集，验证集）的随机选择。

因此就出现了交叉验证（cross-validation，简称CV）。一般是用k-fold CV，也就是k折交叉验证。训练集被划分成k个子集，每次训练的时候，用其中k-1份作为训练数据，剩下的1份作为验证，按这样重复k次。

交叉验证计算复杂度比较高，但是充分利用了数据，对于数据集比较小的情况会有明显优势。

## cross\_val\_\_\_score

最简单的使用交叉验证的方法是cross\\\_val\_\\\_\_score函数：

```text
>>> from sklearn.model_selection import cross_val_score
>>> clf = svm.SVC(kernel='linear', C=1)
>>> scores = cross_val_score(clf, iris.data, iris.target, cv=5)
>>> scores                                              
array([0.96..., 1.  ..., 0.96..., 0.96..., 1.        ])
```

分数的均值以及分数的95%置信区间：

```text
>>> print("Accuracy: %0.2f (+/- %0.2f)" % (scores.mean(), scores.std() * 2))
Accuracy: 0.98 (+/- 0.03)
```

默认情况下，CV计算的score就是评估器的score方法，可以修改：

```text
>>> from sklearn import metrics
>>> scores = cross_val_score(
...     clf, iris.data, iris.target, cv=5, scoring='f1_macro')
>>> scores                                              
array([0.96..., 1.  ..., 0.96..., 0.96..., 1.        ])
```

具体可以看[The scoring parameter: defining model evaluation rules](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/model_evaluation.html%23scoring-parameter "The scoring parameter: defining model evaluation rules") 。因为鸢尾花数据集的类别是均衡的，所以准确率和F1分数几乎一样。

当cv是一个整数的时候，cross\_val\_score用`[KFold](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.model_selection.KFold.html%23sklearn.model_selection.KFold)或者[StratifiedKFold](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.model_selection.StratifiedKFold.html%23sklearn.model_selection.StratifiedKFold)` ，如果评估器是来自`[ClassifierMixin](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.base.ClassifierMixin.html%23sklearn.base.ClassifierMixin)`的话就会使用后者。

也可以用其它的交叉验证策略：

```text
>>> from sklearn.model_selection import ShuffleSplit
>>> n_samples = iris.data.shape[0]
>>> cv = ShuffleSplit(n_splits=5, test_size=0.3, random_state=0)
>>> cross_val_score(clf, iris.data, iris.target, cv=cv)  
array([0.977..., 0.977..., 1.  ..., 0.955..., 1.        ])
```

还可以用可迭代的yielding：

```text
>>> def custom_cv_2folds(X):
...     n = X.shape[0]
...     i = 1
...     while i <= 2:
...         idx = np.arange(n * (i - 1) / 2, n * i / 2, dtype=int)
...         yield idx, idx
...         i += 1
...
>>> custom_cv = custom_cv_2folds(iris.data)
>>> cross_val_score(clf, iris.data, iris.target, cv=custom_cv)
array([1.        , 0.973...])
```

补充一点，数据预处理以及数据转换等应该在训练数据上学习，并且应用在测试集上：

```text
>>> from sklearn import preprocessing
>>> X_train, X_test, y_train, y_test = train_test_split(
...     iris.data, iris.target, test_size=0.4, random_state=0)
>>> scaler = preprocessing.StandardScaler().fit(X_train)
>>> X_train_transformed = scaler.transform(X_train)
>>> clf = svm.SVC(C=1).fit(X_train_transformed, y_train)
>>> X_test_transformed = scaler.transform(X_test)
>>> clf.score(X_test_transformed, y_test)  
0.9333...
```

可以用Pipeline整合评估器：

```text
>>> from sklearn.pipeline import make_pipeline
>>> clf = make_pipeline(preprocessing.StandardScaler(), svm.SVC(C=1))
>>> cross_val_score(clf, iris.data, iris.target, cv=cv)
...                                                 
array([0.977..., 0.933..., 0.955..., 0.933..., 0.977...])
```

## cross\_validate

cross\_validate和cross\_ val\_score的不同之处在于：

*   评估的时候可以选择多个指标

*   返回一个包含测试分数、拟合时间、打分时间（以及可选择的训练分数和拟合的模型）的字典。

对于单个指标，字典的key是\['test\_score','fit\_ time','score\_time']。

对于多个指标，字典的key是\['test\ \_\<scorer1\_ name>','test\ \_\<scorer2\_ name>','test\ \_\<scorer...>','fit\_ time','score\_time']。

return\_train\_ score默认是True，return\_estimator默认是False。

多指标指定的时候可以是一个list，tuple或者set，元素是预先定义好的一些指标名称：

```text
>>> from sklearn.model_selection import cross_validate
>>> from sklearn.metrics import recall_score
>>> scoring = ['precision_macro', 'recall_macro']
>>> clf = svm.SVC(kernel='linear', C=1, random_state=0)
>>> scores = cross_validate(clf, iris.data, iris.target, scoring=scoring,
...                         cv=5, return_train_score=False)
>>> sorted(scores.keys())
['fit_time', 'score_time', 'test_precision_macro', 'test_recall_macro']
>>> scores['test_recall_macro']                       
array([0.96..., 1.  ..., 0.96..., 0.96..., 1.        ])
```

或者是一个字典，从指标名称对应到预先定义好的评分函数：

```text
>>> from sklearn.metrics.scorer import make_scorer
>>> scoring = {'prec_macro': 'precision_macro',
...            'rec_micro': make_scorer(recall_score, average='macro')}
>>> scores = cross_validate(clf, iris.data, iris.target, scoring=scoring,
...                         cv=5, return_train_score=True)
>>> sorted(scores.keys())                 
['fit_time', 'score_time', 'test_prec_macro', 'test_rec_micro',
 'train_prec_macro', 'train_rec_micro']
>>> scores['train_rec_micro']                         
array([0.97..., 0.97..., 0.99..., 0.98..., 0.98...])
```

单指标的例子：

```text
>>> scores = cross_validate(clf, iris.data, iris.target,
...                         scoring='precision_macro', cv=5,
...                         return_estimator=True)
>>> sorted(scores.keys())
['estimator', 'fit_time', 'score_time', 'test_score', 'train_score']
```

还有一个与`[cross_val_score](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.model_selection.cross_val_score.html%23sklearn.model_selection.cross_val_score)` 相似的接口 `[cross_val_predict](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.model_selection.cross_val_predict.html%23sklearn.model_selection.cross_val_predict)`，用来预测 输入数据集的标签。这个函数适合用在下列场景：

*   不同模型的预测结果的可视化

*   模型blending：用一个有监督模型的预测值来训练另一个模型

cross\\\_validation的例子：

*   [Receiver Operating Characteristic (ROC) with cross validation](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/auto_examples/model_selection/plot_roc_crossval.html%23sphx-glr-auto-examples-model-selection-plot-roc-crossval-py "Receiver Operating Characteristic (ROC) with cross validation"),

*   [Recursive feature elimination with cross-validation](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/auto_examples/feature_selection/plot_rfe_with_cross_validation.html%23sphx-glr-auto-examples-feature-selection-plot-rfe-with-cross-validation-py "Recursive feature elimination with cross-validation"),

*   [Parameter estimation using grid search with cross-validation](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/auto_examples/model_selection/plot_grid_search_digits.html%23sphx-glr-auto-examples-model-selection-plot-grid-search-digits-py "Parameter estimation using grid search with cross-validation"),

*   [Sample pipeline for text feature extraction and evaluation](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/auto_examples/model_selection/grid_search_text_feature_extraction.html%23sphx-glr-auto-examples-model-selection-grid-search-text-feature-extraction-py "Sample pipeline for text feature extraction and evaluation"),

*   [Plotting Cross-Validated Predictions](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/auto_examples/model_selection/plot_cv_predict.html%23sphx-glr-auto-examples-model-selection-plot-cv-predict-py "Plotting Cross-Validated Predictions"),

*   [Nested versus non-nested cross-validation](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/auto_examples/model_selection/plot_nested_cross_validation_iris.html%23sphx-glr-auto-examples-model-selection-plot-nested-cross-validation-iris-py "Nested versus non-nested cross-validation").

## Cross validation iterators

**1.Cross-validation iterators for i.i.d. data**

虽然我们经常假设数据是独立同分布的，但现实并非如此。如果你知道数据是从时间独立过程生成的，最好用[time-series aware cross-validation scheme](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/cross_validation.html%23timeseries-cv "time-series aware cross-validation scheme")，如果你知道生成过程有group结构（从不同的主题、实验等采样得到），最好用[group-wise cross-validation](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/cross_validation.html%23group-cv "group-wise cross-validation").

**K-fold**

```text
>>> import numpy as np
>>> from sklearn.model_selection import KFold

>>> X = ["a", "b", "c", "d"]
>>> kf = KFold(n_splits=2)
>>> for train, test in kf.split(X):
...     print("%s %s" % (train, test))
[2 3] [0 1]
[0 1] [2 3]
```

这是CV的一个可视化效果，KFold不会被group或class影响：

![](https://pic4.zhimg.com/v2-4fc745cdfbe11faeec82a85cf6ad2a53_b.jpg)

**Repeated K-Fold**

`[RepeatedKFold](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.model_selection.RepeatedKFold.html%23sklearn.model_selection.RepeatedKFold)`会重复KFold n次。

```text
>> import numpy as np
>>> from sklearn.model_selection import RepeatedKFold
>>> X = np.array([[1, 2], [3, 4], [1, 2], [3, 4]])
>>> random_state = 12883823
>>> rkf = RepeatedKFold(n_splits=2, n_repeats=2, random_state=random_state)
>>> for train, test in rkf.split(X):
...     print("%s %s" % (train, test))
...
[2 3] [0 1]
[0 1] [2 3]
[0 2] [1 3]
[1 3] [0 2]
```

类似的，`[RepeatedStratifiedKFold](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.model_selection.RepeatedStratifiedKFold.html%23sklearn.model_selection.RepeatedStratifiedKFold)`也是重复Stratified K-Fold n次，每次用不同的随机数。

**Leave One Out (LOO)**

`[LeaveOneOut](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.model_selection.LeaveOneOut.html%23sklearn.model_selection.LeaveOneOut)`

```text
>>> from sklearn.model_selection import LeaveOneOut

>>> X = [1, 2, 3, 4]
>>> loo = LeaveOneOut()
>>> for train, test in loo.split(X):
...     print("%s %s" % (train, test))
[1 2 3] [0]
[0 2 3] [1]
[0 1 3] [2]
[0 1 2] [3]
```

**Leave P Out (LPO)**

`[LeavePOut](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.model_selection.LeavePOut.html%23sklearn.model_selection.LeavePOut)`，当p>1的时候，测试集 可能和训练集有重复数据。

```text
>>> from sklearn.model_selection import LeavePOut

>>> X = np.ones(4)
>>> lpo = LeavePOut(p=2)
>>> for train, test in lpo.split(X):
...     print("%s %s" % (train, test))
[2 3] [0 1]
[1 3] [0 2]
[1 2] [0 3]
[0 3] [1 2]
[0 2] [1 3]
[0 1] [2 3] 
```

**Random permutations cross-validation a.k.a. Shuffle & Split**

`[ShuffleSplit](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.model_selection.ShuffleSplit.html%23sklearn.model_selection.ShuffleSplit)`是先打乱数据，再划分

```text
>>> from sklearn.model_selection import ShuffleSplit
>>> X = np.arange(10)
>>> ss = ShuffleSplit(n_splits=5, test_size=0.25,
...     random_state=0)
>>> for train_index, test_index in ss.split(X):
...     print("%s %s" % (train_index, test_index))
[9 1 6 7 3 0 5] [2 8 4]
[2 9 8 0 6 7 4] [3 5 1]
[4 5 1 0 6 9 7] [2 3 8]
[2 7 5 8 0 3 4] [6 1 9]
[4 1 0 6 8 9 3] [5 2 7] 
```

一个可视化，ShuffleSplit也不会被class和group影响：

![](https://pic3.zhimg.com/v2-8b015802543a93627f6172b6d79a6c7e_b.jpg)

**2.Cross-validation iterators with stratification based on class labels.**

也就是类别不均衡的情况。

**Stratified k-fold**

`[StratifiedKFold](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.model_selection.StratifiedKFold.html%23sklearn.model_selection.StratifiedKFold)`是k-fold的一个变体，它会根据数据集的分布来划分，使得 划分后的数据集的目标比例和原始数据集近似。

```text
>>> from sklearn.model_selection import StratifiedKFold

>>> X = np.ones(10)
>>> y = [0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
>>> skf = StratifiedKFold(n_splits=3)
>>> for train, test in skf.split(X, y):
...     print("%s %s" % (train, test))
[2 3 6 7 8 9] [0 1 4 5]
[0 1 3 4 5 8 9] [2 6 7]
[0 1 2 4 5 6 7] [3 8 9]
```

一个可视化：

![](https://pic2.zhimg.com/v2-6118c560137865e1115e774a9e4b50b9_b.jpg)

`[RepeatedStratifiedKFold](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.model_selection.RepeatedStratifiedKFold.html%23sklearn.model_selection.RepeatedStratifiedKFold)`就是重复n次。

**Stratified Shuffle Split**

https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.StratifiedShuffleSplit.html#sklearn.model_selection.StratifiedShuffleSplit

是ShuffleSplit的一个变体。一个可视化：

![](https://pic2.zhimg.com/v2-2c9a1b7ef66fe5efff5495ff00caee91_b.jpg)

```python
>>> import numpy as np
>>> from sklearn.model_selection import StratifiedShuffleSplit
>>> X = np.array([[1, 2], [3, 4], [1, 2], [3, 4], [1, 2], [3, 4]])
>>> y = np.array([0, 0, 0, 1, 1, 1])
>>> sss = StratifiedShuffleSplit(n_splits=5, test_size=0.5, random_state=0)
>>> sss.get_n_splits(X, y)
5
>>> print(sss)
StratifiedShuffleSplit(n_splits=5, random_state=0, ...)
>>> for train_index, test_index in sss.split(X, y):
...     print("TRAIN:", train_index, "TEST:", test_index)
...     X_train, X_test = X[train_index], X[test_index]
...     y_train, y_test = y[train_index], y[test_index]
TRAIN: [5 2 3] TEST: [4 1 0]
TRAIN: [5 1 4] TEST: [0 2 3]
TRAIN: [5 0 2] TEST: [4 3 1]
TRAIN: [4 1 0] TEST: [2 3 5]
TRAIN: [0 5 1] TEST: [3 4 2]
```





**3. Cross-validation iterators for grouped data**

**Group k-fold**

`[GroupKFold](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.model_selection.GroupKFold.html%23sklearn.model_selection.GroupKFold)` 会保证同一个group的数据不会同时出现在训练集和测试集上。因为如果训练集中包含了每个group的几个样例，可能训练得到的模型能够足够灵活地从这些样例中学习到特征，在测试集上也会表现很好。但一旦遇到一个新的group它就会表现很差。

```text
>>> from sklearn.model_selection import GroupKFold

>>> X = [0.1, 0.2, 2.2, 2.4, 2.3, 4.55, 5.8, 8.8, 9, 10]
>>> y = ["a", "b", "b", "b", "c", "c", "c", "d", "d", "d"]
>>> groups = [1, 1, 1, 2, 2, 2, 3, 3, 3, 3]

>>> gkf = GroupKFold(n_splits=3)
>>> for train, test in gkf.split(X, y, groups=groups):
...     print("%s %s" % (train, test))
[0 1 2 3 4 5] [6 7 8 9]
[0 1 2 6 7 8 9] [3 4 5]
[3 4 5 6 7 8 9] [0 1 2]
```

可视化

![](https://pic4.zhimg.com/v2-245ad61641949cec72c9183754e62a0b_b.jpg)

**Leave One Group Out**

`[LeaveOneGroupOut](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.model_selection.LeaveOneGroupOut.html%23sklearn.model_selection.LeaveOneGroupOut)`

```text
>>> from sklearn.model_selection import LeaveOneGroupOut

>>> X = [1, 5, 10, 50, 60, 70, 80]
>>> y = [0, 1, 1, 2, 2, 2, 2]
>>> groups = [1, 1, 2, 2, 3, 3, 3]
>>> logo = LeaveOneGroupOut()
>>> for train, test in logo.split(X, y, groups=groups):
...     print("%s %s" % (train, test))
[2 3 4 5 6] [0 1]
[0 1 4 5 6] [2 3]
[0 1 2 3] [4 5 6] 
```

**Leave P Groups Out**

`[LeavePGroupsOut](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.model_selection.LeavePGroupsOut.html%23sklearn.model_selection.LeavePGroupsOut)`

```text
>>> from sklearn.model_selection import LeavePGroupsOut

>>> X = np.arange(6)
>>> y = [1, 1, 1, 2, 2, 2]
>>> groups = [1, 1, 2, 2, 3, 3]
>>> lpgo = LeavePGroupsOut(n_groups=2)
>>> for train, test in lpgo.split(X, y, groups=groups):
...     print("%s %s" % (train, test))
[4 5] [0 1 2 3]
[2 3] [0 1 4 5]
[0 1] [2 3 4 5] 
```

**Group Shuffle Split**

`[GroupShuffleSplit](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.model_selection.GroupShuffleSplit.html%23sklearn.model_selection.GroupShuffleSplit)`就像是 combination of`[ShuffleSplit](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.model_selection.ShuffleSplit.html%23sklearn.model_selection.ShuffleSplit)`and`[LeavePGroupsOut](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.model_selection.LeavePGroupsOut.html%23sklearn.model_selection.LeavePGroupsOut)`

```text
>>> from sklearn.model_selection import GroupShuffleSplit

>> X = [0.1, 0.2, 2.2, 2.4, 2.3, 4.55, 5.8, 0.001]
>> y = ["a", "b", "b", "b", "c", "c", "c", "a"]
>> groups = [1, 1, 2, 2, 3, 3, 4, 4]
>> gss = GroupShuffleSplit(n_splits=4, test_size=0.5, random_state=0)
>> for train, test in gss.split(X, y, groups=groups):
..     print("%s %s" % (train, test))
..
0 1 2 3] [4 5 6 7]
2 3 6 7] [0 1 4 5]
2 3 4 5] [0 1 6 7]
4 5 6 7] [0 1 2 3]
```

可视化：

![](https://pic2.zhimg.com/v2-e2f7a302f47ed952fe26e79248931731_b.jpg)

**4. Predefined Fold-Splits / Validation-Sets**

`[PredefinedSplit](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.model_selection.PredefinedSplit.html%23sklearn.model_selection.PredefinedSplit)`

**5. Cross validation of time series data**

Time Series Split

`[TimeSeriesSplit](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.model_selection.TimeSeriesSplit.html%23sklearn.model_selection.TimeSeriesSplit)`会返回前k个folds作为训练集，(k+1)个fold作为测试集 。后续的训练集是之前训练集的超集。这个类可以用于对固定时间间隔的时间序列数据做交叉验证。

```text
>>> from sklearn.model_selection import TimeSeriesSplit

>>> X = np.array([[1, 2], [3, 4], [1, 2], [3, 4], [1, 2], [3, 4]])
>>> y = np.array([1, 2, 3, 4, 5, 6])
>>> tscv = TimeSeriesSplit(n_splits=3)
>>> print(tscv)  
TimeSeriesSplit(max_train_size=None, n_splits=3)
>>> for train, test in tscv.split(X):
...     print("%s %s" % (train, test))
[0 1 2] [3]
[0 1 2 3] [4]
[0 1 2 3 4] [5] 
```

可视化

![](https://pic3.zhimg.com/v2-dda3b151b1b603bd6c71696829b56012_b.jpg)

## A note on shuffling

如果数据标签不是任意分布的（比如相同标签的数据是连续的），那么先shuffling是获取有意义的交叉验证结果的必要步骤。但是，如果数据不是独立同分布的话就有可能产生更差的效果。比如原始数据是按发布时间排序的文章。

一些交叉验证迭代器，例如KFold，有内置的选择在划分之前去shuffle数据。注意以下几点：

*   这比直接shuffling数据消耗更少的内存。

*   默认情况不会shuffling，包括(stratified) K fold cross- validation，`[cross_val_score](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.model_selection.cross_val_score.html%23sklearn.model_selection.cross_val_score)`, grid search等。记住`[train_test_split](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html%23sklearn.model_selection.train_test_split)`仍然是返回随机的划分。

*   参数random\\\_state默认是None，也就是说每次迭代KFold(...,shuffle=True)时，都会shuffling得到不一样的结果。然而，GridSearchCV会用同样的shuffling，对于参数的每个集合。

*   为了对每个划分都得到一样的结果，需要设置random\\\_state为一个整数。

官方文档：

[3.1. Cross-validation: evaluating estimator performance](https://link.zhihu.com/?target=https%3A//scikit-learn.org/stable/modules/cross_validation.html "3.1. Cross-validation: evaluating estimator performance")
