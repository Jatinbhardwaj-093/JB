import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import yaml from "highlight.js/lib/languages/yaml";
import cpp from "highlight.js/lib/languages/cpp";
import c from "highlight.js/lib/languages/c";
import css from "highlight.js/lib/languages/css";
import xml from "highlight.js/lib/languages/xml";
import sql from "highlight.js/lib/languages/sql";
import diff from "highlight.js/lib/languages/diff";
import katex from "katex";

// Register common languages
hljs.registerLanguage("python", python);
hljs.registerLanguage("py", python);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("shell", bash);
hljs.registerLanguage("json", json);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("md", markdown);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("yml", yaml);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("c", c);
hljs.registerLanguage("css", css);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("diff", diff);

/**
 * Post-processes highlighted code to enrich tokens (function calls, types, operators, prompts)
 */
function enhanceSyntaxTokens(html) {
  if (!html) return "";
  const parts = html.split(/(<[^>]+>)/g);
  let inComment = false;
  let inString = false;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith("<")) {
      if (part.includes("hljs-comment")) inComment = true;
      else if (part.includes("hljs-string")) inString = true;
      else if (part.includes("</span>")) {
        inComment = false;
        inString = false;
      }
      continue;
    }

    if (inComment || inString) continue;

    let text = part;
    // Interactive REPL prompt
    text = text.replace(/&gt;&gt;&gt;/g, '<span class="hljs-prompt">&gt;&gt;&gt;</span>');
    // PascalCase types / classes / domains
    text = text.replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g, '<span class="hljs-type">$1</span>');
    // Function / method invocations
    text = text.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="hljs-function-call">$1</span>(');
    // Comparison, assignment & mathematical operators
    text = text.replace(/(==|!=|&lt;=|&gt;=|-&gt;|\*\*|\+=|-=|\*=|\/=|\|)/g, '<span class="hljs-operator">$1</span>');

    parts[i] = text;
  }

  return parts.join("");
}

export function resolveAssetUrl(src) {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:") || src.startsWith("blob:")) {
    return src;
  }
  const base = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.BASE_URL)
    ? import.meta.env.BASE_URL
    : "/";
  if (src.startsWith("/")) {
    const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
    if (src.startsWith(cleanBase + "/") || src === cleanBase) {
      return src;
    }
    return `${cleanBase}${src}`;
  }
  return src;
}

/**
 * Comprehensive, lightweight Markdown-to-HTML parser for Gruvbox blog posts.
 * Handles headings, tables, lists, bold, italic, highlights, code blocks with tabs/copy, inline code, links, blockquotes, and KaTeX math.
 * 
 * @param {string} md - The raw markdown string
 * @returns {string} The parsed HTML string
 */
