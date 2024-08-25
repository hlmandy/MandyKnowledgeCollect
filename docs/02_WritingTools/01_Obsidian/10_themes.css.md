## 增加标签H1~H6的提示
```css
/* -------- 预览模式 ---------- */
/* 为 H1 添加 H1 标签 */
.markdown-preview-view h1::before {
  content: "H1";
  margin-right: 10px;
  font-size: 0.8em;
  color: var(--text-muted);
}

/* 为 H2 添加 H2 标签 */
.markdown-preview-view h2::before {
  content: "H2";
  margin-right: 10px;
  font-size: 0.8em;
  color: var(--text-muted);
}

/* 为 H3 添加 H3 标签 */
.markdown-preview-view h3::before {
  content: "H3";
  margin-right: 10px;
  font-size: 0.8em;
  color: var(--text-muted);
}

/* 同理可以为 H4、H5、H6 添加对应的标签 */
.markdown-preview-view h4::before {
  content: "H4";
  margin-right: 10px;
  font-size: 0.8em;
  color: var(--text-muted);
}

.markdown-preview-view h5::before {
  content: "H5";
  margin-right: 10px;
  font-size: 0.8em;
  color: var(--text-muted);
}

.markdown-preview-view h6::before {
  content: "H6";
  margin-right: 10px;
  font-size: 0.8em;
  color: var(--text-muted);
}

/* -------- 编辑模式 ---------- */
/* 在编辑模式中为 H1 添加 H1 标签 */
.markdown-source-view .cm-header-1::before {
  content: "H1";
  margin-right: 10px;
  font-size: 0.8em;
  color: var(--text-muted);
}

/* 在编辑模式中为 H2 添加 H2 标签 */
.markdown-source-view .cm-header-2::before {
  content: "H2";
  margin-right: 10px;
  font-size: 0.8em;
  color: var(--text-muted);
}

/* 在编辑模式中为 H3 添加 H3 标签 */
.markdown-source-view .cm-header-3::before {
  content: "H3";
  margin-right: 10px;
  font-size: 0.8em;
  color: var(--text-muted);
}

/* 为 H4、H5、H6 添加对应的标签 */
.markdown-source-view .cm-header-4::before {
  content: "H4";
  margin-right: 10px;
  font-size: 0.8em;
  color: var(--text-muted);
}

.markdown-source-view .cm-header-5::before {
  content: "H5";
  margin-right: 10px;
  font-size: 0.8em;
  color: var(--text-muted);
}

.markdown-source-view .cm-header-6::before {
  content: "H6";
  margin-right: 10px;
  font-size: 0.8em;
  color: var(--text-muted);
}
```