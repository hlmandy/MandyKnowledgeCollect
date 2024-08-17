有两种方式：

## 方式一：sklearn的接口

- 调包

```python
from xgboost.sklearn import XGBClassifier,XGBRegressor

# 训练集直接训练模型
tree_reg = XGBRegressor()
tree_reg.fit(X, y)
```

- 保存模型：

```python
import joblib
#保存Model(注:路径文件夹要预先建立，否则会报错)
joblib.dump(tree_reg, 'fuel_xgb.pkl')
```

- 读取模型：

```python
tree_reg2 = joblib.load('fuel_xgb.pkl')
tree_reg2.predict(X)
```

