<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
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
import { parseMarkdown } from "../../utils/markdown";

// Register common languages for syntax highlighting
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

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const renderedHtml = ref("");
const isLoading = ref(true);

// Use Vite's glob import to dynamically load markdown files as raw strings
const markdownFiles = import.meta.glob("/src/data/blogs/content/*.md", {
  query: "?raw",
  import: "default",
});

const setupCodeBlockActions = () => {
  const codeBlocks = document.querySelectorAll(".code-block-wrapper");
  codeBlocks.forEach((block) => {
    const btn = block.querySelector(".copy-code-btn");
    const codeEl = block.querySelector("pre code");
    if (!btn || !codeEl) return;

    btn.onclick = async (e) => {
      e.preventDefault();
      try {
        const textToCopy = codeEl.innerText;
        await navigator.clipboard.writeText(textToCopy);

        const copyText = btn.querySelector(".copy-text");
        const icon = btn.querySelector("i");

        btn.classList.add("text-gruv-green", "!border-gruv-green/40");
        if (copyText) copyText.textContent = "Copied!";
        if (icon) icon.className = "bi bi-check2";

        setTimeout(() => {
          btn.classList.remove("text-gruv-green", "!border-gruv-green/40");
          if (copyText) copyText.textContent = "Copy";
          if (icon) icon.className = "bi bi-clipboard";
        }, 2000);
      } catch (err) {
        console.error("Failed to copy code: ", err);
      }
    };
  });
};

const loadPostContent = async () => {
  isLoading.value = true;
  try {
    const filePath = `/src/data/blogs/content/${props.post.slug}.md`;
    const loadFile = markdownFiles[filePath];

    if (loadFile) {
      const rawMarkdown = await loadFile();
      renderedHtml.value = parseMarkdown(rawMarkdown);
      isLoading.value = false;
      
      await nextTick();
      setupCodeBlockActions();
    } else {
      renderedHtml.value = "<p>This blog content is coming soon!</p>";
      isLoading.value = false;
    }
  } catch (error) {
    console.error("Failed to load blog content:", error);
    renderedHtml.value = "<p>Failed to load blog content. Please try again later.</p>";
    isLoading.value = false;
  }
};

onMounted(() => {
  loadPostContent();
});

// Re-load if the post changes
watch(() => props.post.slug, () => {
  loadPostContent();
});

// Format date
const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<template>
  <div class="blog-reader max-w-3xl mx-auto px-4 sm:px-6 text-gruv-fg">
    <!-- Blog Header -->
    <header class="mb-8 border-b border-gruv-border pb-6">
      <h1 class="text-3xl sm:text-4xl font-light tracking-tight text-gruv-fg mb-4 leading-tight">
        {{ post.title }}
      </h1>

      <div class="flex flex-wrap items-center gap-3 text-xs font-mono text-gruv-muted">
        <span>{{ formatDate(post.date) }}</span>
        <span>•</span>
        <span class="px-2 py-0.5 rounded border border-gruv-border bg-gruv-card text-gruv-muted">
          {{ post.minutesToRead }} min read
        </span>
        <span>•</span>
        <span 
          class="px-2 py-0.5 rounded border text-[9px] font-semibold tracking-wider select-none"
          :class="post.category.toLowerCase() === 'gsoc' ? 'border-gruv-blue/30 bg-gruv-blue/10 text-gruv-blue' : 'border-gruv-accent/30 bg-gruv-accent/10 text-gruv-accent'"
        >
          {{ post.category.toLowerCase() === 'gsoc' ? 'GSoC' : post.category.toUpperCase() }}
        </span>
      </div>
    </header>

    <!-- Blog Content -->
    <div class="blog-content">
      <div v-if="isLoading" class="text-center py-12">
        <p class="text-gruv-muted font-mono text-xs">Loading blog content...</p>
      </div>
      
      <!-- Render the parsed Markdown HTML -->
      <div 
        v-else 
        v-html="renderedHtml" 
        class="prose max-w-none font-light"
      />

      <!-- Back button -->
      <div class="mt-12 pt-6 border-t border-gruv-border">
        <button
          @click="$router.go(-1)"
          class="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono rounded border border-gruv-border text-gruv-muted hover:border-gruv-accent/50 hover:text-gruv-accent hover:bg-gruv-accent/5 transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          [back_to_blogs]
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-reader {
  position: relative;
  isolation: isolate;
}

