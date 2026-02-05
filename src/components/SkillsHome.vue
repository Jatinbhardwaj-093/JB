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

// All technologies in one array
const technologies = [
  // Languages
  { name: "Python", img: "Python.svg" },
  { name: "C++", img: "C++ (CPlusPlus).svg" },
  { name: "C", img: "C.svg" },
  { name: "Rust", img: "Rust.svg" },
  // ML & Data Science
  { name: "PyTorch", img: "PyTorch.svg" },
  { name: "NumPy", img: "NumPy.svg" },
  { name: "Pandas", img: "Pandas.svg" },
  { name: "scikit-learn", img: "scikit-learn.svg" },
  { name: "Matplotlib", img: "Matplotlib.svg" },
  { name: "Seaborn", img: "seaborn.svg" },
  // DevOps & Tools
  { name: "Git", img: "Git.svg" },
  { name: "GitHub", img: "GitHub.svg" },
  { name: "Docker", img: "Docker.svg" },
  { name: "Kubernetes", img: "Kubernetes.svg" },
  { name: "Neovim", img: "nvim.svg" },
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
  <div class="w-full flex justify-center py-4">
    <!-- Technologies Grid -->
    <div class="tech-container">
      <div class="tech-grid">
        <div
          v-for="(tech, index) in technologies"
          :key="tech.name"
          class="tech-card"
          :class="{ 'animate-scale-in': cardsVisible }"
          :style="{ 'animation-delay': `${index * 40}ms` }"
        >
          <div class="tech-icon">
            <img
              :src="getImageUrl(tech.img)"
              :alt="`${tech.name} icon`"
              class="icon-image"
            />
          </div>
          <span class="tech-label">{{ tech.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tech-container {
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
}

.tech-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

/* Remove grid media queries as flex handles wrapping naturally */

.tech-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 7.5rem;
  height: 7.5rem;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  background: white;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  opacity: 0;
}

@media (prefers-color-scheme: dark) {
  .tech-card {
    background: #1f2937;
    border-color: #374151;
  }
}

.tech-card.animate-scale-in {
  animation: scaleIn 0.5s ease-out forwards;
}

.tech-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

@media (prefers-color-scheme: dark) {
  .tech-card:hover {
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
    border-color: #60a5fa;
  }
}

.tech-icon {
  width: 40px;
  height: 40px;
  transition: transform 0.3s ease;
}

@media (min-width: 640px) {
  .tech-icon {
    width: 48px;
    height: 48px;
  }
}

.tech-card:hover .tech-icon {
  transform: scale(1.1);
}

.icon-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: grayscale(0%);
  transition: filter 0.3s ease;
}

.tech-card:hover .icon-image {
  filter: brightness(1.1);
}

.tech-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
  text-align: center;
  line-height: 1.2;
  transition: color 0.3s ease;
}

@media (min-width: 640px) {
  .tech-label {
    font-size: 0.8rem;
  }
}

@media (prefers-color-scheme: dark) {
  .tech-label {
    color: #e5e7eb;
  }
}

.tech-card:hover .tech-label {
  color: #3b82f6;
}

@media (prefers-color-scheme: dark) {
  .tech-card:hover .tech-label {
    color: #60a5fa;
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
