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
  { name: "Python", img: "Python.svg" },
  { name: "C++", img: "C++ (CPlusPlus).svg" },
  { name: "Rust", img: "Rust.svg" },
  { name: "NumPy", img: "NumPy.svg" },
  { name: "scikit-learn", img: "scikit-learn.svg" },
  { name: "Matplotlib", img: "Matplotlib.svg" },
  { name: "Pandas", img: "Pandas.svg" },
  { name: "PyTorch", img: "PyTorch.svg" },
  { name: "Git", img: "Git.svg" },
  { name: "Docker", img: "Docker.svg" },
  { name: "Vim", img: "Vim.svg" },
  { name: "Kubernetes", img: "Kubernetes.svg" },
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
  <div class="w-full overflow-hidden flex justify-center">
    <!-- Technologies Grid -->
    <div class="skills-grid" :class="{ 'animate-fade-in': cardsVisible }">
      <div
        v-for="(tech, index) in technologies"
        :key="tech.name"
        class="skill-icon"
        :class="{ 'animate-scale-in': cardsVisible }"
        :style="{ 'animation-delay': `${index * 50}ms` }"
        :title="tech.name"
      >
        <img
          :src="getImageUrl(tech.img)"
          :alt="`${tech.name} icon`"
          class="w-full h-full object-contain"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28px, 28px));
  gap: 1rem;
  width: fit-content;
  max-width: 90%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

@media (min-width: 768px) {
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(36px, 36px));
    max-width: 85%;
  }
}

.skill-icon {
  width: 28px;
  height: 28px;
  transition: all 0.3s ease;
  opacity: 0;
  cursor: pointer;
}

@media (min-width: 768px) {
  .skill-icon {
    width: 36px;
    height: 36px;
  }
}

.skill-icon.animate-scale-in {
  animation: scaleIn 0.4s ease-out forwards;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.skill-icon:hover {
  transform: scale(1.15);
}

.skill-icon img {
  filter: grayscale(0%);
  transition: filter 0.3s ease;
}

.skill-icon:hover img {
  filter: grayscale(0%) brightness(1.1);
}
</style>
