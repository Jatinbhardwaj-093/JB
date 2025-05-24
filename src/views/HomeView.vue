<script setup lang="ts">
import Intro from "../components/Intro.vue";
import { useThemeStore } from "../store/theme";
import { ref, onMounted } from "vue";

const themeStore = useThemeStore();
const firstName = ref("Jatin");
const lastName = ref("Bhardwaj");
const specializations = ref(["Cloud Computing", "Mathematics", "ML"]);
const isLoaded = ref(false);

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true;
  }, 100);
});
</script>

<template>
  <div class="w-full max-w-[100vw] overflow-x-hidden">
    <!-- Desktop Version -->
    <div class="hidden md:block">
      <Intro />
    </div>

    <!-- Mobile Version - Complete Redesign -->
    <div
      class="block md:hidden min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950"
    >
      <!-- Hero Section -->
      <div class="relative min-h-screen flex items-center justify-center">
        <!-- Floating Background Elements -->
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 rounded-full blur-3xl"
          ></div>
          <div
            class="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl"
          ></div>
        </div>

        <!-- Profile Section -->
        <div class="relative z-10 text-center space-y-6 px-4">
          <!-- Profile Image -->
          <div
            class="relative mx-auto w-32 h-32"
            :class="{ 'animate-scale-in': isLoaded }"
          >
            <div
              class="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-75 animate-spin-slow"
            ></div>
            <div
              class="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl"
            >
              <img
                src="../assets/images/profileImage/myimage.png"
                alt="Jatin Bhardwaj"
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Online Status -->
            <div
              class="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center"
            >
              <div class="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>

          <!-- Name and Title -->
          <div
            class="space-y-2"
            :class="{ 'animate-fade-in-up delay-200': isLoaded }"
          >
            <h1
              class="text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-700 to-purple-700 dark:from-white dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent"
            >
              {{ firstName }} {{ lastName }}
            </h1>
          </div>

          <!-- Location -->
          <div
            class="flex items-center justify-center space-x-2"
            :class="{ 'animate-fade-in-up delay-300': isLoaded }"
          >
            <div
              class="flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
            >
              <div
                class="w-6 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-200"
                >Delhi, India</span
              >
            </div>
          </div>

          <!-- Specializations -->
          <div
            class="flex flex-wrap justify-center gap-2"
            :class="{ 'animate-fade-in-up delay-400': isLoaded }"
          >
            <span
              v-for="(spec, index) in specializations"
              :key="index"
              class="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-medium rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              :style="{ 'animation-delay': `${400 + index * 100}ms` }"
            >
              {{ spec }}
            </span>
          </div>

          <!-- Action Buttons -->
          <div
            class="flex flex-col space-y-3"
            :class="{ 'animate-fade-in-up delay-500': isLoaded }"
          >
            <router-link
              to="/projects"
              class="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <span>View My Projects</span>
            </router-link>

            <router-link
              to="/contact"
              class="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-gray-200 dark:border-gray-700 flex items-center justify-center space-x-2"
            >
              <svg
                class="w-5 h-5"
                :class="{
                  'text-white': themeStore.theme === 'dark',
                  'text-black': themeStore.theme === 'light',
                }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span
                :class="{
                  'text-white': themeStore.theme === 'dark',
                  'text-black': themeStore.theme === 'light',
                }"
                >Get In Touch</span
              >
            </router-link>
          </div>

          <!-- Social Links -->
          <div
            class="flex justify-center space-x-4"
            :class="{ 'animate-fade-in-up delay-600': isLoaded }"
          >
            <a
              href="https://www.linkedin.com/in/jatin-bhardwaj-b5962921a/"
              target="_blank"
              rel="noopener noreferrer"
              class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>

            <a
              href="https://github.com/Jatinbhardwaj-093"
              target="_blank"
              rel="noopener noreferrer"
              class="w-12 h-12 bg-gray-900 dark:bg-gray-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>

            <a
              href="https://x.com/Jatin0932"
              target="_blank"
              rel="noopener noreferrer"
              class="w-12 h-12 bg-black dark:bg-gray-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                />
              </svg>
            </a>

            <a
              href="mailto:bhardwajjatin093@gmail.com"
              class="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Enhanced animations for the modern mobile design */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes spinSlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease forwards;
  opacity: 0;
}

.animate-scale-in {
  animation: scaleIn 0.6s ease forwards;
  opacity: 0;
}

.animate-spin-slow {
  animation: spinSlow 3s linear infinite;
}

/* Delay classes */
.delay-200 {
  animation-delay: 0.2s;
}

.delay-300 {
  animation-delay: 0.3s;
}

.delay-400 {
  animation-delay: 0.4s;
}

.delay-500 {
  animation-delay: 0.5s;
}

.delay-600 {
  animation-delay: 0.6s;
}

.delay-700 {
  animation-delay: 0.7s;
}

.delay-800 {
  animation-delay: 0.8s;
}

/* Subtle bounce animation for interactive elements */
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

/* Enhanced hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:scale-110:hover {
  transform: scale(1.1);
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Glassmorphism effects */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Gradient text effects */
.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Responsive design improvements */
@media (max-width: 767px) {
  /* Ensure smooth animations on mobile */
  .animate-fade-in-up,
  .animate-scale-in {
    transform: none;
    opacity: 1;
    animation: none;
  }

  /* Force show animations only when loaded */
  .loaded .animate-fade-in-up {
    animation: fadeInUp 0.6s ease forwards;
    opacity: 0;
  }

  .loaded .animate-scale-in {
    animation: scaleIn 0.5s ease forwards;
    opacity: 0;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Dark mode transitions */
.dark\:bg-gray-900,
.dark\:bg-gray-800 {
  transition: background-color 0.3s ease;
}

/* Prevent horizontal scroll */
.max-w-\[100vw\] {
  max-width: 100vw;
}

.overflow-x-hidden {
  overflow-x: hidden;
}

/* Button enhancements */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Card hover effects */
.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
