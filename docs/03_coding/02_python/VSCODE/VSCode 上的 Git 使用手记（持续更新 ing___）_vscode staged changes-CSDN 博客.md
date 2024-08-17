---
url: https://blog.csdn.net/PolarisRisingWar/article/details/116128331
title: VSCode 上的 Git 使用手记（持续更新 ing___）_vscode staged changes-CSDN 博客
date: 2024-04-02 10:28:23
tag: 
banner: "https://images.unsplash.com/photo-1709668158987-fa2714cd89e6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0Njc1ODd8MHwxfHJhbmRvbXx8fHx8fHwxfHwxNzEyMDI0OTA3fA&ixlib=rb-4.0.3&q=85&fit=crop&w=1079&max-h=540"
banner_icon: 🔖
---
[诸神缄默不语 - 个人 CSDN 博文目录](https://blog.csdn.net/PolarisRisingWar/article/details/116396744)

本笔记是我想要学习如何将本地文件发布到 GitHub 上时开始看[廖雪峰](https://so.csdn.net/so/search?q=%E5%BB%96%E9%9B%AA%E5%B3%B0&spm=1001.2101.3001.7020)的 Git 教程，然后打开了 VSCode，发现 VSCode 上面集成的 Git 辅助使用功能真的很好用……  
基本上到了不用看教程都可以猜懂的地步。  
为了整理、规范使用技巧，在经过了一番学习和试验之后，觉得以这样一篇使用手记的形式发布使用技巧相关的博文，以记录和沉淀经验，并帮助更多 Git 和 VSCode 初学者少踩坑。  
本文参考的教程、文档等内容见本文末尾。

VSCode 和 GitHub 都是微软一家的，所以用 VSCode 上传 GitHub 只要登录账号就可以，不用 token 认证。

Git 官网：[https://git-scm.com/](https://git-scm.com/)

正文：

1.  注意：VSCode 要求本机上已经下载了 Git，而且版本必须新于 2.0.0（我下载的是 2.31.1）  
    Windows 版本可以通过官网[这个网址](https://git-scm.com/downloads)下载最新版。除了路径我几乎都选的默认选项。
    
2.  打开 VSCode 中版本控制界面 Source Control view 的位置：点最左边这个图标（或者使用快捷键 Ctrl+Shift+G）  
    
    ![](https://img-blog.csdnimg.cn/20210425144551925.png#pic_center)
    
      
      
    
3.  在 commit 的时候，如果 Git 配置中没有设置好 username 和 email 的话，会使用本地机器上的信息，详细解释见 [Git 官方文档对这部分的解释](https://git-scm.com/docs/git-commit#_commit_information)（具体细节我还没有研究）。这个的解决方式就是在 Git Bash 中提前进行设置：  
    `git config --global user.name "您的用户名"`  
    `git config --global user.email "您的邮箱"`
    
4.  如果当前文件夹还没有初始化 git，可以在 Git Bash 中使用`git init`，也可以直接在 Source Control view 点击这个按钮：
    
    ![](https://img-blog.csdnimg.cn/202104251513229.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1BvbGFyaXNSaXNpbmdXYXI=,size_16,color_FFFFFF,t_70#pic_center)
    
      
    此外，如果只是单纯想将项目发布到 GitHub 上，也可以尝试点击这个按钮：（我还没有尝试过，但是看官方提供的视频感觉也很容易，就傻瓜操作。有条件的读者可以看下 [Source Control Tip 3: Publishing Repos](https://www.youtube.com/watch?v=3BBvBwDW4CY)）  
    
    ![](https://img-blog.csdnimg.cn/20210425151413983.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1BvbGFyaXNSaXNpbmdXYXI=,size_16,color_FFFFFF,t_70#pic_center)
    
5.  VSCode 中，当前工作文件夹下子文件夹作为 Git 工作区是可以的，Git 工作区之外的文件都不受影响。
    
6.  Source Control Repositories 这个可以勾上  
    
    ![](https://img-blog.csdnimg.cn/20210425144756696.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1BvbGFyaXNSaXNpbmdXYXI=,size_16,color_FFFFFF,t_70)
    
7.  在当前文件夹下做的修改都会体现在 Source Control view 中。逻辑与 Git 类似，可以去学一下廖雪峰课程了解一些 Git 的基础常识。
    
    1.  文件修改后首先会出现在 changes 区：  
        新增文件，会带个 “U” 标识  
        
        ![](https://img-blog.csdnimg.cn/20210425151743178.png#pic_center)
        
    2.  修改文件，会带个 “M” 标识  
        点击文件名可以在右侧工作区显示变化详情（注意这个右侧的编辑栏仍然可以编辑，这是动态比较）
        
        ![](https://img-blog.csdnimg.cn/20210425152013712.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1BvbGFyaXNSaXNpbmdXYXI=,size_16,color_FFFFFF,t_70)
        
    3.  删除文件，会在文件名上增加下划线，并带个 “D” 标识
        
        ![](https://img-blog.csdnimg.cn/20210425152352955.png)
        
    4.  点击文件名或者其旁边的 “Open File” 图标都可以打开文件。  
        open file 图标：  
        
        ![](https://img-blog.csdnimg.cn/8c595d03a1a04abdbee3716a3af6376e.png#pic_center)
        
          
        点击 “Discard Changes” 可以丢弃改动。  
        discard changes 图标：  
        
        ![](https://img-blog.csdnimg.cn/e2205ebefdc7445b81ea3d86a3303b5f.png#pic_center)
        
          
        点击 “Stage Changes” 可以将这一改动添加到 Staged Changes（类似于用`git add`将文件添加到缓存区）。  
        stage changes 图标：  
        
        ![](https://img-blog.csdnimg.cn/fb75a793a7be4dcc87d0cc20583eab6c.png#pic_center)
        
          
        上述两个图标在 changes 旁边也有，意思就是对 changes 区中所有的文件作此修改：  
        
        ![](https://img-blog.csdnimg.cn/daf7e85d2fc44f2f8e22757552359ba1.png#pic_center)
        
          
        
    5.  保存修改后，文件就转入 staged changes 区：  
        
        ![](https://img-blog.csdnimg.cn/20210425152946211.png#pic_center)
        
          
        在 Changes 这一字符右侧点击上述两个图标可以对所有工作区变动执行相应功能。  
        对 Staged Changes 区的文件也可以 Unstage Changes 再放回 Changes 区（类似于`git reset`）。
        
    6.  点击这两个对钩（commit）之一，类似于`git commit`，可以在弹出的输入框内写注释：  
        
        ![](https://img-blog.csdnimg.cn/2021042515331068.png)
        
    7.  在这个输入框里直接写注释，然后用 Ctrl+Enter 可以一步完成全部`git add`和`git commit`的工作：  
        
        ![](https://img-blog.csdnimg.cn/20210425154806660.png#pic_center)
        
    8.  可能是由于 VSCode 和 GitHub 是一家（有一个共同的母亲微软），所以对 GitHub 支持非常好…… 除了上面提到的直接发布到 GitHub，也可以点击这个图标：  
        
        ![](https://img-blog.csdnimg.cn/20210425153407846.png#pic_center)
        
          
        也是直接发布到 GitHub。直接关联你的 [GitHub 账号](https://so.csdn.net/so/search?q=GitHub%E8%B4%A6%E5%8F%B7&spm=1001.2101.3001.7020)，然后生成对应文件夹名的项目，还可以选项目是 public 还是 private。然后等待上传即可。由于过程比较傻瓜，我当时几乎没反应过来就做完了，所以没有截图。
        
    9.  如果要添加别的远程库也可以用这个：  
        
        ![](https://img-blog.csdnimg.cn/20210425153807299.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1BvbGFyaXNSaXNpbmdXYXI=,size_16,color_FFFFFF,t_70)
        
          
        可以自己写。如果已经将 VSCode 与 GitHub 账号进行了绑定，点击 “Add remote from GitHub” 可以直接选自己账号下的文件夹。
        
    10.  `pull`是把远程代码拉到本地合并（相当于`fetch`+`merge`）（如果因网络原因无法直接拉下来，可以在`.git`中的`config`文件中将`remote`url 中的`https`改成`git`，与后文 git clone 部分的介绍类似，可以起到加速效果）  
        `fetch`是获取远程仓库（就是知道一下远程有什么本地没有的东西）  
        `push`是把本地代码推送到远程仓库
        
    11.  `pull`和`push`也可以直接从上图的下拉框里选。
        
        ![](https://img-blog.csdnimg.cn/20210425154230958.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1BvbGFyaXNSaXNpbmdXYXI=,size_16,color_FFFFFF,t_70)
        
          
        sync 是先 push 后 pull
        
    12.  VSCode 还可以设置定时自动 fetch。但是我没设。
        
8.  可以使用 Ctrl+Shift+P 调出 Command Palette，使用更多语法（如 Git: `Undo Last Commit`等）：
    
    ![](https://img-blog.csdnimg.cn/20210425155111314.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1BvbGFyaXNSaXNpbmdXYXI=,size_16,color_FFFFFF,t_70)
    
9.  此外 VSCode 左下角也有快捷工具栏：  
    
    ![](https://img-blog.csdnimg.cn/20210425161351102.png#pic_center)
    
      
    
10.  可以在 Explorer 界面看到文档的时间线：（蓝框打码的是我的用户名）  
    
    ![](https://img-blog.csdnimg.cn/20210425160125545.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1BvbGFyaXNSaXNpbmdXYXI=,size_16,color_FFFFFF,t_70#pic_center)
    
      
    点击某个 commit 可以看到与当前文件的对比。  
    右键 commit 可以选择：对比，复制 commit id 或 commit message  
    
    ![](https://img-blog.csdnimg.cn/20210425160307668.png#pic_center)
    
11.  复制 commit id 功能可以用于回退版本：`git reset --hard (复制的commit id)`  
    这样就会使对应版本之后的版本全部消失，当前文件回到对应版本
    
12.  点击 View > Output 然后选择 Git 可以打开 Git output window
    
13.  .gitignore 文件保存后就可以生效，Git 会忽略其中配置的文件（但是我看了一下好像如果已经上传到版本库（完成 commit）了，就没用了。但是我不确定，我以后还准备继续实验能否作此工作），被忽略的文件在 explorer 中会变灰：  
    
    ![](https://img-blog.csdnimg.cn/20210425163018849.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1BvbGFyaXNSaXNpbmdXYXI=,size_16,color_FFFFFF,t_70)
    
14.  另，仍然建议用命令行进行的 Git 操作：
    
    1.  git clone  
        以我的项目 [PolarisRisingWar/rgb-experiment: RGB-experiment package, run GNN baseline experiment() function.](https://github.com/PolarisRisingWar/rgb-experiment) 为例，可以直接找到 clone 的链接：  
        
        ![](https://img-blog.csdnimg.cn/f1d5cb17099246c3b725d04d82669145.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6K-456We57yE6buY5LiN6K-t,size_20,color_FFFFFF,t_70,g_se,x_16)
        
          
        点击复制，然后在命令行中 cd 到想要放置项目的文件，输入 `git clone 复制的网址`。如果无法下载可以将 https 改成 git。  
        Gitee 的类似，继续以我的项目 [cs224w-2021-winter-colab: cs224w（图机器学习）2021 冬季课程的 colab](https://gitee.com/flower_moon_and_sword/cs224w-2021-winter-colab) 为例，复制的位置在这里：  
        
        ![](https://img-blog.csdnimg.cn/ce8a53927c6f4c808cc9191feccaa9e5.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6K-456We57yE6buY5LiN6K-t,size_20,color_FFFFFF,t_70,g_se,x_16)
        
    2.  用命令行`push`：`git push 远程仓库名 branch名`
    3.  如果因网络原因无法上传（push）项目，可以尝试如下命令行（有时有效）重置代理：
    
    ```
    git config --global --unset http.proxy
    git config --global --unset https.proxy
    
    ```
    
    或者也可以重新设置代理（这个代理是哪里来的，请参考我的 medium story）：
    
    ```
    git config --global http.proxy IPv4地址:7890
    git config --global https.proxy IPv4地址:7890
    
    ```
    

本文参考的教程及文档：

1.  [廖雪峰 Git 教程](https://www.liaoxuefeng.com/wiki/896043488029600)：我主要看的教程就是这个，基本能囊括 Git 使用过程中遇到的各种问题，教程落后的内容还可以在评论区看到很多实时的回复消息。在这个教程中还有很多我平时不常用到的功能，我没在本博文中写
2.  VSCode 官方教程
    1.  [Source Control with Git in Visual Studio Code](https://code.visualstudio.com/docs/sourcecontrol/overview)
    2.  [Version control in Visual Studio Code](https://code.visualstudio.com/docs/introvideos/versioncontrol)
3.  [Git 常用命令 pull、push、fetch_福尔摩斯 est 的博客 - CSDN 博客_git 命令 pull 代码](https://blog.csdn.net/weixin_43185154/article/details/123558875)
4.  [git fetch 命令 | 菜鸟教程](https://www.runoob.com/git/git-fetch.html)
5.  [【突发】解决 remote: Support for password authentication was removed on August 13, 2021. Please use a perso_愤怒的可乐的博客 - CSDN 博客](https://blog.csdn.net/yjw123456/article/details/119696726)：GitHub 必须要用 token 认证（以前是可以只用账号密码的）
6.  [简聊：多个未 add、commit 分支切换时相互影响的问题_修心猿的博客 - CSDN 博客](https://blog.csdn.net/w522301629/article/details/81331273)：这是个很丧病的情况，大致来说就是在新版 Git 中如果未提交就切换分支，会将文件变动跟着带到新分支，继续变动后提交，更新日志就会放在新分支上。  
    可以说是非常可怕了，所以建议是踏踏实实一个分支一个分支的搞，不要玩花活。
7.  Git 命令行速查表：[https://liaoxuefeng.gitee.io/resource.liaoxuefeng.com/git/git-cheat-sheet.pdf](https://liaoxuefeng.gitee.io/resource.liaoxuefeng.com/git/git-cheat-sheet.pdf)
8.  [Git 使用笔记 - 简书](https://www.jianshu.com/p/36342812cd3a)：也是一个精简但完整的教程
9.  .gitignore 模版（其实直接在 GitHub 上新建项目的话它就会给你推荐适用的模版）：[github/gitignore: A collection of useful .gitignore templates](https://github.com/github/gitignore)
10.  GitHub 官方教程：[Set up Git - GitHub Docs](https://docs.github.com/en/get-started/quickstart/set-up-git)
11.  GitHub 教程的简化速查手册：[github-git-cheat-sheet - 百度文库](https://wenku.baidu.com/view/4d5af75cb7daa58da0116c175f0e7cd1842518bc.html)
12.  Git 官方文档：[Git - Documentation](https://git-scm.com/doc)
13.  Git 官方教程（中文版）：[Git - Book](https://git-scm.com/book/zh/v2)
14.  中文教程：[git-tutor - 百度文库](https://wenku.baidu.com/view/f90b9013deccda38376baf1ffc4ffe473368fdcd.html)