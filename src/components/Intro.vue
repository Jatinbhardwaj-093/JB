<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();

const firstName = ref("Jatin");
const lastName = ref("Bhardwaj");
const title = ref("Cloud Computing | AI & ML | Mathematics");
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
    class="min-h-screen relative overflow-hidden transition-colors duration-500 text-center"
    style="display: table; width: 100%"
  >
    <!-- Main Content Container -->
    <div style="display: table-cell">
      <div
        class="relative z-10 w-full max-w-4xl mx-auto mt-4 sm:mt-16 text-center"
      >
        <!-- Profile Image -->
        <div
          class="transition-all duration-1000 ease-out transform opacity-0 scale-75 inline-block"
          :class="{ 'opacity-100 scale-100': isLoaded }"
        >
          <div class="relative w-60 h-60 mx-auto">
            <img
              src="../../src/assets/images/profileImage/myimage.webp"
              alt="Profile Photo"
              class="relative w-full h-full object-cover rounded-full border-4 shadow-xl border-slate-700"
            />
          </div>
        </div>

        <!-- Location -->
        <div
          class="transition-all duration-1000 ease-out delay-200 transform opacity-0 translate-y-4"
          :class="{ 'opacity-100 translate-y-0': isLoaded }"
          style="display: block; margin-top: -45px; margin-bottom: 20px"
        >
          <div style="display: inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 inline-block align-middle mr-1 text-gray-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-sm align-middle text-gray-400">
              {{ location }}
            </span>
          </div>
        </div>

        <!-- Name -->
        <div
          class="transition-all duration-1000 ease-out delay-100 transform opacity-0 translate-y-4 block"
          :class="{ 'opacity-100 translate-y-0': isLoaded }"
          style="margin-top: 1.25rem"
        >
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span
              class="bg-clip-text text-transparent bg-gradient-to-r from-gray-50 via-white to-gray-100"
            >
              {{ firstName }} {{ lastName }}
            </span>
          </h1>
        </div>

        <!-- Title -->
        <div
          class="transition-all duration-1000 ease-out delay-200 transform opacity-0 translate-y-4 block"
          :class="{ 'opacity-100 translate-y-0': isLoaded }"
          style="margin-top: 0.75rem"
        >
          <p class="text-lg sm:text-xl font-light tracking-wide text-gray-300">
            {{ title }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div
          class="transition-all duration-1000 ease-out delay-400 transform opacity-0 translate-y-4 block"
          :class="{ 'opacity-100 translate-y-0': isLoaded }"
          style="margin-top: 2rem"
        >
          <router-link
            to="/projects"
            class="block sm:inline-block px-6 py-3 sm:px-8 sm:py-3.5 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 mx-auto sm:mx-2 mb-4 sm:mb-0 bg-gray-600 hover:bg-gray-500 text-white focus:ring-gray-500 focus:ring-offset-slate-900"
            style="max-width: 300px"
          >
            Explore Projects
          </router-link>
          <router-link
            to="/contact"
            class="block sm:inline-block px-6 py-3 sm:px-8 sm:py-3.5 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 mx-auto sm:mx-2 bg-transparent border-2 border-gray-400 text-gray-300 hover:bg-gray-400 hover:text-slate-900 focus:ring-gray-400 focus:ring-offset-slate-900"
            style="max-width: 300px"
          >
            Get in Touch
          </router-link>
        </div>

        <!-- Social Links -->
        <div
          class="transition-all duration-1000 ease-out delay-500 transform opacity-0 translate-y-4 block"
          :class="{ 'opacity-100 translate-y-0': isLoaded }"
          style="margin-top: 2rem"
        >
          <div class="flex items-center justify-center gap-x-4 sm:gap-x-6">
            <!-- LinkedIn -->
            <a
              href="https://www.linkedin.com/in/jatin-bhardwaj-b5962921a/"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link group"
            >
              <div
                class="social-icon-container flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-500 transform group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-6 border-2 border-gray-200/50 dark:border-gray-600/50 group-hover:border-gray-400 dark:group-hover:border-gray-300"
                style="
                  background: linear-gradient(145deg, #f3f4f6, #e5e7eb);
                  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1),
                    inset 0 2px 0 rgba(255, 255, 255, 0.4),
                    inset 0 -2px 0 rgba(0, 0, 0, 0.1);
                "
              >
                <i
                  class="bi bi-linkedin relative z-10 text-xl sm:text-2xl transition-all duration-300 transform group-hover:scale-110 text-gray-300"
                  style="filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))"
                ></i>
              </div>
            </a>

            <!-- GitHub -->
            <a
              href="https://github.com/Jatinbhardwaj-093"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link group"
            >
              <div
                class="social-icon-container flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-500 transform group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-6 border-2 border-gray-600/50 group-hover:border-gray-300"
                style="
                  background: linear-gradient(145deg, #374151, #1f2937);
                  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1),
                    inset 0 2px 0 rgba(255, 255, 255, 0.4),
                    inset 0 -2px 0 rgba(0, 0, 0, 0.1);
                "
              >
                <i
                  class="bi bi-github relative z-10 text-xl sm:text-2xl transition-all duration-300 transform group-hover:scale-110 text-gray-300"
                  style="filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))"
                ></i>
              </div>
            </a>

            <!-- Twitter -->
            <a
              href="https://x.com/Jatin0932"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link group"
            >
              <div
                class="social-icon-container flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-500 transform group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-6 border-2 border-gray-600/50 group-hover:border-gray-300"
                style="
                  background: linear-gradient(145deg, #374151, #1f2937);
                  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1),
                    inset 0 2px 0 rgba(255, 255, 255, 0.4),
                    inset 0 -2px 0 rgba(0, 0, 0, 0.1);
                "
              >
                <i
                  class="bi bi-twitter-x relative z-10 text-xl sm:text-2xl transition-all duration-300 transform group-hover:scale-110 text-gray-300"
                  style="filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))"
                ></i>
              </div>
            </a>

            <!-- Email -->
            <a
              href="mailto:bhardwajjatin093@gmail.com"
              class="social-link group"
            >
              <div
                class="social-icon-container flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-500 transform group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-6 border-2 border-gray-600/50 group-hover:border-gray-300"
                style="
                  background: linear-gradient(145deg, #374151, #1f2937);
                  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1),
                    inset 0 2px 0 rgba(255, 255, 255, 0.4),
                    inset 0 -2px 0 rgba(0, 0, 0, 0.1);
                "
              >
                <i
                  class="bi bi-envelope relative z-10 text-xl sm:text-2xl transition-all duration-300 transform group-hover:scale-110 text-gray-300"
                  style="filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))"
                ></i>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.social-link {
  position: relative;
  perspective: 1200px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.social-icon-container {
  position: relative;
  overflow: visible;
  will-change: transform;
}

/* Enhanced 3D hover effects */
.group:hover .social-icon-container {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15),
    inset 0 3px 0 rgba(255, 255, 255, 0.5), inset 0 -3px 0 rgba(0, 0, 0, 0.2),
    0 0 0 2px rgba(255, 255, 255, 0.2);
}

.group:active .social-icon-container {
  transform: translateY(-6px) rotateY(8deg) rotateX(5deg) scale(1.02) !important;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12), inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Monochrome hover effects - subtle color enhancement */
.group:hover .bi-linkedin,
.group:hover .bi-github,
.group:hover .bi-twitter-x,
.group:hover .bi-envelope {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25)) brightness(1.1);
}

/* Dark mode specific 3D adjustments */
[data-theme="dark"] .group:hover .social-icon-container {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3),
    inset 0 3px 0 rgba(255, 255, 255, 0.2), inset 0 -3px 0 rgba(0, 0, 0, 0.4),
    0 0 0 2px rgba(255, 255, 255, 0.1);
}

/* Background color adjustments for dark mode */
[data-theme="dark"] .group .social-icon-container {
  background: linear-gradient(145deg, #374151, #1f2937) !important;
  border-color: rgba(107, 114, 128, 0.5) !important;
}

[data-theme="dark"] .group:hover .social-icon-container {
  border-color: rgba(156, 163, 175, 0.8) !important;
}

/* Smooth transitions for all elements */
.social-icon-container,
.social-icon-container * {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Ensure proper stacking */
.social-link {
  z-index: 1;
}

.group:hover {
  z-index: 10;
}
</style>
