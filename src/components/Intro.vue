<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();

const firstName = ref("Jatin");
const lastName = ref("Bhardwaj");
const location = ref("Delhi, India");
const isLoaded = ref(false);
const specializations = ref([
  "Machine Learning",
  "Cloud Computing",
  "Mathematics",
]);

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true;
  }, 500);
});
</script>

<template>
  <section
    class="min-h-screen flex items-center justify-center relative overflow-hidden"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0">
      <!-- Dynamic gradient background -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 transition-all duration-1000"
      ></div>

      <!-- Floating geometric shapes -->
      <div
        class="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl animate-float"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-cyan-600/10 rounded-full blur-3xl animate-float-delayed"
      ></div>
      <div
        class="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse-slow"
      ></div>

      <!-- Grid pattern overlay -->
      <div
        class="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style="
          background-image: radial-gradient(circle, #000 1px, transparent 1px);
          background-size: 50px 50px;
        "
      ></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
      >
        <!-- Left Column: Text Content -->
        <div class="space-y-8" :class="{ 'animate-slide-in-left': isLoaded }">
          <!-- Greeting -->
          <div class="space-y-2">
            <div class="flex items-center space-x-3">
              <span
                class="text-2xl font-mono text-indigo-600 dark:text-indigo-400 font-bold"
                >&lt;/&gt;</span
              >
              <span
                class="text-indigo-600 dark:text-indigo-400 font-medium text-lg tracking-wide"
                >Hello, I'm</span
              >
            </div>
          </div>

          <!-- Name with gradient text -->
          <div class="space-y-3">
            <h1
              class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span
                class="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent"
              >
                {{ firstName }}
              </span>
              <span
                class="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-600 bg-clip-text text-transparent"
              >
                {{ lastName }}
              </span>
            </h1>
          </div>

          <!-- Location -->
          <div class="flex items-center space-x-3">
            <div
              class="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-lg"
            >
              <svg
                class="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
            </div>
            <span
              class="text-lg font-medium text-gray-700 dark:text-gray-200"
              >{{ location }}</span
            >
          </div>

          <!-- Specializations -->
          <div class="space-y-3">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Specialized in
            </h3>
            <div class="flex flex-wrap gap-3">
              <span
                v-for="(spec, index) in specializations"
                :key="index"
                class="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-medium rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                :style="{ 'animation-delay': `${600 + index * 100}ms` }"
              >
                {{ spec }}
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <router-link
              to="/projects"
              class="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <span>View My Work</span>
              <svg
                class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </router-link>

            <router-link
              to="/contact"
              class="group inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-black dark:text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-gray-200 dark:border-gray-700"
            >
              <span
                :class="{
                  'text-white': themeStore.theme === 'dark',
                  'text-black': themeStore.theme === 'light',
                }"
                >Get In Touch</span
              >
              <svg
                class="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform duration-200"
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
            </router-link>
          </div>

          <!-- Social Links -->
          <div class="flex items-center space-x-4 pt-6">
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400"
              >Connect with me</span
            >
            <div class="flex space-x-3">
              <a
                href="https://www.linkedin.com/in/jatin-bhardwaj-b5962921a/"
                target="_blank"
                rel="noopener noreferrer"
                class="p-3 bg-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
              </a>

              <a
                href="https://github.com/Jatinbhardwaj-093"
                target="_blank"
                rel="noopener noreferrer"
                class="p-3 bg-gray-900 dark:bg-gray-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </a>

              <a
                href="https://x.com/Jatin0932"
                target="_blank"
                rel="noopener noreferrer"
                class="p-3 bg-black dark:bg-gray-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  />
                </svg>
              </a>

              <a
                href="mailto:bhardwajjatin093@gmail.com"
                class="p-3 bg-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Right Column: Enhanced Profile Section -->
        <div class="relative" :class="{ 'animate-slide-in-right': isLoaded }">
          <!-- Profile image container with modern effects -->
          <div class="relative">
            <!-- Animated background rings -->
            <div class="absolute inset-0 -m-8">
              <div
                class="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 animate-spin-slow"
              ></div>
              <div
                class="absolute inset-4 bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500 rounded-full blur-2xl opacity-30 animate-spin-reverse"
              ></div>
            </div>

            <!-- Main profile image -->
            <div class="relative w-96 h-96 mx-auto">
              <!-- Glow effect -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse-glow"
              ></div>

              <!-- Image container -->
              <div
                class="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl"
              >
                <img
                  src="../assets/images/profileImage/myimage.png"
                  alt="Jatin Bhardwaj"
                  class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />

                <!-- Overlay gradient -->
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                ></div>

                <!-- Hover shine effect -->
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"
                ></div>
              </div>

              <!-- Status indicator -->
              <div
                class="absolute bottom-8 right-8 w-16 h-16 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg"
              >
                <div
                  class="w-6 h-6 bg-white dark:bg-gray-200 rounded-full animate-pulse"
                ></div>
              </div>
            </div>

            <!-- Floating elements around the image -->
            <div
              class="absolute top-16 -left-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-float"
            >
              <svg
                class="w-8 h-8 text-indigo-600 dark:text-indigo-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <div
              class="absolute bottom-16 -right-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-float-delayed"
            >
              <svg
                class="w-8 h-8 text-purple-600 dark:text-purple-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
                />
              </svg>
            </div>

            <div
              class="absolute top-1/2 -right-12 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-bounce-soft"
            >
              <svg
                class="w-8 h-8 text-blue-600 dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <div
          class="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
        >
          <div
            class="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Modern CSS animations for the new template design */

