<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();

const firstName = ref("Jatin");
const lastName = ref("Bhardwaj");
const title = ref("Cloud Computing | Machine Learning | Mathematics");
const location = ref("Delhi, India");

const isLoaded = ref(false);

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true;
  }, 100);
});

onUnmounted(() => {
  // No cleanup needed
});
</script>

<template>
  <section
    class="relative overflow-hidden transition-colors duration-500 px-6 py-12 sm:py-16"
  >
    <!-- Main Content Container -->
    <div class="relative z-10 w-full max-w-4xl mx-auto text-center">
      <!-- Profile Image -->
      <div
        class="transition-all duration-1000 ease-out transform opacity-0 scale-90"
        :class="{ 'opacity-100 scale-100': isLoaded }"
      >
        <div class="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-3">
          <img
            src="../../src/assets/images/profileImage/myimage.webp"
            alt="Profile Photo"
            class="w-full h-full object-cover rounded-full border-2 border-gray-300 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
          />
        </div>
      </div>

      <!-- Name -->
      <div
        class="transition-all duration-1000 ease-out delay-100 transform opacity-0 translate-y-4"
        :class="{ 'opacity-100 translate-y-0': isLoaded }"
      >
        <h1 class="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-2 text-gray-900 dark:text-white">
          {{ firstName }} {{ lastName }}
        </h1>
      </div>

      <!-- Title -->
      <div
        class="transition-all duration-1000 ease-out delay-200 transform opacity-0 translate-y-4"
        :class="{ 'opacity-100 translate-y-0': isLoaded }"
      >
        <p class="text-lg sm:text-xl font-light tracking-wide text-gray-600 dark:text-gray-400 mb-3">
          {{ title }}
        </p>
      </div>

      <!-- Location -->
      <div
        class="transition-all duration-1000 ease-out delay-300 transform opacity-0 translate-y-4 mb-8"
        :class="{ 'opacity-100 translate-y-0': isLoaded }"
      >
        <div class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{{ location }}</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div
        class="transition-all duration-1000 ease-out delay-400 transform opacity-0 translate-y-4 mb-10"
        :class="{ 'opacity-100 translate-y-0': isLoaded }"
      >
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <router-link
            to="/projects"
            class="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg transition-all duration-200 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 min-w-[200px]"
          >
            Explore Projects
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </router-link>
          <router-link
            to="/contact"
            class="inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-all duration-200 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-900 dark:hover:border-white hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 min-w-[200px]"
          >
            Get in Touch
          </router-link>
        </div>
      </div>

      <!-- Social Links -->
      <div
        class="transition-all duration-1000 ease-out delay-500 transform opacity-0 translate-y-4"
        :class="{ 'opacity-100 translate-y-0': isLoaded }"
      >
        <div class="flex items-center justify-center gap-4">
          <!-- LinkedIn -->
          <a
            href="https://www.linkedin.com/in/jatin-bhardwaj093/"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
          >
            <i class="bi bi-linkedin text-2xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200"></i>
          </a>

          <!-- GitHub -->
          <a
            href="https://github.com/Jatinbhardwaj-093"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
          >
            <i class="bi bi-github text-2xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200"></i>
          </a>

          <!-- Twitter -->
          <a
            href="https://x.com/Jatin0932"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
          >
            <i class="bi bi-twitter-x text-2xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200"></i>
          </a>

          <!-- Email -->
          <a
            href="mailto:bhardwajjatin093@gmail.com"
            class="social-link"
          >
            <i class="bi bi-envelope text-2xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.social-link {
  transition: transform 0.2s ease;
}

.social-link:hover {
  transform: translateY(-2px);
}
</style>
