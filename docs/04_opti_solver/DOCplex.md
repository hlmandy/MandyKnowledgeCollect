# DOCplex

官方文档：

[docplex.mp reference manual — DOcplex.MP: Mathematical Programming Modeling for Python V2.23 documentation (rawgit.com)](https://rawgit.com/IBMDecisionOptimization/docplex-doc/master/docs/mp/refman.html "docplex.mp reference manual — DOcplex.MP: Mathematical Programming Modeling for Python V2.23 documentation (rawgit.com)")


## 常用语句
### 初始化

### min/max

### var

### constraints

### print


## 示例：

```python
# 导入docplex
from docplex.mp.model import Model
# 创建模型对象
cplex_obj = Model()
# 添加变量
x = cplex_obj.continuous_var(name='x')
y = cplex_obj.continuous_var(name='y')
# 添加约束
cplex_obj.add_constraint(3*x + y <= 10)
cplex_obj.add_constraint(x + 2*y <= 12)
# 添加目标函数
cplex_obj.maximize(2*x + 3*y)
# 求解优化问题
solution = cplex_obj.solve()
# 获取结果
if solution:
    print(f"最优值为：{cplex_obj.objective_value:.2f}")
    print(f"x的取值为：{x.solution_value:.2f}")
    print(f"y的取值为：{y.solution_value:.2f}")
else:
    print("求解失败")
```

