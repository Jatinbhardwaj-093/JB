<script setup lang="ts">
import { ref } from "vue";

const projects = ref([
  {
    id: 4,
    title: "NLP Comment Classification",
    subtitle: "Natural Language Processing",
    description:
      "An end-to-end NLP pipeline that analyzes textual entries from a discussion system and predicts how each entry is ultimately categorized by the platform using a LightGBM classification model.",
    technologies: [
      { name: "NumPy" },
      { name: "Pandas" },
      { name: "sklearn" },
      { name: "Matplotlib" },
      { name: "LightGBM" },
    ],
    links: [
      { type: "github", url: "https://github.com/Jatinbhardwaj-093/NLP_Comment_Classification" },
      { type: "colab", url: "https://colab.research.google.com/drive/1OOmKKJ_ixLJAsQqT5l0emED68jTJC7Cg?usp=share_link" },
    ],
    features: [
      "Multi-label emotion classification from raw text",
      "Feature extraction with TF-IDF and word embeddings",
      "Ensemble model with LightGBM for improved accuracy",
      "Comprehensive data visualization and analysis",
    ],
  },
  {
    id: 5,
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
      { name: "W&B" },
    ],
    links: [
      { type: "github", url: "https://github.com/Jatinbhardwaj-093/ViT_Music_Classifier" },
      { type: "hfspace", url: "https://huggingface.co/spaces/jatin-093/ViT_Music_Classification" },
      { type: "colab", url: "https://github.com/Jatinbhardwaj-093/ViT_Music_Classifier" },
    ],
    features: [
      "Spectrogram-based audio processing with Librosa",
      "End-to-End ViT Model tailored for music classification",
      "Interactive Web UI deployed on Hugging Face Spaces",
      "Real-time experiment tracking using Weights & Biases",
    ],
  },
  {
    id: 3,
    title: "Google Summer of Code at SymPy",
    subtitle: "Open Source",
    description:
      "Implemented a formal power series domain system for SymPy to enhance its symbolic mathematics capabilities as part of Google Summer of Code 2025.",
    technologies: [
      { name: "SymPy" },
      { name: "Python" },
      { name: "Cython" },
      { name: "C" },
      { name: "Pytest" },
      { name: "Hypothesis" },
      { name: "Codecov" },
    ],
    links: [
      {
        type: "github",
        url: "https://github.com/sympy/sympy/pulls?q=author%3AJatinbhardwaj-093",
      },
      {
        type: "gsoc",
        url: "https://summerofcode.withgoogle.com/programs/2025/projects/8VslkGZ9",
      },
    ],
    features: [
      "Two-level class architecture for Univariate FPS ring over arbitrary rings",
      "Dual backend architecture with pure Python and optimized Cython implementations (python-flint)",
      "Achieved 85x-1680x performance improvements against global series methods",
      "2.5x-42x speedup in ring_series module operations",
      "Robust testing infrastructure with pytest, Hypothesis",
    ],
  },
  {
    id: 1,
    title: "Influencer-Sponsor Engagement Platform",
    subtitle: "Web Development",
    description:
      "A comprehensive collaboration platform connecting influencers with sponsors and sponsorship opportunities.",
    technologies: [
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "JavaScript" },
      { name: "Flask" },
      { name: "SQLite" },
    ],
    links: [
      {
        type: "github",
        url: "https://github.com/Jatinbhardwaj-093/Infulencer-Sponsor-Engagement-Platform",
      },
      {
        type: "drive",
        url: "https://drive.google.com/drive/folders/1SLRgwuTLKnKVfdY9br0idI0x_NHyb0Qn?usp=drive_link",
      },
    ],
    features: [
      "Profile matching for influencers and sponsors",
      "Detailed analytics dashboard",
      "Secure messaging system",
      "Contract management tools",
    ],
  },
  {
    id: 2,
    title: "HouseHold Service Platform",
    subtitle: "Web Development",
    description:
      "A booking service platform that helps users find and schedule household services with verified service providers.",
    technologies: [
      { name: "Vue.js" },
      { name: "Flask" },
      { name: "SQLite" },
      { name: "Redis" },
      { name: "Celery" },
    ],
    links: [
      {
        type: "github",
        url: "https://github.com/Jatinbhardwaj-093/HouseHold-Service-Platform",
      },
      {
        type: "drive",
        url: "https://drive.google.com/drive/folders/1YR5UsPf4jtXYstgQJDPUFEjy33uew83I?usp=drive_link",
      },
      {
        type: "figma",
        url: "https://www.figma.com/design/a5MomTlXdFQ1qz7lAzog7E/Househod-Service-MAD-1?node-id=0-1&t=Xo1ho1DEgCnSpn03-1",
      },
    ],
    features: [
      "Real-time service provider tracking",
      "Secure payment processing",
      "Rating and review system",
      "Service provider verification process",
    ],
  },
]);

