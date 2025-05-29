<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();

// Props
const props = defineProps<{
  mobileActiveTab?: string;
}>();

// Animation states
const cardsVisible = ref(false);
const activeTab = ref("orchestration");

// Watch for mobile tab changes from parent
watch(
  () => props.mobileActiveTab,
  (newTab) => {
    if (newTab && ["orchestration", "ml"].includes(newTab)) {
      activeTab.value = newTab;
      // Reset animation when tab changes
      cardsVisible.value = false;
      setTimeout(() => {
        cardsVisible.value = true;
      }, 150);
    }
  },
  { immediate: true }
);

onMounted(() => {
  // Trigger animations on mount with a slight delay
  setTimeout(() => {
    cardsVisible.value = true;
  }, 150);
});

// Function to switch between tabs
const switchTab = (tab: string) => {
  activeTab.value = tab;
  cardsVisible.value = false;
  setTimeout(() => {
    cardsVisible.value = true;
  }, 150);
};

interface Skill {
  name: string;
  img: string;
  description: string;
  category: string;
  gradient: string;
}

// Technology data organized by categories
const technologyData = {
  orchestration: {
    id: "orchestration",
    title: "Orchestration & DevOps",
    description:
      "Container orchestration, CI/CD, and infrastructure management",
    icon: "🐳",
    gradient: "from-blue-400 to-cyan-500",
    technologies: [
      {
        name: "Go",
        img: "Go.png",
        description: "Systems programming language",
      },
      {
        name: "Jenkins",
        img: "Jenkins.png",
        description: "CI/CD automation",
      },
      {
        name: "Docker",
        img: "Docker.png",
        description: "Container platform",
      },
      {
        name: "Git",
        img: "Git.png",
        description: "Version control system",
      },
      {
        name: "Helm",
        img: "Helm.png",
        description: "Kubernetes package manager",
      },
      {
        name: "Kubernetes",
        img: "Kubernetes.png",
        description: "Container orchestration",
      },
    ],
  },
  ml: {
    id: "ml",
    title: "Machine Learning & Data Science",
    description: "AI/ML frameworks, data analysis, and visualization tools",
    icon: "🤖",
    gradient: "from-purple-400 to-pink-500",
    technologies: [
      {
        name: "Python",
        img: "Python.png",
        description: "Programming language",
      },
      {
        name: "TensorFlow",
        img: "TensorFlow.png",
        description: "ML framework",
      },
      {
        name: "Pandas",
        img: "Pandas.png",
        description: "Data manipulation",
      },
      {
        name: "Git",
        img: "Git.png",
        description: "Version control system",
      },
      {
        name: "Seaborn",
        img: "seaborn.png",
        description: "Data visualization",
      },
      {
        name: "NumPy",
        img: "NumPy.png",
        description: "Numerical computing",
      },
    ],
  },
};

const getImageUrl = (name: string) => {
  try {
    return new URL(`../assets/images/Technology/${name}`, import.meta.url).href;
  } catch (error) {
    console.warn(`Image ${name} not found`);
    return "";
  }
};
</script>

