## dbv数据库连接配置

![](_assets/image-20211029095450750.png)

注意：要用jdbc配置，不然时区会变成美国时间，差13个小时



## 建表

```mysql
CREATE TABLE scal_susan.sales_test
(
  FLIGHT_DATE TIMESTAMP
, FLTNO VARCHAR(15)
, DEP VARCHAR(3)
, ARR VARCHAR(3)
, DEPTIME VARCHAR(15)
, ...
,primary key ( FLIGHT_DATE, FLTNO, DEP, ARR)
)
partition by key (FLIGHT_DATE)
```







## 建视图view

```sql
create or replace view scal_maintenance.hl_fuel_data_v as
select  XXX
```



## select建表

```sql
create table scal_maintenance.hl_fuel_data
select * from scal_maintenance.hl_fuel_data_v;

```



## 主键

### 加主键

```sql
alter table scal_maintenance.hl_fuel_data
add primary key (flt_id);
```



## 时间

### 时间相减

```sql
 (UNIX_TIMESTAMP(time2) - UNIX_TIMESTAMP(time1))  as second
```

## 四舍五入



```mysql
ROUND(3.45,1)  //得到3.5
```

## 字符串



```mysql
# 字符串拼接
select concat('1','2','3') from test 
```

