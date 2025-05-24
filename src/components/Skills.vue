<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();

// Animation states
const cardsVisible = ref(false);

onMounted(() => {
  // Trigger animations on mount with a slight delay
  setTimeout(() => {
    cardsVisible.value = true;
  }, 150);
});

interface Skill {
  name: string;
  img: string;
  description: string;
  category: string;
  gradient: string;
}

const getImageUrl = (name: string) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href;
};

const skills = ref<Skill[]>([
  {
    name: "Python",
    img: "Python.png",
    description: "Web and data science language",
    category: "Programming",
    gradient: "from-blue-400 to-yellow-500",
  },
  {
    name: "TensorFlow",
    img: "TensorFlow.png",
    description: "AI model framework",
    category: "AI/ML",
    gradient: "from-orange-400 to-red-500",
  },
  {
    name: "Docker",
    img: "Docker.png",
    description: "Container deployment platform",
    category: "DevOps",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Go",
    img: "Go.png",
    description: "Fast language for scalable applications",
    category: "Programming",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    name: "Git",
    img: "Git.png",
    description: "Code version control",
    category: "Tools",
    gradient: "from-red-400 to-orange-500",
  },
  {
    name: "Kubernetes",
    img: "Kubernetes.png",
    description: "Cloud container orchestration",
    category: "DevOps",
    gradient: "from-purple-400 to-indigo-500",
  },
]);
</script>

<template>
  <div class="skills-grid">
    <div
      v-for="(skill, index) in skills"
      :key="skill.name"
      class="skill-card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-600"
      :class="{ 'animate-fade-in': cardsVisible }"
      :style="{ 'animation-delay': `${index * 100}ms` }"
    >
      <!-- Mobile View (Logo + Name) -->
      <div class="md:hidden p-3 flex flex-col items-center">
        <img
          :src="getImageUrl(skill.img)"
          :alt="`${skill.name} icon`"
          class="w-12 h-12 object-contain mb-2"
        />
        <p class="text-sm font-medium text-gray-800 dark:text-white">
          {{ skill.name }}
        </p>
      </div>

      <!-- Desktop View (Full Card) -->
      <div class="hidden md:flex p-4 items-center gap-4">
        <!-- Skill Image -->
        <div class="flex-shrink-0">
          <img
            :src="getImageUrl(skill.img)"
            :alt="`${skill.name} icon`"
            class="w-16 h-16 object-contain"
          />
        </div>

        <!-- Text Content -->
        <div class="flex-grow">
          <p class="text-lg font-semibold mb-1 text-gray-800 dark:text-white">
            {{ skill.name }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            {{ skill.description }}
          </p>
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

.skill-card:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(99, 102, 241, 0.1);
}

/* Dark mode adjustments */
.dark .skill-card:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(99, 102, 241, 0.2);
}
</style>
