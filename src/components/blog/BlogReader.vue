<script setup lang="ts">
import { defineProps, ref, onMounted } from "vue";
import { useThemeStore } from "../../store/theme";
import type { BlogPost } from "../../data/blogs/index";

const props = defineProps<{
  post: BlogPost;
}>();

const themeStore = useThemeStore();
const content = ref("");

// Format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Load blog content from markdown file
onMounted(async () => {
  try {
    // For now, we'll use the existing content template
    if (props.post.slug === "gsoc-tips-to-start-with-open-source") {
      content.value = `
<h2>Tips to Start with Open Source</h2>
<p>Google Summer of Code is a global program that encourages students to contribute to open source software development. Students work with mentoring organizations on projects over a three-month period and receive a stipend for their contributions.</p>

<h2>First Steps in Open Source</h2>
<h3>1. Find Your Interests</h3>
<p>Before diving into contributions, identify which technologies, programming languages, or areas interest you the most. This will help you find projects that align with your skills and passions.</p>

<h3>2. Learn Git and GitHub</h3>
<p>Most open source projects use Git for version control and GitHub (or similar platforms) for hosting. Make sure you understand basic Git commands, pull requests, issue tracking, and Git workflow.</p>

<h3>3. Start Small</h3>
<p>Don't aim to fix major issues immediately. Look for documentation improvements, small bug fixes, test additions, and simple feature enhancements.</p>

<p>Many projects label issues as "good first issue" or "beginner-friendly" - these are perfect starting points.</p>

<h2>Preparing for GSoC</h2>
<h3>1. Research Organizations</h3>
<p>GSoC publishes a list of participating organizations each year. Start by reviewing previous years' organizations, reading their project ideas, and joining their communication channels (IRC, Discord, mailing lists).</p>

<h3>2. Contribute Early</h3>
<p>Don't wait until the GSoC application period to start contributing. Organizations prefer students who have already demonstrated their abilities and commitment.</p>

<h3>3. Prepare a Strong Proposal</h3>
<p>Your GSoC proposal should include a clear understanding of the project, detailed timeline with milestones, your approach to solving the problem, why you're the right candidate, and your past relevant experience.</p>

<h2>My GSoC Experience with SymPy</h2>
<p><em>Coming Soon: I'll share details about my personal GSoC journey with SymPy, including challenges faced and lessons learned.</em></p>

<p>Stay tuned for more tips and strategies for a successful Google Summer of Code application!</p>`;
    } else {
      content.value = "This blog content is coming soon!";
    }
  } catch (error) {
    console.error("Failed to load blog content:", error);
    content.value = "Failed to load blog content. Please try again later.";
  }
});
</script>

<template>
  <div
    class="blog-reader max-w-4xl mx-auto px-4 py-8"
    :class="{
      'text-gray-800': themeStore.theme === 'light',
      'text-gray-200': themeStore.theme === 'dark',
    }"
  >
    <!-- Blog Header -->
    <header
      class="mb-8 border-b pb-4"
      :class="{
        'border-gray-200': themeStore.theme === 'light',
        'border-gray-700': themeStore.theme === 'dark',
      }"
    >
      <h1
        class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
        :class="{
          'text-gray-900': themeStore.theme === 'light',
          'text-white': themeStore.theme === 'dark',
        }"
      >
        {{ post.title }}
      </h1>

      <div
        class="flex items-center text-sm mb-2"
        :class="{
          'text-gray-600': themeStore.theme === 'light',
          'text-gray-400': themeStore.theme === 'dark',
        }"
      >
        <span>{{ formatDate(post.date) }}</span>
        <span class="mx-2">•</span>
        <span
          class="font-medium px-2 py-0.5 rounded"
          :class="{
            'bg-green-50 text-green-700': themeStore.theme === 'light',
            'bg-green-900/30 text-green-300': themeStore.theme === 'dark',
          }"
        >
          {{ post.minutesToRead }} min read
        </span>
      </div>
    </header>

    <!-- Blog Content -->
    <div
      class="blog-content prose prose-lg max-w-none"
      :class="{
        'prose-gray': themeStore.theme === 'light',
        'prose-invert': themeStore.theme === 'dark',
      }"
    >
      <!-- Render HTML content -->
      <div v-html="content"></div>

      <!-- Back button -->
      <div
        class="mt-12 pt-4 border-t"
        :class="{
          'border-gray-200': themeStore.theme === 'light',
          'border-gray-700': themeStore.theme === 'dark',
        }"
      >
        <button
          @click="$router.go(-1)"
          class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          :class="{
            'bg-indigo-50 text-indigo-700 hover:bg-indigo-100':
              themeStore.theme === 'light',
            'bg-indigo-900/30 text-indigo-300 hover:bg-indigo-800/40':
              themeStore.theme === 'dark',
          }"
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
/* You might need to add custom styles for Markdown content */
.blog-content h1,
.blog-content h2,
.blog-content h3,
.blog-content h4,
.blog-content h5,
.blog-content h6 {
  font-weight: bold;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.blog-content h1 {
  font-size: 1.875rem;
}

.blog-content h2 {
  font-size: 1.5rem;
}

.blog-content h3 {
  font-size: 1.25rem;
}

.blog-content p {
  margin-bottom: 1em;
}

.blog-content ul,
.blog-content ol {
  margin-left: 1.5em;
  margin-bottom: 1em;
}

.blog-content li {
  margin-bottom: 0.5em;
}

.blog-content blockquote {
  border-left: 4px solid;
  padding-left: 1em;
  font-style: italic;
  margin: 1em 0;
}

.blog-content code {
  font-family: monospace;
  padding: 0.2em 0.4em;
  border-radius: 3px;
}
</style>
