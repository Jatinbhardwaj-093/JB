<script setup lang="ts">
import { useThemeStore } from "../store/theme";
import { ref, onMounted } from "vue";

const themeStore = useThemeStore();

// Animation states
const cardsVisible = ref(false);

onMounted(() => {
  // Trigger animations on mount with a slight delay
  setTimeout(() => {
    cardsVisible.value = true;
  }, 150);
});

// Education data for easier management
const educationData = [
  {
    id: "cbse",
    title: "Senior Secondary (12th)",
    institution: "Central Board of Secondary Education",
    achievement: "9.4 CGPA",
    status: "Completed",
    year: "2021-2023",
    link: "https://www.cbse.gov.in/cbsenew/cbse.html",
    logo: new URL("../assets/images/Education/cbse.png", import.meta.url).href,
    statusColor: "green",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    id: "iitm",
    title: "BSc in Data Science",
    institution: "Indian Institute of Technology Madras",
    achievement: "Foundation Completed",
    status: "Diploma Level (Current)",
    year: "2023-Present",
    link: "https://study.iitm.ac.in/ds/",
    logo: new URL("../assets/images/Education/IITM.png", import.meta.url).href,
    statusColor: "blue",
    gradient: "from-blue-400 to-indigo-500",
  },
];
</script>

