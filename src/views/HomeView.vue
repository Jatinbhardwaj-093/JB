<script setup lang="ts">
import Intro from "../components/Intro.vue";
import { useThemeStore } from "../store/theme";
import { ref } from "vue";

const themeStore = useThemeStore();
const firstName = ref("Jatin");
const lastName = ref("Bhardwaj");
const jobTitle = ref("Web Developer & Data Scientist");
const specializations = ref([
  "Web Development",
  "Data Science",
  "Machine Learning",
  "AI",
]);
</script>

<template>
  <div class="w-full max-w-[100vw] overflow-x-hidden box-border">
    <!-- Desktop Version -->
    <div class="hidden md:block">
      <Intro />
    </div>

    <!-- Mobile Version - Custom Design -->
    <div class="block md:hidden overflow-hidden">
      <!-- Hero Section with Immersive Background -->
      <div class="relative w-full">
        <!-- Full-width background with gradient overlay -->
        <div class="relative h-[60vh] w-full overflow-hidden">
          <div
            class="absolute inset-0 bg-gradient-to-b from-indigo-600/80 to-purple-800/90 z-0"
          ></div>
          <div
            class="absolute inset-0 bg-[url('../assets/images/profileImage/myimage2.png')] bg-cover bg-center opacity-30 z-0"
          ></div>

          <!-- Centered content with animation -->
          <div
            class="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center"
          >
            <h1 class="text-4xl font-bold text-white animate-fade-in-up">
              {{ firstName }}
              <span class="text-indigo-200">{{ lastName }}</span>
            </h1>
            <p
              class="text-xl text-white/90 mt-2 animate-fade-in-up animation-delay-200"
            >
              {{ jobTitle }}
            </p>

            <!-- Animated badges -->
            <div
              class="flex flex-wrap justify-center gap-2 mt-6 animate-fade-in-up animation-delay-400"
            >
              <span
                v-for="(tag, i) in specializations"
                :key="i"
                class="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Bottom wave decoration with overflow hidden -->
          <div class="absolute bottom-0 left-0 right-0 w-full overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              class="w-full h-auto fill-white dark:fill-gray-900"
            >
              <path
                d="M0,192L60,181.3C120,171,240,149,360,154.7C480,160,600,192,720,192C840,192,960,160,1080,160C1200,160,1320,192,1380,208L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>

        <!-- Floating action button -->
        <div
          class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-20 animate-bounce-subtle"
        >
          <a
            href="#portfolio"
            class="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white w-12 h-12 rounded-full shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>

      <!-- Portfolio Section -->
      <div
        id="portfolio"
        class="py-12 px-4"
        :class="{
          'bg-gray-900': themeStore.theme === 'dark',
          'bg-white': themeStore.theme === 'light',
        }"
      >
        <h2
          class="text-2xl font-bold text-center mb-8"
          :class="{
            'text-white': themeStore.theme === 'dark',
            'text-gray-900': themeStore.theme === 'light',
          }"
        >
          My Work
        </h2>

        <!-- Project Cards - Mobile Optimized -->
        <div class="space-y-6">
          <router-link
            to="/projects"
            class="block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            :class="{
              'bg-gray-800': themeStore.theme === 'dark',
              'bg-gray-50': themeStore.theme === 'light',
            }"
          >
            <div class="h-40 bg-indigo-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-16 w-16 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <div class="p-5">
              <h3
                class="text-xl font-semibold"
                :class="{
                  'text-white': themeStore.theme === 'dark',
                  'text-gray-900': themeStore.theme === 'light',
                }"
              >
                Projects
              </h3>
              <p
                class="mt-2"
                :class="{
                  'text-gray-300': themeStore.theme === 'dark',
                  'text-gray-600': themeStore.theme === 'light',
                }"
              >
                Check out my recent work and applications.
              </p>
            </div>
          </router-link>

          <router-link
            to="/about"
            class="block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            :class="{
              'bg-gray-800': themeStore.theme === 'dark',
              'bg-gray-50': themeStore.theme === 'light',
            }"
          >
            <div class="h-40 bg-purple-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-16 w-16 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div class="p-5">
              <h3
                class="text-xl font-semibold"
                :class="{
                  'text-white': themeStore.theme === 'dark',
                  'text-gray-900': themeStore.theme === 'light',
                }"
              >
                About Me
              </h3>
              <p
                class="mt-2"
                :class="{
                  'text-gray-300': themeStore.theme === 'dark',
                  'text-gray-600': themeStore.theme === 'light',
                }"
              >
                Learn more about my skills, experience and background.
              </p>
            </div>
          </router-link>
        </div>

        <!-- Contact Button -->
        <div class="mt-10 flex justify-center">
          <router-link
            to="/contact"
            class="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Get in Touch
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </router-link>
        </div>
      </div>

      <!-- Social Links Bar -->
      <div class="py-6 px-4 bg-gray-50 dark:bg-gray-800 mb-10">
        <div class="flex justify-around items-center">
          <a
            href="https://www.linkedin.com/in/jatin-bhardwaj-b5962921a/"
            target="_blank"
            class="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
          </a>
          <a
            href="https://github.com/Jatinbhardwaj-093"
            target="_blank"
            class="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
              />
            </svg>
          </a>
          <a
            href="https://x.com/Jatin0932"
            target="_blank"
            class="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </svg>
          </a>
          <a
            href="mailto:bhardwajjatin093@gmail.com"
            class="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Mobile-specific animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease forwards;
  opacity: 0;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

/* Subtle bounce animation for scroll indicator */
@keyframes bounceSoft {
  0%,
  100% {
    transform: translateY(0) translateX(-50%);
  }
  50% {
    transform: translateY(-10px) translateX(-50%);
  }
}

.animate-bounce-subtle {
  animation: bounceSoft 2s infinite ease-in-out;
}

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Dark mode transition */
.bg-white,
.dark\:bg-gray-900 {
  transition: background-color 0.3s ease;
}

/* Prevent any content from creating horizontal scrollbars */
div {
  max-width: 100%;
  box-sizing: border-box;
}

/* Make sure SVGs and images don't overflow */
svg,
img {
  max-width: 100%;
}

/* Override any problematic animations */
@media (max-width: 767px) {
  .animate-fade-in-up,
  .animation-delay-200,
  .animation-delay-400 {
    transform: none !important;
    animation: none !important;
    opacity: 1 !important;
  }
}
</style>
