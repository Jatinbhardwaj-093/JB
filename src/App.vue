<template>
  <div
    class="bg-gruv-bg text-gruv-fg transition-colors duration-300 antialiased min-h-screen flex flex-col justify-between relative"
  >
    <!-- Top Glow Accent -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-gruv-border to-transparent"></div>

    <Navbar />

    <!-- Main Container -->
    <main class="max-w-5xl mx-auto px-6 py-12 flex-grow relative w-full">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer Area -->
    <footer class="border-t border-gruv-border py-12 mt-24">
      <div class="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-gruv-muted font-mono">
        <div>
          © 2026 Jatin Bhardwaj
        </div>
        <div class="flex items-center gap-5 text-sm">
          <a 
            href="mailto:jatinbhardwaj093@gmail.com" 
            class="hover:text-gruv-red transition-colors" 
            title="Email"
            aria-label="Email"
          >
            <i class="bi bi-envelope"></i>
          </a>
          <a 
            href="https://github.com/Jatinbhardwaj-093" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="hover:text-gruv-green transition-colors" 
            title="GitHub"
            aria-label="GitHub"
          >
            <i class="bi bi-github"></i>
          </a>
          <a 
            href="https://www.linkedin.com/in/jatin-bhardwaj093/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="hover:text-gruv-blue transition-colors" 
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <i class="bi bi-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import { onMounted } from "vue";

onMounted(() => {
  // Initialize light/dark theme class on mount
  const theme = localStorage.getItem("theme");
  const html = document.documentElement;
  if (theme === "light") {
    html.classList.remove("dark");
  } else {
    html.classList.add("dark");
  }
});
</script>

<style>
/* Remove default app wrapper styles if any, global transitions managed here */
html, body {
  overflow-x: hidden;
  max-width: 100vw;
}
</style>
