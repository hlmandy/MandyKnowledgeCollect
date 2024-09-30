注：这是 cplex api，不是 docplex api

### 更改变量类型
```python
self._prob = cplex.Cplex()
## -- 语法
self._prob.variables.set_types({var_name}, {var_type})

## -- 举例，有一组x变量名存在 self._var_x_names 中
for x_name in self._var_x_names:
    self._prob.variables.set_types(x_name, "B")
```