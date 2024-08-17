# Python3 pandas库(13) nlargest()分组取最大多行并求和 - 知乎

[Python3 pandas库(13) nlargest()分组取最大多行并求和 - 知乎](https://zhuanlan.zhihu.com/p/30402355 "Python3 pandas库(13) nlargest()分组取最大多行并求和 - 知乎")&#x20;

在pandas库里面，我们常常关心的是最大的前几个，比如销售最好的几个产品，几个店，等。之前讲到的head(), 能够看到看到DF里面的前几行，如果需要看到最大或者最小的几行就需要先进行排序。max()和min()可以看到最大或者最小值，但是只能看到一个值。

**nlargest()的优点就是能一次看到最大的几行，而且不需要排序。缺点就是只能看到最大的，看不到最小的。**&#x20;

现有一个DataFrame，df

![](https://pic4.zhimg.com/v2-89662fef66844cc865f0cb19f3197693_b.jpg)

我们想看看总体销售前三的明细：

![](https://pic2.zhimg.com/v2-36aa61c637a6064619f0b9f6811c3b5d_b.jpg)

整个DataFrame就被截取出了3行，依据的就是销售最高的3行。而且已经按照从最高到最低进行了排名。索引还是按照之前的索引。

**nlargest()的第一个参数就是截取的行数。第二个参数就是依据的列名。**&#x20;

![](https://pic2.zhimg.com/v2-539bb8e996c1bd9b974bfb3aa547954d_b.jpg)

上面的这个就是按照’人员数量'截取了5行。

**还有个参数，keep='first'或者'last'。当出现重复值的时候，keep='first',会选取在原始DataFrame里排在前面的，keep='last'则去排后面的。**&#x20;

nlargest()是真的不能选取最小多个值的，但是如果我们真的真的一定要用nlargest()取最小值，也不是不行：

![](https://pic4.zhimg.com/v2-01c69192e06e248d825a2b2c6cb29da7_b.jpg)

在原DataFrame上面增加一列‘负销售’，并且等于原’销售'列乘以-1，再取‘负销售’最大几行，也就是‘销售’的最小几行。

这是一个小小的变通，其实也可以通过排序再用head()等选取最小多行。

介绍到这里你可能觉得nlargest()好像有点鸡肋，都可以被取代。

然而，比如在df中，如果我想要每个区域的最大3行，这个该怎么办呢？？？？？？？？？？？

![](https://pic3.zhimg.com/v2-714fd173d664878fdd5b93dcab890126_b.jpg)

如果选择每个区域最大的一行可以，这里只能按照默认的‘销售'这一列。

![](https://pic1.zhimg.com/v2-55bc3f99e68b1c6ab1e29059b816d5f0_b.jpg)

多行的话：

```python
df.groupby(by='区域').apply(lambda x:x.nlargest(3,'销售'))
```

![](https://pic2.zhimg.com/v2-3820846a403edc3882feefb4d11052a5_b.jpg)

这样，每组都选取出了销售前三的行。**在这种分组选前几行的时候使用nlargest()就方便多了, 顺序也是排好的。**&#x20;

apply和lamda将在下一篇进行归纳。

在一些练习题（面试题）中，就需要用到分组选取前几，并且求和，我们只需要再稍稍做处理就可以了。

![](https://pic3.zhimg.com/v2-b4d7b6704415f8c9bb3284cf6ea8686a_b.jpg)

这里因为索引名和列名都有’区域'，有重复，系统有警告，在实际使用时可以先改列名再操作。

也可以直接按照索引求和，这样就没有警告了。

![](https://pic1.zhimg.com/v2-621af588b54f2df838897dcb70707800_b.jpg)

\\----------------------------------------------------------------------------------

有点意思。。。。

最小：nsmallest
