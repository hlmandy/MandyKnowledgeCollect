# (53条消息) Python不重复批量随机抽样 random.sample() 和 numpy.random.choice() 的优缺点\_Javy Wang的博客-CSDN博客\_numpy.random.sample

[(53条消息) Python不重复批量随机抽样 random.sample() 和 numpy.random.choice() 的优缺点\_Javy Wang的博客-CSDN博客\_numpy.random.sample](https://blog.csdn.net/DSTJWJW/article/details/90667570 "(53条消息) Python不重复批量随机抽样 random.sample() 和 numpy.random.choice() 的优缺点_Javy Wang的博客-CSDN博客_numpy.random.sample")&#x20;

python中random.sample()方法可以随机地从指定列表中提取出N个不同的元素，**列表的维数没有限制**。

有[文章](https://blog.csdn.net/sunnyyan/article/details/83410233 "文章")指出：在实践中发现，当N的值比较大的时候，该方法执行速度很慢。可以用[numpy](https://so.csdn.net/so/search?q=numpy\&spm=1001.2101.3001.7020 "numpy") random模块中的choice方法来提升随机提取的效率。

*（****有问题，从该文章看不出来random.sample方法比choice方法慢多少，我自己仿真倒是发现random.sample方法比choice方法快的多，后面会举例说明****）*

numpy.random.choice() 对抽样对象有要求，必须是整数或者[一维数组](https://so.csdn.net/so/search?q=%E4%B8%80%E7%BB%B4%E6%95%B0%E7%BB%84\&spm=1001.2101.3001.7020 "一维数组")（列表），**不能对超过一维的数据进行抽样**，这是其缺点。

random.sample() 和 numpy.random.choice() 的优点都是可以**指定抽样的个数**，一次性从列表中不重复地抽样出指定个数的元素，其中 random.sample()默认就是不重复抽样（不放回的抽样），而numpy.random.choice()默认是可以重复抽样，要想不重复地抽样，需要设置replace参数为False，用法如下：

![](https://img-blog.csdnimg.cn/20200601132727220.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RTVEpXSlc=,size_16,color_FFFFFF,t_70)

前面说random.sample方法比choice方法快的多，下面附图为证。

![](https://img-blog.csdnimg.cn/20200918003545283.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RTVEpXSlc=,size_16,color_FFFFFF,t_70#pic_center)

![](https://img-blog.csdnimg.cn/20200918004107366.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RTVEpXSlc=,size_16,color_FFFFFF,t_70#pic_center)

有博友留言说，numpy.random.choice()与 random.sample() 两者适合的情况不同，建议增加抽样数量再试试，下面是逐步增加抽样数量后的结果。

列表元素为100000个，抽样个数为9。 &#x20;

![](https://img-blog.csdnimg.cn/20201105221341348.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RTVEpXSlc=,size_16,color_FFFFFF,t_70#pic_center)

抽样个数为1000。 &#x20;

![](https://img-blog.csdnimg.cn/2020110522144595.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RTVEpXSlc=,size_16,color_FFFFFF,t_70#pic_center)

抽样个数为10000。

![](https://img-blog.csdnimg.cn/20201105221607115.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RTVEpXSlc=,size_16,color_FFFFFF,t_70#pic_center)

抽样个数为50000。 &#x20;

![](https://img-blog.csdnimg.cn/20201105221949933.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RTVEpXSlc=,size_16,color_FFFFFF,t_70#pic_center)

从以上实验来看，numpy.random.choice()抽样方法的时间几乎不会随着抽样数量的变化而变化，而random.sample() 会随着抽样数量的增加而增加。所以当数量较少的时候，random.sample() 用时非常少，而numpy.random.choice()则很长；当抽样数量很大的时候，numpy.random.choice()几乎不变，而random.sample() 用时变长。

简单绘制一下测试结果，如下所示

![](https://img-blog.csdnimg.cn/20201105223605865.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RTVEpXSlc=,size_16,color_FFFFFF,t_70#pic_center)

从图上可以看到，numpy.random.choice()的用时确实保持不变，而random.sample() 用时会随着抽样比例的增加而线性增长。

从对象类型上看，random.sample方法比numpy.random.choice方法适用范围广。

从速度上看，当抽样数量小的时候，random.sample方法比numpy.random.choice方法快很多；当抽样数量很大的时候，random.sample方法就不如numpy.random.choice方法了。
