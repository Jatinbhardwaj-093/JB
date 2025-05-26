<script setup lang="ts">
import { useThemeStore } from "../store/theme";
import { ref, computed } from "vue";

const themeStore = useThemeStore();
const expandedItems = ref<number[]>([]);

// Function to check if item is expanded
const isExpanded = (index: number) => expandedItems.value.includes(index);

// Function to toggle expand/collapse
const toggleExpand = (index: number) => {
  if (isExpanded(index)) {
    expandedItems.value = expandedItems.value.filter((i) => i !== index);
  } else {
    expandedItems.value.push(index);
  }
};

// Check if we're in mobile view
const isMobile = computed(() => {
  return window.innerWidth < 768;
});

const experiences = [
  {
    title: "Google Summer of Code @Sympy",
    timeline: "May 2025 - Present",
    summary:
      "Contributing to open source software development through Google Summer of Code from May 2025 to present.",
    points: [
      "Implementing a domain system for formal power series in SymPy, enhancing the ring_series module with PowerSeriesRing, PowerSeriesPolyRing, and PowerSeriesElement classes.",
      "Developing efficient series expansions and domain integration for arithmetic over diverse coefficient domains (QQ, RR) with a robust API for Taylor expansions of functions like sin and exp.",
      "Creating comprehensive documentation, examples, and unit tests to ensure reliability and ease of use for the new power series functionality.",
      "Optimizing the ring_series module and fixing bugs to improve performance and integration with SymPy's core symbolic computation engine.",
    ],
    className: "border-l-indigo-600",
  },
];
</script>

<template>
  <div>
    <!-- Desktop Experience View -->
    <div class="hidden md:block space-y-8">
      <div
        v-for="(exp, index) in experiences"
        :key="index"
        class="rounded-lg overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900/80 shadow-md"
      >
        <div class="border-l-4 p-5 relative" :class="exp.className">
          <div class="flex justify-between items-center mb-3">
            <h3
              class="text-xl font-bold"
              :class="{
                'text-gray-700': themeStore.theme === 'light',
                'text-white': themeStore.theme === 'dark',
              }"
            >
              {{ exp.title }}
            </h3>
            <span
              class="text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
            >
              {{ exp.timeline }}
            </span>
          </div>

          <ul class="space-y-3">
            <li
              v-for="(point, i) in exp.points"
              :key="i"
              class="flex items-start"
            >
              <svg
                class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <p class="text-gray-700 dark:text-gray-300">{{ point }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Mobile Experience View with Accordion -->
    <div class="md:hidden space-y-4">
      <div
        v-for="(exp, index) in experiences"
        :key="index"
        class="experience-card rounded-lg overflow-hidden bg-white dark:bg-gray-800/80 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <!-- Card Header with Toggle -->
        <div
          class="p-4 flex items-center justify-between cursor-pointer"
          :class="{
            'border-b border-gray-100 dark:border-gray-700': isExpanded(index),
          }"
          @click="toggleExpand(index)"
        >
          <div class="flex items-center space-x-3">
            <!-- Colored dot indicator -->
            <div
              class="h-3 w-3 rounded-full flex-shrink-0"
              :class="index === 0 ? 'bg-indigo-600' : 'bg-purple-600'"
            ></div>

            <!-- Title -->
            <p
              class="font-bold text-base"
              :class="{
                'text-gray-800': themeStore.theme === 'light',
                'text-white': themeStore.theme === 'dark',
              }"
            >
              {{ exp.title }}
            </p>
          </div>

          <!-- Toggle Icon -->
          <div
            class="transform transition-transform"
            :class="isExpanded(index) ? 'rotate-180' : ''"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 text-indigo-600 dark:text-indigo-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke-width="1.5"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>

        <!-- Brief Summary and Timeline (Always visible) -->
        <div class="px-4 pb-1 pt-0">
          <!-- Timeline badge -->
          <div class="flex justify-start mb-2">
            <span
              class="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
            >
              {{ exp.timeline }}
            </span>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ exp.summary }}
          </p>
        </div>

        <!-- Expandable Content -->
        <div
          v-show="isExpanded(index)"
          class="px-4 pb-4 pt-2 animate-expand-content"
        >
          <ul class="space-y-3 mt-2">
            <li
              v-for="(point, i) in exp.points"
              :key="i"
              class="flex items-start animate-fade-in"
              :style="{ animationDelay: `${i * 100}ms` }"
            >
              <svg
                class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ point }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Subtle hover effect for experience items */
.rounded-lg {
  transition: all 0.3s ease;
}

.rounded-lg:hover {
  transform: translateX(3px);
}

/* Mobile specific animations */
.experience-card {
  transition: all 0.3s ease;
}

.animate-expand-content {
  animation: expandContent 0.3s ease-out forwards;
  transform-origin: top;
  overflow: hidden;
}

@keyframes expandContent {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* Card touch feedback for mobile */
@media (max-width: 767px) {
  .experience-card {
    transition: box-shadow 0.3s ease, transform 0.2s ease;
  }

  .experience-card:active {
    transform: scale(0.98);
  }
}
</style>
