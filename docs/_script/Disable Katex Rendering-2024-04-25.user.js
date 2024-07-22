// ==UserScript==
// @name         Disable Katex Rendering
// @namespace    http://tampermonkey.net/
// @version      2024-04-25
// @description  Click "Disable Katex" to disable all Katex formulas on the current page, refresh to recover; Click "Show Buttons" to show formula buttons. Click formula button to disable Katex formulas of the current block and copy markdown to clipboard.
// @author       lyq
// @require      https://unpkg.com/turndown/dist/turndown.js
// @match        https://chat.openai.com/c/*
// @match        https://chatgpt.com/c/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let turndownService = new TurndownService();
    const iconString = '<svg t="1714015504016" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1681" width="18" height="18"><path d="M512 928H128a32 32 0 0 1-26.88-49.92L345.6 512 101.12 145.92A32 32 0 0 1 128 96h384a32 32 0 0 1 0 64H187.52l223.36 334.08a33.28 33.28 0 0 1 0 35.84L187.52 864H512a32 32 0 0 1 0 64zM640 928a36.48 36.48 0 0 1-17.92-5.12 32.64 32.64 0 0 1-8.96-44.8l256-384a32 32 0 0 1 53.76 35.84l-256 384a33.28 33.28 0 0 1-26.88 14.08z" fill="#bfbfbf" p-id="1682"></path><path d="M896 928a33.28 33.28 0 0 1-26.88-14.08l-256-384a32 32 0 1 1 53.76-35.84l256 384a32.64 32.64 0 0 1-8.96 44.8 36.48 36.48 0 0 1-17.92 5.12z" fill="#bfbfbf" p-id="1683"></path></svg>';
    let btn = document.createElement("div");
    let btn2 = document.createElement("div");

    function disableKatexRendering(parent) {
        while (parent.getElementsByClassName('katex-mathml').length > 0) {
            const katexMathmlElements = parent.getElementsByClassName('katex-mathml');
            for (let i = 0; i < katexMathmlElements.length; i++) {
                const katexMathmlElement = katexMathmlElements[i];
                const annotationElement = katexMathmlElement.querySelector('annotation');
                const sourceCode = annotationElement.textContent;

                // const formattedSourceCode = '\\(' + sourceCode + '\\)';
                const formattedSourceCode = '$' + sourceCode + '$';
                const sourceCodeNode = document.createTextNode(formattedSourceCode);
                const katexHtmlElement = katexMathmlElement.nextElementSibling;
                const katexElement = katexHtmlElement.parentElement;
                katexElement.replaceWith(sourceCodeNode);
            }
        }
    }

    function disableGlobally() {
        disableKatexRendering(document);
    }

    function copyMarkdown(parent) {
        disableKatexRendering(parent);
        let contentBlock = parent.getElementsByClassName("markdown")[0];
        let markdown = turndownService.turndown(contentBlock.innerHTML);
        markdown = markdown.replace(/\${1}[\s\S]+?\$/gi, recoverMd);
        copyText(markdown);
    }

    function addFormulaBtns() {
        const contents = document.querySelectorAll('[data-testid^="conversation-turn-"]');
        for (let i = 0; i < contents.length; i++) {
            if (i % 2 === 1 && document.getElementById("disable-katex-" + i.toString()) === null) {
                // const testDataId = contents[i].getAttribute('data-testid');
                // const blockIndex = parseInt(testDataId.split('-')[2]);
                const button = document.createElement("button");
                // button.textContent = "Disable Katex Rendering";
                button.classList.add("p-1", "rounded-md", "text-token-text-tertiary", "hover:text-token-text-primary");
                button.id = "disable-katex-" + i.toString();//blockIndex.toString();
                const svgElement = new DOMParser().parseFromString(iconString, 'text/html').body.firstChild;
                button.appendChild(svgElement);
                button.addEventListener("click", function () {
                    // disableKatexRendering(contents[i]);
                    copyMarkdown(contents[i]);
                });
                contents[i].getElementsByClassName('mt-1 flex gap-3')[0].appendChild(button);
            }
        }
    }

    function initBtn(btn, caption, top, func) {
        btn.style.position = "fixed";
        btn.style.width = "100px";
        btn.style.height = "22px";
        btn.style.lineHeight = "22px";
        btn.style.top = top;
        btn.style.right = "1%";
        btn.style.background = "#0073ff";
        btn.style.fontSize = "14px";
        btn.style.color = "#fff";
        btn.style.textAlign = "center";
        btn.style.borderRadius = "6px";
        btn.style.zIndex = 10000;
        btn.style.cursor = "pointer";
        btn.style.opacity = 0.1;
        btn.innerHTML = caption;

        btn.addEventListener("click", func);
        btn.addEventListener("mouseover", function (e) {
            this.style.opacity = 1;
        });
        btn.addEventListener("mouseout", function () {
            this.style.opacity = 0.1;
        });
        document.body.prepend(btn);
    }

    function recoverMd(markdown) {
        const escapeMap = {
            '\\': '',
            '\`': '`',
            '\*': '*',
            '\_': '_',
            '\{': '{',
            '\}': '}',
            '\[': '[',
            '\]': ']',
            '\(': '(',
            '\)': ')',
            '\#': '#',
            '\+': '+',
            '\-': '-',
            '\.': '.',
            '\!': '!',
            '\|': '|'
        };
        return markdown.replace(/\\([\\`*_{}\[\]()#+\-.!|])/g, (match, p1) => {
            return escapeMap[p1] || p1;
        });
    }

    function copyText(textToCopy) {
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    }

    initBtn(btn, "Disable Katex", "14%", disableGlobally);
    initBtn(btn2, "Show Buttons", "18%", addFormulaBtns);

})();