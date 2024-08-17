

```c++
//tm 转 time_t
struct tm timeinfo;
timeinfo.tm_year = year - 1900;
timeinfo.tm_mon = month - 1;
timeinfo.tm_mday = day;
timeinfo.tm_hour = 0;
timeinfo.tm_min = 0;
timeinfo.tm_sec = 0;
time_t date = mktime(&timeinfo);

//time_t 转 tm
struct tm deptt;
time_t t;
localtime_s(&deptt, &t);
```

