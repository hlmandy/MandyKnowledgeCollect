# DOW 拆成一天天的

输入：

[2022年冬春航班计划0927 - 副本.xlsx](2022年冬春航班计划0927%20-%20副本_1Oo_uFO__S.xlsx - 副本_1Oo_uFO__S.xlsx> "2022年冬春航班计划0927 - 副本.xlsx")

code：

[susan.ipynb](susan_LJs9Tp5o-v.ipynb "susan.ipynb")

输出：

[2022年冬春航班计划0927.csv](2022年冬春航班计划0927_t-AV5PE3g9.csv "2022年冬春航班计划0927.csv")

![image_83YQajqkIe.png](https://hl-pic.oss-cn-hangzhou.aliyuncs.com/img/image_83YQajqkIe.png)

先把每个leg手动拆开

```python
leg1 = df[['aircraft','aft_type','dow','sta1','sta2','leg1_dept','leg1_arrt','debug_col']].copy().rename(columns={'sta1':'dep_sta','sta2':'arr_sta','leg1_dept':'dept','leg1_arrt':'arrt'})
leg2 = df[['aircraft','aft_type','dow','sta2','sta3','leg2_dept','leg2_arrt','debug_col']].copy().rename(columns={'sta2':'dep_sta','sta3':'arr_sta','leg2_dept':'dept','leg2_arrt':'arrt'})
leg3 = df[['aircraft','aft_type','dow','sta3','sta4','leg3_dept','leg3_arrt','debug_col']].copy().rename(columns={'sta3':'dep_sta','sta4':'arr_sta','leg3_dept':'dept','leg3_arrt':'arrt'})
leg4 = df[['aircraft','aft_type','dow','sta4','sta5','leg4_dept','leg4_arrt','debug_col']].copy().rename(columns={'sta4':'dep_sta','sta5':'arr_sta','leg4_dept':'dept','leg4_arrt':'arrt'})
leg5 = df[['aircraft','aft_type','dow','sta5','sta6','leg5_dept','leg5_arrt','debug_col']].copy().rename(columns={'sta5':'dep_sta','sta6':'arr_sta','leg5_dept':'dept','leg5_arrt':'arrt'})
leg6 = df[['aircraft','aft_type','dow','sta6','sta7','leg6_dept','leg6_arrt','debug_col']].copy().rename(columns={'sta6':'dep_sta','sta7':'arr_sta','leg6_dept':'dept','leg6_arrt':'arrt'})
```

再处理每一个leg

```python
def process_single_leg(df):
    tmp = df[~df['dept'].isna()]
    tmp['arrt'] = tmp['arrt'].str[-8:]
    tmp['dept'] = tmp['dept'].str[-8:]
    ## --- 先把dow中间加上逗号分隔符
    tmp['dow2'] = tmp['dow'].apply(lambda x: ','.join([i  for i in x]))
    ## --- 然后用split()根据分隔符拆开并用stack()搞成竖的
    dow_df = pd.DataFrame(tmp['dow2'].str.split(',',expand=True).stack()).reset_index(level=1,drop=True).rename(columns={0:'dow_daily'})
    ## --- 然后和其他列merge
    tmp = pd.merge(tmp,dow_df,left_index=True,right_index=True)
    return tmp[['aircraft','dow_daily','dep_sta','arr_sta','dept','arrt','aft_type','debug_col']]
    
leg_list = [process_single_leg(leg) for leg in [leg1,leg2,leg3,leg4,leg5,leg6]]
tmp = pd.concat(leg_list)

```
