<script setup lang="ts">
import Intro from "../components/Intro.vue"; // Assuming the new Intro.vue
// Removed themeStore and other refs if Intro.vue handles its own theme logic and data
</script>

<template>
  <div class="overflow-x-hidden w-full">
    <Intro />
  </div>
</template>
