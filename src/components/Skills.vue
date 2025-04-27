<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();

// Import base URL for images
const getImageUrl = (name) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href;
};

const skillCategories = ref([
  {
    title: "Programming",
    skills: [
      { name: "Python", img: "Python.png", color: "text-blue-600" },
      { name: "JavaScript", img: "JavaScript.png", color: "text-yellow-500" },
      { name: "TypeScript", img: "TypeScript.png", color: "text-blue-500" },
      { name: "C", img: "C.png", color: "text-blue-400" },
      { name: "C++", img: "C++.png", color: "text-blue-600" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "Vue.js", img: "Vue.js.png", color: "text-green-600" },
      { name: "HTML5", img: "HTML5.png", color: "text-orange-600" },
      { name: "CSS3", img: "CSS3.png", color: "text-blue-600" },
      { name: "Tailwind", img: "Tailwind.png", color: "text-cyan-500" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Flask", img: "Flask.png", color: "text-gray-800" },
      { name: "Django", img: "Django.png", color: "text-green-800" },
      { name: "GraphQL", img: "GraphQL.png", color: "text-pink-600" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB", img: "MongoDB.png", color: "text-green-600" },
      { name: "MySQL", img: "MySQL.png", color: "text-blue-600" },
      { name: "Redis", img: "Redis.png", color: "text-red-600" },
      { name: "SQLite", img: "SQLite.png", color: "text-blue-400" },
    ],
  },
  {
    title: "DevOps",
    skills: [
      { name: "Docker", img: "Docker.png", color: "text-blue-500" },
      { name: "Git", img: "Git.png", color: "text-orange-600" },
      {
        name: "GitHub",
        img: "GitHub.png",
        color: "text-gray-800 dark:text-white",
      },
      { name: "Kubernetes", img: "Kubernetes.png", color: "text-blue-600" },
    ],
  },
  {
    title: "Data Science",
    skills: [
      { name: "TensorFlow", img: "TensorFlow.png", color: "text-orange-600" },
      { name: "PyTorch", img: "PyTorch.png", color: "text-orange-700" },
      { name: "NumPy", img: "NumPy.png", color: "text-blue-700" },
      { name: "Pandas", img: "Pandas.png", color: "text-blue-600" },
    ],
  },
]);

const visibleSkills = ref([]);

onMounted(() => {
  // Stagger the appearance of the skill categories for animation
  skillCategories.value.forEach((category, index) => {
    setTimeout(() => {
      visibleSkills.value.push(category.title);
    }, index * 200);
  });
});
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <div class="mb-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Technical Skills
        </h2>
        <div class="h-1 w-24 bg-indigo-600 mx-auto rounded-full"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          I've worked with a range of technologies in the web development and
          data science world. Here's an overview of my technical skills:
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <div
          v-for="(category, categoryIndex) in skillCategories"
          :key="categoryIndex"
          class="skill-card bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700"
          :class="{ 'animate-fade-in': visibleSkills.includes(category.title) }"
          :style="{ animationDelay: `${categoryIndex * 200}ms` }"
        >
          <h3
            class="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center"
          >
            <span class="text-indigo-600 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            {{ category.title }}
          </h3>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div
              v-for="(skill, skillIndex) in category.skills"
              :key="skillIndex"
              class="skill-item flex flex-col items-center justify-center p-2 transition-transform duration-300 hover:transform hover:scale-110"
            >
              <div
                class="skill-icon-wrapper p-2 rounded-full bg-gray-100 dark:bg-gray-700 mb-2 shadow-md flex items-center justify-center"
                style="width: 48px; height: 48px"
              >
                <img
                  :src="getImageUrl(skill.img)"
                  :alt="`${skill.name} icon`"
                  class="h-8 w-8 object-contain"
                />
              </div>
              <span class="text-sm font-medium" :class="skill.color">
                {{ skill.name }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile skill tags - Fixed nested v-for -->
      <div class="mt-10 md:hidden">
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-inner">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            All Skills
          </h3>
          <div class="flex flex-wrap gap-2">
            <!-- Loop through categories first -->
            <template
              v-for="(category, categoryIndex) in skillCategories"
              :key="categoryIndex"
            >
              <!-- Then loop through skills for each category -->
              <span
                v-for="(skill, skillIndex) in category.skills"
                :key="`${categoryIndex}-${skillIndex}`"
                class="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300"
              >
                {{ skill.name }}
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skill-card {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.skill-card:hover {
  transform: translateY(-5px);
}

.skill-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #6366f1, #a855f7);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.skill-card:hover::after {
  transform: scaleX(1);
}

.skill-icon-wrapper {
  transition: all 0.3s ease;
}

.skill-item:hover .skill-icon-wrapper {
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.5);
}

.animate-fade-in {
  animation: skillCardFadeIn 0.8s ease forwards;
  opacity: 0;
}

@keyframes skillCardFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
