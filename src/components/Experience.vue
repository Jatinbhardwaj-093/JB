<script setup lang="ts">
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();

const experiences = [
  {
    title: "Influencer-Sponsor Engagement Platform",
    points: [
      "This project was developed as part of my MAD-1 course. I created a fully functional application to facilitate collaboration and deals between sponsors and influencers.",
      "Few applications offer reliable services for sponsorship management. Despite being my first project, I focused on adding scalable features to the application.",
      "I engaged with local influencers to understand their needs for a quick and easy sponsorship platform. Based on their feedback, I kept the UI simple and added a statistics feature.",
    ],
    className: "border-l-indigo-600",
  },
  {
    title: "HouseHold Services Platform",
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
    <div class="space-y-8">
      <div
        v-for="(exp, index) in experiences"
        :key="index"
        class="rounded-lg overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900/80 shadow-md"
      >
        <div class="border-l-4 p-5 relative" :class="exp.className">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
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
</style>
