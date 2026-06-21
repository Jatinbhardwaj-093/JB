<script setup>
import { ref, computed } from "vue";
import projects from "../data/projects";

// Filter state
const activeFilter = ref("all");
const filters = ["all", "ML/AI", "Web Dev", "Open Source"];

const setFilter = (filter) => {
  activeFilter.value = filter;
};

const filteredProjects = computed(() => {
  if (activeFilter.value === "all") return projects;
  return projects.filter((project) => project.category === activeFilter.value);
});

// Accordion details toggle states
const expandedProjects = ref({});
const toggleProjectDetails = (id) => {
  expandedProjects.value[id] = !expandedProjects.value[id];
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

const getLinkClass = (type) => {
  const t = type.toLowerCase();
  if (t === 'github') return 'hover:text-gruv-green hover:underline';
  if (t === 'colab') return 'hover:text-gruv-orange hover:underline';
  if (t === 'hfspace') return 'hover:text-gruv-yellow hover:underline';
  if (t === 'gsoc') return 'hover:text-gruv-blue hover:underline';
  if (t === 'drive') return 'hover:text-gruv-aqua hover:underline';
  if (t === 'figma') return 'hover:text-gruv-purple hover:underline';
  return 'hover:text-gruv-accent hover:underline';
};
</script>

<template>
  <div class="space-y-12 w-full text-gruv-fg dark:text-gruv-fg">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div class="space-y-2">
        <h2 class="mono-text text-xs text-gruv-muted tracking-widest uppercase font-medium">Selected Works</h2>
        <h3 class="text-2xl font-light tracking-tight text-gruv-fg">Engineering Portfolio</h3>
        <p class="text-xs text-gruv-fg dark:text-gruv-muted font-light max-w-xl leading-relaxed">
          Open-source algorithms, symbolic computing systems, machine learning pipelines, and web developments.
        </p>
      </div>

      <!-- Filter Controls -->
      <div class="flex items-center gap-2 font-mono text-[10px] border border-gruv-border p-1 rounded-lg self-start sm:self-auto">
        <button 
          v-for="filter in filters"
          :key="filter"
          @click="setFilter(filter)"
          class="px-2.5 py-1 rounded border border-transparent transition-colors whitespace-nowrap"
          :class="activeFilter === filter 
            ? 'filter-btn-active' 
            : 'text-gruv-muted hover:text-gruv-accent'"
        >
          {{ filter === "all" ? "All" : filter }}
        </button>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="project-card border-x border-b border-t-2 border-gruv-border border-t-gruv-purple rounded-xl p-6 bg-gruv-card flex flex-col justify-between group animate-fade-in"
      >
        <div class="space-y-4">
          <div class="flex justify-between items-start">
            <span class="mono-text text-xs text-gruv-muted uppercase">
              {{ project.subtitle }}
            </span>
          </div>
          <h4 class="text-lg font-light tracking-tight text-gruv-fg group-hover:text-gruv-fg dark:group-hover:text-gruv-fg transition-colors">
            {{ project.title }}
          </h4>
          <p class="text-xs text-gruv-muted font-light leading-relaxed">
            {{ project.description }}
          </p>

          <!-- Clickable Details Accordion Toggle -->
          <div v-if="project.features && project.features.length" class="pt-1">
            <button 
              @click="toggleProjectDetails(project.id)"
              class="btn-details flex items-center gap-1 focus:outline-none"
            >
              <span>{{ expandedProjects[project.id] ? '[-]' : '[+]' }}</span>
              <span>{{ expandedProjects[project.id] ? 'hide_details' : 'view_details' }}</span>
            </button>

            <transition name="page-fade">
              <ul v-if="expandedProjects[project.id]" class="mt-3 space-y-2 text-xs text-gruv-fg dark:text-gruv-muted font-light">
                <li v-for="feat in project.features" :key="feat" class="flex items-start gap-2">
                  <span class="text-gruv-purple font-bold mr-1">•</span>
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </transition>
          </div>
        </div>

        <!-- Technologies -->
        <div class="flex flex-wrap gap-1.5 mt-4">
          <span 
            v-for="tech in project.technologies" 
            :key="tech"
            class="tech-badge"
          >
            {{ tech }}
          </span>
        </div>

        <!-- Links -->
        <div class="flex gap-4 mt-6 border-t border-gruv-border dark:border-gruv-border/60 pt-3">
          <a
            v-for="(url, type) in project.links"
            :key="type"
            :href="url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[11px] font-mono text-gruv-muted transition-colors"
            :class="getLinkClass(type)"
          >
            [{{ getLinkLabel(type) }}]
          </a>
        </div>
      </div>
    </div>

    <!-- More Works bottom section -->
    <div class="pt-8 text-center">
      <a
        href="https://github.com/Jatinbhardwaj-093"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-6 py-2.5 bg-gruv-card text-gruv-fg dark:bg-gruv-card dark:text-gruv-fg text-xs font-mono rounded hover:opacity-90 transition-opacity border border-gruv-border dark:border-gruv-border"
      >
        <span>[GitHub] view_more_repositories</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.project-card:hover {
  transform: translateY(-2px);
}
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
