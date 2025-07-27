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
    gradient: "from-gray-400 to-gray-600",
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
    gradient: "from-gray-500 to-gray-700",
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
  <div data-theme="dark" class="w-full">
    <!-- Section Header with Tab Switcher -->
    <div class="mb-8">
      <!-- Desktop Tab Switcher -->
      <div class="hidden md:block text-center mb-6">
        <!-- Clean Tab Switcher -->
        <div
          class="relative inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 shadow-sm"
        >
          <button
            @click="switchTab('orchestration')"
            class="px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-2 relative focus:outline-none"
            :class="{
              'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm':
                activeTab === 'orchestration',
              'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200':
                activeTab !== 'orchestration',
            }"
          >
            DevOps
          </button>
          <button
            @click="switchTab('ml')"
            class="px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-2 relative focus:outline-none"
            :class="{
              'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm':
                activeTab === 'ml',
              'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200':
                activeTab !== 'ml',
            }"
          >
            ML/AI
          </button>
          <!-- Simple Indicator -->
          <span
            class="absolute bottom-1 left-1 h-0.5 rounded bg-gray-600 transition-all duration-200"
            :style="{
              width: 'calc(50% - 0.5rem)',
              transform:
                activeTab === 'orchestration'
                  ? 'translateX(0)'
                  : 'translateX(100%)',
            }"
          ></span>
        </div>
      </div>
    </div>

    <!-- Mobile Tab Switcher -->
    <div class="flex md:hidden justify-center space-x-3 mb-6">
      <div
        class="relative flex justify-center w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-1 shadow-sm"
      >
        <button
          @click="switchTab('orchestration')"
          class="flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 relative focus:outline-none"
          :class="{
            'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300 shadow-sm':
              activeTab === 'orchestration',
            'text-gray-600 dark:text-gray-400': activeTab !== 'orchestration',
          }"
        >
          DevOps
        </button>
        <button
          @click="switchTab('ml')"
          class="flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 relative focus:outline-none"
          :class="{
            'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300 shadow-sm':
              activeTab === 'ml',
            'text-gray-600 dark:text-gray-400': activeTab !== 'ml',
          }"
        >
          ML/AI
        </button>
        <!-- Simple Mobile Indicator -->
        <span
          class="absolute bottom-1 left-1 h-0.5 rounded bg-gray-600 transition-all duration-200"
          :style="{
            width: 'calc(50% - 0.5rem)',
            transform:
              activeTab === 'orchestration'
                ? 'translateX(0)'
                : 'translateX(100%)',
          }"
        ></span>
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
