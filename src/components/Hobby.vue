<script setup lang="ts">
import { useThemeStore } from "../store/theme";
import { computed } from "vue";

const themeStore = useThemeStore();

// Switch the theme folders - use dark images for light theme and light images for dark theme
const mathsImg = computed(() =>
  themeStore.theme === "dark"
    ? new URL("../assets/images/light/Maths_light.png", import.meta.url).href
    : new URL("../assets/images/Dark/Maths_dark.png", import.meta.url).href
);

const psychologyImg = computed(() =>
  themeStore.theme === "dark"
    ? new URL("../assets/images/light/Psychology_light.png", import.meta.url)
        .href
    : new URL("../assets/images/Dark/Psychology_dark.png", import.meta.url).href
);

const mlImg = computed(() =>
  themeStore.theme === "dark"
    ? new URL("../assets/images/light/ML_light.png", import.meta.url).href
    : new URL("../assets/images/Dark/Ml_dark.png", import.meta.url).href
);
</script>

<template>
  <div :data-theme="themeStore.theme">
    <p
      class="text-3xl font-bold font-ubuntu mb-4 text-black"
      :class="{ 'text-white': themeStore.theme === 'dark' }"
    >
      Hobbies
    </p>
    <div class="flex items-start justify-start gap-4 flex-wrap">
      <div class="flex justify-start items-center gap-2">
        <div
          class="w-10 h-10 p-1 rounded-md bg-white dark:bg-gray-800 shadow-md shadow-black/30 dark:shadow-white/10"
        >
          <img :src="mathsImg" alt="Math" />
        </div>
        <p
          class="font-semibold text-xl text-black"
          :class="{ 'text-white': themeStore.theme === 'dark' }"
        >
          Mathematics
        </p>
      </div>
      <div class="flex justify-start items-center gap-2">
        <div
          class="w-10 h-10 p-1 rounded-md bg-white dark:bg-gray-800 shadow-md shadow-black/30 dark:shadow-white/10"
        >
          <img :src="psychologyImg" alt="Psychology" />
        </div>
        <p
          class="font-semibold text-xl text-black"
          :class="{ 'text-white': themeStore.theme === 'dark' }"
        >
          Human Psychology
        </p>
      </div>
      <div class="flex justify-start items-center gap-2">
        <div
          class="w-10 h-10 p-1 rounded-md bg-white dark:bg-gray-800 shadow-md shadow-black/30 dark:shadow-white/10"
        >
          <img :src="mlImg" alt="Machine Learning" />
        </div>
        <p
          class="font-semibold text-xl text-black"
          :class="{ 'text-white': themeStore.theme === 'dark' }"
        >
          Machine Learning
        </p>
      </div>
    </div>
  </div>
</template>
