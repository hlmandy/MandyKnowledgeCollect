# sqlalchemy

sqlalchemy + pandas 读取 mysql

网上的教程目前（20230904）都是针对2.0之前的版本。

```bash
pip install --user --upgrade "sqlalchemy<2.0"

```

代码举例：从mysql，分别读取3天的航班数据

```python
import sqlalchemy
import pandas as pd
from sqlalchemy import create_engine, text
from sqlalchemy import create_engine,Table,Column,MetaData,ForeignKey

engine = sqlalchemy.create_engine('mysql+pymysql://root:314314@localhost:3306/airline?charset=utf8')

date_list = ['2023-08-18','2023-08-19','2023-08-20']
for date in date_list:
    finaldcp_sql = text('select * from airline.ho2023finaldcp where flight_date = :date')
    df = pd.read_sql(finaldcp_sql,engine,params={'date':date})
    df.to_csv('./raw_data/finaldcp_'+date+'.csv',index=False)

```
