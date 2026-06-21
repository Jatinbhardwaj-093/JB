<script setup>
import { ref } from "vue";
import projects from "../data/projects";

// Feature preview & expand state per project
const previewCount = 2;
const expanded = ref({});

const isExpanded = (id) => !!expanded.value[id];

const toggleExpand = (id) => {
  expanded.value = { ...expanded.value, [id]: !expanded.value[id] };
};

// Label for link type
const getLinkLabel = (type) => {
  const labels = {
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
          v-for="project in projects"
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
                :key="tech"
                class="px-2 py-1 text-xs font-medium bg-gray-700/50 text-gray-300 rounded-md border border-gray-600/50"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Footer Links -->
            <div class="pt-3 border-t border-gray-700 flex items-center gap-5 mt-auto flex-wrap">
              <a
                v-for="(url, type) in project.links"
                :key="type"
                :href="url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-white relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out"
              >
                {{ getLinkLabel(type) }}
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
