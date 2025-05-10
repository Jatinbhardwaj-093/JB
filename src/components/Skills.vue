<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from "vue";
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();
// Used to force re-render of skill images when theme changes
const themeChanged = ref(0);

// Define skill types for TypeScript
interface Skill {
  name: string;
  img: string;
  proficiency: number;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

// Import base URL for images
const getImageUrl = (name: string) => {
  // Check if we're in dark mode and the icon is either Flask or GitHub
  if (
    themeStore.theme === "dark" &&
    (name === "Flask.png" || name === "GitHub.png")
  ) {
    // Use light version from Technology-Dark folder
    const iconName =
      name === "Flask.png" ? "flask-light.png" : "github-light.png";
    return new URL(
      `../assets/images/Technology-Dark/${iconName}`,
      import.meta.url
    ).href;
  }
  return new URL(`../assets/images/${name}`, import.meta.url).href;
};

// Check if the image should have larger size in dark mode
const shouldEnlargeIcon = (name: string) => {
  return (
    themeStore.theme === "dark" &&
    (name === "Flask.png" || name === "GitHub.png")
  );
};

// Updated skills data with proficiency levels (1-100)
const skillCategories = ref<SkillCategory[]>([
  {
    title: "Programming",
    icon: "code",
    skills: [
      { name: "Python", img: "Python.png", proficiency: 90 },
      { name: "JavaScript", img: "JavaScript.png", proficiency: 85 },
      { name: "TypeScript", img: "TypeScript.png", proficiency: 80 },
      { name: "C", img: "C.png", proficiency: 75 },
      { name: "C++", img: "C++.png", proficiency: 75 },
    ],
  },
  {
    title: "Frontend",
    icon: "layout",
    skills: [
      { name: "Vue.js", img: "Vue.js.png", proficiency: 88 },
      { name: "HTML5", img: "HTML5.png", proficiency: 95 },
      { name: "CSS3", img: "CSS3.png", proficiency: 90 },
      { name: "Tailwind", img: "Tailwind.png", proficiency: 85 },
    ],
  },
  {
    title: "Backend",
    icon: "server",
    skills: [
      { name: "Flask", img: "Flask.png", proficiency: 85 },
      { name: "Django", img: "Django.png", proficiency: 80 },
      { name: "GraphQL", img: "GraphQL.png", proficiency: 75 },
    ],
  },
  {
    title: "Database",
    icon: "database",
    skills: [
      { name: "MongoDB", img: "MongoDB.png", proficiency: 80 },
      { name: "MySQL", img: "MySQL.png", proficiency: 85 },
      { name: "Redis", img: "Redis.png", proficiency: 75 },
      { name: "SQLite", img: "SQLite.png", proficiency: 90 },
    ],
  },
  {
    title: "DevOps",
    icon: "settings",
    skills: [
      { name: "Docker", img: "Docker.png", proficiency: 80 },
      { name: "Git", img: "Git.png", proficiency: 90 },
      { name: "GitHub", img: "GitHub.png", proficiency: 90 },
      { name: "Kubernetes", img: "Kubernetes.png", proficiency: 70 },
    ],
  },
  {
    title: "Data Science",
    icon: "chart-bar",
    skills: [
      { name: "TensorFlow", img: "TensorFlow.png", proficiency: 78 },
      { name: "PyTorch", img: "PyTorch.png", proficiency: 75 },
      { name: "NumPy", img: "NumPy.png", proficiency: 88 },
      { name: "Pandas", img: "Pandas.png", proficiency: 88 },
    ],
  },
]);

const activeCategory = ref(skillCategories.value[0].title);
const isCompactView = ref(false);
const isLoaded = ref(false);

// Get unique skills from all categories (for tag cloud)
const allSkills = computed<Skill[]>(() => {
  const skills: Skill[] = [];
  skillCategories.value.forEach((category) => {
    category.skills.forEach((skill) => {
      skills.push({
        name: skill.name,
        img: skill.img,
        proficiency: skill.proficiency,
      });
    });
  });
  return skills.sort((a, b) => b.proficiency - a.proficiency);
});

// Mobile compactView detection
const checkViewportSize = () => {
  isCompactView.value = window.innerWidth < 768;
};

// Animate skill bars on component mount
onMounted(() => {
  checkViewportSize();
  window.addEventListener("resize", checkViewportSize);

  // Small delay to allow component to mount before animations
  setTimeout(() => {
    isLoaded.value = true;
  }, 300);
});

// Watch for theme changes to update Flask and GitHub icons
watchEffect(() => {
  // When theme changes, increment to trigger re-render
  themeChanged.value += themeStore.theme === "dark" ? 1 : 0;
});

// Get icon for each category
const getCategoryIcon = (iconName: string) => {
  const icons: Record<string, string> = {
    code: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>`,
    layout: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>`,
    server: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd" />
              </svg>`,
    database: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
              </svg>`,
    settings: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              </svg>`,
    "chart-bar": `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>`,
  };

  return icons[iconName] || icons["code"];
};

// Get gradient classes based on proficiency
const getGradientClass = (proficiency: number): string => {
  if (proficiency >= 90) return "from-green-400 to-green-600";
  if (proficiency >= 80) return "from-blue-400 to-blue-600";
  if (proficiency >= 70) return "from-indigo-400 to-indigo-600";
  return "from-purple-400 to-purple-600";
};

// Get the proficiency level text
const getProficiencyText = (proficiency: number): string => {
  if (proficiency >= 90) return "Expert";
  if (proficiency >= 80) return "Advanced";
  if (proficiency >= 70) return "Proficient";
  return "Intermediate";
};
</script>

<template>
  <section class="py-6 overflow-hidden">
    <div class="container mx-auto px-4 overflow-hidden">
      <!-- Desktop Skills View -->
      <div class="hidden md:block">
        <!-- Category Navigation -->
        <div class="mb-8">
          <div class="flex flex-wrap justify-center gap-3">
            <button
              v-for="category in skillCategories"
              :key="category.title"
              @click="activeCategory = category.title"
              class="py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none"
              :class="{
                'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md':
                  activeCategory === category.title,
                'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600':
                  activeCategory !== category.title,
              }"
            >
              <div class="flex items-center space-x-2">
                <span v-html="getCategoryIcon(category.icon)"></span>
                <span>{{ category.title }}</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Skills Display Area -->
        <div
          class="skills-container bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 transition-all duration-500"
        >
          <div
            v-for="category in skillCategories"
            :key="category.title"
            :class="{ hidden: category.title !== activeCategory }"
          >
            <h3
              class="text-xl font-bold mb-6 text-black flex items-center"
              :class="{ 'text-white': themeStore.theme === 'dark' }"
            >
              <span
                v-html="getCategoryIcon(category.icon)"
                class="mr-2 text-indigo-600"
              ></span>
              {{ category.title }} Skills
            </h3>

            <div class="grid gap-y-8">
              <div
                v-for="(skill, index) in category.skills"
                :key="index"
                class="skill-item"
              >
                <div class="flex items-center mb-2">
                  <div
                    class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 shadow-md flex-shrink-0 mr-3"
                    :class="{
                      'p-2': !shouldEnlargeIcon(skill.img),
                      'p-0': shouldEnlargeIcon(skill.img),
                    }"
                  >
                    <img
                      :src="getImageUrl(skill.img) + (themeChanged ? '' : '')"
                      :alt="`${skill.name} icon`"
                      class="w-full h-full object-contain scale-110"
                      :class="{ 'scale-125': shouldEnlargeIcon(skill.img) }"
                    />
                  </div>
                  <div class="flex justify-between items-center w-full">
                    <span
                      class="font-medium text-black"
                      :class="{ 'text-white': themeStore.theme === 'dark' }"
                    >
                      {{ skill.name }}</span
                    >
                    <span class="text-sm text-gray-600 dark:text-gray-400">{{
                      getProficiencyText(skill.proficiency)
                    }}</span>
                  </div>
                </div>

                <div
                  class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                >
                  <div
                    class="h-full bg-gradient-to-r transition-all duration-1000"
                    :class="getGradientClass(skill.proficiency)"
                    :style="{
                      width: isLoaded ? `${skill.proficiency}%` : '0%',
                    }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Skills View -->
      <div class="md:hidden">
        <div
          class="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <!-- Mobile toggle between list and grid view -->
          <div class="flex justify-between items-center mb-3">
            <h3
              class="font-bold text-black"
              :class="{ 'text-white': themeStore.theme === 'dark' }"
            >
              Skills Overview
            </h3>
            <div class="flex space-x-1">
              <button
                @click="isCompactView = false"
                class="p-1.5 rounded-md flex items-center justify-center"
                :class="{
                  'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400':
                    !isCompactView,
                  'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400':
                    isCompactView,
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <button
                @click="isCompactView = true"
                class="p-1.5 rounded-md flex items-center justify-center"
                :class="{
                  'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400':
                    isCompactView,
                  'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400':
                    !isCompactView,
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Compact View (Tags) -->
          <div v-if="isCompactView" class="skill-cloud overflow-x-hidden">
            <div class="flex flex-wrap gap-1.5 w-full max-w-full">
              <div
                v-for="(skill, index) in allSkills"
                :key="index"
                class="skill-badge flex items-center gap-1 px-1.5 py-1 rounded-full transition-all duration-300 hover:transform hover:scale-105"
                :class="[
                  skill.proficiency >= 85
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                    : skill.proficiency >= 75
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                    : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300',
                ]"
              >
                <div
                  :class="{
                    'w-3 h-3': !shouldEnlargeIcon(skill.img),
                    'w-4.5 h-4.5 -m-0.5': shouldEnlargeIcon(skill.img),
                  }"
                  class="rounded-full overflow-hidden flex-shrink-0"
                >
                  <img
                    :src="getImageUrl(skill.img) + (themeChanged ? '' : '')"
                    :alt="`${skill.name} icon`"
                    class="w-full h-full object-contain"
                    :class="{ 'scale-110': shouldEnlargeIcon(skill.img) }"
                  />
                </div>
                <span class="text-xs font-medium">{{ skill.name }}</span>
              </div>
            </div>
          </div>

          <!-- List View (Expandable) -->
          <div v-else>
            <div class="space-y-2">
              <div
                v-for="(category, catIndex) in skillCategories"
                :key="catIndex"
                class="border dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <!-- Category Header (Expandable) -->
                <div
                  class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 cursor-pointer"
                  @click="
                    activeCategory =
                      activeCategory === category.title ? '' : category.title
                  "
                >
                  <div class="flex items-center space-x-1.5">
                    <span
                      v-html="getCategoryIcon(category.icon)"
                      class="text-indigo-600"
                    ></span>
                    <h4
                      class="font-medium text-black text-sm"
                      :class="{
                        'text-white': themeStore.theme === 'dark',
                      }"
                    >
                      {{ category.title }}
                    </h4>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 transition-transform"
                    :class="{
                      'transform rotate-180': activeCategory === category.title,
                    }"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                <!-- Skills List -->
                <div
                  v-if="activeCategory === category.title"
                  class="p-2 space-y-2 bg-white dark:bg-gray-800"
                >
                  <div
                    v-for="(skill, skillIndex) in category.skills"
                    :key="skillIndex"
                    class="skill-item-mobile"
                  >
                    <div class="flex items-center mb-1">
                      <div
                        class="rounded-md bg-gray-100 dark:bg-gray-700 mr-1.5"
                        :class="{
                          'w-5 h-5 p-0.5': !shouldEnlargeIcon(skill.img),
                          'w-6 h-6 p-0': shouldEnlargeIcon(skill.img),
                        }"
                      >
                        <img
                          :src="
                            getImageUrl(skill.img) + (themeChanged ? '' : '')
                          "
                          :alt="`${skill.name} icon`"
                          class="w-full h-full object-contain"
                          :class="{ 'scale-110': shouldEnlargeIcon(skill.img) }"
                        />
                      </div>
                      <span
                        class="text-xs font-medium text-black dark:text-white"
                        >{{ skill.name }}</span
                      >
                    </div>

                    <div
                      class="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                    >
                      <div
                        class="h-full bg-gradient-to-r transition-all duration-1000"
                        :class="getGradientClass(skill.proficiency)"
                        :style="{
                          width: isLoaded ? `${skill.proficiency}%` : '0%',
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Certification/Achievement Banner -->
      <div class="mt-6 md:mt-10 relative">
        <!-- Subtle glow effect -->
        <div
          class="absolute -inset-0.5 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-xl opacity-30 blur-sm"
        ></div>

        <!-- Content container with border -->
        <div
          class="relative bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 md:p-5 border-2 border-indigo-200 dark:border-indigo-700 flex items-center justify-between flex-wrap md:flex-nowrap gap-2 md:gap-4 z-10"
        >
          <div>
            <h3
              class="font-bold text-indigo-900 dark:text-indigo-300 text-sm md:text-base"
            >
              Continuous Learning
            </h3>
            <p class="text-xs md:text-sm text-gray-700 dark:text-gray-400">
              I'm constantly enhancing my skills through projects, online
              courses, and community engagement.
            </p>
          </div>
          <router-link
            to="/projects"
            class="w-auto px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs hover:bg-indigo-700 transition-all duration-300 shadow-md flex items-center space-x-1 whitespace-nowrap"
          >
            <span>Projects</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-container {
  min-height: 350px;
}

.skill-item {
  animation: skillFadeIn 0.5s ease-out forwards;
  opacity: 0;
  transform: translateY(10px);
  animation-delay: calc(var(--index, 0) * 100ms);
}

.skill-item-mobile {
  animation: skillFadeIn 0.3s ease-out forwards;
  opacity: 0;
  transform: translateY(5px);
  animation-delay: calc(var(--index, 0) * 80ms);
}

@keyframes skillFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.skill-badge {
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.skill-badge:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.skill-badge::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shine 2s infinite;
}

@keyframes shine {
  to {
    left: 100%;
  }
}

/* Continuous Learning box glow effect */
.continuous-learning-box {
  position: relative;
  box-shadow: 0 0 25px rgba(79, 70, 229, 0.15);
  transition: all 0.3s ease;
  overflow: hidden;
}

.continuous-learning-box::before {
  content: "";
  position: absolute;
  inset: -1px;
  background: linear-gradient(
    90deg,
    rgba(79, 70, 229, 0.3),
    rgba(129, 140, 248, 0.3),
    rgba(79, 70, 229, 0.3)
  );
  border-radius: 0.75rem; /* matches rounded-xl */
  z-index: -1;
  animation: border-glow 2s linear infinite;
}

@keyframes border-glow {
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

.dark .continuous-learning-box {
  box-shadow: 0 0 25px rgba(79, 70, 229, 0.2);
}
</style>
