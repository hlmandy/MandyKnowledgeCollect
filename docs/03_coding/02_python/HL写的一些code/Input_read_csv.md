### define class:
``` python
class Task():
    count_id = 0 
    def __init__(self, **kwargs):
        self._id = Task.count_id
        Task.count_id += 1
        self._name = kwargs.get('name')
        self._start_time = kwargs.get('start_time')
        self._end_time = kwargs.get('end_time')
        self._duration = self._end_time - self._start_time
```

### read csv:
```python
import pandas as pd

task_list = []  # 所有task
task_df = pd.read_csv(task_file)
task_df_list = task_df.to_dict(orient='records')
for task_dict in task_df_list:
	task = Task(**task_dict)
	task_list.append(task)
```
