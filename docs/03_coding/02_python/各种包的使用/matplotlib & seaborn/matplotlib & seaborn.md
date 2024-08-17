# matplotlib & seaborn

## 目录

-   [保存图片](#保存图片)
-   [作图参数](#作图参数)
    -   [坐标轴](#坐标轴)
    -   [画板](#画板)
        -   [画两个拼在一起的图并设置大小](#画两个拼在一起的图并设置大小)
        -   [分区画板](#分区画板)
-   [各种图示例](#各种图示例)
    -   [直方图](#直方图)
        -   [pandas画法](#pandas画法)
        -   [matplotlib画法](#matplotlib画法)
    -   [概率密度图](#概率密度图)
    -   [散点图](#散点图)
    -   [时间序列line图](#时间序列line图)
    -   [盒须图](#盒须图)
-   [science 包 IEEE风格图](#science-包-IEEE风格图)
-   [画某一个分布图（如正态分布）](#画某一个分布图如正态分布)
-   [外部资料](#外部资料)

## 保存图片

```python
# Where to save the figures
PROJECT_ROOT_DIR = "."
CHAPTER_ID = "end_to_end_project"
IMAGES_PATH = os.path.join(PROJECT_ROOT_DIR, "images", CHAPTER_ID)
os.makedirs(IMAGES_PATH, exist_ok=True)

def save_fig(fig_id, tight_layout=True, fig_extension="png", resolution=300):
    path = os.path.join(IMAGES_PATH, fig_id + "." + fig_extension)
    print("Saving figure", fig_id)
    if tight_layout:
        plt.tight_layout()
    plt.savefig(path, format=fig_extension, dpi=resolution)
```

## 作图参数

### 坐标轴

xlim():设置x坐标轴范围

ylim():设置y坐标轴范围

xlabel():设置x坐标轴名称

ylabel():设置y坐标轴名称

xticks():设置x轴刻度

yticks():设置y轴刻度

```python
#创建数据
x = np.linspace(-5, 5, 100)
y1 = np.sin(x)
y2 = np.cos(x)

#创建figure窗口，figsize设置窗口的大小
plt.figure(num=3, figsize=(8, 5))
#画曲线1
plt.plot(x, y1)
#画曲线2
plt.plot(x, y2, color='blue', linewidth=5.0, linestyle='--')
#设置坐标轴范围
plt.xlim((-5, 5))
plt.ylim((-2, 2))
#设置坐标轴名称
plt.xlabel('xxxxxxxxxxx')
plt.ylabel('yyyyyyyyyyy')
#设置坐标轴刻度
my_x_ticks = np.arange(-5, 5, 0.5)
#对比范围和名称的区别
#my_x_ticks = np.arange(-5, 2, 0.5)
my_y_ticks = np.arange(-2, 2, 0.3)
plt.xticks(my_x_ticks)
plt.yticks(my_y_ticks)

#显示出所有设置
plt.show()
```

### 画板

#### 画两个拼在一起的图并设置大小

```python
import matplotlib.pyplot as plt
import numpy as np

def f(t):
    return np.exp(-t) * np.cos(2 * np.pi * t)

t1 = np.arange(0, 5, 0.1)
t2 = np.arange(0, 5, 0.02)

fig, axs = plt.subplots(1, 2,constrained_layout=True, figsize=(12, 4))   # figsize=(12, 4)是两张拼在一起的大小

plt.subplot(121)
plt.plot(t1, f(t1), 'bo', t2, f(t2), 'r--')

plt.subplot(122)
plt.plot(t2, np.cos(2 * np.pi * t2), 'r--')


plt.show()
```

#### 分区画板

```python
fig = plt.figure(figsize=(15, 15)) # 定义图片大小
 
# 分区 类似table , subplot2grid((总行，总列)，（起始坐标），colspan,rowspan)
ax1 = plt.subplot2grid((3,3), (0,0), colspan=3)
ax2 = plt.subplot2grid((3,3), (1,0), colspan=2)
ax3 = plt.subplot2grid((3,3), (1, 2), rowspan=2)
ax4 = plt.subplot2grid((3,3), (2, 0))
ax5 = plt.subplot2grid((3,3), (2, 1))

```

## 各种图示例

### 直方图

#### pandas画法

```python
%matplotlib inline # only in a Jupyter notebook
import matplotlib.pyplot as plt
housing.hist(bins=50, figsize=(20,15))    # 将数据每个numerical 字段都画出来
plt.show()

```

![](image_3G74jlLBQ1.png)

当在同一幅图中创建多个直方图时，需要调整一下柱子的样式，才能得到较好的视觉效果。

当在同一幅图表中创建多个直方图，最好使用'stepfilled'，并调整透明度

```python
np.random.seed(123)
x1 = np.random.normal(0, 1, size=1000)
x2 = np.random.normal(-2, 3, size=1000)
x3 = np.random.normal(3, 2.5, size=1000)

kwargs = {
  "bins": 40,
  "histtype": "stepfilled",
  "alpha": 0.5
}

fig, ax = plt.subplots(figsize=(10, 7))
ax.hist(x1, label="x1", **kwargs)
ax.hist(x2, label="x2", **kwargs)
ax.hist(x3, label="x3", **kwargs)
ax.set_title("Histogram for multiple variables")
ax.legend()
```

![](image_zBTqgaEwBh.png)

#### matplotlib画法

```python
import matplotlib.pyplot as plt
 
plt.hist(x_value,bins=10)
 
plt.title("data analyze")
plt.xlabel("height")
plt.ylabel("rate")
 
plt.show()

```

### 概率密度图

密度图是与直方图密切相关的概念，它用一条连续的曲线表示变量的分布，可以理解为直方图的”平滑版本“。

统计学经典理论假设样本数据来源于总体，而总体数据会服从某个分布（如正态分布，二项式分布等）。密度图采用”核密度统计量“来估计代表总体的随机变量的概率密度函数。

密度估计的课题比较复杂，这里不做深入。为了实现密度图，需要先创建一个数据框(pd.DataFrame)，然后调用df.plot.density()。

```python
np.random.seed(123)

x1 = np.random.normal(-10, 5, 1000)
x2 = np.random.normal(5, 10, 1000)

df = pd.DataFrame({"x1": x1, "x2": x2})

fig, ax = plt.subplots(figsize=(10, 7))
df.plot(kind="density", ax=ax, linewidth=3, title="Density Plot")
df.plot(kind="hist", ax=ax, density=True, legend=False)


```

![](https://pic1.zhimg.com/80/v2-331c8e9f343e1293fd5bde689ed82598_720w.jpg)

### 散点图

```python
df.plot(kind="scatter", x="longitude", y="latitude", alpha=0.1)  # 将alpha选项设置为0.1可以更容易地可视化数据点密度高的地方

# 更复杂的，可以用大小和颜色来区分不同属性
df.plot(kind="scatter", x="longitude", y="latitude", alpha=0.4,
s=housing["population"]/100, label="population", figsize=(10,7),
c="median_house_value", cmap=plt.get_cmap("jet"), colorbar=True,
)


## matplotlib
plt.scatter(df['ds'],df['y'],c='black',s=5)
```

### 时间序列line图

```python
import matplotlib.pyplot as plt
# 原始图
def plot_orig(y, x=None, title=''):
    plt.figure(figsize=(15, 4))
    if(x is None):
        plt.plot(y)
    else:
        plt.plot(x,y)
    plt.title(title)
    plt.grid(True)
    plt.show()

# 真实与预测对比
def plot_predict(df):
    """
    'ds'--时间；'y'--真实值；'y_hat'--预测值
    """
    plt.figure(figsize=(15, 4))
    plt.figure(figsize=(15, 4))
    plt.plot(df['ds'],df['y_hat'], label="predict y")
    plt.scatter(df['ds'],df['y'],c='black',s=5, label='actual y')
    plt.grid(True)
    plt.legend(loc='best',frameon=False) #去掉图例边框
    plt.show()
```

### 盒须图

## science 包 IEEE风格图

```python
import matplotlib.pyplot as plt
save = True
with plt.style.context(['science','ieee','no-latex']):
    fig, ax = plt.subplots()
    ax.set_xlabel("Size of tree (number of leaf nodes)")
    ax.set_ylabel("Error rate")
    ## --- 坐标轴改成科学计数法
    # style= 'sci'(or 'scientific') 或者'plain'
    ax.ticklabel_format(style='sci',scilimits=(0,0),axis='both')
    # ax.set_title("Accuracy vs alpha for training and testing sets")
    ax.plot(leaf_nodes[-20:-1], trains_err[-20:-1], marker=".", label="Training", drawstyle="steps-post")  ## --- 去掉最后几个node是为了看的更清楚
    ax.plot(leaf_nodes[-20:-1], vals_err[-20:-1], marker=".", label="Cross-validation", drawstyle="steps-post")
    ax.plot(leaf_nodes[-20:-1], tests_err[-20:-1], marker=".", label="Test", drawstyle="steps-post")
    ax.legend()
    if save:
        plt.savefig("overfit.eps", dpi=600)
    plt.show()
```

## 画某一个分布图（如正态分布）

```python
import matplotlib.pyplot as plt
from scipy.stats import norm
# 定义数据
mean = 25
sd = 10
x = np.linspace(0, mean*2-1, mean*2)
def discrete_cdf(x, mean, sd):
    """ 模拟出离散正态分布 """
    return norm.cdf(x+0.5,loc=mean, scale=sd) - norm.cdf(x-0.5,loc=mean, scale=sd)
pdf = np.array([discrete_cdf(i,mean,sd) for i in x])
cdf = norm.cdf(x,loc=mean, scale=sd)

x_val = 22

myfont = fm.FontProperties(fname=r'C:\Windows\Fonts\simhei.ttf') # 设置字体 C:/Windows/Fonts/
pdf_val = pdf[x_val]

plt.figure(num=2, figsize=(8, 5))  # num参数决定了程序运行后弹出的图像窗口名字

plt.plot(x, pdf)

# plt.xlabel('demand',fontsize=16)
# plt.ylabel('pdf: f(x)',fontsize=16)
plt.xlabel('旅客需求',fontproperties=myfont,fontsize=18)
plt.ylabel('概率密度函数（pdf）',fontproperties=myfont,fontsize=18)

plt.ylim((0, 0.05))
plt.xlim((0,  mean * 2))

plt.yticks([0])

plt.plot([x_val, x_val,], [0, pdf_val*1.1,], 'k--', linewidth=2,color='red')

# 设置图像边框颜色
ax = plt.gca()  # plt.gca()获取当前坐标轴信息
ax.spines['right'].set_color('none')  # .spines设置边框
ax.spines['top'].set_color('none')

# sub_x = x[:x_val+1]
# sub_pdf = pdf[:x_val+1]
# plt.stackplot(sub_x, sub_pdf,colors='#939393',alpha=0.08) #堆积面积图  # alpha=0.5 透明度

sub_x = x[x_val:]
sub_pdf = pdf[x_val:]
plt.stackplot(sub_x, sub_pdf,colors='#939393',alpha=0.08) #堆积面积图  # alpha=0.5 透明度

plt.annotate(r'旅客需求≥%d的概率为%.2f ' % (x_val, 1-cdf[x_val]), fontproperties=myfont,xy=(x_val*1.3, pdf_val*0.3), xycoords='data', xytext=(0, 120),
    textcoords='offset points', fontsize=18,
    arrowprops=dict(arrowstyle='->', connectionstyle="arc3,rad=.2"))

plt.annotate('d= %d'% x_val, xy=(x_val, pdf_val/2), xycoords='data', xytext=(+x_val+20, +x_val),
    textcoords='offset points', fontsize=18,
    arrowprops=dict(arrowstyle='->', connectionstyle="arc3,rad=.2"))

```

![](image_8yfUluzFDY.png)

```python
plt.figure(num=2, figsize=(8, 5))  # num参数决定了程序运行后弹出的图像窗口名字
plt.plot(x, cdf)

plt.xlabel('demand',fontsize=16)
plt.ylabel('cdf: F(x)',fontsize=16)

plt.xlim((0, 70))
plt.ylim((0, 1))



# 设置图像边框颜色
ax = plt.gca()  # plt.gca()获取当前坐标轴信息
ax.spines['right'].set_color('none')  # .spines设置边框
# ax.spines['top'].set_color('none')

plt.plot([40, 40,], [0, 0.707,], 'k--', linewidth=2,color='coral')
plt.scatter([40, ], [0.707, ], s=50, color='coral')

plt.annotate(r'$F(40)=0.71$', xy=(40, 0.707), xycoords='data', xytext=(+30, -30),
    textcoords='offset points', fontsize=16,
    arrowprops=dict(arrowstyle='->', connectionstyle="arc3,rad=.2"))
```

![](image_H12ZbaQj07.png)

## 外部资料

[matplotlib,seaborn中文乱码问题 - 简书](matplotlib,seaborn中文乱码问题%20-%20简书.md - 简书/matplotlib,seaborn中文乱码问题 - 简书.md> "matplotlib,seaborn中文乱码问题 - 简书")