/* Slide-in animations */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-left {
  animation: slideInLeft 0.8s ease-out forwards;
}

.animate-slide-in-right {
  animation: slideInRight 0.8s ease-out forwards;
}

/* Floating animations for background elements */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-10px) rotate(5deg);
  }
  66% {
    transform: translateY(5px) rotate(-3deg);
  }
}

@keyframes floatDelayed {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(8px) rotate(-4deg);
  }
  66% {
    transform: translateY(-12px) rotate(6deg);
  }
}

@keyframes pulseSlow {
  0%,
  100% {
    opacity: 0.1;
    transform: scale(1);
  }
  50% {
    opacity: 0.2;
    transform: scale(1.05);
  }
}

@keyframes bounceGentle {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: floatDelayed 8s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-pulse-slow {
  animation: pulseSlow 4s ease-in-out infinite;
}

.animate-bounce-soft {
  animation: bounceGentle 3s ease-in-out infinite;
}

/* Spinning animations for profile rings */
@keyframes spinSlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spinReverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.animate-spin-slow {
  animation: spinSlow 20s linear infinite;
}

.animate-spin-reverse {
  animation: spinReverse 15s linear infinite;
}

/* Pulse glow effect for profile image */
@keyframes pulseGlow {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.95);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
}

.animate-pulse-glow {
  animation: pulseGlow 3s ease-in-out infinite;
}

/* Typing cursor blink animation */
@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

.animate-blink {
  animation: blink 1s step-end infinite;
}

/* Enhanced hover effects */
.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

.group:hover .group-hover\:rotate-12 {
  transform: rotate(12deg);
}

/* Responsive breakpoints */
@media (max-width: 640px) {
  .min-h-screen {
    min-height: 100vh;
    padding: 2rem 0;
  }

  .grid-cols-1 {
    gap: 2rem;
  }

  .text-5xl {
    font-size: 2.5rem;
  }

  .text-6xl {
    font-size: 3rem;
  }

  .text-7xl {
    font-size: 3.5rem;
  }

  .w-96 {
    width: 20rem;
  }

  .h-96 {
    height: 20rem;
  }
}

@media (max-width: 768px) {
  .lg\:grid-cols-2 {
    grid-template-columns: 1fr;
  }

  .lg\:gap-16 {
    gap: 3rem;
  }

  .flex-col {
    flex-direction: column;
  }

  .sm\:flex-row {
    flex-direction: row;
  }
}

/* Glassmorphism effects */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

.bg-white\/60 {
  background-color: rgba(255, 255, 255, 0.6);
}

.dark .bg-gray-800\/60 {
  background-color: rgba(31, 41, 55, 0.6);
}

/* Gradient text effects */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
}

.text-transparent {
  color: transparent;
}

/* Enhanced shadow effects */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Dark mode improvements */
.dark .from-gray-900 {
  --tw-gradient-from: #111827;
}

.dark .to-indigo-950 {
  --tw-gradient-to: #1e1b4b;
}

/* Scroll indicator styling */
.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

/* Performance optimizations */
.animate-float,
.animate-float-delayed,
.animate-pulse-slow,
.animate-bounce-soft,
.animate-spin-slow,
.animate-spin-reverse,
.animate-pulse-glow {
  will-change: transform, opacity;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .animate-slide-in-left,
  .animate-slide-in-right,
  .animate-float,
  .animate-float-delayed,
  .animate-pulse-slow,
  .animate-bounce-soft,
  .animate-spin-slow,
  .animate-spin-reverse,
  .animate-pulse-glow,
  .animate-blink,
  .animate-bounce {
    animation: none;
  }

  .transform {
    transform: none;
  }
}

/* Custom utility classes for spacing and sizing */
.space-y-8 > * + * {
  margin-top: 2rem;
}

.space-y-3 > * + * {
  margin-top: 0.75rem;
}

.space-x-3 > * + * {
  margin-left: 0.75rem;
}

.space-x-4 > * + * {
  margin-left: 1rem;
}

/* Focus states for accessibility */
.focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
    var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
    calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
    var(--tw-shadow, 0 0 #0000);
}

.focus\:ring-indigo-500:focus {
  --tw-ring-color: #6366f1;
}

/* Custom button hover effects */
.group {
  position: relative;
}

.group-hover\:translate-x-1 {
  transition: transform 0.2s ease-in-out;
}

.group-hover\:rotate-12 {
  transition: transform 0.2s ease-in-out;
}

/* Enhanced link styling */
a {
  transition: all 0.2s ease-in-out;
}

a:hover {
  transform: translateY(-1px);
}

/* Status indicator pulse */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
