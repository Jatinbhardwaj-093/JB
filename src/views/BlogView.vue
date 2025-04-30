<script setup lang="ts">
import Blogs from "../components/Blogs.vue";
import { onMounted } from "vue";

// Scroll to top when component is mounted
onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <main class="flex-grow">
    <div class="pt-2 pb-2">
      <Blogs />
    </div>
  </main>
</template>

<style scoped>
/* Ensure proper page layout with reduced vertical spacing */
main {
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .pt-8 {
    padding-top: 2rem; /* Reduce spacing on mobile */
  }
}
</style>
