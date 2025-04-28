<script setup lang="ts">
import { ref } from "vue";
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();
// Simplified component without blog data
</script>

<template>
  <div
    class="py-8 md:py-14"
    :class="{
      'bg-gray-50': themeStore.theme === 'light',
      'bg-gray-900': themeStore.theme === 'dark',
    }"
  >
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="text-center mb-14">
        <h1
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4"
          :class="{ 'text-white': themeStore.theme === 'dark' }"
        >
          My Blog
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Sharing my thoughts and insights on web development, data science, and
          everything in between. Check back regularly for new content!
        </p>
      </div>

      <!-- Coming Soon Section -->
      <div
        class="rounded-xl shadow-lg p-8 text-center max-w-2xl mx-auto border"
        :class="{
          'bg-white border-gray-100': themeStore.theme === 'light',
          'bg-gray-800 border-gray-700': themeStore.theme === 'dark',
        }"
      >
        <div class="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-indigo-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h2
          class="text-2xl font-bold text-black mb-4"
          :class="{ 'text-white': themeStore.theme === 'dark' }"
        >
          Blog Section Coming Soon
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          I'm currently working on creating valuable content to share with you.
          My blog will feature articles about web development, data science, and
          other tech topics I'm passionate about.
        </p>
        <div
          class="p-4 rounded-lg border"
          :class="{
            'bg-indigo-50 border-indigo-100': themeStore.theme === 'light',
            'bg-indigo-900/20 border-indigo-800/30':
              themeStore.theme === 'dark',
          }"
        >
          <p
            class="text-sm italic"
            :class="{
              'text-gray-700': themeStore.theme === 'light',
              'text-gray-300': themeStore.theme === 'dark',
            }"
          >
            "Stay tuned for articles on Vue.js, Machine Learning, and more. The
            first posts are in the works!"
          </p>
        </div>
      </div>

      <!-- Newsletter Subscription -->
      <div
        class="mt-16 rounded-xl p-8 text-center border"
        :class="{
          'bg-indigo-50 border-indigo-100': themeStore.theme === 'light',
          'bg-indigo-900/20 border-indigo-800/30': themeStore.theme === 'dark',
        }"
      >
        <h3
          class="text-2xl font-bold text-black mb-4"
          :class="{ 'text-white': themeStore.theme === 'dark' }"
        >
          Get Notified When Blog Launches
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Be the first to know when my blog goes live! Subscribe to get notified
          about new articles and exclusive content.
        </p>
        <div class="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            class="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            :class="{
              'bg-white text-gray-900 border-gray-300':
                themeStore.theme === 'light',
              'bg-gray-800 text-white border-gray-600':
                themeStore.theme === 'dark',
            }"
          />
          <button
            class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Notify Me
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Responsive spacing adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 16px;
    padding-right: 16px;
  }
}

/* Animation for coming soon */
.coming-soon {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}
</style>
