## catch exception

```c++
try
 {
  _env = new GRBEnv();
  _model = new GRBModel(*_env);
  _model->set(GRB_StringAttr_ModelName, "model ");
 }
 catch (GRBException e)
 {
  cout << e.getMessage() << " " << e.getErrorCode() << endl;
 }
```

看到错误码之后可以去手册里再找。

