# python并行计算（上）：multiprocessing、multiprocess模块 - 知乎

[python并行计算（上）：multiprocessing、multiprocess模块 - 知乎](https://zhuanlan.zhihu.com/p/46798399 "python并行计算（上）：multiprocessing、multiprocess模块 - 知乎")&#x20;

由于python相当易学易用，现在python也较多地用于有大量的计算需求的任务。本文介绍几个并行模块，以及实现程序并行的入门技术。本文比较枯燥，主要是为后面上工程实例做铺垫。**第一期介绍最常用的multiprocessing模块，以及multiprocess模块**。

python实现多进程的模块最常用的是multiprocessing，此外还有multiprocess、pathos、concurrent.futures、pp、parallel、pprocess等模块。本文对主要的模块进行介绍。

## **多进程才是真·并行**

接触过并行的同学都多多少少知道，python有一个非常重要的GIL（global interpreter lock，全局解释器锁）。python代码执行由python虚拟机（解释器主循环）来控制。对python虚拟机的访问由GIL控制，GIL保证同一时刻只有一个线程在执行。

python虚拟机执行过程：

1、设置GIL

2、切换到一个线程去运行

3、运行，直至完成指定的字节码指令，或者线程主动让出控制

4、将该线程设置为睡眠状态

5、解锁GIL

6、重复以上所有步骤，运行下一个线程

由于GIL的限制，python多线程实际只能运行在单核CPU。**如要实现多核CPU并行，只能通过多进程的方式实现**。大部分并行模块中，多进程相当于开启多个python解释器，每个解释器对应一个进程。也有一些并行模块通过修改pyhton的GIL机制突破这个限制。

## **multiprocessing模块**

multiprocessing模块是最常用的多进程模块。

**1、创建子进程**

**（1）最基本的方法是通过函数**：multiprocessing.Process(group=None, target=None, name=None, args=(), kwargs={}, \*, daemon=None)

**或者multiprocessing.Process子类化也可以**。

```text
group为预留参数。
target为可调用对象（函数对象），为子进程对应的活动；相当于multiprocessing.Process子类化中重写的run()方法。
name为线程的名称，默认（None）为"Process-N"。
args、kwargs为进程活动（target）的非关键字参数、关键字参数。
deamon为bool值，表示是否为守护进程。
```

另外还有几个子进程通用的函数：

XXX.start() #启动进程活动（run())。XXX为进程实例。

XXX.join(timeout = None) #使主调进程（包含XXX.join()语句的进程）阻塞，直至被调用进程XXX运行结束或超时（如指定timeout）。XXX为进程实例。

```text
def f(a, b = value):
    pass

p = multiprocessing.Process(target = f, args = (a,), kwargs = {b : value}) 
p.start()
p.join()
```

**（2）对于要创建多个子进程的情形，更简洁的办法是采用进程池：** multiprocessing.Pool(processes=None, initializer=None, initargs=(), maxtasksperchild=None)

```text
processes ：使用的工作进程的数量，如果processes是None那么使用 os.cpu_count()返回的数量。
initializer： 如果initializer不是None，那么每一个工作进程在开始的时候会调用initializer(*initargs)。
maxtasksperchild：工作进程退出之前可以完成的任务数，完成后用一个新的工作进程来替代原进程，来让闲置的资源被释放。maxtasksperchild默认是None，意味着只要Pool存在工作进程就会一直存活。
context: 用在制定工作进程启动时的上下文，一般使用 multiprocessing.Pool() 或者一个context对象的Pool()方法来创建一个池，两种方法都适当的设置了context。
```

而在进程池中实际创建子进程也有几个办法：

**（a）最普通的方式是直接申请：**&#x20;

xxx.apply(func, args=(), kwds={}, callback=None, error\_callback=None) #apply对应的子进程是排队执行的，**实际非并行**（阻塞的，即上一个子进程完成了才能进行下一个子进程；注意是单个子进程执行的，而不是按批执行的）。xxx为进程池实例。

xxx.apply\_async(func, args=(), kwds={}) #**apply\_async对应的每个子进程是异步执行的（即并行）**。**异步执行指的是一批子进程并行执行，且子进程完成一个，就新开始一个，而不必等待同一批其他进程完成。** xxx为进程池实例。

```text
func(*args,**kwds)为子进程对应的活动。
callback为回调函数（在func执行完毕后执行），其应具有一个参数，该参数为func的返回值（也即func应有一个返回值）。
```

同样还有几个进程池通用的方法：

XXX.close() #关闭进程池，关闭后不能往pool中增加新的子进程，然后可以调用join()函数等待已有子进程执行完毕。XXX为进程池。

XXX.join() #等待进程池中的子进程执行完毕。需在close()函数后调用。XXX为进程池。

```text
def f(a, b = value):
    pass

pool = multiprocessing.Pool() 
pool.apply_async(f, args = (a,), kwds = {b : value})
pool.close()
pool.join()
```

**（b）如果子进程有返回值，且返回值需要集中处理，则建议采用map方式（子进程活动只允许1个参数）**：

XXX[.map](https://link.zhihu.com/?target=http%3A//xxx.map/ ".map")(func, iterable, chunksize=None) #将iterable的每个元素作为参数，应用func函数，返回函数结果组成的list，阻塞版本。func(iterable\[i])为子进程对应的活动。XXX为进程池实例。

XXX.map\_async(func, iterable, chunksize=None, callback=None, error\_callback=None) #**XXX**[**.map**](https://link.zhihu.com/?target=http%3A//xxx.map/ ".map")**()的异步（并行）版本**，返回MapResult实例（其具有get()方法，获取结果组成的list）。XXX为进程池实例。

```text
def f(a): #map方法只允许1个参数
    pass

pool = multiprocessing.Pool() 
result = pool.map_async(f, (a0, a1, ...)).get()
pool.close()
pool.join()
```

**（c）如果内存不够用，也可采用imap迭代器方式**：

XXX.imap(func, iterable, chunksize=1) #[XXX.map](https://link.zhihu.com/?target=http%3A//xxx.map/ "XXX.map")()的迭代器版本，返回迭代器实例。XXX.imap()[速度远慢于XXX.map](https://link.zhihu.com/?target=http%3A//xn--xxx-xi9dt94e9xdu76hjpa.map/ "速度远慢于XXX.map")()，但是对内存需求非常小。XXX为进程池实例。

XXX.imap\\\_unordered(func, iterable, chunksize=1) #XXX.imap()的无序版本（不会按照调用顺序返回，而是按照结束顺序返回），返回迭代器实例。XXX为进程池实例。

```text
def f(a): #map方法只允许1个参数
    pass

pool = multiprocessing.Pool() 
result = pool.imap_unordered(f, (a0, a1, ...))
pool.close()
pool.join()

for item in result:
    pass
```

**（d）如果子进程活动具有多个参数，则不能直接使用map方式，需采用starmap方式**：

XXX.starmap(func, iterable, chunksize=None) #[类似XXX.map](https://link.zhihu.com/?target=http%3A//xn--xxx-t29dk28r.map/ "类似XXX.map")()，但子进程活动func允许包含多个参数，也即iterable的每个元素也是iterable（其每个元素作为func的参数），返回结果组成的list。XXX为进程池实例。

XXX.starmap\_async(func, iterable, chunksize=None, callback=None, error\_callback=None) #**xxx.starmap()的异步（并行）版本**，返回MapResult实例（其具有get()方法，获取结果组成的list）。XXX为进程池实例。

```text
def f(a, b): #starmap方法允许多个参数
    pass

pool = multiprocessing.Pool() 
result = pool.starmap_async(f, ((a0, b0), (a1, b1), ...)).get()
pool.close()
pool.join()
```

**2、进程间通信——数据共享**

多进程相比多线程最大的区别，就是进程是完全独立的，内存无法共享。如果要实现进程间数据共享，就需要采用特殊的方法，专门用于存储共享的数据。

**（1）共享值（共享内存）：**&#x20;

multiprocessing.Value(typecode\_or\_type, \*args, lock=True) #共享单个数据，其值**通过value属性访问**。如果在修改、访问数组时，希望能锁定资源，阻塞其他访问，可以将lock设为True，通过XXX.acquire()获得锁，XXX.release()释放锁。关于锁的概念后面再讲。

```text
typecode_or_type：数组中的数据类型，为代表数据类型的类或者str。比如，'i'表示int，'f'表示float。
args：可以设置初始值。比如：multiprocessing.Value('d',6)生成值为6.0的数据。
lock：bool，是否加锁。
```

multiprocessing.RawValue(typecode\_or\_ type, \*args) #也有简化的共享值，其不具备锁功能。

**（2）共享数组（共享内存）：**&#x20;

multiprocessing.Array(typecode\_or\_type, size\_or\_initializer, \*, lock=True) #其返回的数组实例可**通过索引访问**。类似共享值，同样可以加锁访问。

```text
typecode_or_type：数组中的数据类型，为代表数据类型的类或者str。比如，'i'表示int，'f'表示float。
size_or_initializer：数组大小，int；或初始数组内容（序列）。比如：multiprocessing.Array('i', 10)生成的数组转为list为[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]； multiprocessing.Array('i', range(10))生成的数组转为list为[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]。
lock：bool，是否加锁。
```

multiprocessing.RawArray(typecode\_or\_ type, size\_or\_ initializer) #也有简化的共享数组，同样不具备锁功能。

**（3）对于更复杂的情况，可以通过manager来实现（共享进程）：**&#x20;

multiprocessing.Manager() #创建一个manager，用于进程之间共享数据。返回的manager实例控制了一个server进程，此进程包含的python对象可以被其他的进程通过proxies来访问。**其具有'address', 'connect', 'dict', 'get\_server', 'join', 'list', 'register', 'shutdown', 'start'等方法，'Array', 'Barrier', 'BoundedSemaphore', 'Condition', 'Event', 'JoinableQueue', 'Lock', 'Namespace', 'Pool', 'Queue', 'RLock', 'Semaphore', 'Value'等类**。

以上dict（共享字典）、list（共享列表）方法，以及Array（共享数组）等类的实例化均可用于共享数据，比如需要共享dict：

XXX.dict() #XXX为manager实例。

```text
m = multiprocessing.Manager()
dic = m.dict() #可采用一般dict的方法访问
```

注意：在操作共享对象元素时，**除了赋值操作，其他的方法都作用在共享对象的拷贝上，并不会对共享对象生效**。比如：dic\['k'] = \[]; dic\['k'].append(x)，将不会修改dic的内容。

**manager的功能非常强大，其不仅可以在本地进程间共享，甚至可以在多客户端实现网络共享**。不过manager占用资源较大，还是根据使用需求确定是否采用。

**3、进程间通信——数据传递**

进程间不仅需要数据共享，有时还需要数据在不同进程间传递。

**（1）最常用的通信方式是队列：**&#x20;

multiprocessing.Queue(maxsize=0) #建立共享的队列实例，可以采用一般队列的方式访问，通过put()方法增加元素，通过get()方法获取元素。

multiprocessing.JoinableQueue(maxsize=0) #建立可阻塞的队列实例，采用一般队列的方式访问，但可以通过XXX.join()阻塞队列（即队列元素未全部处理完前，进程阻塞）。

实际上，以上两种队列都可以通过XXX.join\\\_thread()阻塞。

multiprocessing.SimpleQueue() #还有一种简化的队列，其只具有empty、get、put3个方法。

```text
maxsize：表示队列允许的最多元素个数，缺省为0，表示不限数量。
```

通过采用一个进程put元素，另一个进程get元素并进行处理。

XXX.put(item, block=True, timeout=None) #向队列中增加元素item。XXX为队列。

```text
如果block为True，timeout为None，则将阻塞，直到有一个位置可以加入元素（只有size有限的队列才能阻塞）；如果timeout为非负数值（秒数），则最多阻塞这么长时间。
如果block为False，则直接加入元素，且在无空位可放入元素时直接报Full异常。
```

XXX.get(block=True, timeout=None) #从队列中取出一个元素（从队列中删除并返回该元素）。XXX为队列。

```text
如果block为True，timeout为None，则将阻塞，直到有一个元素可以返回；如果timeout为非负数值（秒数），则最多阻塞这么长时间。
如果block为False，则立即返回元素，且在无元素可返回时直接报Empty异常。
```

**（2）也可采用管道来实现通信，特别是需要双向通信的情形：**&#x20;

multiprocessing.Pipe(duplex=True) #建立一对管道对象，用于在两个进程之间传递数据（区别os.pipi()，可以双向传递数据）。返回一对管道对象(conn\_parent,conn\_ child)。

```text
如果duplex为True，则可以双向通信。如果duplex为False，则只能从conn_parent向conn_child单向通信。
```

管道对象主要用到一下几个方法：

XXX.send(data) #发送数据data。XXX为管道对象。注意，管道只能发送可pickle的数据（自定义类的实例不能pickle，其他一般可以，具体的需要单独文章再讲）。

XXX.recv() #读取管道中接收到的数据。XXX为管道对象。

XXX.poll() #判断管道对象是否有收到数据待读取，返回bool值，通常用来判断是否需要recv()。

```text
data = 323

(conn_parent, conn_child) = multiprocessing.Pipe()

conn_parent.send(data)

while conn_child.poll():
    conn_child.recv()
```

重点（我估计同学们还没有碰到过这种情形）：multiprocessing.Pipe()建立的**管道对象是有容量限制的，也即如果不及时recv数据，一直往管道中send数据，将造成进程死锁！！！**

**4、锁（同步原语）**

进程间数据共享时，经常涉及到数据安全的问题，比如多个子进程同时get队列的话，谁先谁后无法确定，而且部分子进程还可能获取数据失败。因此，多进程数据共享时，**如果进程活动对共享的数据存在影响，通常应当加锁，来对数据访问过程进行保护**。

锁的概念很好理解，一个进程要访问共享数据前，首先要获得锁，他获得锁后可以访问数据，期间其他进程无法访问数据。直到这个进程完成访问并释放锁之后，其他进程才可能获得锁进而访问数据。通过锁，可以确保共享数据的访问受控。

部分共享类型自带有锁（比如Array，Value等），但大部分共享数据类型本身不具备锁功能，这种情况下需要自行生成锁，并将锁作为参数传递给子进程，在锁的保护下访问共享数据。

multiprocessing具有多种锁类型，根据使用情况自行选择：

multiprocessing.Lock() #最简单的锁（非递归锁）

multiprocessing.RLock() #可复用的锁（递归锁）

multiprocessing.Semaphore(value=1) #计数器锁（信号量锁），value为初始计数

multiprocessing.BoundedSemaphore(value=1) #带上限的计数器锁（信号量锁），value即是初始计数，同时也是允许的计数上限

以上锁即可通过acquire/release方法获得/释放，也可采用with上下文方式来使用（with lock: …， 这样可以省去acquire/release语句）。

multiprocessing.Event() #事件锁，当事件触发时释放。其通过set/clear方法获得/释放。

multiprocessing.Condition(lock = None) #条件锁，当条件触发时释放。其通过wait\_for来条件阻塞，当条件满足时自动释放；也可用作类事件锁，通过wait阻塞，notify或notify\_ all释放。

multiprocessing.Barrier(parties, action=None, timeout=None) #障碍锁，等待进程数达到parties要求数目后释放，可用于进程同步。其通过wait阻塞，等待进程数达标后自动释放；也可通过abort强行释放。

也可通过manager创建锁，这种方式创建的锁，不仅可以本地共享，也可网络共享。

**5、其他重要函数**

multiprocessing.freeze\_support() #运行该语句后，将检查子进程是否为frozen executable中的fake forked process，如是，将运行命令行指定的代码并退出。**如果要将脚本打包为exe可执行文件，必须首先执行该语句**。

## **multiprocess模块**

据了解，**multiprocess模块采用dill来序列化并传递数据，避免了multiprocessing模块采用pickle的限制（亲测有效）**。

multiprocess模块的接口与multiprocessing基本相同；部分函数、方法的传参不完全一样，不过，但对于通常应用情景不会有差别。
