<script setup lang="ts">
import { useThemeStore } from "../../store/theme";
import type { BlogPost } from "../../data/blogs/index";

const props = defineProps<{
  post: BlogPost;
}>();

const themeStore = useThemeStore();

// Format date to be more readable
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<template>
  <div
    class="blog-card rounded-xl overflow-hidden shadow-md transition-all duration-300 h-full flex flex-col hover:shadow-lg"
    :class="{
      'bg-white border border-gray-100': themeStore.theme === 'light',
      'bg-gray-800 border border-gray-700': themeStore.theme === 'dark',
    }"
  >
    <!-- Card Content -->
    <div class="p-5 flex-1 flex flex-col">
      <div class="flex-1">
        <!-- Title -->
        <p
          class="font-bold text-medium sm:text-xl mb-2 line-clamp-2"
          :class="{
            'text-gray-800': themeStore.theme === 'light',
            'text-white': themeStore.theme === 'dark',
          }"
        >
          {{ post.title }}
        </p>

        <!-- Meta information -->
        <div
          class="flex items-center mb-3 text-xs"
          :class="{
            'text-gray-500': themeStore.theme === 'light',
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

        <!-- Summary -->
        <p
          class="text-sm mb-4 line-clamp-3"
          :class="{
            'text-gray-600': themeStore.theme === 'light',
            'text-gray-300': themeStore.theme === 'dark',
          }"
        >
          {{ post.summary }}
        </p>
      </div>

      <!-- Read More Button -->
      <div class="mt-auto flex justify-end">
        <router-link
          :to="`/blog/${post.slug}`"
          class="inline-flex items-center px-4 py-2 rounded text-sm font-medium transition-colors duration-200"
          :class="{
            'bg-gray-50 text-gray-700 hover:bg-gray-100':
              themeStore.theme === 'light',
            'bg-gray-900/30 text-gray-300 hover:bg-gray-800/40':
              themeStore.theme === 'dark',
          }"
        >
          Read More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>
