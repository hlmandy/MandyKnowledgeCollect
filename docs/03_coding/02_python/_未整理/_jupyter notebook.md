## 安装

命令行输入： pip install jupyter notebook

**确认安装成功：**

命令行输入：jupyter notebook

确认浏览器可以打开



## 查看所用jupyter notebook环境

```python
import sys 
sys.version
```

## 修改默认路径

第一步：找到配置文件

- cmd 输入命令 **jupyter notebook --generate-config**

- 根据上面运行处的路径打开

  jupyter_notebook_config.py文件

- 第二步：更改配置

  - 找到 **# c.NotebookApp.notebook_dir = ''**，去掉该行前面的“#”（注意：这行前面也不能有空格哦）；在打算存放文件的位置先新建一个文件夹（很重要，最好是英文的），然后将新的路径填在单引号中，保存配置文件

    如：c.NotebookApp.notebook_dir = 'D:'

  - 重新启动Jupyte Notebook即可

  - 如果不行，参考如下步骤：

    - 在开始菜单找到“Jupyte Notebook”快捷键，鼠标右击 -- 更多 -- 打开文件位置
    - 找到对应的“Jupyte Notebook”快捷图标，鼠标右击 -- 属性 -- 目标，去掉后面的 "%USERPROFILE%/"（很重要），然后点击“应用”，“确定”　　
    - 重新启动Jupyte Notebook即可



## 安装jupyter notebook插件

```cmd
pip install jupyter_contrib_nbextensions
jupyter contrib nbextension install --user
```

### 配置：





## 使用

### 不显示warning

```python
import warnings
warnings.filterwarnings("ignore")
```

