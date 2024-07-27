## Cplex Solve 代码示例

### Solve LP

```c++
void OMModel::solveLP()
{
  _solver = IloCplex(_model);

  string name = OMUtil::OUTPUTPATH + string("model_") + OMUtil::scenario+ string(".lp");
  cout << "output:" << name << endl;
  _solver.exportModel(name.c_str());

  _solver.solve();

  _solver.out() << "Solution status:" << _solver.getStatus() << endl;
  if (_solver.getStatus() == IloCplex::Infeasible)
  {
    exit(0);
  }
  _solver.out() << "Optimal value:" << _solver.getObjValue() << endl;
}
```

### Solve IP

```c++
void OMModel::solveIP()
{
  _solver = IloCplex(_model);

  _model.add(IloConversion(_env, _x_var, ILOINT));
  
  string name = OMUtil::OUTPUTPATH + string("model_") + OMUtil::scenario+ string(".lp");
  cout << "output:" << name << endl;
  _solver.exportModel(name.c_str());

  _solver.solve();

  _solver.out() << "Solution status:" << _solver.getStatus() << endl;
  if (_solver.getStatus() == IloCplex::Infeasible)
  {
    exit(0);
  }
  _solver.out() << "Optimal value:" << _solver.getObjValue() << endl;
}
```

### 输出.sol

```c++
if (OMUtil::isExportModel)
  {
    string solName = OMUtil::scn_PATH_OUTPUT + "solveIP" + to_string(_countIter) + ".sol";
    cout << "write model sol name is " << solName << endl;
    _solver.writeSolution(solName.c_str());
  }
```



## Cplex 参数设置

### 设置solver参数

```c++
_solver.setParam(IloCplex::EpGap, 0.005);
_solver.setParam(IloCplex::TiLim, 18000);
_solver.setParam(IloCplex::Cliques, -1);
_solver.setParam(IloCplex::Covers, -1);
_solver.setParam(IloCplex::DisjCuts, -1);
_solver.setParam(IloCplex::FlowCovers, -1);
_solver.setParam(IloCplex::FlowPaths, -1);
_solver.setParam(IloCplex::FracCuts, -1);
_solver.setParam(IloCplex::GUBCovers, -1);
_solver.setParam(IloCplex::ImplBd, -1);
_solver.setParam(IloCplex::LiftProjCuts, -1);
_solver.setParam(IloCplex::MIRCuts, -1);
_solver.setParam(IloCplex::ZeroHalfCuts, -1);
_solver.setParam(IloCplex::MCFCuts, -1);

```

### 更改变量类型（LP->IP）

```c++
_model.add(IloConversion(_env, var_x,ILOINT));
```

### 输出模型信息

```c++
cout << "Soln Lp Obj\t:" << _solver.getObjValue() << endl;
cout << "Total Non Zero Coefs\t:" << _solver.getNNZs() << endl;
cout << "Total Binary Zero Vars\t:" << _solver.getNbinVars() << endl;
cout << "Total Integer Vars\t:" << _solver.getNintVars() << endl;
cout << "Total Vars\t\t:" << _solver.getNcols() << endl;
cout << "Total Cons\t\t:" << _solver.getNrows() << endl;
  
// TODO： num of continuous vars
  
// export .lp
_solver.exportModel(name.c_str());
```

### 修改模型参数
[https://www.ibm.com/docs/en/icos/12.8.0.0?topic=sm-setlinearcoef-method-irange-inumvar-double-2](https://www.ibm.com/docs/en/icos/12.8.0.0?topic=sm-setlinearcoef-method-irange-inumvar-double-2)

```c++
// 修改A matrix系数
con.setLinearCoef(var, val);//IloRange::setLinearCoef(for maxtrix);

// 修改目标函数中系数
_obj.setLinearCoef(var, new_coeff);   // --- 确认是对的！！！20230726
```
