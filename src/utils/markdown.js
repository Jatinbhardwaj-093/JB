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

/**
 * Comprehensive, lightweight Markdown-to-HTML parser for Gruvbox blog posts.
 * Handles headings, tables, lists, bold, italic, highlights, code blocks with tabs/copy, inline code, links, and blockquotes.
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
    const placeholder = `__CODEBLOCK_PLACEHOLDER_${codeBlocks.length}__`;
    
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
      .replace(/(?<!_)_([^_]+)_(?!_)/g, "<em>$1</em>")
      // Links: [text](url)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
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

  // Split content into blocks (double newlines)
  const rawBlocks = html.split(/\n\n+/);
  const resultBlocks = [];

  for (let block of rawBlocks) {
    block = block.trim();
    if (!block) continue;

    // Preserve code block placeholders
    if (block.startsWith("__CODEBLOCK_PLACEHOLDER_") && block.endsWith("__")) {
      resultBlocks.push(block);
      continue;
    }

    // Check for Horizontal Rules (--- or ***)
    if (/^(\-{3,}|\*{3,}|\_{3,})$/.test(block)) {
      resultBlocks.push(`<hr class="gruv-hr" />`);
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

    // Lists (bullet points or numbered)
    if (block.startsWith("- ") || block.startsWith("* ") || block.startsWith("+ ") || /^\d+\.\s/.test(block)) {
      const items = block.split("\n");
      const isOrdered = /^\d+\.\s/.test(block);
      const listItems = items
        .map((item) => {
          item = item.trim();
          if (item.startsWith("- ") || item.startsWith("* ") || item.startsWith("+ ")) {
            return `<li>${parseInline(item.slice(2))}</li>`;
          }
          const match = item.match(/^\d+\.\s+(.*)/);
          if (match) {
            return `<li>${parseInline(match[1])}</li>`;
          }
          return `<li>${parseInline(item)}</li>`;
        })
        .join("\n");

      if (isOrdered) {
        resultBlocks.push(`<ol>${listItems}</ol>`);
      } else {
        resultBlocks.push(`<ul>${listItems}</ul>`);
      }
      continue;
    }

    // Regular Paragraph
    // Normalize single newlines inside paragraph
    const paragraphText = block.replace(/\n/g, " ");
    resultBlocks.push(`<p>${parseInline(paragraphText)}</p>`);
  }

  let finalHtml = resultBlocks.join("\n");

  // Re-insert code blocks
  finalHtml = finalHtml.replace(/__CODEBLOCK_PLACEHOLDER_(\d+)__/g, (_, index) => {
    return codeBlocks[parseInt(index, 10)] || "";
  });

  return finalHtml;
}