.blog-content {
  max-width: none;
  margin: 0 auto;
}

/* Deep styles for Markdown rendered HTML - fully harmonized with Gruvbox Light & Dark */
:deep(.prose) {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--fg-color);
}

:deep(.prose) p {
  margin-bottom: 1.5rem;
  color: var(--fg-color);
}

@media (min-width: 640px) {
  :deep(.prose) {
    font-size: 1rem;
    line-height: 1.85;
  }
}

:deep(.prose) h2 {
  font-size: 1.35rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--fg-color);
  margin-top: 2.25rem;
  margin-bottom: 1rem;
  padding: 0.6rem 0.85rem;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-left: 3px solid var(--accent-color);
  border-radius: 0.5rem;
}

@media (min-width: 640px) {
  :deep(.prose) h2 {
    font-size: 1.45rem;
  }
}

:deep(.prose) h3 {
  font-size: 1.15rem;
  font-weight: 500;
  color: var(--fg-color);
  margin-top: 1.85rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.35rem;
}

:deep(.prose) h4,
:deep(.prose) h5,
:deep(.prose) h6 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--fg-color);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

:deep(.prose) ul {
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 1.5rem;
}

:deep(.prose) li {
  position: relative;
  padding-left: 1.25rem;
  margin-bottom: 0.5rem;
  line-height: 1.65;
  color: var(--fg-color);
}

:deep(.prose) li::before {
  content: "•";
  position: absolute;
  left: 0.25rem;
  top: 0;
  color: var(--accent-color);
  font-weight: bold;
}

:deep(.prose) ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--fg-color);
}

:deep(.prose) ol li {
  padding-left: 0.35rem;
}

:deep(.prose) ol li::before {
  content: none;
}

:deep(.prose) li p {
  display: inline;
  margin: 0;
}

:deep(.prose) a {
  color: var(--accent-color);
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px dashed var(--accent-color);
  transition: all 0.2s ease;
}

:deep(.prose) a:hover {
  color: var(--gruv-orange);
  border-bottom-style: solid;
}

:deep(.prose) blockquote {
  border: 1px solid var(--border-color);
  border-left: 3px solid var(--accent-color);
  padding: 0.85rem 1.25rem;
  color: var(--fg-color);
  margin: 1.5rem 0;
  background-color: var(--card-bg);
  border-radius: 0 0.5rem 0.5rem 0;
}

:deep(.prose) blockquote p {
  margin: 0;
  color: var(--fg-color);
}

:deep(.prose) hr,
:deep(.prose) .gruv-hr {
  border: 0;
  border-top: 1px solid var(--border-color);
  margin: 2.25rem 0;
}

/* Inline Code & Highlights */
:deep(.prose) code:not(pre code) {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.85em;
  background-color: rgba(213, 196, 161, 0.4);
  color: var(--accent-color);
  padding: 0.15em 0.45em;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  font-weight: 500;
  white-space: break-spaces;
  word-break: break-word;
}

.dark :deep(.prose) code:not(pre code) {
  background-color: rgba(60, 56, 54, 0.5);
  color: var(--gruv-yellow);
  border-color: rgba(168, 153, 132, 0.25);
}

:deep(.prose) mark {
  background-color: rgba(250, 189, 47, 0.35);
  color: var(--fg-color);
  padding: 0.1em 0.35em;
  border-radius: 3px;
  border-bottom: 1px solid var(--gruv-yellow);
}

.dark :deep(.prose) mark {
  background-color: rgba(250, 189, 47, 0.2);
  color: var(--fg-color);
  border-bottom-color: rgba(250, 189, 47, 0.4);
}

:deep(.prose) strong {
  color: var(--fg-color);
  font-weight: 600;
}

:deep(.prose) pre {
  margin: 0;
  border-radius: 0;
  background: transparent;
  border: none;
}

:deep(.prose) pre code {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  color: inherit;
  font-size: 0.875rem;
  border: none;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
</style>
