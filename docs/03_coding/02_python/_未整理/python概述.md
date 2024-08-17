## 导出成exe

Pip安装pyinstaller工具

```python
pip install pyinstaller
```

生成本项目可执行文件--------Terminal中输入：

```python
pyinstaller -F -w main.py
```

生成可执行文件+icon

```
pyinstaller -F -w --icon=myICO.ico main.py
```

### 使用 QT 增加icon

图片转ico的网站： http://www.zuohaotu.com/image-to-ico.aspx

**在开发中使用图标**

```python
from PyQt5.QtGui import QIcon
self.setWindowIcon(QIcon('images/doge1.ico'))
```

此时，我们只要在主函数模块的同级目录下有images文件夹，且里面包含doge1.ico图标，我们运行主函数测试时就能正常显示图标。但是这样做在打包后生成的.exe程序执行时并不能显示图标。

**打包时图标处理**

1.在主函数模块同级目录下创建resources_rc.qrc文件，内容如下

```python
<!DOCTYPE RCC>
<RCC version="1.0">
<qresource prefix="/">
    <file>images/doge1.ico</file>
	<file>images/doge2.ico</file>
</qresource>
</RCC>
```

2.将resources_rc.qrc转为.py文件pyrcc5 -o resources_rc.py resources_rc.qrc

3.引用.py中生成的图标

```python
import resources_rc
# 可以运行测试，如果显示图标，则调用成功
self.setWindowIcon(QIcon(':/images/doge1.ico'))
```

4.打包，带上图标物理地址#run.py为主函数地址

```
pyinstaller.exe -F -w -i images\doge2.ico main.py
```



## dict

dict合并

```python
dict(d1, **d2)
```

## sort

