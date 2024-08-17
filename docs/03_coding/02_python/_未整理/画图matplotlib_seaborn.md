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

```python
%matplotlib inline # only in a Jupyter notebook
import matplotlib.pyplot as plt
housing.hist(bins=50, figsize=(20,15))		# 将数据每个numerical 字段都画出来
plt.show()
```

### 散点图

```python
df.plot(kind="scatter", x="longitude", y="latitude", alpha=0.1)	# 将alpha选项设置为0.1可以更容易地可视化数据点密度高的地方

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


