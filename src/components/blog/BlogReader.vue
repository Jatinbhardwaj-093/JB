<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from "vue";
import { useThemeStore } from "../../store/theme";
import type { BlogPost } from "../../data/blogs/index";

const props = defineProps<{
  post: BlogPost;
}>();

const themeStore = useThemeStore();
const content = ref("");

// Lazy load blog components based on slug
const GSoCBlogContent = defineAsyncComponent(
  () => import("./gsoc/GSoCBlogContent.vue")
);
const Week1BlogContent = defineAsyncComponent(
  () => import("./gsoc/Week1BlogContent.vue")
);
const Week2_3BlogContent = defineAsyncComponent(
  () => import("./gsoc/Week2_3BlogContent.vue")
);
const Week4BlogContent = defineAsyncComponent(
  () => import("./gsoc/Week4BlogContent.vue")
);
const Week5_6BlogContent = defineAsyncComponent(
  () => import("./gsoc/Week5_6BlogContent.vue")
);

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
    // We use the component for GSoC blog, and fallback to this for other blogs
    if (
      props.post.slug !== "gsoc-tips-to-start-with-open-source" &&
      props.post.slug !== "gsoc-week1-fps-ring" &&
      props.post.slug !== "gsoc-week2-3-fps-design" &&
      props.post.slug !== "week-4-GSoC'25" &&
      props.post.slug !== "week5-6-GSoC'25"
    ) {
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
    class="blog-reader max-w-5xl mx-auto px-0 sm:px-6"
    :class="{
      'text-gray-800 dark': themeStore.theme === 'dark',
      'text-gray-800': themeStore.theme === 'light',
    }"
  >
    <!-- Blog Header -->
    <header
      class="mb-4 border-b sm:pl-0 pl-2"
      :class="{
        'border-gray-200': themeStore.theme === 'light',
        'border-gray-700': themeStore.theme === 'dark',
      }"
    >
      <p
        class="text-2xl sm:text-3xl font-bold mb-4"
        :class="{
          'text-gray-900': themeStore.theme === 'light',
          'text-white': themeStore.theme === 'dark',
        }"
      >
        {{ post.title }}
      </p>

      <div
        class="flex items-center text-sm mb-2"
        :class="{
          'text-gray-600': themeStore.theme === 'light',
          'text-gray-400': themeStore.theme === 'dark',
        }"
      >
        <span class="ml-3">{{ formatDate(post.date) }}</span>
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
      class="blog-content prose prose-lg max-w-none mx-auto px-4 sm:px-8"
      :class="{
        'prose-gray': themeStore.theme === 'light',
        'prose-invert': themeStore.theme === 'dark',
      }"
    >
      <!-- Render component or HTML content -->
      <GSoCBlogContent
        v-if="post.slug === 'gsoc-tips-to-start-with-open-source'"
      />
      <Week1BlogContent v-else-if="post.slug === 'gsoc-week1-fps-ring'" />
      <Week2_3BlogContent v-else-if="post.slug === 'gsoc-week2-3-fps-design'" />
      <Week4BlogContent v-else-if="post.slug === 'week-4-GSoC\'25'" />
      <Week5_6BlogContent v-else-if="post.slug === 'week5-6-GSoC\'25'" />
      <div v-else v-html="content"></div>

      <!-- Back button -->
      <div
        class="mt-6 border-t"
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
/* Simple styling for BlogReader */
.blog-reader {
  position: relative;
  isolation: isolate;
}

.blog-content {
  /* Basic container styles */
  max-width: none;
  margin: 0 auto;
}

/* For non-GSoC blogs that might use the generic content renderer */
.blog-content > div {
  padding: 1rem 0;
}
</style>