<template>
  <div data-theme="dark" class="w-full">
    <!-- Section Header -->
    <div class="mb-8 text-center">
      <h2
        class="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-50 dark:to-yellow-50 bg-clip-text text-transparent"
      >
        Education Journey
      </h2>
    </div>

    <!-- Desktop View - Enhanced Timeline -->
    <div class="hidden md:block">
      <div class="relative">
        <!-- Timeline Line -->
        <div
          class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-500"
        ></div>

        <!-- Education Cards -->
        <div class="space-y-8">
          <div
            v-for="(edu, index) in educationData"
            :key="edu.id"
            class="education-card-desktop relative flex items-start"
            :class="{ 'animate-fade-in': cardsVisible }"
            :style="{ 'animation-delay': `${index * 200}ms` }"
          >
            <!-- Timeline Dot -->
            <div class="relative z-10 mr-6">
              <div
                class="w-16 h-16 rounded-full bg-white dark:bg-gray-900 shadow-lg border-4 border-white dark:border-gray-900 flex items-center justify-center"
              >
                <a :href="edu.link" target="_blank" rel="noopener noreferrer">
                  <div
                    class="w-12 h-12 rounded-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                    :class="`bg-gradient-to-br ${edu.gradient}`"
                  >
                    <img
                      :src="edu.logo"
                      :alt="edu.institution"
                      class="w-full h-full object-contain p-1.5"
                    />
                  </div>
                </a>
              </div>
            </div>

            <!-- Card Content -->
            <div
              class="flex-1 bg-white dark:bg-gray-900/90 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 backdrop-blur-sm"
            >
              <div class="p-6">
                <!-- Header -->
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h3
                      class="text-xl font-bold text-gray-900 dark:text-white mb-1"
                    >
                      {{ edu.title }}
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 font-medium">
                      {{ edu.institution }}
                    </p>
                  </div>
                  <span
                    class="text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full"
                  >
                    {{ edu.year }}
                  </span>
                </div>

                <!-- Achievement & Status -->
                <div class="flex flex-wrap gap-3">
                  <span
                    class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold"
                    :class="`bg-${edu.statusColor}-100 text-${edu.statusColor}-800 dark:bg-${edu.statusColor}-900/50 dark:text-${edu.statusColor}-300`"
                  >
                    <svg
                      class="w-4 h-4 mr-1.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {{ edu.achievement }}
                  </span>
                  <span
                    v-if="edu.status.includes('Current')"
                    class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300"
                  >
                    <div
                      class="w-2 h-2 bg-orange-500 rounded-full mr-1.5 animate-pulse"
                    ></div>
                    {{ edu.status }}
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {{ edu.status }}
                  </span>
                </div>

                <!-- Progress Bar for Current Education -->
                <div v-if="edu.status.includes('Current')" class="mt-4">
                  <div
                    class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1"
                  >
                    <span>Progress</span>
                    <span>Diploma Level</span>
                  </div>
                  <div
                    class="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2"
                  >
                    <div
                      class="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full relative overflow-hidden"
                      style="width: 60%"
                    >
                      <div
                        class="absolute inset-0 bg-white/20 animate-pulse"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile View - Enhanced Cards -->
    <div class="block md:hidden">
      <div class="space-y-6">
        <div
          v-for="(edu, index) in educationData"
          :key="edu.id"
          class="education-card-mobile relative"
          :class="{ 'animate-slide-up': cardsVisible }"
          :style="{ 'animation-delay': `${index * 150}ms` }"
        >
          <!-- Card -->
          <div
            class="bg-white dark:bg-gray-900/90 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 backdrop-blur-sm overflow-hidden"
          >
            <!-- Header with Gradient -->
            <div class="relative p-4 pb-0">
              <div
                class="absolute inset-0 bg-gradient-to-r opacity-5"
                :class="`${edu.gradient}`"
              ></div>

              <div class="relative flex items-start gap-3">
                <!-- Logo -->
                <div class="flex-shrink-0">
                  <a :href="edu.link" target="_blank" rel="noopener noreferrer">
                    <div
                      class="w-14 h-14 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                      :class="`bg-gradient-to-br ${edu.gradient}`"
                    >
                      <img
                        :src="edu.logo"
                        :alt="edu.institution"
                        class="w-full h-full object-contain p-2"
                      />
                    </div>
                  </a>
                </div>

                <!-- Info -->
                <div class="flex-1 min-w-0">
                  <h3
                    class="font-bold text-lg text-gray-900 dark:text-white mb-1 leading-tight"
                  >
                    {{ edu.title }}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {{ edu.institution }}
                  </p>
                  <span
                    class="inline-block text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md"
                  >
                    {{ edu.year }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="p-4 pt-3">
              <!-- Achievements -->
              <div class="flex flex-wrap gap-2 mb-3">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold"
                  :class="`bg-${edu.statusColor}-100 text-${edu.statusColor}-800 dark:bg-${edu.statusColor}-900/50 dark:text-${edu.statusColor}-300`"
                >
                  <svg
                    class="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ edu.achievement }}
                </span>
                <span
                  v-if="edu.status.includes('Current')"
                  class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300"
                >
                  <div
                    class="w-2 h-2 bg-orange-500 rounded-full mr-1 animate-pulse"
                  ></div>
                  {{ edu.status }}
                </span>
                <span
                  v-else
                  class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {{ edu.status }}
                </span>
              </div>

              <!-- Progress Bar for Current Education -->
              <div v-if="edu.status.includes('Current')" class="mt-3">
                <div
                  class="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1"
                >
                  <span>Academic Progress</span>
                  <span>60%</span>
                </div>
                <div
                  class="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5"
                >
                  <div
                    class="bg-gradient-to-r from-blue-500 to-indigo-600 h-1.5 rounded-full relative overflow-hidden"
                    style="width: 60%"
                  >
                    <div
                      class="absolute inset-0 bg-white/30 animate-pulse"
                    ></div>
                  </div>
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
/* Enhanced Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Desktop Cards */
.education-card-desktop {
  opacity: 0;
  transform: translateY(30px);
}

.education-card-desktop.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

/* Mobile Cards */
.education-card-mobile {
  opacity: 0;
  transform: translateY(20px);
}

.education-card-mobile.animate-slide-up {
  animation: slideUp 0.5s ease-out forwards;
}

/* Hover Effects */
.education-card-desktop:hover {
  transform: translateX(8px);
  transition: transform 0.3s ease;
}

.education-card-mobile:active {
  transform: scale(0.98);
  transition: transform 0.2s ease;
}

/* Timeline Line Animation */
.education-card-desktop::before {
  content: "";
  position: absolute;
  left: 2rem;
  top: 2rem;
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

/* Card Enhancement */
.education-card-desktop > div,
.education-card-mobile > div {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.education-card-desktop > div:hover,
.education-card-mobile > div:hover {
  transform: translateY(-2px);
}

/* Progress Bar Animation */
@keyframes progressFill {
  from {
    width: 0%;
  }
  to {
    width: 60%;
  }
}

.education-card-desktop.animate-fade-in [style*="width: 60%"],
.education-card-mobile.animate-slide-up [style*="width: 60%"] {
  animation: progressFill 1.5s ease-out 0.8s both;
  width: 0%;
}

/* Responsive Enhancements */
@media (max-width: 640px) {
  .education-card-mobile {
    margin: 0 -0.5rem;
  }
}

/* Dark mode specific animations */
[data-theme="dark"] .education-card-desktop::before {
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.1);
}

/* Gradient text animation */
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

h2 {
  background-size: 200% 200%;
  animation: gradientShift 3s ease-in-out infinite;
}

/* Subtle floating animation for logos */
.education-card-desktop img,
.education-card-mobile img {
  transition: transform 0.3s ease;
}

.education-card-desktop:hover img,
.education-card-mobile:hover img {
  transform: scale(1.05) rotate(2deg);
}

/* Enhanced shadow on hover */
.education-card-desktop > div:hover,
.education-card-mobile > div:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

[data-theme="dark"] .education-card-desktop > div:hover,
[data-theme="dark"] .education-card-mobile > div:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 10px 10px -5px rgba(0, 0, 0, 0.2);
}
</style>
