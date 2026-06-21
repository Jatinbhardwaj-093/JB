/**
 * Simple, lightweight, dependency-free Markdown-to-HTML parser.
 * Handles headings, lists, bold, code blocks, inline code, links, and blockquotes.
 * Designed specifically to style correctly with custom CSS.
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

  // Escape HTML entities to prevent rendering issues and XSS
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Extract code blocks before processing other elements (to avoid parsing markdown syntax inside code)
  const codeBlocks = [];
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const placeholder = `<!--CODEBLOCK_${codeBlocks.length}-->`;
    // Restore escaped characters inside the code block for syntax highlighting
    const cleanCode = code
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");
    
    codeBlocks.push(
      `<pre><code class="language-${lang || "plaintext"}">${cleanCode.trim()}</code></pre>`
    );
    return placeholder;
  });

  // Inline elements parser
  const parseInline = (text) => {
    return text
      // Bold: **text**
      .replace(/\*\*([\s\S]+?)\*\*/g, "<strong>$1</strong>")
      // Inline code: `code`
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      // Links: [text](url)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  };

  // Split content by double newlines for block elements
  const blocks = html.split(/\n\n+/);
  const resultBlocks = blocks.map((block) => {
    block = block.trim();
    if (!block) return "";

    // Keep code block placeholders intact
    if (block.startsWith("<!--CODEBLOCK_") && block.endsWith("-->")) {
      return block;
    }

    // Headers: ##, ###
    if (block.startsWith("## ")) {
      return `<h2>${parseInline(block.slice(3))}</h2>`;
    }
    if (block.startsWith("### ")) {
      return `<h3>${parseInline(block.slice(4))}</h3>`;
    }

    // Blockquotes: > text
    if (block.startsWith("&gt; ")) {
      const content = block.replace(/^&gt;\s+/gm, "");
      return `<blockquote>${parseInline(content)}</blockquote>`;
    }

    // Lists (bullet points or numbered)
    if (block.startsWith("- ") || block.startsWith("* ") || /^\d+\.\s/.test(block)) {
      const items = block.split("\n");
      const listItems = items
        .map((item) => {
          item = item.trim();
          if (item.startsWith("- ") || item.startsWith("* ")) {
            return `<li>${parseInline(item.slice(2))}</li>`;
          }
          const match = item.match(/^\d+\.\s+(.*)/);
          if (match) {
            return `<li>${parseInline(match[1])}</li>`;
          }
          return `<li>${parseInline(item)}</li>`;
        })
        .join("\n");

      if (/^\d+\.\s/.test(block)) {
        return `<ol>${listItems}</ol>`;
      } else {
        return `<ul>${listItems}</ul>`;
      }
    }

    // Paragraph
    // Normalize single newlines to spaces for standard word wrapping
    const paragraphText = block.replace(/\n/g, " ");
    return `<p>${parseInline(paragraphText)}</p>`;
  });

  let finalHtml = resultBlocks.join("\n");

  // Restore code blocks back into the HTML
  finalHtml = finalHtml.replace(/<!--CODEBLOCK_(\d+)-->/g, (_, index) => {
    return codeBlocks[parseInt(index, 10)];
  });

  return finalHtml;
}
