[TOC]

参考[快速掌握PyQt5](https://www.zhihu.com/column/pyqt5)

## layout









## 组件

### buttom

```python
def add_clear_input_btn(self,layout):
    # 添加提交按钮和单击事件
    self.clear_input_btn = QPushButton('给老子清空！', self)
    layout.addWidget(self.clear_input_btn)
    # 设置按钮的位置，x坐标,y坐标
    # self.compute_btn.move(60, self._height-60)
    # 为按钮添加单击事件
    self.clear_input_btn.clicked.connect(self.clear_input)
```



### 大文本框

```python
def add_input(self,layout):
    """ 待翻译文字 """
    self.input_Editer = QTextEdit()
    layout.addWidget(self.input_Editer)
    self.input_Editer.setPlainText('Hello 你来啦！')
    
def get_input(self):
    a = self.input_Editer.toPlainText()
```



## 图片相关



```
# get QPixmap from QLabel
pixmap = self.label.pixmap()

# convert QPixmap to bytes
ba = QtCore.QByteArray()
buff = QtCore.QBuffer(ba)
buff.open(QtCore.QIODevice.WriteOnly) 
ok = pixmap.save(buff, "PNG")
assert ok
pixmap_bytes = ba.data()
print(type(pixmap_bytes))

# convert bytes to QPixmap
ba = QtCore.QByteArray(pixmap_bytes)
pixmap = QtGui.QPixmap()
ok = pixmap.loadFromData(ba, "PNG")
assert ok
print(type(pixmap))

self.label.setPixmap(pixmap)
```