// Feature preview & expand state per project
const previewCount = 2;
const expanded = ref<Record<number, boolean>>({});

const isExpanded = (id: number) => !!expanded.value[id];

const toggleExpand = (id: number) => {
  expanded.value = { ...expanded.value, [id]: !expanded.value[id] };
};

// Links are rendered uniformly so no specific getters are needed

// Label for link type
const getLinkLabel = (type: string) => {
  const labels: Record<string, string> = {
    github: "GitHub",
    kaggle: "Kaggle",
    drive: "Google Docs",
    figma: "Figma",
    gsoc: "GSoC",
    hfspace: "HF Space",
    colab: "Colab Notebook",
  };
  return labels[type] || type;
};
</script>

<template>
  <section class="py-10">
    <div class="w-full max-w-4xl mx-auto px-4 md:px-6">
      <div class="mb-10 text-center">
        <h2 class="text-3xl font-bold mb-2 text-white">Projects</h2>
        <div class="h-1 w-24 bg-gray-600 mx-auto rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="project-card rounded-xl overflow-hidden transition-all duration-300 border bg-gray-800/60 border-gray-700 flex flex-col"
        >
          <!-- Content -->
          <div class="p-5 flex flex-col flex-grow">
            <!-- Subtitle -->
            <span
              class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2"
            >
              {{ project.subtitle }}
            </span>

            <h3 class="text-lg font-semibold text-white mb-2">
              {{ project.title }}
            </h3>

            <p class="text-gray-400 text-sm mb-3">
              {{ project.description }}
            </p>

            <!-- Features with toggle -->
            <div class="mb-4">
              <h4 class="text-sm font-semibold text-gray-300 mb-1.5">
                Key Features:
              </h4>
              <ul class="list-disc pl-5 space-y-1">
                <li
                  v-for="(feature, i) in isExpanded(project.id)
                    ? project.features
                    : project.features.slice(0, previewCount)"
                  :key="`${project.id}-feature-${i}`"
                  class="text-xs text-gray-400"
                >
                  {{ feature }}
                </li>
              </ul>
              <button
                v-if="project.features.length > previewCount"
                @click="toggleExpand(project.id)"
                class="text-xs text-gray-500 hover:text-gray-300 mt-1 focus:outline-none"
              >
                <span v-if="!isExpanded(project.id)">
                  Show {{ project.features.length - previewCount }} more
                </span>
                <span v-else>Show less</span>
              </button>
            </div>

            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-1.5 mb-4">
              <span
                v-for="tech in project.technologies"
                :key="tech.name"
                class="px-2 py-1 text-xs font-medium bg-gray-700/50 text-gray-300 rounded-md border border-gray-600/50"
              >
                {{ tech.name }}
              </span>
            </div>

            <!-- Footer Links -->
            <div class="pt-3 border-t border-gray-700 flex items-center gap-5 mt-auto flex-wrap">
              <a
                v-for="link in project.links"
                :key="link.type"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-white relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out"
              >
                {{ getLinkLabel(link.type) }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- More Projects Button -->
      <div class="text-center">
        <a
          href="https://github.com/Jatinbhardwaj-093"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-full text-white bg-gray-800 hover:bg-gray-700 transition-colors duration-300 border border-gray-700 hover:border-gray-600"
        >
          <i class="bi bi-github mr-2"></i>
          View More on GitHub
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-card {
  animation: fadeIn 0.5s ease-out backwards;
}

.project-card:nth-child(1) { animation-delay: 0.1s; }
.project-card:nth-child(2) { animation-delay: 0.2s; }
.project-card:nth-child(3) { animation-delay: 0.3s; }
.project-card:nth-child(4) { animation-delay: 0.4s; }
.project-card:nth-child(5) { animation-delay: 0.5s; }

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
