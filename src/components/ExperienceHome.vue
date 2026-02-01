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
    title: "Google Summer of Code @SymPy",
    timeline: "May 2025 - Sept 2025",
    summary:
      "Open source contributor at SymPy during Google Summer of Code 2025.",
    points: [
      "Implemented formal power series domain system for symbolic mathematics",
      "Built dual backend architecture with Python and Cython for performance",
      "Achieved 85x-1680x speedup with optimized implementations",
      "Developed comprehensive testing with pytest and Hypothesis",
    ],
    className: "border-l-gray-600",
  },
];
</script>

<template>
  <div>
    <!-- Desktop Experience View -->
    <div class="hidden md:block mt-6">
      <div
        v-for="(exp, index) in experiences"
        :key="index"
        class="py-6 border-b border-gray-200 dark:border-gray-800 last:border-b-0"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
            >
              {{ exp.title }}
            </h3>
            <span
              class="text-sm text-gray-500 dark:text-gray-400"
            >
              {{ exp.timeline }}
            </span>
          </div>
        </div>

        <ul class="space-y-2.5">
          <li
            v-for="(point, i) in exp.points"
            :key="i"
            class="flex items-start"
          >
            <span class="text-gray-400 dark:text-gray-500 mr-3 mt-1 text-sm">•</span>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ point }}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- Mobile Experience View with Accordion -->
    <div class="md:hidden mt-6">
      <div
        v-for="(exp, index) in experiences"
        :key="index"
        class="experience-card py-4 border-b border-gray-200 dark:border-gray-800 last:border-b-0"
      >
        <!-- Card Header with Toggle -->
        <div
          class="flex items-start justify-between cursor-pointer mb-3"
          @click="toggleExpand(index)"
        >
          <div class="flex-1">
            <h3
              class="font-semibold text-base text-gray-900 dark:text-white mb-1"
            >
              {{ exp.title }}
            </h3>
            <span class="text-xs text-gray-500 dark:text-gray-400">
              {{ exp.timeline }}
            </span>
          </div>

          <!-- Toggle Icon -->
          <div
            class="transform transition-transform duration-200 ml-3 mt-1"
            :class="isExpanded(index) ? 'rotate-180' : ''"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400 dark:text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>

        <!-- Brief Summary -->
        <div class="mb-3">
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ exp.summary }}
          </p>
        </div>

        <!-- Expandable Content -->
        <div
          v-show="isExpanded(index)"
          class="animate-expand-content"
        >
          <ul class="space-y-2.5 mt-3">
            <li
              v-for="(point, i) in exp.points"
              :key="i"
              class="flex items-start"
              :style="{ animationDelay: `${i * 100}ms` }"
            >
              <span class="text-gray-400 dark:text-gray-500 mr-3 mt-1 text-sm">•</span>
              <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
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
/* Expand animation */
.animate-expand-content {
  animation: expandContent 0.25s ease-out forwards;
  transform-origin: top;
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
</style>
