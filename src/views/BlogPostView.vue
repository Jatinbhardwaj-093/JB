<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getPostBySlug } from "../data/blogs";
import BlogReader from "../components/blog/BlogReader.vue";
import { useThemeStore } from "../store/theme";

const props = defineProps<{
  slug: string;
}>();

const router = useRouter();
const themeStore = useThemeStore();

// Get blog post data
const post = computed(() => {
  const foundPost = getPostBySlug(props.slug);
  return foundPost;
});

// Redirect to blogs page if post not found
onMounted(() => {
  if (!post.value) {
    router.push("/blogs");
  }

  // Scroll to top
  window.scrollTo(0, 0);
});
</script>

<template>
  <main
    class="flex-grow py-8 sm:py-12"
    :class="{
      'bg-gray-50': themeStore.theme === 'light',
      'bg-gray-900': themeStore.theme === 'dark',
    }"
  >
    <div v-if="post">
      <BlogReader :post="post" />
    </div>
    <div v-else class="text-center py-16">
      <p class="text-gray-500">Loading post...</p>
    </div>
  </main>
</template>

<style scoped>
/* Ensure proper page layout */
main {
  display: flex;
  flex-direction: column;
  min-height: 60vh;
}
</style>
