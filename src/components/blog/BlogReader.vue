<script setup>
import { ref, onMounted, watch } from "vue";
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/github-dark.css";
import { parseMarkdown } from "../../utils/markdown";

// Register Python language for syntax highlighting
hljs.registerLanguage("python", python);

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

const loadPostContent = async () => {
  isLoading.value = true;
  try {
    const filePath = `/src/data/blogs/content/${props.post.slug}.md`;
    const loadFile = markdownFiles[filePath];

    if (loadFile) {
      const rawMarkdown = await loadFile();
      renderedHtml.value = parseMarkdown(rawMarkdown);
      
      // Apply syntax highlighting to code blocks in the next tick
      setTimeout(() => {
        hljs.highlightAll();
      }, 0);
    } else {
      renderedHtml.value = "<p>This blog content is coming soon!</p>";
    }
  } catch (error) {
    console.error("Failed to load blog content:", error);
    renderedHtml.value = "<p>Failed to load blog content. Please try again later.</p>";
  } finally {
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
  <div class="blog-reader max-w-3xl mx-auto px-4 sm:px-6 text-stone-900 dark:text-stone-50">
    <!-- Blog Header -->
    <header class="mb-8 border-b border-stone-200 dark:border-stone-900 pb-6">
      <h1 class="text-3xl sm:text-4xl font-light tracking-tight text-stone-950 dark:text-stone-50 mb-4 leading-tight">
        {{ post.title }}
      </h1>

      <div class="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-500 dark:text-stone-400">
        <span>{{ formatDate(post.date) }}</span>
        <span>•</span>
        <span class="px-2 py-0.5 rounded border border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/30 text-stone-500 dark:text-stone-400">
          {{ post.minutesToRead }} min read
        </span>
      </div>
    </header>

    <!-- Blog Content -->
    <div class="blog-content">
      <div v-if="isLoading" class="text-center py-12">
        <p class="text-stone-400 dark:text-stone-500 font-mono text-xs">Loading blog content...</p>
      </div>
      
      <!-- Render the parsed Markdown HTML -->
      <div 
        v-else 
        v-html="renderedHtml" 
        class="prose dark:prose-invert max-w-none font-light"
      />

      <!-- Back button -->
      <div class="mt-12 pt-6 border-t border-stone-200 dark:border-stone-900">
        <button
          @click="$router.go(-1)"
          class="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono rounded border border-stone-200 dark:border-stone-900 hover:bg-stone-100 dark:hover:bg-stone-900 text-stone-600 dark:text-stone-400 transition-colors"
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

/* Deep styles for Markdown rendered HTML - fully supporting light/dark themes */
:deep(.prose) {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.95rem;
  line-height: 1.75;
}

:deep(.prose) p {
  margin-bottom: 1.5rem;
  color: #3f3f46; /* text-stone-700 */
}
.dark :deep(.prose) p {
  color: #d4d4d8; /* text-stone-300 */
}

@media (min-width: 640px) {
  :deep(.prose) {
    font-size: 1rem;
    line-height: 1.8;
  }
}

:deep(.prose) h2 {
  font-size: 1.35rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: #09090b; /* text-stone-950 */
  margin-top: 2.25rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0.75rem;
  background-color: #f4f4f5; /* bg-stone-100 */
  border-left: 2px solid #71717a; /* stone-500 border */
  border-radius: 0.375rem;
}
.dark :deep(.prose) h2 {
  color: #fafafa; /* text-stone-50 */
  background-color: #18181b; /* bg-stone-900 */
  border-left-color: #52525b; /* stone-600 border */
}

@media (min-width: 640px) {
  :deep(.prose) h2 {
    font-size: 1.5rem;
  }
}

:deep(.prose) h3 {
  font-size: 1.15rem;
  font-weight: 500;
  color: #18181b; /* text-stone-900 */
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid #e4e4e7;
  padding-bottom: 0.25rem;
}
.dark :deep(.prose) h3 {
  color: #f4f4f5; /* text-stone-100 */
  border-bottom-color: #27272a;
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
  line-height: 1.6;
  color: #3f3f46;
}
.dark :deep(.prose) li {
  color: #d4d4d8;
}

:deep(.prose) li::before {
  content: "•";
  position: absolute;
  left: 0.25rem;
  top: 0;
  color: #a1a1aa; /* stone-400 */
}
.dark :deep(.prose) li::before {
  color: #52525b; /* stone-600 */
}

:deep(.prose) li p {
  display: inline;
  margin: 0;
}

:deep(.prose) a {
  color: #27272a; /* text-stone-800 */
  font-weight: 450;
  text-decoration: none;
  border-bottom: 1px dashed rgba(39, 39, 42, 0.4);
  transition: all 0.2s ease;
}
.dark :deep(.prose) a {
  color: #e4e4e7; /* text-stone-200 */
  border-bottom-color: rgba(228, 228, 231, 0.4);
}

:deep(.prose) a:hover {
  color: #09090b;
  border-bottom-style: solid;
}
.dark :deep(.prose) a:hover {
  color: #ffffff;
}

:deep(.prose) blockquote {
  border-left: 3px solid #71717a;
  padding-left: 1.25rem;
  font-style: italic;
  color: #71717a;
  margin: 1.5rem 0;
  background-color: rgba(244, 244, 245, 0.5);
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border-radius: 0 0.375rem 0.375rem 0;
}
.dark :deep(.prose) blockquote {
  border-left-color: #52525b;
  color: #a1a1aa;
  background-color: rgba(24, 24, 27, 0.4);
}

:deep(.prose) pre {
  background-color: #09090b; /* GitHub dark/black bg */
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  border: 1px solid #18181b;
}
.dark :deep(.prose) pre {
  background-color: #09090b;
  border-color: #18181b;
}

:deep(.prose) code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.85em;
  background-color: #f4f4f5;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  color: #18181b;
  border: 1px solid #e4e4e7;
}
.dark :deep(.prose) code {
  background-color: #18181b;
  color: #fafafa;
  border-color: #27272a;
}

:deep(.prose) pre code {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  color: inherit;
  font-size: 0.9em;
  border: none;
}
</style>
