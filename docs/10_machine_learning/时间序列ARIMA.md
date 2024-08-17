

[TOC]

# ARIMA/SARIMA 原理

## ARIMA



### 1. 平稳序列

时间序列是一列观测值![X_t](https://math.jianshu.com/math?formula=X_t)的集合, 其中每个观测值是在时段![t](https://math.jianshu.com/math?formula=t)观测所得(![t](https://math.jianshu.com/math?formula=t)是自然数 ). 给定时间序列![\{X_t\}_{t=1}^n](https://math.jianshu.com/math?formula=%5C%7BX_t%5C%7D_%7Bt%3D1%7D%5En), 如果对任意的![t=1,\ldots,n](https://math.jianshu.com/math?formula=t%3D1%2C%5Cldots%2Cn), 它满足下列条件:
 i. ![\text{var}(X_t)<\infty](https://math.jianshu.com/math?formula=%5Ctext%7Bvar%7D(X_t)%3C%5Cinfty)
 ii. ![\mathbb{E}(X_t) = \mu](https://math.jianshu.com/math?formula=%5Cmathbb%7BE%7D(X_t)%20%3D%20%5Cmu)
 iii. ![\text{cov}(X_r, X_s) = \text{cov}(X_{r+t}, X_{s+t}), \forall r,s = 1, ..., n](https://math.jianshu.com/math?formula=%5Ctext%7Bcov%7D(X_r%2C%20X_s)%20%3D%20%5Ctext%7Bcov%7D(X_%7Br%2Bt%7D%2C%20X_%7Bs%2Bt%7D)%2C%20%5Cforall%20r%2Cs%20%3D%201%2C%20...%2C%20n)
 我们把它叫做(弱)平稳(weakly stationary)序列.(下文我们简称平稳序列.)

通俗地讲, **平稳序列的期望, 方差, 协方差不随时间变化**. 例如, ![X_t](https://math.jianshu.com/math?formula=X_t)服从同一个分布时, 它是平稳的.

**例1** 下图中的时间序列由![X_t\sim N(2, 1)](https://math.jianshu.com/math?formula=X_t%5Csim%20N(2%2C%201))生成. 从直观上看, 这个序列是"平稳的".

![img](https:////upload-images.jianshu.io/upload_images/14030675-c5d90f9d36e9a04a.png)

Fig1. 平稳的时间序列



**例2** 下图的中的时间序列由![X_t= 2 + 0.9X_{t-1}+W_t](https://math.jianshu.com/math?formula=X_t%3D%202%20%2B%200.9X_%7Bt-1%7D%2BW_t)生成, 其中![X_0=0](https://math.jianshu.com/math?formula=X_0%3D0), ![W_t= N(0, 1)](https://math.jianshu.com/math?formula=W_t%3D%20N(0%2C%201)). 它起初有明显地增长, 然后趋于平稳. 利用ADF检验(详情见下文), 我们发现该序列是平稳的(p-value < 0.01).

![img](https:////upload-images.jianshu.io/upload_images/14030675-277c1ad6326e8e1f.png)

Fig2. 平稳的时间序列



**Remark** 弱平稳性的"弱"主要体现在时间序列在全局上是平稳的, 即，时间序列局部是波动的，但整体上看是平稳的, 或者随着时间的变化其样本的均值收敛.

### 2. 判断样本的平稳性

我们用统计学中假设检验的方法来判断样本的平稳性. 常用的是Augmented Dickey-Fuller(ADF)检验[[1\]](#fn1).

- **Null Hypothesis**![(H_0)](https://math.jianshu.com/math?formula=(H_0)): 样本中存在unit root[[2\]](#fn2). 如果接受![H_0](https://math.jianshu.com/math?formula=H_0), 则意味着样本是非平稳的.
- **Alternate Hypothesis**![(H_1)](https://math.jianshu.com/math?formula=(H_1)): 样本中不存在unit root. 如果拒绝![H_0](https://math.jianshu.com/math?formula=H_0), 则意味着样本是平稳的.

在显著水平![\alpha=0.05](https://math.jianshu.com/math?formula=%5Calpha%3D0.05)的条件下, 我们可以通过计算p-value来接受或者拒绝![H_0](https://math.jianshu.com/math?formula=H_0):

- ![\text{p-value} > 0.05](https://math.jianshu.com/math?formula=%5Ctext%7Bp-value%7D%20%3E%200.05): 接受![H_0](https://math.jianshu.com/math?formula=H_0).
- ![\text{p-value} \leq 0.05](https://math.jianshu.com/math?formula=%5Ctext%7Bp-value%7D%20%5Cleq%200.05): 拒绝![H_0](https://math.jianshu.com/math?formula=H_0).

Python3中`statsmodels.tas.stattools`中的`adfuller`函数[[3\]](#fn3)实现了ADF检验. 使用方法如下所示.



```python
from statsmodels.tsa.stattools import adfuller


def test_stationarity(data, alpha=0.05, print_detail=True):
    """ Test stationarity of time series data.
    :param data: time series data, formatted as list
    :param alpha: significance level.
    :param print_detail: if True print additional information. 
    """
    result = adfuller(data)
    is_stationary = True if result[1] <= alpha else False
    if print_detail:
        print('ADF statistic: %f' % result[0])
        print('p-value: %f' % result[1])
        print('critical values:')
        for key, value in result[4].items():
            print('\t%s: %.3f' % (key, value))
    return is_stationary
```

### 3. 时间序列模型

前面之所以介绍平稳序列的概念及检验方法, 是因为它是很多基础的时间序列模型的前提假设. 在本节我们介绍一些常见的时间序列模型(更多内容可以参考[[4\]](#fn4), [[5\]](#fn5)).

#### AR(p)

AR代表自回归(Autoregression). 假设时间序列![\{X_t\}](https://math.jianshu.com/math?formula=%5C%7BX_t%5C%7D)是平稳的, 它可以被表示成如下形式:
 ![X_t = \delta + \sum_{i=1}^p \phi_iX_{t-i} + W_t.](https://math.jianshu.com/math?formula=X_t%20%3D%20%5Cdelta%20%2B%20%5Csum_%7Bi%3D1%7D%5Ep%20%5Cphi_iX_%7Bt-i%7D%20%2B%20W_t.)

- ![\delta](https://math.jianshu.com/math?formula=%5Cdelta)是常数.
- ![W_t\overset{\text{iid}}{\sim} N(0, \sigma^2)](https://math.jianshu.com/math?formula=W_t%5Coverset%7B%5Ctext%7Biid%7D%7D%7B%5Csim%7D%20N(0%2C%20%5Csigma%5E2)), 它表示时段![t](https://math.jianshu.com/math?formula=t)的误差(随机变量).
- ![p](https://math.jianshu.com/math?formula=p)代表自回归阶数.

#### MA(q)

MA代表移动平均(Moving Average). 假设时间序列![\{X_t\}](https://math.jianshu.com/math?formula=%5C%7BX_t%5C%7D)是平稳的, 它可以被表示成如下形式:
 ![X_t = \delta + \sum_{i=1}^q \theta_iW_{t-i} + W_t.](https://math.jianshu.com/math?formula=X_t%20%3D%20%5Cdelta%20%2B%20%5Csum_%7Bi%3D1%7D%5Eq%20%5Ctheta_iW_%7Bt-i%7D%20%2B%20W_t.)

- ![\delta](https://math.jianshu.com/math?formula=%5Cdelta)是常数.
- ![W_t\overset{\text{iid}}{\sim} N(0, \sigma^2)](https://math.jianshu.com/math?formula=W_t%5Coverset%7B%5Ctext%7Biid%7D%7D%7B%5Csim%7D%20N(0%2C%20%5Csigma%5E2)), 它表示时段![t](https://math.jianshu.com/math?formula=t)的误差(随机变量).
- ![q](https://math.jianshu.com/math?formula=q)代表移动平均阶数.

#### ARMA(p,q)

ARMA模型是AR和MA的组合. 假设同上. 它可以被表示为如下形式:
 ![X_t = \delta + \sum_{i=1}^p \phi_iX_{t-i} + \sum_{i=1}^q \theta_iW_{t-i} + W_t.](https://math.jianshu.com/math?formula=X_t%20%3D%20%5Cdelta%20%2B%20%5Csum_%7Bi%3D1%7D%5Ep%20%5Cphi_iX_%7Bt-i%7D%20%2B%20%5Csum_%7Bi%3D1%7D%5Eq%20%5Ctheta_iW_%7Bt-i%7D%20%2B%20W_t.)

- ![p](https://math.jianshu.com/math?formula=p)是自回归阶数
- ![q](https://math.jianshu.com/math?formula=q)是移动平均阶数

#### ARIMA(p,d,q)

ARIMA模型是ARMA模型的推广, 全称是Autoregressive Integrated Moving Average. 当时间序列![\{X_t\}](https://math.jianshu.com/math?formula=%5C%7BX_t%5C%7D)不满足平稳性时, 我们通常使用**差分**的技巧把序列变得平稳, 然后再应用ARMA模型.

参数![d](https://math.jianshu.com/math?formula=d)代表差分的阶数. 下面是差分的计算公式(![\Delta](https://math.jianshu.com/math?formula=%5CDelta)为差分算子):

- 一阶差分 ![\Delta X_t = X_t - X_{t-1}](https://math.jianshu.com/math?formula=%5CDelta%20X_t%20%3D%20X_t%20-%20X_%7Bt-1%7D)
- 二阶差分 ![\Delta^{(2)} X_t = \Delta(X_t-X_{t-1}) = X_t - 2X_{t-1}+X_{t-2} = (1-\Delta)^2X_t](https://math.jianshu.com/math?formula=%5CDelta%5E%7B(2)%7D%20X_t%20%3D%20%5CDelta(X_t-X_%7Bt-1%7D)%20%3D%20X_t%20-%202X_%7Bt-1%7D%2BX_%7Bt-2%7D%20%3D%20(1-%5CDelta)%5E2X_t)
- ![d](https://math.jianshu.com/math?formula=d)阶差分 ![\Delta^{(d)} X_t = (1-\Delta)^dX_t](https://math.jianshu.com/math?formula=%5CDelta%5E%7B(d)%7D%20X_t%20%3D%20(1-%5CDelta)%5EdX_t)

**例3** 下图是原始的时间序列. 通过观察, 它的均值有明显的上升趋势且不收敛, 因此不是平稳序列(ADF检验的p-value为0.94).

![img](https:////upload-images.jianshu.io/upload_images/14030675-e79df9eb5094ad23.png?imageMogr2/auto-orient/strip|imageView2/2/w/822/format/webp)

对该序列进行一阶差分后, 我们得到如下平稳的时间序列(p-value为0.00).

![img](https:////upload-images.jianshu.io/upload_images/14030675-529ea07aa3633893.png?imageMogr2/auto-orient/strip|imageView2/2/w/819/format/webp)

#### ARIMA(p,d,q)![\times](https://math.jianshu.com/math?formula=%5Ctimes)(P,D,Q,s)

该记号代表季节性(或周期性)ARIMA模型, 详细的表达式可以参考[[4\]](#fn4)([4.1 Seasonal ARIMA models](https://onlinecourses.science.psu.edu/stat510/node/67/)), 其中

- ![p,d,q](https://math.jianshu.com/math?formula=p%2Cd%2Cq)的意义同上.
- ![P](https://math.jianshu.com/math?formula=P)代表周期性自回归阶数(前![P](https://math.jianshu.com/math?formula=P)个周期对应观测值的自回归).
- ![D](https://math.jianshu.com/math?formula=D)代表周期性差分阶数.
- ![Q](https://math.jianshu.com/math?formula=Q)代表周期性移动平均阶数(前![Q](https://math.jianshu.com/math?formula=Q)个周期对应的移动平均).
- ![s](https://math.jianshu.com/math?formula=s)代表一个周期的长度.

我们可以把它看成两阶段模型: 第一阶段在全局使用ARIMA(p,d,q); 第二阶段通过指定周期长度![s](https://math.jianshu.com/math?formula=s), 再利用ARIMA(P,Q,D)模型考虑周期之间的关系.

**例4** 考虑如下周期性的平稳时间序列(![s=18](https://math.jianshu.com/math?formula=s%3D18)).

![img](https:////upload-images.jianshu.io/upload_images/14030675-951ce873694d9ec0.png?imageMogr2/auto-orient/strip|imageView2/2/w/838/format/webp)

season.png

对序列进行周期性差分: ![Y_t = X_t - X_{t-18}](https://math.jianshu.com/math?formula=Y_t%20%3D%20X_t%20-%20X_%7Bt-18%7D)得到新的时间序列![\{Y_t\}](https://math.jianshu.com/math?formula=%5C%7BY_t%5C%7D)如下图所示(红色部分)

![img](https:////upload-images.jianshu.io/upload_images/14030675-3fecea860840b80c.png?imageMogr2/auto-orient/strip|imageView2/2/w/836/format/webp)

deseason.png

通过使用周期性差分, 我们可以把原有时间序列的周期性移除. 同理, 通过采用周期性的自回归和移动平均系数, 我们可以把周期之间的依赖关系考虑进模型.

**例5** 考虑周期s=18的数据(蓝色曲线). 用![\text{ARIMA}(1,0, 0)](https://math.jianshu.com/math?formula=%5Ctext%7BARIMA%7D(1%2C0%2C%200))和![\text{ARIMA}(1, 0, 0)\times(0, 1, 0, 18)](https://math.jianshu.com/math?formula=%5Ctext%7BARIMA%7D(1%2C%200%2C%200)%5Ctimes(0%2C%201%2C%200%2C%2018))分别进行预测的结果如下.

![img](https:////upload-images.jianshu.io/upload_images/14030675-e7094214f9c51069.png?imageMogr2/auto-orient/strip|imageView2/2/w/838/format/webp)

不考虑周期性的ARIMA模型的预测结果(灰色曲线)逐渐收敛到时间序列的均值. 由于序列是平稳的, 这样的预测结果符合我们的期望. 考虑到该时间序列有比较强的周期性, 且通过观察发现周期![s=18](https://math.jianshu.com/math?formula=s%3D18). 在本例中, 我们仅使用周期差分,  最终得到了如图所示(红色曲线)的周期性预测结果.

#### ARCH(p)

ARCH的全称是Autoregressive Conditionally Heteroscedasticity, 它可以用来考虑样本的方差随着时间变化(或震荡)的时间序列. 设时间序列![\{X_t\}](https://math.jianshu.com/math?formula=%5C%7BX_t%5C%7D)是平稳的, ![\text{ARCH}(p)](https://math.jianshu.com/math?formula=%5Ctext%7BARCH%7D(p))模型可以被表示成如下形式:

![X_t = \sigma_tW_t,\quad W_t \overset{\text{iid}}{\sim} N(0,1)](https://math.jianshu.com/math?formula=X_t%20%3D%20%5Csigma_tW_t%2C%5Cquad%20W_t%20%5Coverset%7B%5Ctext%7Biid%7D%7D%7B%5Csim%7D%20N(0%2C1))
 其中
 ![\sigma_t^2 = \alpha_0 + \sum_{i=1}^p \alpha_iX_{t-i}^2.](https://math.jianshu.com/math?formula=%5Csigma_t%5E2%20%3D%20%5Calpha_0%20%2B%20%5Csum_%7Bi%3D1%7D%5Ep%20%5Calpha_iX_%7Bt-i%7D%5E2.)

- ![p](https://math.jianshu.com/math?formula=p)代表![X_t^2](https://math.jianshu.com/math?formula=X_t%5E2)的自回归阶数.

#### GARCH(p,q)

GARCH即Generalized ARCH, 是ARCH模型的推广[[6\]](#fn6). 设时间序列![\{X_t\}](https://math.jianshu.com/math?formula=%5C%7BX_t%5C%7D)是平稳的, ![\text{GARCH}(p,q)](https://math.jianshu.com/math?formula=%5Ctext%7BGARCH%7D(p%2Cq))模型可以被表示成如下形式:
 ![X_t = \sigma_tW_t,\quad W_t \overset{\text{iid}}{\sim} N(0,1)](https://math.jianshu.com/math?formula=X_t%20%3D%20%5Csigma_tW_t%2C%5Cquad%20W_t%20%5Coverset%7B%5Ctext%7Biid%7D%7D%7B%5Csim%7D%20N(0%2C1))
 其中
 ![\sigma_t^2 = \alpha_0 + \sum_{i=1}^p \alpha_iX_{t-i}^2 + \sum_{i=1}^q \beta_i\sigma^2_{t-i}.](https://math.jianshu.com/math?formula=%5Csigma_t%5E2%20%3D%20%5Calpha_0%20%2B%20%5Csum_%7Bi%3D1%7D%5Ep%20%5Calpha_iX_%7Bt-i%7D%5E2%20%2B%20%5Csum_%7Bi%3D1%7D%5Eq%20%5Cbeta_i%5Csigma%5E2_%7Bt-i%7D.)

- ![p](https://math.jianshu.com/math?formula=p)代表![X_t^2](https://math.jianshu.com/math?formula=X_t%5E2)的自回归阶数.
- ![q](https://math.jianshu.com/math?formula=q)代表![\sigma_t^2](https://math.jianshu.com/math?formula=%5Csigma_t%5E2)的移动平均阶数.

**Remark** ARCH/GARCH随机过程产生的数据是什么样的? 前面提到它们允许**样本的方差**随时间变化, 但是由于![\{X_t\}](https://math.jianshu.com/math?formula=%5C%7BX_t%5C%7D)必须满足平稳性(前提假设), 因此样本的方差从局部看是变化(震荡)的, 但从整体看应该是"平稳的"序列. 例如下图是一个![\text{GARCH}(1,1)](https://math.jianshu.com/math?formula=%5Ctext%7BGARCH%7D(1%2C1))过程生成的时间序列(![\alpha_0=5, \alpha_1=\beta_1=0.5](https://math.jianshu.com/math?formula=%5Calpha_0%3D5%2C%20%5Calpha_1%3D%5Cbeta_1%3D0.5)).

![img](https:////upload-images.jianshu.io/upload_images/14030675-d87c2c3754ccfeaf.png?imageMogr2/auto-orient/strip|imageView2/2/w/837/format/webp)

#### VAR(p)

VAR即Vector Autoregression, 它是多变量的自回归模型. 类似地, 我们有![\text{VARMA}(p, q)](https://math.jianshu.com/math?formula=%5Ctext%7BVARMA%7D(p%2C%20q)), 它是![\text{ARMA}(p,q)](https://math.jianshu.com/math?formula=%5Ctext%7BARMA%7D(p%2Cq))的向量版本. 需要注意的是, VARMA模型处理的时间序列可以有趋势. 我们不做详细的展开, 感兴趣的读者可以参考[[4\]](#fn4)[章节11.2: Vector Autoregressive models VAR(p) models](https://onlinecourses.science.psu.edu/stat510/node/79/).

### 4. 参数选择

给定时间序列的观测样本, 选定预测模型之后如何确定模型的参数? 本节我们介绍两种常用的方法: 1. 画出ACF/PACF图, 然后观察出![p,q](https://math.jianshu.com/math?formula=p%2Cq)的值; 2. 通过计算相关的统计指标, 自动化地选择参数.

#### 4.1 观察ACF/PACF

自相关就是时间序列本身与延后的时间序列的相关性。而偏自相关则是剔除干扰后时间序列观察与先前时间步长时间序列观察之间关系的总结。

##### ACF

ACF的全称是Autocorrelation Function. 对变量![h=1,2, ...](https://math.jianshu.com/math?formula=h%3D1%2C2%2C%20...), ACF的值代表![X_t](https://math.jianshu.com/math?formula=X_t)与![X_{t-h}](https://math.jianshu.com/math?formula=X_%7Bt-h%7D)之间的相关性.
$$
\text{ACF}(h) = \frac{\text{cov}(X_t, X_{t-h})}{\text{var}(X_t)}
$$

##### PACF

PACF的全称是Partial Autocorrelation Function. 对变量![h=1,2,...](https://math.jianshu.com/math?formula=h%3D1%2C2%2C...), PACF的值代表已知![X_{t-1}, ... X_{t-h+1}](https://math.jianshu.com/math?formula=X_%7Bt-1%7D%2C%20...%20X_%7Bt-h%2B1%7D)的条件 下, ![X_t](https://math.jianshu.com/math?formula=X_t)与![X_{t-h}](https://math.jianshu.com/math?formula=X_%7Bt-h%7D)之间的相关性.
$$
\text{PACF}(h) = \frac{\text{cov}(X_t,X_{t-h}|x_{t-1}, ... x_{t-h+1})}{\sqrt{\text{var}(X_t|x_{t-1}, ... x_{t-h+1})\text{var}(X_{t-h}|x_{t-1}, ... x_{t-h+1})}}
$$
**例6** 设![W_t\sim N(0, 1)](https://math.jianshu.com/math?formula=W_t%5Csim%20N(0%2C%201)). 考虑下面三个模型生成的时间序列, 并计算相应的ACF/PACF.
$$
\text{AR}(1): X_t=2 + 0.5X_{t-1}+W_t
$$


![img](https:////upload-images.jianshu.io/upload_images/14030675-6e312c267b0a376c.png?imageMogr2/auto-orient/strip|imageView2/2/w/842/format/webp)

2. ![\text{MA}(1): X_t=2 + 0.5W_{t-1}+W_t](https://math.jianshu.com/math?formula=%5Ctext%7BMA%7D(1)%3A%20X_t%3D2%20%2B%200.5W_%7Bt-1%7D%2BW_t)

   ![img](https:////upload-images.jianshu.io/upload_images/14030675-d7db452d7a90bd4f.png?imageMogr2/auto-orient/strip|imageView2/2/w/846/format/webp)

3. ![\text{ARMA}(1,1): X_t=2 + 0.5X_{t-1}+ 0.5W_{t-1}+W_t](https://math.jianshu.com/math?formula=%5Ctext%7BARMA%7D(1%2C1)%3A%20X_t%3D2%20%2B%200.5X_%7Bt-1%7D%2B%200.5W_%7Bt-1%7D%2BW_t)

![img](https:////upload-images.jianshu.io/upload_images/14030675-72c8d4b7c2494db6.png?imageMogr2/auto-orient/strip|imageView2/2/w/851/format/webp)

##### 指导原则(参考[[4\]](#fn4))

| 模型      | ACF                                                          | PACF                                                         | 说明                                                        |
| --------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ----------------------------------------------------------- |
| AR(p)     | 逐渐趋近于0或像正弦曲线一样收敛到0                           | 前![p](https://math.jianshu.com/math?formula=p)个值非常显著, 其余的值不显著 | ![p](https://math.jianshu.com/math?formula=p)值主要参考PACF |
| MA(q)     | 前![q](https://math.jianshu.com/math?formula=q)个值非常显著, 其余的值不显著 | 逐渐趋近于0或像正弦曲线一样收敛到0                           | ![q](https://math.jianshu.com/math?formula=q)值主要参考ACF  |
| ARMA(p,q) | 逐渐趋近于0或像正弦曲线一样收敛到0                           | 逐渐趋近于0或像正弦曲线一样收敛到0                           | ![p,q](https://math.jianshu.com/math?formula=p%2Cq)值靠猜   |

#### 4.2 自动化地决定参数

基本思想是通过计算一些指标, 并选择参数使得相关的指标值尽可能小. 下面我们介绍一些常用的指标.

为方便描述, 我们先定义一些记号.

- ![n](https://math.jianshu.com/math?formula=n) = 样本的大小
- ![k](https://math.jianshu.com/math?formula=k) = 模型中需要拟合的参数数量(例如正态分布有的数量是2: ![\mu](https://math.jianshu.com/math?formula=%5Cmu)和![\sigma](https://math.jianshu.com/math?formula=%5Csigma))
- ![L_{\max}](https://math.jianshu.com/math?formula=L_%7B%5Cmax%7D) = 通过最大似然估计得到的最大Likelihood

##### AIC(Akaike Information Criterion)[[7\]](#fn7)

![\text{AIC} = 2k - 2\ln(L_{\max})](https://math.jianshu.com/math?formula=%5Ctext%7BAIC%7D%20%3D%202k%20-%202%5Cln(L_%7B%5Cmax%7D))

##### AICc[[8\]](#fn8)

(AIC的改良版, 解决小样本过拟合的问题)
 ![\text{AICc} = \text{AIC} + \frac{2k^2 + 2k}{n-k-1}](https://math.jianshu.com/math?formula=%5Ctext%7BAICc%7D%20%3D%20%5Ctext%7BAIC%7D%20%2B%20%5Cfrac%7B2k%5E2%20%2B%202k%7D%7Bn-k-1%7D)

##### BIC(Bayesian Information Criterion)[[9\]](#fn9)

(也称为Schwartz Criterion, SBC, SBIC)

![\text{BIC} = \ln(n)k - 2\ln(L_{\max})](https://math.jianshu.com/math?formula=%5Ctext%7BBIC%7D%20%3D%20%5Cln(n)k%20-%202%5Cln(L_%7B%5Cmax%7D))

##### HQIC(Hannan–Quinn Information Criterion)[[10\]](#fn10)

![\text{HQIC} = 2k\ln(\ln(n)) -2\ln(L_{\max})](https://math.jianshu.com/math?formula=%5Ctext%7BHQIC%7D%20%3D%202k%5Cln(%5Cln(n))%20-2%5Cln(L_%7B%5Cmax%7D))

**Remark** 建议在实际中综合考虑这些指标.

### 5. 实验代码

[Python3 code on Github](https://github.com/nullgo/TimeSeriesExp)

### 参考文献

------

1. Wikipedia. [Augmented Dickey-Fuller test](https://en.wikipedia.org/wiki/Augmented_Dickey–Fuller_test). [↩](#fnref1)
2. Dickey, D. A.; Fuller, W. A. Distribution of the Estimators for Autoregressive Time Series with a Unit Root. Journal of the American Statistical Association. **74**(366): 427–431, 1979. [↩](#fnref2)
3. https://www.statsmodels.org/dev/generated/statsmodels.tsa.stattools.adfuller.html [↩](#fnref3)
4. Lecture notes of [Applied Time Series Analysis (SATA 510)](https://onlinecourses.science.psu.edu/stat510/). The Pennsylvania State University. [↩](#fnref4) [↩](#fnref4:1) [↩](#fnref4:2) [↩](#fnref4:3)
5. Jan Grandell. Time series analysis ([lecture notes](https://www.math.kth.se/matstat/gru/sf2943/ts.pdf)). [↩](#fnref5)
6. Bollerslev, T. Generalized autoregressive conditional heteroscedasticity. Journal of Econometrics, 31, 307–327, 1986. [↩](#fnref6)
7. Hirotugu Akaike. A new look at the statistical model identification, *IEEE Transactions on Automatic Control*, **19** (6): 716–723, 1974. [↩](#fnref7)
8. Wikipedia. https://en.wikipedia.org/wiki/Akaike_information_criterion#AICc. [↩](#fnref8)
9. Schwartz E.S. The Stochastic Behavior of Commodity Prices: Implications for Valuation and Hedging'. J Finance 52(3) Papers and Proceedings Fifty-Seventh Annual Meeting, American Finance Association, New Orleans, Louisiana, 923-973, 1997. [↩](#fnref9)
10. Hannan, E. J. and B. G. Quinn. The Determination of the order of an autoregression, *Journal of the Royal Statistical Society, Series B*, 41: 190–195, 1979. [↩](#fnref10)



作者：胡拉哥
链接：https://www.jianshu.com/p/e52a4b82654e
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



## SARIMA

模通常最常用的是 $SARIMA(p, d, q)(P, D, Q, s)$。

- $AR(p)$ - 自回归模型，时间序列自身的回归。这有一个基本的假设，即某个序列值仅依赖与它之前的某个窗口范围的值。在模型中，滞后大小记为 $p$。要确定 $p$ 的初始值。需要去画出偏自相关 PACF 图，查看 PACF 图并找到最大的显著滞后。

- $MA(q)$ - 移动平均模型，同样假设当前的误差依赖于之前的误差，并带有一定的滞后，即 $q$ 。初始值可以在自相关 ACF 图上找到。

把四个字母连接起来：

$$AR(p) + MA(q) = ARMA(p, q)$$

这里有自回归模型，移动平均模型。如果序列是平稳的，它可以用这四个字母近似。

- $I(d)$ - 差分。这只是使序列平稳所需的非季节性差异的数量。在我们的例子中，只有 1，因为我们用了一阶差分。

加上这个字母，则得到 $ARIMA$ 模型，它可以在非季节性差异的帮助下处理非平稳数据。

- $S(s)$ -负责季节性，等于序列的季节性周期长度


这样，模型会有三个参数 $(P, D, Q)$：

- $P$ - 模型季节分量的自回归阶数，可由 PACF 得到。但是，需要查看显著滞后的数量，这是季节周期长度的倍数。例如，如果周期等于 24，我们看到第 24 和 48 次滞后在 PACF 中是显著的，这意味着初始的 $P$ 应该是 2。

- $Q$ - 与 $p$ 的选择类似，使用 ACF 图来得到。

- $D$ - 季节差分。这可能等于 1 或 0 ，取决于是否应用了季节差分。

现在知道了如何设置初始参数，让我们再看一遍最终的图并设置参数:



现在知道了如何设置初始参数，让我们再看一遍最终的图并设置参数:


```python
tsplot(ads_diff[24+1:], lags=60)
```


​    
![png](C:\Users\leihu\hl_Documents\川航机务数据需求susan\algorithms模型说明文档\img\output_193_0.png)
​    


- $p$ 最可能是4，因为 4 是 PACF 的最后一个显著滞后，在此之后，其他大多数都不显著。
- $d$ 等于 1，因为我们有一阶差分
- $q$ 应该在 4 左右，就像在ACF上看到的那样
- $P$ 可能是2，因为 24 和 48 的滞后对 PACF 有一定的影响
- $D$ 还是等于1，因为我们做了季节差分
- $Q$ 可能是 1，ACF 的第 24 个延迟显著，而第 48 个延迟不显著。



```python
from statsmodels.tsa.statespace.sarimax import SARIMAX
# SARIMAX order = (p,d,q) AR(p)自回归 + MA(q)移动平均 + I(d)差分
#         season_order = (P,D,Q,m) ,m 表示季节周期长度 P和 D要看 ACF 和 PACF 里面季节周期长度的倍数的显著性
#         trend = t in ['n','c','t','ct']no trend, constant, linear, and constant with linear trend
```



# API

## statsmodel

13.8.2 APIs

- Statsmodels Time Series Analysis by State Space Methods.
  http://www.statsmodels.org/dev/statespace.html
- statsmodels.tsa.statespace.sarimax.SARIMAX API.
  http://www.statsmodels.org/dev/generated/statsmodels.tsa.statespace.sarimax.SARIMAX.html
- statsmodels.tsa.statespace.sarimax.SARIMAXResults API.
  http://www.statsmodels.org/dev/generated/statsmodels.tsa.statespace.sarimax.SARIMAXResults.html
- Statsmodels SARIMAX Notebook.
  http://www.statsmodels.org/dev/examples/notebooks/generated/statespace_sarimax_stata.html  



## pmdarima

```python
import pmdarima as pm
```

