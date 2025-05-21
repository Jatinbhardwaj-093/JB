<script setup lang="ts">
import { ref } from "vue";
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();

interface Skill {
  name: string;
  img: string;
  description: string;
}

const getImageUrl = (name: string) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href;
};

const skills = ref<Skill[]>([
  {
    name: "Python",
    img: "Python.png",
    description: "Web and data science language",
  },
  {
    name: "TensorFlow",
    img: "TensorFlow.png",
    description: "AI model framework",
  },
  {
    name: "Docker",
    img: "Docker.png",
    description: "Container deployment platform",
  },
  {
    name: "Go",
    img: "Go.png",
    description: "Fast language for scalable applications",
  },
  {
    name: "Git",
    img: "Git.png",
    description: "Code version control",
  },
  {
    name: "Kubernetes",
    img: "Kubernetes.png",
    description: "Cloud container orchestration",
  },
]);
</script>

<template>
  <div class="skills-grid">
    <div
      v-for="(skill, index) in skills"
      :key="index"
      class="skill-card backdrop-blur-md bg-white/20 dark:bg-gray-700/20 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/10 dark:border-gray-600/10"
    >
      <!-- Mobile View (Logo + Name) -->
      <div class="md:hidden p-3 flex flex-col items-center">
        <img
          :src="getImageUrl(skill.img)"
          :alt="`${skill.name} icon`"
          class="w-12 h-12 object-contain mb-2"
        />
        <p class="text-sm font-medium">
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
          <p class="text-lg font-semibold mb-1">
            {{ skill.name }}
          </p>
          <p class="text-sm text-gray-700 dark:text-gray-200">
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
  position: relative;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.skill-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 0.75rem;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.05)
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.skill-card:hover {
  border-color: rgba(99, 102, 241, 0.2);
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.1),
    0 0 0 1px rgba(99, 102, 241, 0.1);
}

/* Dark mode adjustments */
:deep(.dark) .skill-card::before {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.02)
  );
}

:deep(.dark) .skill-card {
  background: rgba(31, 41, 55, 0.2);
}
</style>
