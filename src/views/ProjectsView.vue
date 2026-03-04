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
    title: "Musical Classification Model",
    subtitle: "Visual Transformer",
    description:
      "A Vision Transformer-based model for classifying musical genres from audio spectrograms using transfer learning and attention mechanisms.",
    tags: ["NumPy", "Pandas", "PyTorch", "Hugging Face", "W&B", "Librosa"],
    links: {
      github: "#",
      kaggle: "#",
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
              <div class="pt-3 border-t border-gray-700 flex items-center gap-3">
                <template v-if="project.links">
                  <a
                    :href="project.links.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 text-sm text-gray-300 hover:text-white"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                    </svg>
                    GitHub
                  </a>
                  <a
                    :href="project.links.kaggle"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 text-sm text-gray-300 hover:text-white"
                  >
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.281.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.075.378z"/>
                    </svg>
                    Kaggle
                  </a>
                </template>
                <a
                  v-else-if="project.link"
                  :href="project.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 text-sm text-gray-300 hover:text-white"
                >
                  View Project
                  <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
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