export function parseMarkdown(md) {
  if (!md) return "";

  // Normalize line endings
  let html = md.trim().replace(/\r\n/g, "\n");

  // Remove first H1 header (e.g., "# GSoC-25: Week-1") since it's already rendered by the page title
  html = html.replace(/^#\s+.*\n?/, "");

  // Extract code blocks first and apply syntax highlighting
  const codeBlocks = [];
  html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, rawLang, code) => {
    const lang = (rawLang || "plaintext").trim().toLowerCase();
    const displayLang = lang || "code";
    const placeholder = `@@CODEBLOCK_${codeBlocks.length}@@`;
    
    let highlightedCode = "";
    const cleanCode = code.trim();
    try {
      if (lang && hljs.getLanguage(lang)) {
        highlightedCode = hljs.highlight(cleanCode, { language: lang, ignoreIllegals: true }).value;
      } else {
        highlightedCode = hljs.highlightAuto(cleanCode).value;
      }
      highlightedCode = enhanceSyntaxTokens(highlightedCode);
    } catch (err) {
      highlightedCode = cleanCode
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }

    const codeBlockHtml = `
<div class="code-block-wrapper my-6 rounded-xl border border-gruv-border bg-gruv-card overflow-hidden shadow-sm">
  <div class="code-block-header flex items-center justify-between px-4 py-2 border-b border-gruv-border bg-gruv-card/90 select-none">
    <div class="flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-gruv-orange"></span>
      <span class="font-mono font-medium text-gruv-fg uppercase tracking-wider text-[11px]">${displayLang}</span>
    </div>
    <button class="copy-code-btn flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono text-gruv-muted hover:text-gruv-accent hover:bg-gruv-card transition-all cursor-pointer border border-transparent hover:border-gruv-border" type="button" aria-label="Copy code">
      <i class="bi bi-clipboard"></i>
      <span class="copy-text">Copy</span>
    </button>
  </div>
  <pre class="p-4 overflow-x-auto text-[13px] leading-relaxed mono-text m-0"><code class="hljs language-${lang}">${highlightedCode}</code></pre>
</div>`.trim();

    codeBlocks.push(codeBlockHtml);
    return `\n\n${placeholder}\n\n`;
  });

  // Extract display math blocks: $$...$$
  const mathBlocks = [];
  html = html.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
    const placeholder = `@@KATEX_BLOCK_${mathBlocks.length}@@`;
    let renderedMath = "";
    try {
      renderedMath = katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: false,
      });
    } catch (err) {
      renderedMath = `<div class="katex-error text-gruv-red font-mono text-xs">${math.trim()}</div>`;
    }
    const mathBlockHtml = `<div class="katex-display-wrapper my-6 overflow-x-auto py-2 text-center select-all">${renderedMath}</div>`;
    mathBlocks.push(mathBlockHtml);
    return `\n\n${placeholder}\n\n`;
  });

  // Extract inline math: $...$
  const inlineMath = [];
  html = html.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
    const placeholder = `@@KATEX_INLINE_${inlineMath.length}@@`;
    let rendered = "";
    try {
      rendered = katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
      });
    } catch (err) {
      rendered = `<span class="katex-error text-gruv-red font-mono text-xs">${math.trim()}</span>`;
    }
    inlineMath.push(rendered);
    return placeholder;
  });

  // Escape HTML in the remaining text
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Inline elements parser
  const parseInline = (text) => {
    if (!text) return "";
    return text
      // Bold (handling 2 to 4 asterisks e.g. ****Oscar**** or **text**)
      .replace(/\*{2,4}([\s\S]+?)\*{2,4}/g, "<strong>$1</strong>")
      .replace(/_{2}([\s\S]+?)_{2}/g, "<strong>$1</strong>")
      // Highlight: ==text==
      .replace(/==([^=]+)==/g, "<mark>$1</mark>")
      // Strikethrough: ~~text~~
      .replace(/~~([^~]+)~~/g, "<del>$1</del>")
      // Inline code: `code`
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      // Italic: *text* or _text_
      .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>")
      // Images: ![alt](url)
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
        const resolved = resolveAssetUrl(src);
        return `<img src="${resolved}" alt="${alt}" class="rounded-xl border border-gruv-border max-w-full my-4 shadow-sm" loading="lazy" />`;
      })
      // Links: [text](url)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
        const isExternal = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
        const resolved = (!isExternal && url.startsWith("/")) ? resolveAssetUrl(url) : url;
        const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<a href="${resolved}"${targetAttr}>${text}</a>`;
      });
  };

  // Helper to parse markdown table
  const parseTable = (tableBlock) => {
    const lines = tableBlock.trim().split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length < 2) return null;
    
    // Check if second line is table divider e.g. |---|---|
    const isDivider = /^\|?(\s*:?-+:?\s*\|?)+$/.test(lines[1]);
    if (!isDivider) return null;

    const parseRow = (rowLine) => {
      return rowLine
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => cell.trim());
    };

    const headerCells = parseRow(lines[0]);
    const bodyRows = lines.slice(2);

    let tableHtml = `<div class="table-wrapper my-6 overflow-x-auto rounded-xl border border-gruv-border bg-gruv-card"><table class="w-full text-left border-collapse"><thead><tr>`;
    headerCells.forEach((cell) => {
      tableHtml += `<th class="p-3 text-xs font-mono font-semibold text-gruv-fg border-b border-gruv-border bg-gruv-card/80">${parseInline(cell)}</th>`;
    });
    tableHtml += `</tr></thead><tbody>`;

    bodyRows.forEach((rowLine, idx) => {
      const rowCells = parseRow(rowLine);
      const isLast = idx === bodyRows.length - 1;
      tableHtml += `<tr class="hover:bg-gruv-card/40 transition-colors">`;
      rowCells.forEach((cell) => {
        const borderClass = isLast ? "" : "border-b border-gruv-border";
        tableHtml += `<td class="p-3 text-xs font-mono text-gruv-fg ${borderClass}">${parseInline(cell)}</td>`;
      });
      tableHtml += `</tr>`;
    });

    tableHtml += `</tbody></table></div>`;
    return tableHtml;
  };

  // Helper to parse hierarchical lists (supports nested ordered/unordered, loose lists, continuation lines)
  const parseListBlock = (lines) => {
    const root = { type: "root", children: [] };
    const stack = [{ node: root, indent: -1 }];

    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i];
      if (!raw.trim()) continue;

      const indentMatch = raw.match(/^(\s*)/);
      const indent = indentMatch ? indentMatch[1].replace(/\t/g, "    ").length : 0;
      const content = raw.trim();

      const olMatch = content.match(/^(\d+)\.\s+(.*)/s);
      const ulMatch = content.match(/^([-*+])\s+(.*)/s);

      if (olMatch || ulMatch) {
        const isOl = !!olMatch;
        const start = isOl ? parseInt(olMatch[1], 10) : null;
        const text = isOl ? olMatch[2] : ulMatch[2];
        const itemType = isOl ? "ol" : "ul";

        while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
          stack.pop();
        }

        const parent = stack[stack.length - 1].node;

        let listContainer = null;
        if (parent.children && parent.children.length > 0) {
          const lastChild = parent.children[parent.children.length - 1];
          if (lastChild.type === itemType) {
            listContainer = lastChild;
          }
        }

        if (!listContainer) {
          listContainer = { type: itemType, start: isOl ? start : undefined, items: [] };
          if (!parent.children) parent.children = [];
          parent.children.push(listContainer);
        }

        const newItem = { text: text, children: [] };
        listContainer.items.push(newItem);

        stack.push({ node: newItem, indent: indent });
      } else {
        if (stack.length > 1) {
          const currentItem = stack[stack.length - 1].node;
          if (currentItem.text) {
            currentItem.text += " " + content;
          } else {
            currentItem.text = content;
          }
        }
      }
    }

    const render = (container) => {
      if (container.type === "root") {
        return container.children.map(render).join("\n");
      }
      const tag = container.type;
      const startAttr = (tag === "ol" && container.start && container.start !== 1) ? ` start="${container.start}"` : "";
      const itemsHtml = container.items.map((item) => {
        let html = `<li>${parseInline(item.text)}`;
        if (item.children && item.children.length > 0) {
          html += "\n" + item.children.map(render).join("\n");
        }
        html += `</li>`;
        return html;
      }).join("\n");
      return `<${tag}${startAttr}>\n${itemsHtml}\n</${tag}>`;
    };

    return render(root);
  };

  // Group lines into semantic blocks (paragraphs, lists, blockquotes, tables, headings)
  const lines = html.split("\n");
  const rawBlocks = [];
  let currentBlock = [];
  let currentType = null;

  const flushBlock = () => {
    if (currentBlock.length > 0) {
      if (currentType === "list") {
        rawBlocks.push({ type: "list", lines: [...currentBlock] });
      } else {
        rawBlocks.push({ type: currentType || "raw", text: currentBlock.join("\n") });
      }
      currentBlock = [];
      currentType = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      if (currentType === "list") {
        // Peek ahead past blank lines to see if the list continues
        let peek = i + 1;
        while (peek < lines.length && !lines[peek].trim()) {
          peek++;
        }
        if (peek < lines.length) {
          const nextLine = lines[peek];
          const nextTrimmed = nextLine.trim();
          if (/^([-*+]|\d+\.)\s/.test(nextTrimmed) || /^(\s{2,}|\t)\S/.test(nextLine)) {
            // Continues the list!
            continue;
          }
        }
      }
      flushBlock();
      continue;
    }

    // Code block placeholder
    if (trimmed.startsWith("@@CODEBLOCK_") && trimmed.endsWith("@@")) {
      flushBlock();
      rawBlocks.push({ type: "placeholder", text: trimmed });
      continue;
    }

    // KaTeX display block placeholder
    if (trimmed.startsWith("@@KATEX_BLOCK_") && trimmed.endsWith("@@")) {
      flushBlock();
      rawBlocks.push({ type: "placeholder", text: trimmed });
      continue;
    }

    // Horizontal Rule
    if (/^(\-{3,}|\*{3,}|\_{3,})$/.test(trimmed)) {
      flushBlock();
      rawBlocks.push({ type: "hr", text: trimmed });
      continue;
    }

    // Headings
    if (/^#{1,6}\s/.test(trimmed)) {
      flushBlock();
      rawBlocks.push({ type: "heading", text: trimmed });
      continue;
    }

    // Table rows
    if (trimmed.startsWith("|") || (trimmed.includes("|") && i + 1 < lines.length && lines[i + 1].includes("|"))) {
      if (currentType !== "table") {
        flushBlock();
        currentType = "table";
      }
      currentBlock.push(trimmed);
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("&gt;") || trimmed.startsWith(">")) {
      if (currentType !== "blockquote") {
        flushBlock();
        currentType = "blockquote";
      }
      currentBlock.push(trimmed);
      continue;
    }

    // List item (ordered or unordered)
    if (/^([-*+]|\d+\.)\s/.test(trimmed)) {
      if (currentType !== "list") {
        flushBlock();
        currentType = "list";
      }
      currentBlock.push(line);
      continue;
    }

    // Indented continuation line in list
    if (currentType === "list" && /^(\s{2,}|\t)\S/.test(line)) {
      currentBlock.push(line);
      continue;
    }

    // Regular paragraph text
    if (currentType !== "para") {
      flushBlock();
      currentType = "para";
    }
    currentBlock.push(trimmed);
  }
  flushBlock();
  const resultBlocks = [];

  for (let blockItem of rawBlocks) {
    if (blockItem.type === "list") {
      resultBlocks.push(parseListBlock(blockItem.lines));
      continue;
    }

    let block = (blockItem.text || "").trim();
    if (!block) continue;

    // Preserve code block placeholders
    if (block.startsWith("@@CODEBLOCK_") && block.endsWith("@@")) {
      resultBlocks.push(block);
      continue;
    }

    // Preserve KaTeX display block placeholders
    if (block.startsWith("@@KATEX_BLOCK_") && block.endsWith("@@")) {
      resultBlocks.push(block);
      continue;
    }

    // Check for Horizontal Rules (--- or ***)
    if (/^(\-{3,}|\*{3,}|\_{3,})$/.test(block)) {
      resultBlocks.push(`<hr class="gruv-hr" />`);
      continue;
    }

    // Check for standalone image: ![alt](url)
    const imgBlockMatch = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgBlockMatch) {
      const alt = imgBlockMatch[1];
      const src = resolveAssetUrl(imgBlockMatch[2]);
      resultBlocks.push(`
