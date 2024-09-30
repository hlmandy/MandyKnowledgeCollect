
### 加粗：
```latex
\usepackage{bm}  %希腊字母加粗
\mathbf{q},\bm{\pi}
```

### 画子图
```latex
\begin{figure}[H] %H为当前位置，!htb为忽略美学标准，htbp为浮动图形
	\centering  %图片全局居中
	\subfigbottomskip=2pt %两行子图之间的行间距
	\subfigcapskip=-5pt %设置子图与子标题之间的距离
	% fig1
	\subfigure[subfig1_title]{
		\includegraphics[width=0.23\linewidth]{subfig1}}
	% fig2
	\subfigure[subfig2_title]{
		\includegraphics[width=0.23\linewidth]{subfig2}}
	% fig3
	% ...
		\label{fig:xx}
\end{figure}
```

### 各种宽度

```latex
\linewidth - 当前行的宽度
\columnwidth - 当前栏的宽度 (看清是单栏还是双栏)
\textwidth - 整个页面版面的宽度 (文字区域)
\paperwidth - 整个页面纸张的宽度 (整个纸)
```

