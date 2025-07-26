<template>
  <div
    class="app-container min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white dark:from-black dark:to-gray-900 transition-colors duration-500 overflow-x-hidden"
  >
    <!-- Theme transition animation overlay -->
    <ThemeTransition />

    <Navbar />
    <main class="container mx-auto flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer class="py-6 border-t border-gray-200 dark:border-gray-700 mt-auto">
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
import ThemeTransition from "./components/ThemeTransition.vue";
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

:root {
  --accent-color: #6366f1;
  --accent-color-hover: #4f46e5;
}

html,
body {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  font-family: "Inter", sans-serif;
  scroll-behavior: smooth;
}

/* Remove default focus outlines */
button:focus,
a:focus,
input:focus,
select:focus,
textarea:focus,
[role="button"]:focus {
  outline: none;
}

/* For accessibility, add a subtle focus style for keyboard navigation */
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
[role="button"]:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

/* Remove tap highlight color on mobile */
* {
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
}

img {
  max-width: 100%;
  height: auto;
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

/* Simple fix for scroll bar flicker during transitions */
html {
  overflow-y: scroll;
}

/* Prevent horizontal scrolling */
.app-container {
  overflow-x: hidden;
  max-width: 100vw;
}
</style>
