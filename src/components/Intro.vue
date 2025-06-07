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
              src="../../src/assets/images/profileImage/myimage.png"
              alt="Profile Photo"
              class="relative w-full h-full object-cover rounded-full border-4 shadow-xl"
              :class="
                themeStore.theme === 'dark'
                  ? 'border-slate-700'
                  : 'border-white'
              "
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
              class="h-5 w-5 inline-block align-middle mr-1"
              :class="
                themeStore.theme === 'dark' ? 'text-sky-400' : 'text-sky-600'
              "
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
            <span
              class="text-sm align-middle"
              :class="
                themeStore.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              "
            >
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
              class="bg-clip-text text-transparent"
              :class="
                themeStore.theme === 'dark'
                  ? 'bg-gradient-to-r from-sky-300 via-indigo-400 to-purple-400'
                  : 'bg-gradient-to-r from-sky-600 via-indigo-700 to-purple-700'
              "
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
          <p
            class="text-lg sm:text-xl font-light tracking-wide"
            :class="
              themeStore.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            "
          >
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
            class="block sm:inline-block px-6 py-3 sm:px-8 sm:py-3.5 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 mx-auto sm:mx-2 mb-4 sm:mb-0"
            style="max-width: 300px"
            :class="
              themeStore.theme === 'dark'
                ? 'bg-sky-500 hover:bg-sky-400 text-white focus:ring-sky-400 focus:ring-offset-slate-900'
                : 'bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-600 focus:ring-offset-gray-50'
            "
          >
            Explore Projects
          </router-link>
          <router-link
            to="/contact"
            class="block sm:inline-block px-6 py-3 sm:px-8 sm:py-3.5 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 mx-auto sm:mx-2"
            style="max-width: 300px"
            :class="
              themeStore.theme === 'dark'
                ? 'bg-transparent border-2 border-indigo-400 text-indigo-300 hover:bg-indigo-400 hover:text-slate-900 focus:ring-indigo-400 focus:ring-offset-slate-900'
                : 'bg-transparent border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-600 hover:text-white focus:ring-indigo-600 focus:ring-offset-gray-50'
            "
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
              class="social-link"
            >
              <div
                class="social-icon-container flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-500"
              >
                <div
                  class="social-icon-bg absolute inset-0 rounded-full transition-all duration-300 opacity-0"
                  :class="
                    themeStore.theme === 'dark'
                      ? 'bg-gradient-to-br from-sky-900 to-indigo-900'
                      : 'bg-gradient-to-br from-sky-100 to-indigo-200'
                  "
                ></div>
                <i
                  class="bi bi-linkedin relative z-10 text-2xl sm:text-3xl transition-all duration-300"
                  :class="
                    themeStore.theme === 'dark'
                      ? 'text-sky-400'
                      : 'text-sky-600'
                  "
                ></i>
                <div class="social-icon-glow"></div>
              </div>
            </a>

            <!-- GitHub -->
            <a
              href="https://github.com/Jatinbhardwaj-093"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
            >
              <div
                class="social-icon-container flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-500"
              >
                <div
                  class="social-icon-bg absolute inset-0 rounded-full transition-all duration-300 opacity-0"
                  :class="
                    themeStore.theme === 'dark'
                      ? 'bg-gradient-to-br from-gray-700 to-gray-900'
                      : 'bg-gradient-to-br from-gray-200 to-gray-300'
                  "
                ></div>
                <i
                  class="bi bi-github relative z-10 text-2xl sm:text-3xl transition-all duration-300"
                  :class="
                    themeStore.theme === 'dark'
                      ? 'text-gray-300'
                      : 'text-gray-800'
                  "
                ></i>
                <div class="social-icon-glow"></div>
              </div>
            </a>

            <!-- Twitter -->
            <a
              href="https://x.com/Jatin0932"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
            >
              <div
                class="social-icon-container flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-500"
              >
                <div
                  class="social-icon-bg absolute inset-0 rounded-full transition-all duration-300 opacity-0"
                  :class="
                    themeStore.theme === 'dark'
                      ? 'bg-gradient-to-br from-blue-900 to-indigo-900'
                      : 'bg-gradient-to-br from-blue-100 to-indigo-100'
                  "
                ></div>
                <i
                  class="bi bi-twitter-x relative z-10 text-2xl sm:text-3xl transition-all duration-300"
                  :class="
                    themeStore.theme === 'dark'
                      ? 'text-gray-300'
                      : 'text-gray-800'
                  "
                ></i>
                <div class="social-icon-glow"></div>
              </div>
            </a>

            <!-- Email -->
            <a href="mailto:bhardwajjatin093@gmail.com" class="social-link">
              <div
                class="social-icon-container flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-500"
              >
                <div
                  class="social-icon-bg absolute inset-0 rounded-full transition-all duration-300 opacity-0"
                  :class="
                    themeStore.theme === 'dark'
                      ? 'bg-gradient-to-br from-indigo-900 to-purple-900'
                      : 'bg-gradient-to-br from-indigo-100 to-purple-100'
                  "
                ></div>
                <i
                  class="bi bi-envelope relative z-10 text-2xl sm:text-3xl transition-all duration-300"
                  :class="
                    themeStore.theme === 'dark'
                      ? 'text-indigo-400'
                      : 'text-indigo-600'
                  "
                ></i>
                <div class="social-icon-glow"></div>
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
  perspective: 1000px;
}

.social-icon-container {
  position: relative;
  overflow: visible;
  will-change: transform;
}

/* Background appears on hover */
.social-icon-bg {
  transform: scale(0);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.social-link:hover .social-icon-bg {
  opacity: 1;
  transform: scale(1.2);
}

/* Hover effect - slight float */
.social-link:hover .social-icon-container {
  transform: translateY(-5px);
}

/* Icon color enhancement on hover */
.social-link:hover i {
  filter: brightness(1.3);
}

/* Glow effect */
.social-icon-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.4s ease-out;
  pointer-events: none;
}

/* LinkedIn glow */
.social-link:hover .bi-linkedin ~ .social-icon-glow {
  opacity: 0.7;
  box-shadow: 0 0 20px 8px rgba(0, 119, 181, 0.4);
}

/* GitHub glow */
.social-link:hover .bi-github ~ .social-icon-glow {
  opacity: 0.7;
  box-shadow: 0 0 20px 8px rgba(110, 118, 129, 0.4);
}

/* Twitter/X glow */
.social-link:hover .bi-twitter-x ~ .social-icon-glow {
  opacity: 0.7;
  box-shadow: 0 0 20px 8px rgba(29, 161, 242, 0.4);
}

/* Email glow */
.social-link:hover .bi-envelope ~ .social-icon-glow {
  opacity: 0.7;
  box-shadow: 0 0 20px 8px rgba(124, 58, 237, 0.4);
}

/* Dark mode adjustments */
:root[data-theme="dark"] .social-link:hover .social-icon-glow {
  opacity: 0.6;
}

/* Pulse animation for the background on hover */
.social-link:hover .social-icon-bg {
  animation: socialIconPulse 2s ease-in-out infinite;
}

@keyframes socialIconPulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
</style>
