<script setup lang="ts">
import { useThemeStore } from "../store/theme";
import { ref, onMounted, computed, watch } from "vue";

const themeStore = useThemeStore();

// Props
const props = defineProps<{
  mobileActiveTab?: string;
}>();

// Animation states
const cardsVisible = ref(false);
const activeTab = ref("education");

// Watch for mobile tab changes from parent
watch(
  () => props.mobileActiveTab,
  (newTab) => {
    if (newTab && (newTab === "education" || newTab === "hobbies")) {
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

// Education data
const educationData = [
  {
    id: "cbse",
    title: "Senior Secondary (12th)",
    institution: "Central Board of Secondary Education",
    year: "2021-2022",
    link: "https://www.cbse.gov.in/cbsenew/cbse.html",
    logo: new URL("../assets/images/Education/cbse.png", import.meta.url).href,
    gradient: "from-green-400 to-emerald-500",
  },
  {
    id: "iitm",
    title: "BS in Data Science",
    institution: "Indian Institute of Technology Madras",
    year: "2023-Present",
    link: "https://study.iitm.ac.in/ds/",
    logo: new URL("../assets/images/Education/IITM.png", import.meta.url).href,
    gradient: "from-blue-400 to-indigo-500",
  },
];

// Hobbies data
const hobbiesData = [
  {
    id: "maths",
    title: "Mathematics",
    description: "Exploring mathematical concepts and problem-solving",
    icon: computed(() =>
      themeStore.theme === "dark"
        ? new URL("../assets/images/light/Maths_light.png", import.meta.url)
            .href
        : new URL("../assets/images/Dark/Maths_dark.png", import.meta.url).href
    ),
    gradient: "from-purple-400 to-pink-500",
  },
  {
    id: "psychology",
    title: "Human Psychology",
    description: "Understanding human behavior and mental processes",
    icon: computed(() =>
      themeStore.theme === "dark"
        ? new URL(
            "../assets/images/light/Psychology_light.png",
            import.meta.url
          ).href
        : new URL("../assets/images/Dark/Psychology_dark.png", import.meta.url)
            .href
    ),
    gradient: "from-indigo-400 to-purple-500",
  },
  {
    id: "ml",
    title: "Machine Learning",
    description: "Exploring AI algorithms and data science concepts",
    icon: computed(() =>
      themeStore.theme === "dark"
        ? new URL("../assets/images/light/ML_light.png", import.meta.url).href
        : new URL("../assets/images/Dark/Ml_dark.png", import.meta.url).href
    ),
    gradient: "from-blue-400 to-indigo-500",
  },
];

const switchTab = (tab: string) => {
  activeTab.value = tab;
  cardsVisible.value = false;
  setTimeout(() => {
    cardsVisible.value = true;
  }, 150);
};
</script>

<template>
  <div :data-theme="themeStore.theme" class="w-full">
    <!-- Section Header with Tab Switcher for Desktop -->
    <div class="mb-8">
      <!-- Desktop Tab Switcher -->
      <div class="hidden md:block text-center mb-6">
        <p
          class="text-3xl font-bold mb-8"
          :class="{
            'text-white': themeStore.theme === 'dark',
            'text-black': themeStore.theme === 'light',
          }"
        >
          {{
            activeTab === "education"
              ? "Education Journey"
              : "Personal Interests"
          }}
        </p>

        <!-- Clean Tab Switcher -->
        <div
          class="relative inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 shadow-sm"
        >
          <button
            @click="switchTab('education')"
            class="px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-2 relative focus:outline-none"
            :class="{
              'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm':
                activeTab === 'education',
              'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200':
                activeTab !== 'education',
            }"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.75 2.524z"
              />
            </svg>
            Education
          </button>
          <button
            @click="switchTab('hobbies')"
            class="px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-2 relative focus:outline-none"
            :class="{
              'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm':
                activeTab === 'hobbies',
              'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200':
                activeTab !== 'hobbies',
            }"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              />
            </svg>
            Hobbies
          </button>
          <!-- Simple Indicator -->
          <span
            class="absolute bottom-1 left-1 h-0.5 rounded bg-indigo-500 transition-all duration-200"
            :style="{
              width: 'calc(50% - 0.5rem)',
              transform:
                activeTab === 'education'
                  ? 'translateX(0)'
                  : 'translateX(100%)',
            }"
          ></span>
        </div>
      </div>

      <!-- Mobile Headers -->
      <div class="block md:hidden text-center">
        <p
          class="text-2xl font-bold mb-2"
          :class="{
            'text-white': themeStore.theme === 'dark',
            'text-black': themeStore.theme === 'light',
          }"
        >
          {{
            activeTab === "education"
              ? "Education Journey"
              : "Personal Interests"
          }}
        </p>
        <div class="h-1 w-24 bg-indigo-600 mx-auto rounded-full mb-6"></div>
      </div>
    </div>

    <!-- Education Content -->
    <div v-if="activeTab === 'education'" class="education-content">
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
                  class="w-16 h-16 rounded-full bg-white dark:bg-gray-800 shadow-lg border-4 border-white dark:border-gray-800 flex items-center justify-center"
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
                class="flex-1 bg-white dark:bg-gray-800/90 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 backdrop-blur-sm"
              >
                <div class="p-6">
                  <!-- Header -->
                  <div class="flex items-start justify-between mb-4">
                    <div>
                      <p
                        class="text-xl font-bold text-gray-600 dark:text-gray-300 mb-1"
                      >
                        {{ edu.title }}
                      </p>
                      <p class="text-gray-600 dark:text-gray-300 font-medium">
                        {{ edu.institution }}
                      </p>
                    </div>
                    <span
                      class="text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full"
                    >
                      {{ edu.year }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Education View -->
      <div class="block md:hidden mb-8">
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
              class="bg-white dark:bg-gray-800/90 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 backdrop-blur-sm overflow-hidden"
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
                    <a
                      :href="edu.link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
                    <p
                      class="font-bold text-lg text-gray-600 dark:text-gray-300 mb-1 leading-tight"
                    >
                      {{ edu.title }}
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {{ edu.institution }}
                    </p>
                    <span
                      class="inline-block text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md"
                    >
                      {{ edu.year }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Content -->
              <div class="p-4 pt-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hobbies Content -->
    <div v-if="activeTab === 'hobbies'" class="hobbies-content">
      <!-- Desktop View - Enhanced Cards -->
      <div class="hidden md:block">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            v-for="(hobby, index) in hobbiesData"
            :key="hobby.id"
            class="hobby-card-desktop"
            :class="{ 'animate-fade-in': cardsVisible }"
            :style="{ 'animation-delay': `${index * 200}ms` }"
          >
            <div
              class="bg-white dark:bg-gray-800/90 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 backdrop-blur-sm overflow-hidden group"
            >
              <!-- Header with Gradient -->
              <div class="relative p-6 pb-4">
                <div
                  class="absolute inset-0 bg-gradient-to-br opacity-10"
                  :class="`${hobby.gradient}`"
                ></div>

                <div class="relative flex flex-col items-center text-center">
                  <!-- Icon -->
                  <div
                    class="w-20 h-20 rounded-2xl overflow-hidden shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300"
                    :class="`bg-gradient-to-br ${hobby.gradient}`"
                  >
                    <img
                      :src="hobby.icon.value"
                      :alt="hobby.title"
                      class="w-full h-full object-contain p-3"
                    />
                  </div>

                  <!-- Title -->
                  <p
                    class="text-xl font-bold mb-2 text-gray-600 dark:text-gray-300"
                  >
                    {{ hobby.title }}
                  </p>

                  <!-- Description -->
                  <p
                    class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed"
                  >
                    {{ hobby.description }}
                  </p>
                </div>
              </div>

              <!-- Decorative Bottom -->
              <div
                class="h-1 bg-gradient-to-r"
                :class="`${hobby.gradient}`"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Hobbies View -->
      <div class="block md:hidden">
        <div class="space-y-4">
          <div
            v-for="(hobby, index) in hobbiesData"
            :key="hobby.id"
            class="hobby-card-mobile"
            :class="{ 'animate-slide-up': cardsVisible }"
            :style="{ 'animation-delay': `${index * 150}ms` }"
          >
            <div
              class="bg-white dark:bg-gray-800/90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 backdrop-blur-sm overflow-hidden"
            >
              <div class="p-4">
                <div class="flex items-center gap-3">
                  <!-- Icon -->
                  <div
                    class="w-12 h-12 rounded-lg overflow-hidden shadow-md"
                    :class="`bg-gradient-to-br ${hobby.gradient}`"
                  >
                    <img
                      :src="hobby.icon.value"
                      :alt="hobby.title"
                      class="w-full h-full object-contain p-2"
                    />
                  </div>

                  <!-- Info -->
                  <div class="flex-1">
                    <p
                      class="font-bold text-lg text-gray-600 dark:text-gray-300 mb-1"
                    >
                      {{ hobby.title }}
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-300">
                      {{ hobby.description }}
                    </p>
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
.education-card-desktop,
.hobby-card-desktop {
  opacity: 0;
  transform: translateY(30px);
}

.education-card-desktop.animate-fade-in,
.hobby-card-desktop.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

/* Mobile Cards */
.education-card-mobile,
.hobby-card-mobile {
  opacity: 0;
  transform: translateY(20px);
}

.education-card-mobile.animate-slide-up,
.hobby-card-mobile.animate-slide-up {
  animation: slideUp 0.5s ease-out forwards;
}

/* Hover Effects */
.education-card-desktop:hover {
  transform: translateX(8px);
  transition: transform 0.3s ease;
}

.hobby-card-desktop:hover {
  transform: translateY(-8px);
  transition: transform 0.3s ease;
}

.education-card-mobile:active,
.hobby-card-mobile:active {
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

/* Tab Animation */
@keyframes tabSwitch {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.education-content,
.hobbies-content {
  animation: tabSwitch 0.4s ease-out;
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

/* Enhanced shadow on hover */
.education-card-desktop > div:hover,
.education-card-mobile > div:hover,
.hobby-card-desktop > div:hover,
.hobby-card-mobile > div:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

[data-theme="dark"] .education-card-desktop > div:hover,
[data-theme="dark"] .education-card-mobile > div:hover,
[data-theme="dark"] .hobby-card-desktop > div:hover,
[data-theme="dark"] .hobby-card-mobile > div:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 10px 10px -5px rgba(0, 0, 0, 0.2);
}
</style>
