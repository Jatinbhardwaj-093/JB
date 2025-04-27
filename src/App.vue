<template>
  <div
    class="app-container min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500"
  >
    <Navbar />
    <main class="container mx-auto px-4 py-8">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer class="py-6 mt-16 border-t border-gray-200 dark:border-gray-700">
      <div
        class="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400"
      >
        <p>
          © {{ new Date().getFullYear() }} Jatin Bhardwaj. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

:root {
  --accent-color: #6366f1;
  --accent-color-hover: #4f46e5;
}

body {
  font-family: "Inter", sans-serif;
  scroll-behavior: smooth;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
