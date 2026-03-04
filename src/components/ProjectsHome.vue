<script setup lang="ts">
import { ref } from "vue";

const projects = ref([
  {
    id: 1,
    title: "Comment Emotion Classifier",
    subtitle: "Natural Language Processing",
    description:
      "An NLP pipeline that classifies emotions in user comments using ensemble learning. Processes raw text through feature extraction, sentiment analysis, and multi-label classification to detect nuanced emotional tones across diverse comment datasets.",
    technologies: [
      { name: "NumPy" },
      { name: "Pandas" },
      { name: "sklearn" },
      { name: "Matplotlib" },
      { name: "LightGBM" },
    ],
    links: {
      github: "#",
      kaggle: "#",
    },
  },
  {
    id: 2,
    title: "Musical Classification Model",
    subtitle: "Visual Transformer",
    description:
      "A Vision Transformer-based model for classifying musical genres from audio spectrograms. Leverages transfer learning and attention mechanisms to capture temporal and frequency patterns, achieving robust genre classification across diverse audio samples.",
    technologies: [
      { name: "NumPy" },
      { name: "Pandas" },
      { name: "Librosa" },
      { name: "PyTorch" },
      { name: "Hugging Face" },
      { name: "Weights & Biases" },
    ],
    links: {
      github: "#",
      kaggle: "#",
    },
  },
]);
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 projects-container w-full mb-8">
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        class="project-card rounded-xl overflow-hidden transition-all duration-300 border bg-gray-800/60 border-gray-700 flex flex-col h-full"
      >
        <!-- Content -->
        <div class="p-5 flex flex-col flex-grow">
          <!-- Subtitle -->
          <span class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            {{ project.subtitle }}
          </span>

          <h3 class="text-lg font-semibold text-white mb-2">
            {{ project.title }}
          </h3>

          <p class="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
            {{ project.description }}
          </p>

          <!-- Tech Stack -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tech in project.technologies"
              :key="tech.name"
              class="px-2 py-1 text-xs font-medium bg-gray-700/50 text-gray-300 rounded-md border border-gray-600/50"
            >
              {{ tech.name }}
            </span>
          </div>

          <!-- Footer with GitHub & Kaggle -->
          <div class="pt-4 border-t border-gray-700 flex items-center gap-4 mt-auto">
            <a
              :href="project.links.github"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group/gh"
            >
              <svg class="w-5 h-5 text-gray-400 group-hover/gh:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
              <span>GitHub</span>
            </a>

            <a
              :href="project.links.kaggle"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group/kg"
            >
              <svg class="w-5 h-5 text-gray-400 group-hover/kg:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.281.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.075.378z"/>
              </svg>
              <span>Kaggle</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <router-link
      to="/projects"
      class="group inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-all duration-300 hover:shadow-lg border border-gray-700 hover:border-gray-600"
    >
      <span class="font-medium">View All Projects</span>
      <svg
        class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </router-link>
  </div>
</template>

<style scoped>
.project-card {
  opacity: 0;
  animation: fadeIn 0.4s ease-out forwards;
}

.project-card:nth-child(1) {
  animation-delay: 0.1s;
}
.project-card:nth-child(2) {
  animation-delay: 0.2s;
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

.project-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px -8px rgba(0, 0, 0, 0.4);
  border-color: #4b5563;
}
</style>
