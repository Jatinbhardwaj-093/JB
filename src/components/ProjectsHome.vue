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
    features: [
      "Multi-label emotion classification from raw text",
      "Feature extraction with TF-IDF and word embeddings",
      "Ensemble model with LightGBM for improved accuracy"
    ],
    links: {
      github: "#",
      kaggle: "#",
    },
  },
  {
    id: 2,
    title: "Music Genre Classification",
    subtitle: "Vision Transformer",
    description:
      "A machine learning system that analyzes audio files and classifies them into primary musical genres. It converts audio into visual spectrograms and leverages Vision Transformers to identify patterns, predicting the top matches with probability scores.",
    technologies: [
      { name: "PyTorch" },
      { name: "Hugging Face" },
      { name: "Librosa" },
      { name: "NumPy" },
      { name: "Gradio" },
    ],
    features: [
      "Spectrogram-based audio processing with Librosa",
      "End-to-End ViT Model tailored for music classification",
      "Interactive Web UI deployed on Hugging Face Spaces"
    ],
    links: {
      github: "https://github.com/Jatinbhardwaj-093/ViT_Music_Classifier",
      hfspace: "https://huggingface.co/spaces/jatin-093/ViT_Music_Classification",
      colab: "https://github.com/Jatinbhardwaj-093/ViT_Music_Classifier",
    },
  },
]);
</script>

<template>
  <div class="flex flex-col items-center w-full max-w-6xl mx-auto px-4 md:px-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 projects-container w-full mb-10">
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        class="project-card relative rounded-2xl overflow-hidden transition-all duration-300 border bg-gradient-to-br from-gray-800/80 to-gray-900/90 border-gray-700/60 hover:border-gray-500/60 hover:shadow-xl hover:shadow-gray-900/20 flex flex-col h-full backdrop-blur-sm"
      >
        <!-- Content -->
        <div class="p-5 md:p-6 flex flex-col flex-grow relative z-10">
          
          <!-- Subtitle -->
          <span class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">
            {{ project.subtitle }}
          </span>

          <h3 class="text-xl font-bold text-white mb-3 tracking-tight">
            {{ project.title }}
          </h3>

          <p class="text-gray-300 text-sm leading-relaxed mb-4 flex-grow line-clamp-3 hover:line-clamp-none transition-all">
            {{ project.description }}
          </p>

          <h4 class="text-xs font-semibold text-white mb-2 pt-2 border-t border-gray-700/50">Core Features</h4>
          <ul class="space-y-1.5 mb-5 flex-grow">
            <li
              v-for="(feature, i) in project.features.slice(0, 2)"
              :key="i"
              class="flex items-start text-xs text-gray-400"
            >
              <svg class="w-3.5 h-3.5 text-gray-400 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="line-clamp-1">{{ feature }}</span>
            </li>
          </ul>

          <!-- Tech Stack -->
          <div class="flex flex-wrap gap-2 mb-5">
            <span
              v-for="tech in project.technologies"
              :key="tech.name"
              class="px-2 py-1 text-[10px] font-semibold bg-gray-700/50 text-gray-300 rounded border border-gray-600/50 uppercase tracking-wider"
            >
              {{ tech.name }}
            </span>
          </div>

          <!-- Footer links -->
          <div class="pt-4 border-t border-gray-700/50 flex items-center gap-4 flex-wrap mt-auto">
            <a
              v-if="project.links.github"
              :href="project.links.github"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs font-medium text-gray-300 transition-colors duration-300 hover:text-white relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out"
            >
              GitHub
            </a>
            <a
              v-if="project.links.kaggle"
              :href="project.links.kaggle"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs font-medium text-gray-300 transition-colors duration-300 hover:text-white relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out"
            >
              Kaggle
            </a>
            <a
              v-if="project.links.hfspace"
              :href="project.links.hfspace"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs font-medium text-gray-300 transition-colors duration-300 hover:text-white relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out"
            >
              HF Space
            </a>
            <a
              v-if="project.links.colab"
              :href="project.links.colab"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs font-medium text-gray-300 transition-colors duration-300 hover:text-white relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out"
            >
              Colab
            </a>
          </div>

        </div>
      </div>
    </div>

    <router-link
      to="/projects"
      class="group inline-flex items-center gap-2 px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-full transition-all duration-300 hover:shadow-lg border border-gray-700 hover:border-gray-600 font-medium"
    >
      <span>View All Projects</span>
      <svg
        class="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
