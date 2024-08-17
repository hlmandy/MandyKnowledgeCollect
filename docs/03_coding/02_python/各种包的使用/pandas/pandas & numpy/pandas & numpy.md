# pandas & numpy

## 目录

-   [pandas与numpy互转](#pandas与numpy互转)

# pandas与numpy互转

```python
# numpy转pandas
pd.DataFrame(columns=orig_col,data=nparray)

# pandas转numpy
np.array(dataframe)  # 这个比dataframe.values效率高

```
