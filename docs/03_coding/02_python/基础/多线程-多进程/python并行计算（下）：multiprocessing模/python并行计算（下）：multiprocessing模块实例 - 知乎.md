# python并行计算（下）：multiprocessing模块实例 - 知乎

## 目录

-   [1、实例（multiprocessing模块）](#1实例multiprocessing模块)
    -   [（1）multiprocessing.Process()：](#1multiprocessingProcess)
    -   [（2）multiprocessing.Pool()，apply方法：](#2multiprocessingPoolapply方法)
    -   [（3）multiprocessing.Pool()，apply\_async方法：](#3multiprocessingPoolapply_async方法)
    -   [（4）multiprocessing.Pool()，map方法：](#4multiprocessingPoolmap方法)
    -   [（5）multiprocessing.Pool()，map\_async方法：](#5multiprocessingPoolmap_async方法)

[python并行计算（上）：multiprocessing、multiprocess模块 - 知乎](python并行计算（上）：multiprocessing、multiprocess模块%20-%20知乎.md - 知乎.md> "python并行计算（上）：multiprocessing、multiprocess模块 - 知乎")

[python并行计算（下）：multiprocessing模块实例 - 知乎](https://zhuanlan.zhihu.com/p/46718327 "python并行计算（下）：multiprocessing模块实例 - 知乎")&#x20;

由于python相当易学易用，现在python也较多地用于有大量的计算需求的任务。本文介绍几个并行模块，以及实现程序并行的入门技术。本文比较枯燥，主要是为后面上工程实例做铺垫。**本文为multiprocessing模块实例**。

本文所有实例均以阶乘计算为例。采用计算机为4核。

## **1、实例（multiprocessing模块）**

### （1）multiprocessing.Process()：

```python
import multiprocessing
import time

def f(x, conn, t0):
    ans = 1
    x0 = x
    t = time.time() - t0
    conn.send('factorial of %d: start@%.2fs' % (x0, t))
    while x > 1:
        ans *= x
        time.sleep(0.5)
        x -= 1
    t = time.time() - t0
    conn.send('factorial of %d: finish@%.2fs, res = %d' %(x0, t, ans))
    return ans

def main():
    res = []
    var = (4, 8, 12, 20, 16)
    p_conn, c_conn = multiprocessing.Pipe()
    t0 = time.time()
    for i in var:
        p = multiprocessing.Process(target = f, args = (i, c_conn, t0))
        res.append(p)
        p.start()
    for p in res:
        p.join()

    print('output:')
    while p_conn.poll():
        print(p_conn.recv())
    t = time.time() - t0
    print('factorial of %s@%.2fs: %s' % (var, t, res))

if __name__ == '__main__':
    main()
```

结果：可以看出，同一批次所有子进程几乎同时开启。子进程任务返回值无法直接返回。

```text
output:
factorial of 8: start@1.24s
factorial of 4: start@1.26s
factorial of 12: start@1.35s
factorial of 20: start@1.36s
factorial of 16: start@1.41s
factorial of 4: finish@2.76s, res = 24
factorial of 8: finish@4.75s, res = 40320
factorial of 12: finish@6.85s, res = 479001600
factorial of 16: finish@8.91s, res = 20922789888000
factorial of 20: finish@10.86s, res = 2432902008176640000
factorial of (4, 8, 12, 20, 16)@10.99s: [<Process(Process-1, stopped[1])>, <Process(Process-2, stopped[1])>, <Process(Process-3, stopped[1])>, <Process(Process-4, stopped[1])>, <Process(Process-5, stopped[1])>]
```

### （2）multiprocessing.Pool()，apply方法：

```python3
import multiprocessing
import time

def f(x, conn, t0):
    ans = 1
    x0 = x
    t = time.time() - t0
    conn.send('factorial of %d: start@%.2fs' % (x0, t))
    while x > 1:
        ans *= x
        time.sleep(0.5)
        x -= 1
    t = time.time() - t0
    conn.send('factorial of %d: finish@%.2fs, res = %d' %(x0, t, ans))
    return ans

def main():
    res = []
    var = (4, 8, 12, 20, 16)
    p = multiprocessing.Pool()
    p_conn, c_conn = multiprocessing.Pipe()
    params = []
    t0 = time.time()
    for i in var:
        res.append(p.apply(f, (i, c_conn, t0)))
    p.close()
    p.join()

    print('output:')
    while p_conn.poll():
        print(p_conn.recv())
    t = time.time() - t0
    print('factorial of %s@%.2fs: %s' % (var, t, res))

if __name__ == '__main__':
    main()

```

结果：可以看出，所有子进程都是逐个执行的。

```text
output:
factorial of 4: start@1.29s
factorial of 4: finish@2.79s, res = 24
factorial of 8: start@2.79s
factorial of 8: finish@6.29s, res = 40320
factorial of 12: start@6.30s
factorial of 12: finish@11.80s, res = 479001600
factorial of 20: start@11.80s
factorial of 20: finish@21.30s, res = 2432902008176640000
factorial of 16: start@21.30s
factorial of 16: finish@28.81s, res = 20922789888000
factorial of (4, 8, 12, 20, 16)@29.01s: [24, 40320, 479001600, 2432902008176640000, 20922789888000]
```

### （3）multiprocessing.Pool()，apply\_async方法：

```python3
import multiprocessing
import time

def f(x, conn, t0):
    ans = 1
    x0 = x
    t = time.time() - t0
    conn.send('factorial of %d: start@%.2fs' % (x0, t))
    while x > 1:
        ans *= x
        time.sleep(0.5)
        x -= 1
    t = time.time() - t0
    conn.send('factorial of %d: finish@%.2fs, res = %d' %(x0, t, ans))
    return ans

def main():
    res = []
    var = (4, 8, 12, 20, 16)
    p = multiprocessing.Pool()
    p_conn, c_conn = multiprocessing.Pipe()
    params = []
    t0 = time.time()
    for i in var:
        res.append(p.apply_async(f, (i, c_conn, t0)).get())
    p.close()
    p.join()

    print('output:')
    while p_conn.poll():
        print(p_conn.recv())
    for i in range(len(res)):
        res[i] = res[i].get()
    t = time.time() - t0
    print('factorial of %s@%.2fs: %s' % (var, t, res))

if __name__ == '__main__':
    main()
```

结果：可以看出，第一批次4个子进程几乎同时开启；当一个子进程结束后，马上开启第5个子进程。

```text
output:
factorial of 4: start@0.86s
factorial of 8: start@0.92s
factorial of 12: start@0.97s
factorial of 20: start@0.99s
factorial of 4: finish@2.37s, res = 24
factorial of 16: start@2.37s
factorial of 8: finish@4.43s, res = 40320
factorial of 12: finish@6.47s, res = 479001600
factorial of 16: finish@9.87s, res = 20922789888000
factorial of 20: finish@10.49s, res = 2432902008176640000
factorial of (4, 8, 12, 20, 16)@10.71s: [24, 40320, 479001600, 2432902008176640000, 20922789888000]
```

### （4）multiprocessing.Pool()，map方法：

**如果子进程有返回值，且返回值需要集中处理，则建议采用map方式**

注意，**multiprocessing进程池的map方法对应的任务只允许一个参数**。本文函数f的多个参数可以打包为一个参数，从而也可使用map方法。

[file:///C:/Users/mandy/hl\_Documents/scairline\_maintain\_susan/SaleForecast/data\_storage/mysql\_storage.py](file:///C:/Users/mandy/hl_Documents/scairline_maintain_susan/SaleForecast/data_storage/mysql_storage.py "file:///C:/Users/mandy/hl_Documents/scairline_maintain_susan/SaleForecast/data_storage/mysql_storage.py")

```python
import multiprocessing
import time

def f(args):
    (x, conn, t0) = args #参数打包为args
    ans = 1
    x0 = x
    t = time.time() - t0
    conn.send('factorial of %d: start@%.2fs' % (x0, t))
    while x > 1:
        ans *= x
        time.sleep(0.5)
        x -= 1
    t = time.time() - t0
    conn.send('factorial of %d: finish@%.2fs, res = %d' %(x0, t, ans))
    return ans

def main():
    var = (4, 8, 12, 20, 16)
    p = multiprocessing.Pool()
    p_conn, c_conn = multiprocessing.Pipe()
    params = []
    t0 = time.time()
    for i in var:
        params.append((i, c_conn, t0))
    res = p.map(f, params)
    p.close()
    p.join()

    print('output:')
    while p_conn.poll():
        print(p_conn.recv())
    t = time.time() - t0
    print('factorial of %s@%.2fs: %s' % (var, t, res))

if __name__ == '__main__':
    main()
```

结果：可以看出，第一批次4个子进程几乎同时开启；当一个子进程结束后，马上开启第5个子进程。

```text
output:ython 3
factorial of 4: start@0.85s
factorial of 8: start@0.85s
factorial of 12: start@0.87s
factorial of 20: start@0.90s
factorial of 4: finish@2.35s, res = 24
factorial of 16: start@2.35s
factorial of 8: finish@4.36s, res = 40320
factorial of 12: finish@6.37s, res = 479001600
factorial of 16: finish@9.86s, res = 20922789888000
factorial of 20: finish@10.41s, res = 2432902008176640000
factorial of (4, 8, 12, 20, 16)@10.54s: [24, 40320, 479001600, 2432902008176640000, 20922789888000]
```

### （5）multiprocessing.Pool()，map\_async方法：

```python3
import multiprocessing
import time

def f(args):
    (x, conn, t0) = args
    ans = 1
    x0 = x
    t = time.time() - t0
    conn.send('factorial of %d: start@%.2fs' % (x0, t))
    while x > 1:
        ans *= x
        time.sleep(0.5)
        x -= 1
    t = time.time() - t0
    conn.send('factorial of %d: finish@%.2fs, res = %d' %(x0, t, ans))
    return ans

def main():
    var = (4, 8, 12, 20, 16)
    p = multiprocessing.Pool()
    p_conn, c_conn = multiprocessing.Pipe()
    params = []
    t0 = time.time()
    for i in var:
        params.append((i, c_conn, t0))
    res = p.map_async(f, params).get()
    p.close()
    p.join()

    print('output:')
    while p_conn.poll():
        print(p_conn.recv())
    t = time.time() - t0
    print('factorial of %s@%.2fs: %s' % (var, t, res))

if __name__ == '__main__':
    main()
```

结果：可以看出，第一批次4个子进程几乎同时开启；当一个子进程结束后，马上开启第5个子进程。

```text
output:
factorial of 4: start@0.82s
factorial of 8: start@0.85s
factorial of 12: start@0.87s
factorial of 20: start@0.87s
factorial of 4: finish@2.32s, res = 24
factorial of 16: start@2.32s
factorial of 8: finish@4.35s, res = 40320
factorial of 12: finish@6.37s, res = 479001600
factorial of 16: finish@9.82s, res = 20922789888000
factorial of 20: finish@10.37s, res = 2432902008176640000
factorial of (4, 8, 12, 20, 16)@10.63s: [24, 40320, 479001600, 2432902008176640000, 20922789888000]
```

（6）multiprocessing.Pool()，imap方法：

```python3
import multiprocessing
import time

def f(args):
    (x, conn, t0) = args
    ans = 1
    x0 = x
    t = time.time() - t0
    conn.send('factorial of %d: start@%.2fs' % (x0, t))
    while x > 1:
        ans *= x
        time.sleep(0.5)
        x -= 1
    t = time.time() - t0
    conn.send('factorial of %d: finish@%.2fs, res = %d' %(x0, t, ans))
    return ans

def main():
    var = (4, 8, 12, 20, 16)
    p = multiprocessing.Pool()
    p_conn, c_conn = multiprocessing.Pipe()
    params = []
    t0 = time.time()
    for i in var:
        params.append((i, c_conn, t0))
    res = list(p.imap(f, params))
    p.close()
    p.join()

    print('output:')
    while p_conn.poll():
        print(p_conn.recv())
    t = time.time() - t0
    print('factorial of %s@%.2fs: %s' % (var, t, res))

if __name__ == '__main__':
    main()
```

结果：可以看出，第一批次4个子进程几乎同时开启；当一个子进程结束后，马上开启第5个子进程。

```text
output:
factorial of 4: start@0.82s
factorial of 8: start@0.83s
factorial of 12: start@0.89s
factorial of 20: start@0.91s
factorial of 4: finish@2.32s, res = 24
factorial of 16: start@2.32s
factorial of 8: finish@4.33s, res = 40320
factorial of 12: finish@6.39s, res = 479001600
factorial of 16: finish@9.83s, res = 20922789888000
factorial of 20: finish@10.41s, res = 2432902008176640000
factorial of (4, 8, 12, 20, 16)@10.69s: [24, 40320, 479001600, 2432902008176640000, 20922789888000]
```

（7）multiprocessing.Pool()，imap\\\_unordered方法：

```python3
import multiprocessing
import time

def f(args):
    (x, conn, t0) = args
    ans = 1
    x0 = x
    t = time.time() - t0
    conn.send('factorial of %d: start@%.2fs' % (x0, t))
    while x > 1:
        ans *= x
        time.sleep(0.5)
        x -= 1
    t = time.time() - t0
    conn.send('factorial of %d: finish@%.2fs, res = %d' %(x0, t, ans))
    return ans

def main():
    var = (4, 8, 12, 20, 16)
    p = multiprocessing.Pool()
    p_conn, c_conn = multiprocessing.Pipe()
    params = []
    t0 = time.time()
    for i in var:
        params.append((i, c_conn, t0))
    res = list(p.imap_unordered(f, params))
    p.close()
    p.join()

    print('output:')
    while p_conn.poll():
        print(p_conn.recv())
    t = time.time() - t0
    print('factorial of %s@%.2fs: %s' % (var, t, res))

if __name__ == '__main__':
    main()
```

结果：可以看出，第一批次4个子进程几乎同时开启；当一个子进程结束后，马上开启第5个子进程。而且，返回结果中，20和16的返回顺序颠倒了，是按照任务完成的时间排序，而不是任务添加的时间排序（即返回是无序的）。

```text
output:
factorial of 4: start@0.82s
factorial of 8: start@0.84s
factorial of 12: start@0.89s
factorial of 20: start@0.95s
factorial of 4: finish@2.32s, res = 24
factorial of 16: start@2.32s
factorial of 8: finish@4.34s, res = 40320
factorial of 12: finish@6.39s, res = 479001600
factorial of 16: finish@9.83s, res = 20922789888000
factorial of 20: finish@10.45s, res = 2432902008176640000
factorial of (4, 8, 12, 20, 16)@10.73s: [24, 40320, 479001600, 20922789888000, 2432902008176640000]
```

（8）multiprocessing.Pool()，starmap方法：

```python3
import multiprocessing
import time

def f(x, conn, t0):
    ans = 1
    x0 = x
    t = time.time() - t0
    conn.send('factorial of %d: start@%.2fs' % (x0, t))
    while x > 1:
        ans *= x
        time.sleep(0.5)
        x -= 1
    t = time.time() - t0
    conn.send('factorial of %d: finish@%.2fs, res = %d' %(x0, t, ans))
    return ans

def main():
    var = (4, 8, 12, 20, 16)
    p = multiprocessing.Pool()
    p_conn, c_conn = multiprocessing.Pipe()
    params = []
    t0 = time.time()
    for i in var:
        params.append((i, c_conn, t0))
    res = p.starmap(f, params)
    p.close()
    p.join()

    print('output:')
    while p_conn.poll():
        print(p_conn.recv())
    t = time.time() - t0
    print('factorial of %s@%.2fs: %s' % (var, t, res))

if __name__ == '__main__':
    main()
```

结果：可以看出，第一批次4个子进程几乎同时开启；当一个子进程结束后，马上开启第5个子进程。

```text
output:
factorial of 4: start@0.75s
factorial of 8: start@0.81s
factorial of 12: start@0.83s
factorial of 20: start@0.84s
factorial of 4: finish@2.25s, res = 24
factorial of 16: start@2.25s
factorial of 8: finish@4.31s, res = 40320
factorial of 12: finish@6.33s, res = 479001600
factorial of 16: finish@9.76s, res = 20922789888000
factorial of 20: finish@10.36s, res = 2432902008176640000
factorial of (4, 8, 12, 20, 16)@10.54s: [24, 40320, 479001600, 2432902008176640000, 20922789888000]
```

（9）multiprocessing.Pool()，starmap\\\_async方法：

```python3
import multiprocessing
import time

def f(x, conn, t0):
    ans = 1
    x0 = x
    t = time.time() - t0
    conn.send('factorial of %d: start@%.2fs' % (x0, t))
    while x > 1:
        ans *= x
        time.sleep(0.5)
        x -= 1
    t = time.time() - t0
    conn.send('factorial of %d: finish@%.2fs, res = %d' %(x0, t, ans))
    return ans

def main():
    var = (4, 8, 12, 20, 16)
    p = multiprocessing.Pool()
    p_conn, c_conn = multiprocessing.Pipe()
    params = []
    t0 = time.time()
    for i in var:
        params.append((i, c_conn, t0))
    res = p.starmap_async(f, params).get()
    p.close()
    p.join()

    print('output:')
    while p_conn.poll():
        print(p_conn.recv())
    t = time.time() - t0
    print('factorial of %s@%.2fs: %s' % (var, t, res))

if __name__ == '__main__':
    main()
```

结果：可以看出，第一批次4个子进程几乎同时开启；当一个子进程结束后，马上开启第5个子进程。

```text
output:
factorial of 4: start@0.90s
factorial of 8: start@0.90s
factorial of 12: start@0.92s
factorial of 20: start@0.92s
factorial of 4: finish@2.40s, res = 24
factorial of 16: start@2.40s
factorial of 8: finish@4.41s, res = 40320
factorial of 12: finish@6.43s, res = 479001600
factorial of 16: finish@9.90s, res = 20922789888000
factorial of 20: finish@10.42s, res = 2432902008176640000
factorial of (4, 8, 12, 20, 16)@10.64s: [24, 40320, 479001600, 2432902008176640000, 20922789888000]
```
