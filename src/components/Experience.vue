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
    title: "Influencer-Sponsor Engagement Platform",
    summary:
      "A platform connecting influencers with sponsors, developed during my MAD-1 course.",
    points: [
      "This project was developed as part of my MAD-1 course. I created a fully functional application to facilitate collaboration and deals between sponsors and influencers.",
      "Few applications offer reliable services for sponsorship management. Despite being my first project, I focused on adding scalable features to the application.",
      "I engaged with local influencers to understand their needs for a quick and easy sponsorship platform. Based on their feedback, I kept the UI simple and added a statistics feature.",
    ],
    className: "border-l-indigo-600",
  },
  {
    title: "HouseHold Services Platform",
    summary:
      "A service booking platform with robust pricing controls, built with advanced frameworks.",
    points: [
      "This project was developed as part of my MAD-2 course. This time, I used more advanced frameworks as part of the learning process.",
      "One of the major issues addressed in this project is the difficulty in pricing between service providers and customers. I aimed to solve this issue within the application.",
      "I eliminated the complexities of fluctuating prices and overpricing by allowing the service details to be managed by the admin, ensuring better control over pricing and services.",
    ],
    className: "border-l-purple-600",
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
          <h3
            class="text-xl font-bold mb-3"
            :class="{
              'text-gray-700': themeStore.theme === 'light',
              'text-white': themeStore.theme === 'dark',
            }"
          >
            {{ exp.title }}
          </h3>

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
            <h3
              class="font-bold text-base"
              :class="{
                'text-gray-800': themeStore.theme === 'light',
                'text-white': themeStore.theme === 'dark',
              }"
            >
              {{ exp.title }}
            </h3>
          </div>

          <!-- Toggle Icon -->
          <div
            class="transform transition-transform"
            :class="isExpanded(index) ? 'rotate-180' : ''"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-500 dark:text-gray-400"
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

        <!-- Brief Summary (Always visible) -->
        <div class="px-4 pb-3 pt-0">
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
                class="h-4 w-4 text-indigo-600 dark:text-indigo-400 mr-2 mt-0.5 flex-shrink-0"
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
