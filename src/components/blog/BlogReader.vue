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
  <div class="blog-reader max-w-5xl mx-auto px-0 sm:px-6">
    <!-- Blog Header -->
    <header class="mb-4 border-b border-gray-700 sm:pl-0 pl-2">
      <p class="text-2xl sm:text-3xl font-bold mb-4 text-white">
        {{ post.title }}
      </p>

      <div class="flex items-center text-sm mb-2 text-gray-400">
        <span class="ml-3">{{ formatDate(post.date) }}</span>
        <span class="mx-2">•</span>
        <span class="font-medium px-2 py-0.5 rounded bg-gray-800/30 text-gray-300">
          {{ post.minutesToRead }} min read
        </span>
      </div>
    </header>

    <!-- Blog Content -->
    <div class="blog-content px-4 sm:px-8">
      <div v-if="isLoading" class="text-center py-12">
        <p class="text-gray-400">Loading blog content...</p>
      </div>
      
      <!-- Render the parsed Markdown HTML -->
      <div 
        v-else 
        v-html="renderedHtml" 
        class="prose prose-invert max-w-none"
      />

      <!-- Back button -->
      <div class="mt-6 border-t border-gray-700">
        <button
          @click="$router.go(-1)"
          class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 bg-gray-800/30 text-gray-300 hover:bg-gray-700/40"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1"
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
          Back to blogs
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

/* Deep styles for Markdown rendered HTML */
:deep(.prose) {
  font-family: "Ubuntu", sans-serif;
  color: #d1d5db; /* text-gray-300 */
}

:deep(.prose) p {
  margin-bottom: 1.25rem;
  font-size: 1rem;
  line-height: 1.75;
  color: #cbd5e1; /* text-slate-300 */
}

@media (min-width: 640px) {
  :deep(.prose) p {
    font-size: 1.05rem;
    line-height: 1.8;
  }
}

:deep(.prose) h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem 0.75rem;
  background-color: rgba(17, 24, 39, 0.4); /* dark bg overlay */
  border-radius: 0.375rem;
  border-left: 3px solid #6366f1; /* Indigo border */
}

@media (min-width: 640px) {
  :deep(.prose) h2 {
    font-size: 1.75rem;
  }
}

:deep(.prose) h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid rgba(75, 85, 99, 0.4);
  padding-bottom: 0.25rem;
}

:deep(.prose) ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
  background-color: rgba(99, 102, 241, 0.05); /* very light indigo bg */
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-right: 0.75rem;
  border-radius: 0.5rem;
}

:deep(.prose) ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
  background-color: rgba(99, 102, 241, 0.05);
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-right: 0.75rem;
  border-radius: 0.5rem;
}

:deep(.prose) li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
  color: #cbd5e1;
}

:deep(.prose) li p {
  display: inline;
  margin: 0;
}

:deep(.prose) a {
  color: #60a5fa; /* text-blue-400 */
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px dashed rgba(96, 165, 250, 0.4);
  transition: all 0.2s ease;
}

:deep(.prose) a:hover {
  color: #93c5fd; /* text-blue-300 */
  border-bottom-style: solid;
}

:deep(.prose) blockquote {
  border-left: 4px solid #6366f1; /* bg-indigo-500 */
  padding-left: 1rem;
  font-style: italic;
  color: #9ca3af; /* text-gray-400 */
  margin: 1.5rem 0;
  background-color: rgba(31, 41, 55, 0.3);
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 0 0.375rem 0.375rem 0;
}

:deep(.prose) pre {
  background-color: #0d1117; /* GitHub dark bg */
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  border: 1px solid #1f2937;
}

:deep(.prose) code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.85em;
  background-color: rgba(110, 118, 129, 0.2);
  padding: 0.2em 0.4em;
  border-radius: 6px;
  color: #f1f5f9;
}

:deep(.prose) pre code {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  color: inherit;
  font-size: 0.9em;
}
</style>