<figure class="my-8 rounded-xl overflow-hidden border border-gruv-border bg-gruv-card shadow-md">
  <div class="p-2 sm:p-4 bg-[#181a1b] flex justify-center items-center overflow-x-auto">
    <img src="${src}" alt="${alt}" class="max-w-full h-auto rounded-lg object-contain shadow-sm block" loading="lazy" />
  </div>
  ${alt ? `<figcaption class="px-4 py-2.5 text-center text-xs font-mono text-gruv-muted border-t border-gruv-border bg-gruv-card/90">${alt}</figcaption>` : ""}
</figure>`.trim());
      continue;
    }

    // Check for Tables
    if (block.includes("|") && block.includes("\n")) {
      const tableHtml = parseTable(block);
      if (tableHtml) {
        resultBlocks.push(tableHtml);
        continue;
      }
    }

    // Headings (from h1 to h6)
    if (block.startsWith("###### ")) {
      resultBlocks.push(`<h6>${parseInline(block.slice(7))}</h6>`);
      continue;
    }
    if (block.startsWith("##### ")) {
      resultBlocks.push(`<h5>${parseInline(block.slice(6))}</h5>`);
      continue;
    }
    if (block.startsWith("#### ")) {
      resultBlocks.push(`<h4>${parseInline(block.slice(5))}</h4>`);
      continue;
    }
    if (block.startsWith("### ")) {
      resultBlocks.push(`<h3>${parseInline(block.slice(4))}</h3>`);
      continue;
    }
    if (block.startsWith("## ")) {
      resultBlocks.push(`<h2>${parseInline(block.slice(3))}</h2>`);
      continue;
    }
    if (block.startsWith("# ")) {
      resultBlocks.push(`<h2>${parseInline(block.slice(2))}</h2>`);
      continue;
    }

    // Blockquotes: > text
    if (block.startsWith("&gt; ") || block.startsWith("&gt;")) {
      const content = block
        .split("\n")
        .map((line) => line.replace(/^&gt;\s?/, "").trim())
        .join("<br />");
      resultBlocks.push(`<blockquote><p>${parseInline(content)}</p></blockquote>`);
      continue;
    }

    // Regular Paragraph
    // Normalize single newlines inside paragraph
    const paragraphText = block.replace(/\n/g, " ");
    resultBlocks.push(`<p>${parseInline(paragraphText)}</p>`);
  }

  let finalHtml = resultBlocks.join("\n");

  // Re-insert display math blocks
  finalHtml = finalHtml.replace(/@@KATEX_BLOCK_(\d+)@@/g, (_, index) => {
    return mathBlocks[parseInt(index, 10)] || "";
  });

  // Re-insert inline math
  finalHtml = finalHtml.replace(/@@KATEX_INLINE_(\d+)@@/g, (_, index) => {
    return inlineMath[parseInt(index, 10)] || "";
  });

  // Re-insert code blocks
  finalHtml = finalHtml.replace(/@@CODEBLOCK_(\d+)@@/g, (_, index) => {
    return codeBlocks[parseInt(index, 10)] || "";
  });

  return finalHtml;
}
