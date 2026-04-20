<script setup lang="ts">
import Projects from "../components/Projects.vue";
import { ref, computed } from "vue";

const projects = ref([
  {
    id: 4,
    title: "Comment Emotion Classifier",
    subtitle: "Natural Language Processing",
    description:
      "An NLP pipeline that classifies emotions in user comments using ensemble learning. Processes raw text through feature extraction and multi-label classification.",
    tags: ["NumPy", "Pandas", "sklearn", "Matplotlib", "LightGBM"],
    links: {
      github: "#",
      kaggle: "#",
    },
  },
  {
    id: 5,
    title: "Music Genre Classification",
    subtitle: "Vision Transformer",
    description:
      "A machine learning system that analyzes audio files and classifies them into primary musical genres. It converts audio into visual spectrograms and leverages Vision Transformers to identify patterns, predicting the top matches with probability scores.",
    tags: ["PyTorch", "Hugging Face", "Librosa", "NumPy", "Gradio", "W&B"],
    links: {
      github: "https://github.com/Jatinbhardwaj-093/ViT_Music_Classifier",
      hfspace: "https://huggingface.co/spaces/jatin-093/ViT_Music_Classification",
      colab: "https://github.com/Jatinbhardwaj-093/ViT_Music_Classifier",
    },
  },
  {
    id: 3,
    title: "Google Summer of Code at SymPy",
    subtitle: "Open Source",
    description:
      "Implementing a formal power series domain system for SymPy to enhance its symbolic mathematics capabilities.",
    tags: ["SymPy", "Python", "Cython", "C", "Pytest", "Hypothesis", "Codecov"],
    link: "https://summerofcode.withgoogle.com/programs/2025/projects/8VslkGZ9",
  },
  {
    id: 1,
    title: "Influencer-Sponsor Engagement Platform",
    subtitle: "Web Development",
    description:
      "A comprehensive collaboration platform connecting influencers with sponsors and sponsorship opportunities.",
    tags: ["HTML/CSS", "JavaScript", "Flask", "SQLite"],
    link: "https://github.com/Jatinbhardwaj-093/Infulencer-Sponsor-Engagement-Platform",
  },
  {
    id: 2,
    title: "HouseHold Service Platform",
    subtitle: "Web Development",
    description:
      "A booking service platform that helps users find and schedule household services with verified service providers.",
    tags: ["Vue.js", "Flask", "SQLite", "Redis"],
    link: "https://github.com/Jatinbhardwaj-093/HouseHold-Service-Platform",
  },
]);

// Filter state
const activeFilter = ref("all");
const filters = ["all", "ML/AI", "Web Dev", "Open Source"];

const setFilter = (filter) => {
  activeFilter.value = filter;
};

const filteredProjects = computed(() => {
  if (activeFilter.value === "all") return projects.value;

  return projects.value.filter((project) => {
    if (activeFilter.value === "ML/AI") {
      return [4, 5].includes(project.id);
    }
    if (activeFilter.value === "Web Dev") {
      return project.tags.some((tag) =>
        ["HTML/CSS", "JavaScript", "Vue.js", "Flask"].includes(tag)
      );
    }
    if (activeFilter.value === "Open Source") {
      return project.id === 3;
    }
    return true;
  });
});
</script>

<template>
  <div>
    <!-- Desktop Version -->
    <div class="hidden md:block">
      <Projects />
    </div>

    <!-- Mobile Version -->
    <div class="block md:hidden min-h-screen bg-gray-900">
      <!-- Header -->
      <div class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 z-0"></div>
        <div class="relative z-10 px-4 py-10 text-center">
          <h1 class="text-2xl font-bold text-white mb-2">My Projects</h1>
          <div class="h-px w-16 bg-gray-600 mx-auto rounded-full mb-3"></div>
          <p class="text-gray-400 text-sm max-w-md mx-auto">
            Web development, ML, and open source projects.
          </p>
        </div>
      </div>

      <!-- Filter tabs -->
      <div class="sticky top-16 z-20 px-4 py-3 bg-gray-900">
        <div class="overflow-x-auto no-scrollbar">
          <div class="flex space-x-2 min-w-full w-max">
            <button
              v-for="filter in filters"
              :key="filter"
              @click="setFilter(filter)"
              class="px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap select-none"
              :class="
                activeFilter === filter
                  ? 'bg-gray-700 text-gray-200 border border-gray-600'
                  : 'bg-gray-800 text-gray-400 border border-gray-700'
              "
              style="transition: none; transform: none"
            >
              {{ filter === "all" ? "All Projects" : filter }}
            </button>
          </div>
        </div>
      </div>

      <!-- Projects list -->
      <div class="px-4 py-4">
        <div class="space-y-4">
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="rounded-xl overflow-hidden border bg-gray-800/60 border-gray-700"
          >
            <div class="p-4">
              <!-- Subtitle -->
              <span class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">
                {{ project.subtitle }}
              </span>

              <h3 class="text-base font-semibold text-white mb-2">
                {{ project.title }}
              </h3>

              <p class="text-gray-400 text-sm mb-3">
                {{ project.description }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-1.5 mb-3">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="px-2 py-0.5 text-xs font-medium rounded-md bg-gray-700/50 text-gray-300 border border-gray-600/50"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Links -->
              <div class="pt-3 border-t border-gray-700 flex items-center gap-5 flex-wrap">
                <template v-if="project.links">
                  <a
                    v-if="project.links.github"
                    :href="project.links.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-white relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out"
                  >
                    GitHub
                  </a>
                  <a
                    v-if="project.links.kaggle"
                    :href="project.links.kaggle"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-white relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out"
                  >
                    Kaggle
                  </a>
                  <a
                    v-if="project.links.hfspace"
                    :href="project.links.hfspace"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-white relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out"
                  >
                    HF Space
                  </a>
                  <a
                    v-if="project.links.colab"
                    :href="project.links.colab"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-white relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out"
                  >
                    Colab
                  </a>
                </template>
                <a
                  v-else-if="project.link"
                  :href="project.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-white relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out"
                >
                  View Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- GitHub Link -->
      <div class="px-4 py-6 text-center">
        <a
          href="https://github.com/Jatinbhardwaj-093"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-full text-white bg-gray-800 hover:bg-gray-700 border border-gray-700"
        >
          <svg class="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          More on GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

@media (max-width: 640px) {
  .sticky button {
    transition: none !important;
    transform: none !important;
  }
}
</style>
