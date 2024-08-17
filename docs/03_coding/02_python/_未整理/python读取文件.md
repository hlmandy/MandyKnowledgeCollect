## 读取文本文件

[python 文件读写操作](https://www.cnblogs.com/zyber/p/9578240.html)

```python
sql_file = open('./燃油数据/read_fuel_data.sql', 'r')
sql = sql_file.read()
sql_file.close()
```



读取json

```python
# 读取json文件内容,返回字典格式
with open('./source_file/info.json','r',encoding='utf8')as fp:
    json_data = json.load(fp)
    print('这是文件中的json数据：',json_data)
    print('这是读取到文件数据的数据类型：', type(json_data))
```

