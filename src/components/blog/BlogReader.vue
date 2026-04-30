<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from "vue";
import type { BlogPost } from "../../data/blogs/index";

const props = defineProps<{
  post: BlogPost;
}>();

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
const Week7BlogContent = defineAsyncComponent(
  () => import("./gsoc/Week7BlogContent.vue")
);
const Week8_9_10BlogContent = defineAsyncComponent(
  () => import("./gsoc/Week8_9_10BlogContent.vue")
);
const Week11BlogContent = defineAsyncComponent(
  () => import("./gsoc/Week11BlogContent.vue")
);
const Week12BlogContent = defineAsyncComponent(
  () => import("./gsoc/Week12BlogContent.vue")
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
      props.post.slug !== "week5-6-GSoC'25" &&
      props.post.slug !== "week7-GSoC'25" &&
      props.post.slug !== "week8-9-10-GSoC'25" &&
      props.post.slug !== "week11-GSoC'25" &&
      props.post.slug !== "week12-GSoC'25"
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
      'text-gray-800 dark': true,
      'text-gray-800': false,
    }"
  >
    <!-- Blog Header -->
    <header
      class="mb-4 border-b sm:pl-0 pl-2"
      :class="{
        'border-gray-200': false,
        'border-gray-700': true,
      }"
    >
      <p
        class="text-2xl sm:text-3xl font-bold mb-4"
        :class="{
          'text-gray-900': false,
          'text-white': true,
        }"
      >
        {{ post.title }}
      </p>

      <div
        class="flex items-center text-sm mb-2"
        :class="{
          'text-gray-600': false,
          'text-gray-400': true,
        }"
      >
        <span class="ml-3">{{ formatDate(post.date) }}</span>
        <span class="mx-2">•</span>
        <span
          class="font-medium px-2 py-0.5 rounded"
          :class="{
            'bg-gray-100 text-gray-700': false,
            'bg-gray-800/30 text-gray-300': true,
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
        'prose-gray': false,
        'prose-invert': true,
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
      <Week7BlogContent v-else-if="post.slug === 'week7-GSoC\'25'" />
      <Week8_9_10BlogContent v-else-if="post.slug === 'week8-9-10-GSoC\'25'" />
      <Week11BlogContent v-else-if="post.slug === 'week11-GSoC\'25'" />
      <Week12BlogContent v-else-if="post.slug === 'week12-GSoC\'25'" />
      <div v-else v-html="content" class="prose dark:prose-invert max-w-none" />

      <!-- Back button -->
      <div
        class="mt-6 border-t"
        :class="{
          'border-gray-200': false,
          'border-gray-700': true,
        }"
      >
        <button
          @click="$router.go(-1)"
          class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          :class="{
            'bg-gray-100 text-gray-700 hover:bg-gray-200':
              false,
            'bg-gray-800/30 text-gray-300 hover:bg-gray-700/40':
              true,
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
