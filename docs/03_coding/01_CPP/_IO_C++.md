![preview](https://pic3.zhimg.com/v2-171bc688e76e17745ba5c19546e1efc6_r.jpg)

```c++
string fname =  "a.txt";
string buf;
fstream fp(fname );
while (!fp1.eof() && fp1.peek() != EOF){
    getline(fp1, buf);// read one line
}
fp.close();
```



方法1：使用strtok函数

strtok会在分割的位置添加一个\0，返回每一个分割部分的头指针。所以它返回的是buf上的地址，当buf失效了，它返回的指针也失效了。其次，因为它需要改变原字符串，所以buf不能传入const char*类型

```C++
const char* d=" *"; //token 分隔符，支持多个分隔符，如这里空格和*
char* p=strtok(buf,d);
while(p){
    cout<<p<<" ";
    p=strtok(NULL,d);//循环过程要把buf赋为NULL
    }
```

使用strtok_s分割字符串
由于strtok()函数是线程不安全的，因此C语言对其进行了改进，改进后的函数命名为strtok_s()。

strtok_s()函数的原型如下：

char *__cdecl strtok_s(char *_String, const char *_Delimiter, char **_Context)



```c++

#include <stdlib.h>
#include <stdio.h>
#include <string.h>
 
int main()
{
	char string[] = "A string\tof ,,tokens\nand some  more tokens";
	char seps[] = " ,\t\n";
	char *token = NULL;
	printf("Tokens:\n");
	char* ptr = NULL;
	token = strtok_s(string, seps, &ptr);//相较于strtok()函数，strtok_s函数需要用户传入一个指针，用于函数内部判断从哪里开始处理字符串
	while (token != NULL) {
		printf("%s\n", token);
		token = strtok_s(NULL, seps, &ptr);//同strtok(), 第一个参数传入NULL，使用之前保存的SAVE_PTR定位下一个待处理的字符的位置
	}
	return 0;
}
```



https://blog.csdn.net/jay_zzs/article/details/106883832