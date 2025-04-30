<template>
  <div
    class="app-container min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500"
  >
    <!-- Theme transition animation overlay -->
    <ThemeTransition />

    <Navbar />
    <main class="container mx-auto px-4 py-8 flex-grow">
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

/* Ensure the root container never causes overflow */
#app {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  position: relative;
}

html,
body {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden; /* Prevent horizontal scrolling */
}

body {
  font-family: "Inter", sans-serif;
  scroll-behavior: smooth;
  position: relative; /* Helps with overflow control */
}

/* Fix for potential overflow issues in all containers */
.app-container,
main,
.container {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* Router view container should also respect boundaries */
router-view,
.router-view-wrapper {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

/* All sections need overflow control */
section {
  overflow-x: clip;
  max-width: 100%;
}

/* Prevent SVGs from causing overflow */
svg {
  max-width: 100%;
}

/* Ensure grid and flex layouts don't cause overflow */
.grid,
.flex,
[class*="grid-cols"],
[class*="flex-"] {
  max-width: 100%;
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
  box-sizing: border-box; /* Ensure all elements include padding in width calculations */
}

/* Make sure images don't cause overflow */
img {
  max-width: 100%;
  height: auto;
}

/* Handle tables and pre elements that might cause overflow */
table,
pre {
  max-width: 100%;
  overflow-x: auto;
  display: block;
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
