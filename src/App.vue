<template>
  <div
    class="app-container min-h-screen flex flex-col bg-gradient-to-br from-black to-gray-900 transition-colors duration-500 overflow-x-hidden"
  >
    <Navbar />
    <main class="container mx-auto flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer class="relative mt-auto py-8">
      <!-- Fading Divider -->
      <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-50"></div>
      
      <div class="container mx-auto px-4 flex flex-col items-center justify-center gap-2">
        <p class="text-gray-400 text-sm">
          Design by <span class="text-white font-medium">Jatin Bhardwaj</span>
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
