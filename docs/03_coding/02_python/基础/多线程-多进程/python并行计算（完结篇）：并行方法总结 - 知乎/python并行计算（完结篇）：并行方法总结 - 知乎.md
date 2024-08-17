# python并行计算（完结篇）：并行方法总结 - 知乎

[python并行计算（完结篇）：并行方法总结 - 知乎](https://zhuanlan.zhihu.com/p/46678895 "python并行计算（完结篇）：并行方法总结 - 知乎")&#x20;

由于python相当易学易用，现在python也较多地用于有大量的计算需求的任务。本文介绍几个并行模块，以及实现程序并行的入门技术。本文比较枯燥，主要是为后面上工程实例做铺垫。**完结篇对前期介绍的所有模块及实例进行总结，比较各并行方法的特点和异同**。

所有比较都以文字形式呈现了，欢迎指正或完善，做成表格可能效果更好。

模块介绍：

实例：

注：以下模块、类与其他内容相同或接近，不重复介绍和比较：

-   multiprocess模块：与multiprocessing模块接口基本一致。
-   pathos.pp.pp模块：实质也即pp模块，与独立的pp模块完全相同。
-   pathos.multiprocessing.Pool()：与multiprocess.Pool()完全相同。
-   pathos.multiprocessing.ProcessingPool()、pathos.pools.ProcessPool()：与pathos.multiprocessing.ProcessPool()完全相同。
-   pathos.pp.ParallelPythonPool()、pathos.parallel.ParallelPool()、pathos.parallel.ParallelPythonPool()、pathos.pools.ParallelPool()：与pathos.pp.ParallelPool()完全相同。
-   pathos.serial.SerialPool()：实际是串行（非并行），不参与比较。

## **1、按并行分类**

**（1）阻塞（非并行）：**&#x20;

**非并行方式下，子进程串行执行（完成一个，然后开始下一个），实际不是并行**。包括：

-   multiprocessing.Pool()，apply方法
-   pathos.multiprocessing.ProcessPool()，pipe方法
-   pathos.pp.ParallelPool()，pipe方法
-   pathos.pp.ParallelPool()，map方法
-   pathos.pp.ParallelPool()，imap方法

**（2）批次并行：**&#x20;

**批次并行指一批子进程并行执行，且直到该批次所有子进程完成后，才开始下一批次**。包括：

-   multiprocessing.Process() #只能一批一批地添加进程，同一批次内并行

**（3）异步：**&#x20;

**异步执行指的是一批子进程并行执行，且子进程完成一个，就新开始一个，而不必等待同一批其他进程完成**。包括：

-   multiprocessing.Pool()，apply\_async方法
-   multiprocessing.Pool()，map方法
-   multiprocessing.Pool()，map\_async方法
-   multiprocessing.Pool()，imap方法
-   multiprocessing.Pool()，imap\\\_unordered方法
-   multiprocessing.Pool()，starmap方法
-   multiprocessing.Pool()，starmap\\\_async方法
-   concurrent.futures.ProcessPoolExecutor()，submit方法
-   concurrent.futures.ProcessPoolExecutor()，map方法
-   pathos.multiprocessing.ProcessPool()，map方法
-   pathos.multiprocessing.ProcessPool()，imap方法
-   pathos.multiprocessing.ProcessPool()，uimap方法
-   pathos.multiprocessing.ProcessPool()，amap方法
-   pathos.multiprocessing.ProcessPool()，apipe方法
-   pp.Server()，submit方法
-   pathos.pp.ParallelPool()，apipe方法
-   pathos.pp.ParallelPool()，amap方法
-   pathos.pp.ParallelPool()，uimap方法

## **2、按传参分类**

**（1）单个任务，任务多参数：**&#x20;

-   multiprocessing.Process()
-   concurrent.futures.ProcessPoolExecutor()，submit方法
-   multiprocessing.Pool()，apply方法
-   multiprocessing.Pool()，apply\\\_async方法
-   pathos.multiprocessing.ProcessPool()，pipe方法
-   pathos.multiprocessing.ProcessPool()，apipe方法
-   pp.Server()，submit方法
-   pathos.pp.ParallelPool()，pipe方法
-   pathos.pp.ParallelPool()，apipe方法

**（2）多个任务，任务单参数：**&#x20;

-   multiprocessing.Pool()，map方法
-   multiprocessing.Pool()，map\\\_async方法
-   multiprocessing.Pool()，imap方法
-   multiprocessing.Pool()，imap\\\_unordered方法

**（3）多个任务，任务多参数：**&#x20;

**（a）func(iterable\[i])形式**：iterable的每个元素（元素本身也是iterable）对应func的多个参数。

-   multiprocessing.Pool()，starmap方法
-   multiprocessing.Pool()，starmap\\\_async方法

**（b）func(iterable1\[i], iterable2\[i], ...)形式**：每个iterable对应func的一个参数。

-   concurrent.futures.ProcessPoolExecutor()，map方法
-   pathos.multiprocessing.ProcessPool()，map方法
-   pathos.multiprocessing.ProcessPool()，imap方法
-   pathos.multiprocessing.ProcessPool()，uimap方法
-   pathos.multiprocessing.ProcessPool()，amap方法
-   pathos.pp.ParallelPool()，map方法
-   pathos.pp.ParallelPool()，amap方法
-   pathos.pp.ParallelPool()，imap方法
-   pathos.pp.ParallelPool()，uimap方法

## **3、按返回分类**

**（1）返回任务返回值**

-   multiprocessing.Pool()，apply方法
-   pathos.multiprocessing.ProcessPool()，pipe方法
-   pathos.pp.ParallelPool()，pipe方法

**（2）返回list**

-   multiprocessing.Pool()，map方法
-   multiprocessing.Pool()，starmap方法
-   pathos.multiprocessing.ProcessPool()，map方法
-   pathos.pp.ParallelPool()，map方法

**（3）返回ApplyResult**

返回MapResult或ApplyResult实例，通过get方法获取返回值。需要注意的是：

-   由于**每个ApplyResult实例对应单个子进程，其get方法本身是阻塞的，因此，在进程添加过程中不可包含get方法，而应在所有进程完成后，再一起调用get方法**。
-   对于MapResult不存在该问题，因为所有子进程只会一起返回一个MapResult实例。

包括：

-   multiprocessing.Pool()，apply\\\_async方法
-   pathos.multiprocessing.ProcessPool()，apipe方法
-   pathos.pp.ParallelPool()，apipe方法

**（4）返回MapResult**

-   multiprocessing.Pool()，map\\\_async方法
-   multiprocessing.Pool()，starmap\\\_async方法
-   pathos.multiprocessing.ProcessPool()，amap方法
-   pathos.pp.ParallelPool()，amap方法

**（5）返回迭代器或生成器**

迭代器/生成器对内存的需求会小得多，但速度比普通方法要慢很多（未验证）。不过，对于本文的小型任务，看不出差别。

**（a）按顺序**：即按任务添加顺利返回。

-   multiprocessing.Pool()，imap方法
-   concurrent.futures.ProcessPoolExecutor()，map方法
-   pathos.multiprocessing.ProcessPool()，imap方法
-   pathos.pp.ParallelPool()，imap方法

**（b）不按顺序**：实际按任务完成顺序返回。

-   multiprocessing.Pool()，imap\\\_unordered方法
-   pathos.multiprocessing.ProcessPool()，uimap方法
-   pathos.pp.ParallelPool()，uimap方法

**（6）无直接返回值**

-   multiprocessing.Process() #无直接返回值，**可通过进程间通信的方式返回任务返回值**。
-   concurrent.futures.ProcessPoolExecutor()，submit方法 #**future对象可以通过result方法获取子进程任务返回值。但该方法是阻塞的，因此，应在所有子进程完成后再调用**。
-   pp.Server()，submit方法 #**Task对象可调用（即Task()），调用可返回任务返回值。但调用是阻塞的，因此，应在所有子进程完成后再调用**。
