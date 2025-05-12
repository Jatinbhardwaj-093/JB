<script setup lang="ts">
import { useThemeStore } from "../store/theme";
import { ref, onMounted } from "vue";

const themeStore = useThemeStore();

// Check if we're in mobile view based on screen width
// Will be used to conditionally render different layouts
const isMobile = window.innerWidth < 768;

// Animation state for mobile
const animationStarted = ref(false);

onMounted(() => {
  // Trigger animations on mount
  animationStarted.value = true;
});
</script>

<template>
  <div :data-theme="themeStore.theme">
    <!-- Desktop View (unchanged) -->
    <div class="hidden md:block">
      <div class="mb-2">
        <div class="flex items-center justify-start gap-2">
          <a href="https://www.cbse.gov.in/cbsenew/cbse.html">
            <div
              class="w-12 h-12 p-2 rounded-full shadow-sm shadow-black"
              :class="{
                'bg-gray-100': themeStore.theme === 'light',
                'bg-[#323232]': themeStore.theme === 'dark',
              }"
            >
              <img src="../assets/images/Education/cbse.png" alt="cbse" />
            </div>
          </a>
          <p
            class="font-bold text-lg"
            :class="{
              'text-white': themeStore.theme === 'dark',
              'text-black': themeStore.theme === 'light',
            }"
          >
            Senior Secondary(12th):
          </p>
          <p
            :class="{
              'text-white': themeStore.theme === 'dark',
              'text-black': themeStore.theme === 'light',
            }"
          >
            Completed 12th Class with 9.4 CGPA
          </p>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-start gap-2">
          <a href="https://study.iitm.ac.in/ds/">
            <div
              class="w-12 h-12 p-1 rounded-full shadow-sm"
              :class="{
                'bg-gray-100 shadow-black': themeStore.theme === 'light',
                'bg-[#323232] shadow-md shadow-black':
                  themeStore.theme === 'dark',
              }"
            >
              <img src="../assets/images/Education/IITM.png" alt="IITM" />
            </div>
          </a>
          <div>
            <div class="flex gap-2 items-center justify-center">
              <p
                class="font-bold text-lg"
                :class="{
                  'text-white': themeStore.theme === 'dark',
                  'text-black': themeStore.theme === 'light',
                }"
              >
                IITM Data Science DEGREE:
              </p>
              <p
                :class="{
                  'text-white': themeStore.theme === 'dark',
                  'text-black': themeStore.theme === 'light',
                }"
              >
                Completed Foundation Last year.
              </p>
            </div>
            <p
              class="font-bold"
              :class="{
                'text-red-500': themeStore.theme === 'dark',
                'text-red-700': themeStore.theme === 'light',
              }"
            >
              Currently at Diploma Level
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Mobile View -->
    <div class="block md:hidden">
      <!-- Education timeline with styled cards - Updated with dots above the line -->
      <div
        class="education-timeline"
      >
        <!-- CBSE Education -->
        <div class="education-card mb-4 relative">
          <!-- Timeline dot - Repositioned to cross the line -->
          <div
            class="absolute -left-6 top-0 h-3 w-3 rounded-full bg-indigo-500 dark:bg-indigo-400 shadow-md z-10"
          ></div>

          <!-- Card content -->
          <div
            class="bg-white dark:bg-gray-800/80 rounded-lg p-3 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
          >
            <div class="flex items-start gap-2">
              <!-- Logo -->
              <div class="flex-shrink-0">
                <a
                  href="https://www.cbse.gov.in/cbsenew/cbse.html"
                  class="inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    class="w-10 h-10 p-1 rounded-lg flex items-center justify-center shadow-sm overflow-hidden"
                    :class="{
                      'bg-white': themeStore.theme === 'light',
                      'bg-gray-700': themeStore.theme === 'dark',
                    }"
                  >
                    <img
                      src="../assets/images/Education/cbse.png"
                      alt="CBSE"
                      class="w-full h-full object-contain"
                    />
                  </div>
                </a>
              </div>

              <!-- Info -->
              <div class="flex-grow">
                <h3
                  class="font-bold text-sm mb-0.5"
                  :class="{
                    'text-gray-900': themeStore.theme === 'light',
                    'text-white': themeStore.theme === 'dark',
                  }"
                >
                  Senior Secondary (12th)
                </h3>

                <div
                  class="text-xs mb-1"
                  :class="{
                    'text-gray-700': themeStore.theme === 'light',
                    'text-gray-300': themeStore.theme === 'dark',
                  }"
                >
                  Central Board of Secondary Education
                </div>

                <div class="flex items-center gap-2">
                  <span
                    class="inline-block px-2 py-0.5 text-xs font-semibold rounded-md bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                  >
                    9.4 CGPA
                  </span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">
                    Completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- IIT Madras Education -->
        <div class="education-card relative">
          <!-- Timeline dot - Repositioned to cross the line -->
          <div
            class="absolute -left-6 top-0 h-3 w-3 rounded-full bg-indigo-500 dark:bg-indigo-400 shadow-md z-10"
          ></div>

          <!-- Card content -->
          <div
            class="bg-white dark:bg-gray-800/80 rounded-lg p-3 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
          >
            <div class="flex items-start gap-2">
              <!-- Logo -->
              <div class="flex-shrink-0">
                <a
                  href="https://study.iitm.ac.in/ds/"
                  class="inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    class="w-10 h-10 p-1 rounded-lg flex items-center justify-center shadow-sm overflow-hidden"
                    :class="{
                      'bg-white': themeStore.theme === 'light',
                      'bg-gray-700': themeStore.theme === 'dark',
                    }"
                  >
                    <img
                      src="../assets/images/Education/IITM.png"
                      alt="IIT Madras"
                      class="w-full h-full object-contain"
                    />
                  </div>
                </a>
              </div>

              <!-- Info -->
              <div class="flex-grow">
                <h3
                  class="font-bold text-sm mb-0.5"
                  :class="{
                    'text-gray-900': themeStore.theme === 'light',
                    'text-white': themeStore.theme === 'dark',
                  }"
                >
                  BSc in Data Science
                </h3>

                <div
                  class="text-xs mb-1"
                  :class="{
                    'text-gray-700': themeStore.theme === 'light',
                    'text-gray-300': themeStore.theme === 'dark',
                  }"
                >
                  Indian Institute of Technology Madras
                </div>

                <div class="flex flex-wrap items-center gap-1.5">
                  <span
                    class="inline-block px-1.5 py-0.5 text-[10px] font-semibold rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                  >
                    Foundation Completed
                  </span>
                  <span
                    class="inline-block px-1.5 py-0.5 text-[10px] font-semibold rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300"
                  >
                    Diploma (Current)
                  </span>
                </div>

                <div
                  class="mt-1 text-[10px] font-medium text-red-600 dark:text-red-400"
                >
                  Currently pursuing Diploma Level
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animation for education cards on mobile */
.education-card {
  animation: slideIn 0.5s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.education-card:nth-child(1) {
  animation-delay: 0.1s;
}

.education-card:nth-child(2) {
  animation-delay: 0.3s;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pulse animation for timeline dots */
.education-card .absolute.-left-6::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
}


/* Mobile optimizations */
@media (max-width: 640px) {
  .education-timeline {
    margin-left: -0.5rem;
    margin-right: -0.5rem;
  }

  .education-card {
    transition: transform 0.2s ease;
  }

  .education-card:active {
    transform: scale(0.98);
  }
}
</style>
