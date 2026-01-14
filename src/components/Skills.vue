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

// Technologies organized by category
const techCategories = [
  {
    title: "Languages",
    technologies: [
      {
        name: "Python",
        img: "Python.svg",
        description: "Programming language",
      },
      {
        name: "C++",
        img: "C++ (CPlusPlus).svg",
        description: "Systems programming",
      },
      {
        name: "Rust",
        img: "Rust.svg",
        description: "Systems programming",
      },
    ],
  },
  {
    title: "ML Tech Stack",
    technologies: [
      {
        name: "NumPy",
        img: "NumPy.svg",
        description: "Numerical computing",
      },
      {
        name: "Pandas",
        img: "Pandas.svg",
        description: "Data manipulation",
      },
      {
        name: "scikit-learn",
        img: "scikit-learn.svg",
        description: "Machine learning",
      },
      {
        name: "PyTorch",
        img: "PyTorch.svg",
        description: "Deep learning framework",
      },
      {
        name: "Matplotlib",
        img: "Matplotlib.svg",
        description: "Data visualization",
      },
      {
        name: "Seaborn",
        img: "seaborn.svg",
        description: "Statistical visualization",
      },
    ],
  },
  {
    title: "Tools & Utilities",
    technologies: [
      {
        name: "Vim",
        img: "Vim.svg",
        description: "Text editor",
      },
      {
        name: "Git",
        img: "Git.svg",
        description: "Version control",
      },
      {
        name: "Docker",
        img: "Docker.svg",
        description: "Containerization",
      },
    ],
  },
];

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
  <div data-theme="dark" class="w-full space-y-8">
    <!-- Loop through each category -->
    <div
      v-for="(category, catIndex) in techCategories"
      :key="category.title"
      class="category-section"
    >
      <!-- Category Title -->
      <h3
        class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200"
        :class="{ 'animate-fade-in': cardsVisible }"
      >
        {{ category.title }}
      </h3>

      <!-- Technologies Grid for this category -->
      <div class="skills-grid" :class="{ 'animate-fade-in': cardsVisible }">
        <div
          v-for="(tech, techIndex) in category.technologies"
          :key="tech.name"
          class="skill-card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-600"
          :class="{ 'animate-scale-in': cardsVisible }"
          :style="{ 'animation-delay': `${(catIndex * 6 + techIndex) * 80}ms` }"
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
