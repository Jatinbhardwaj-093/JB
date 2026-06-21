<script setup>
import { ref, computed, onMounted } from "vue";
import { getPostsByCategory } from "../data/blogs/index";
import BlogCard from "./blog/BlogCard.vue";

const filterTabsContainer = ref(null);

// Define blog categories with descriptions
const categories = ref([
  {
    id: "all",
    name: "All Posts",
    title: "All Writing",
    description: "Browse everything in one place, starting with my detailed Google Summer of Code journey."
  },
  {
    id: "gsoc",
    name: "GSoC",
    title: "Google Summer of Code",
    description: "My journey and contributions during Google Summer of Code 2025."
  }
]);

// Track active category
const activeCategory = ref("all");

// Get the current category object based on active ID
const currentCategory = computed(() => {
  return (
    categories.value.find((cat) => cat.id === activeCategory.value) ||
    categories.value[0]
  );
});

// Get blog posts for the active category
const currentPosts = computed(() => {
  const posts = getPostsByCategory(activeCategory.value);
  // Sort posts by date in ascending order (oldest first)
  return posts.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
});

// Check if there are any posts for the current category
const hasPosts = computed(() => {
  return currentPosts.value.length > 0;
});

// Function to set active category
const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId;
};

const handleCategoryChange = (categoryId) => {
  setActiveCategory(categoryId);
};
</script>

<template>
  <div class="w-full text-stone-900 dark:text-stone-50 space-y-12">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div class="space-y-2">
        <h2 class="mono-text text-xs text-stone-500 dark:text-stone-400 tracking-widest uppercase font-medium">Logbook & Articles</h2>
        <h3 class="text-2xl font-light tracking-tight text-stone-900 dark:text-stone-100">{{ currentCategory.title }}</h3>
        <p class="text-xs text-stone-500 dark:text-stone-400 font-light max-w-xl leading-relaxed">
          {{ currentCategory.description }}
        </p>
      </div>

      <!-- Filter Controls -->
      <div class="flex items-center gap-2 font-mono text-[11px] border border-stone-200 dark:border-stone-900 p-1 rounded-lg self-start sm:self-auto">
        <button 
          v-for="cat in categories"
          :key="cat.id"
          @click="handleCategoryChange(cat.id)"
          class="px-2.5 py-1 rounded transition-colors whitespace-nowrap"
          :class="activeCategory === cat.id 
            ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900' 
            : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>

    <!-- Blog Posts Grid -->
    <div class="w-full py-4">
      <div
        v-if="hasPosts"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <BlogCard v-for="post in currentPosts" :key="post.id" :post="post" />
      </div>

      <!-- Coming Soon Section when no posts are available -->
      <div
        v-else
        class="rounded-xl p-8 text-center max-w-xl mx-auto border border-stone-200 dark:border-stone-900 bg-stone-100/20 dark:bg-stone-900/10"
      >
        <div class="mb-6 flex justify-center">
          <img
            src="../assets/images/lost/zoro_lost.webp"
            alt="Zoro Lost"
            class="h-32 w-auto rounded-lg shadow-sm filter grayscale dark:opacity-80"
          />
        </div>
        <p class="text-lg font-light text-stone-900 dark:text-stone-100 mb-2">
          More Content Coming Soon
        </p>
        <p class="text-xs text-stone-500 dark:text-stone-400 mb-6 font-light leading-relaxed">
          I'm working on new articles about programming, mathematics, and my experiences with open source projects. Check back soon for updates.
        </p>
        <div class="p-4 rounded border border-stone-200/50 dark:border-stone-900/50 bg-stone-50/50 dark:bg-stone-950/20">
          <p class="text-xs italic text-stone-400 dark:text-stone-500 font-mono">
            "Like Zoro, I've wandered off the path. Don't worry, I'll find my way back with new content soon!"
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scoped overrides if any, transitions clean and tidy */
</style>
