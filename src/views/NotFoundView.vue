<template>
  <div class="min-h-screen flex items-center justify-center px-4 bg-gray-900">
    <div
      class="max-w-md w-full text-center rounded-xl shadow-lg p-8 border bg-gray-900 border-gray-700"
    >
      <div class="mb-6">
        <img
          src="../assets/images/lost/zoro_lost.webp"
          alt="Zoro Lost"
          class="h-48 w-auto mx-auto rounded-lg shadow-lg"
        />
      </div>

      <h1 class="text-4xl font-bold mb-4 text-white">404</h1>

      <h2 class="text-xl font-semibold mb-4 text-gray-300">Page Not Found</h2>

      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Like Zoro, this page seems to have wandered off! The page you're looking
        for doesn't exist.
      </p>

      <router-link
        to="/"
        class="inline-block bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
      >
        Go Back Home
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();
</script>