<template>
  <div :data-theme="themeStore.theme" class="w-full">
    <!-- Section Header with Tab Switcher -->
    <div class="mb-8">
      <!-- Desktop Tab Switcher -->
      <div class="hidden md:block text-center mb-6">
        <!-- Tab Buttons -->
        <div
          class="inline-flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 shadow-lg"
        >
          <button
            @click="switchTab('orchestration')"
            class="px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
            :class="{
              'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md':
                activeTab === 'orchestration',
              'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200':
                activeTab !== 'orchestration',
            }"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M8.34 10.52A2.001 2.001 0 0010 13a2 2 0 002-2 2.001 2.001 0 00-1.66-1.97L11 7.053C11.9 6.482 13.142 6 15 6c0-2.168-3.663-4-8-4S-1 3.832-1 6c2.667 0 5 0 5 0l1.66 1.97C4.639 8.225 4 9.033 4 10c0 1.386 1.167 2.5 2.67 2.5.871 0 1.379-.208 1.67-.48zm1.66 4.47l-.34 3.2c-2.98.18-5.192.79-8 2.79.3 1.01 0 2-1 2 1.32 0 1.999.897 2 3.01.167-.01.33 0 .5 0 3.12-1.61 5.51-2.47 10-2.5 4.49.03 6.88.89 10 2.5.17 0 .333-.01.5 0 0-2.113.68-3.01 2-3.01-1 0-1.3-.99-1-2-2.808-2-5.02-2.61-8-2.79L16.66 15c.23-.131.34-.24.34-.48 0-1.386-1.167-2.5-2.67-2.5-.871 0-1.38.208-1.67.48z"
              />
            </svg>
            Orchestration
          </button>
          <button
            @click="switchTab('ml')"
            class="px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
            :class="{
              'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-md':
                activeTab === 'ml',
              'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200':
                activeTab !== 'ml',
            }"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M6 5a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h4a1 1 0 100-2H7zM5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              />
            </svg>
            Machine Learning
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Tab Buttons -->
    <div class="flex md:hidden justify-center space-x-3 mb-6">

      <div class="flex justify-center space-x-3 w-full">
        <button
          @click="switchTab('orchestration')"
          class="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
          :class="{
            'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 shadow-sm':
              activeTab === 'orchestration',
            'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400':
              activeTab !== 'orchestration',
          }"
        >
          DevOps
        </button>
        <button
          @click="switchTab('ml')"
          class="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
          :class="{
            'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 shadow-sm':
              activeTab === 'ml',
            'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400':
              activeTab !== 'ml',
          }"
        >
          ML/AI
        </button>
      </div>
    </div>

    <!-- No Skills Section - Removed -->

    <!-- Technology Section: Orchestration -->
    <div v-show="activeTab === 'orchestration'">
      <div
        class="skills-grid"
        :class="{
          'animate-fade-in': cardsVisible && activeTab === 'orchestration',
        }"
      >
        <div
          v-for="(tech, techIndex) in technologyData.orchestration.technologies"
          :key="tech.name"
          class="skill-card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-600"
          :class="{ 'animate-scale-in': cardsVisible }"
          :style="{ 'animation-delay': `${techIndex * 100}ms` }"
        >
          <!-- Mobile View (Logo + Name) -->
          <div class="md:hidden p-3 flex flex-col items-center">
            <img
              :src="getImageUrl(tech.img)"
              :alt="`${tech.name} icon`"
              class="w-12 h-12 object-contain mb-2"
            />
            <p class="text-sm font-medium text-gray-800 dark:text-gray-200">
              {{ tech.name }}
            </p>
          </div>

          <!-- Desktop View (Full Card) -->
          <div class="hidden md:flex p-4 items-center gap-4">
            <!-- Tech Image -->
            <div class="flex-shrink-0">
              <img
                :src="getImageUrl(tech.img)"
                :alt="`${tech.name} icon`"
                class="w-16 h-16 object-contain"
              />
            </div>

            <!-- Text Content -->
            <div class="flex-grow">
              <p
                class="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-200"
              >
                {{ tech.name }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ tech.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Technology Section: Machine Learning -->
    <div v-show="activeTab === 'ml'">
      <div
        class="skills-grid"
        :class="{ 'animate-fade-in': cardsVisible && activeTab === 'ml' }"
      >
        <div
          v-for="(tech, techIndex) in technologyData.ml.technologies"
          :key="tech.name"
          class="skill-card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-600"
          :class="{ 'animate-scale-in': cardsVisible }"
          :style="{ 'animation-delay': `${techIndex * 100}ms` }"
        >
          <!-- Mobile View (Logo + Name) -->
          <div class="md:hidden p-3 flex flex-col items-center">
            <img
              :src="getImageUrl(tech.img)"
              :alt="`${tech.name} icon`"
              class="w-12 h-12 object-contain mb-2"
            />
            <p class="text-sm font-medium text-gray-800 dark:text-gray-200">
              {{ tech.name }}
            </p>
          </div>

          <!-- Desktop View (Full Card) -->
          <div class="hidden md:flex p-4 items-center gap-4">
            <!-- Tech Image -->
            <div class="flex-shrink-0">
              <img
                :src="getImageUrl(tech.img)"
                :alt="`${tech.name} icon`"
                class="w-16 h-16 object-contain"
              />
            </div>

            <!-- Text Content -->
            <div class="flex-grow">
              <p
                class="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-200"
              >
                {{ tech.name }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ tech.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
  width: 100%;
  opacity: 1;
  transform: translateY(0px);
}

@media (min-width: 768px) {
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
  }
}

.skill-card {
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
}

.skill-card.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

/* Expanded animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
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

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.skill-card:hover {
  transform: translateY(-8px);
  transition: transform 0.3s ease;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.skill-card:hover img {
  transform: scale(1.1);
}

/* Dark mode adjustments */
[data-theme="dark"] .skill-card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 10px 10px -5px rgba(0, 0, 0, 0.2);
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

/* Animation classes for tab switching */
.skills-grid.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-scale-in {
  animation: scaleIn 0.4s ease-out forwards;
}
</style>
