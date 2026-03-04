<script setup lang="ts">
import { ref } from "vue";

const projects = ref([
  {
    id: 4,
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
    links: [
      { type: "github", url: "#" },
      { type: "kaggle", url: "#" },
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
    links: [
      { type: "github", url: "#" },
      { type: "kaggle", url: "#" },
    ],
    features: [
      "Vision Transformer architecture for spectrogram analysis",
      "Transfer learning with pretrained models from Hugging Face",
      "Experiment tracking with Weights & Biases",
      "Audio preprocessing pipeline with Librosa",
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

// Return the GitHub repo URL if present
const getRepoUrl = (links: Array<{ type: string; url: string }>) => {
  if (!links || links.length === 0) return "#";
  const gh = links.find((l) => l.type === "github");
  return gh ? gh.url : links[0].url;
};

// Return the Kaggle URL if present
const getKaggleUrl = (links: Array<{ type: string; url: string }>) => {
  const kg = links.find((l) => l.type === "kaggle");
  return kg ? kg.url : "";
};

// Get non-primary links (not github/kaggle)
const getSecondaryLinks = (links: Array<{ type: string; url: string }>) => {
  return links.filter((l) => l.type !== "github" && l.type !== "kaggle");
};

// Label for link type
const getLinkLabel = (type: string) => {
  const labels: Record<string, string> = {
    drive: "Google Docs",
    figma: "Figma",
    gsoc: "GSoC",
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
            <div
              class="pt-3 border-t border-gray-700 flex items-center gap-3 mt-auto flex-wrap"
            >
              <!-- GitHub -->
              <a
                :href="getRepoUrl(project.links)"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <svg
                  class="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>GitHub</span>
              </a>

              <!-- Kaggle -->
              <a
                v-if="getKaggleUrl(project.links)"
                :href="getKaggleUrl(project.links)"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <svg
                  class="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.281.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.075.378z"
                  />
                </svg>
                <span>Kaggle</span>
              </a>

              <!-- Secondary links (Docs, Figma, GSoC, etc.) -->
              <a
                v-for="link in getSecondaryLinks(project.links)"
                :key="link.type"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-gray-400 hover:text-gray-200 transition-colors"
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
