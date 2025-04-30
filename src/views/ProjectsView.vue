<script setup lang="ts">
import WebDevProjects from "../components/WebDevProjects.vue";
import { useThemeStore } from "../store/theme";
import { ref, computed } from "vue";

// Import the project images directly for reliable loading
import isepImage from "../assets/images/WebDevProjects/ISEP.png";
import hspImage from "../assets/images/WebDevProjects/HSP.png";

const themeStore = useThemeStore();

// Projects data for mobile view - Updated with direct image imports
const projects = ref([
  {
    id: 1,
    title: "Influencer-Sponsor Engagement Platform",
    image: isepImage,
    description:
      "A comprehensive collaboration platform connecting influencers with sponsors and sponsorship opportunities.",
    tags: ["HTML/CSS", "JavaScript", "Flask", "SQLite"],
    link: "https://github.com/Jatinbhardwaj-093/Infulencer-Sponsor-Engagement-Platform",
  },
  {
    id: 2,
    title: "HouseHold Service Platform",
    image: hspImage,
    description:
      "A booking service platform that helps users find and schedule household services with verified service providers.",
    tags: ["Vue.js", "Flask", "SQLite", "Redis"],
    link: "https://github.com/Jatinbhardwaj-093/HouseHold-Service-Platform",
  },
]);

// Filter state
const activeFilter = ref("all");
const filters = ["all", "Web Dev"];

const setFilter = (filter) => {
  activeFilter.value = filter;
};

// Filtered projects based on active filter
const filteredProjects = computed(() => {
  if (activeFilter.value === "all") return projects.value;

  return projects.value.filter((project) => {
    if (activeFilter.value === "Web Dev") {
      return project.tags.some((tag) =>
        ["HTML/CSS", "JavaScript", "Vue.js", "Flask"].includes(tag)
      );
    }
    return true;
  });
});
</script>

<template>
  <div>
    <!-- Desktop Version -->
    <div class="hidden md:block">
      <WebDevProjects />
    </div>

    <!-- Mobile Version - Custom Design -->
    <div
      class="block md:hidden min-h-screen"
      :class="{
        'bg-gray-50': themeStore.theme === 'light',
        'bg-gray-900': themeStore.theme === 'dark',
      }"
    >
      <!-- Header with animated gradient background -->
      <div class="relative overflow-hidden">
        <div
          class="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 z-0"
        ></div>
        <div class="absolute inset-0 bg-grid-white/10 opacity-30 z-1"></div>

        <!-- Header content -->
        <div class="relative z-10 px-4 py-10 text-center">
          <h1 class="text-3xl font-bold text-white mb-2">My Projects</h1>
          <div class="h-1 w-16 bg-white/70 mx-auto rounded-full mb-4"></div>
          <p class="text-white/90 text-sm max-w-md mx-auto">
            Explore some of my latest web development projects, combining
            elegant design with powerful functionality.
          </p>
        </div>
      </div>

      <!-- Filter tabs -->
      <div
        class="sticky top-16 z-20 shadow-sm px-3 py-3"
        :class="{
          'bg-white': themeStore.theme === 'light',
          'bg-gray-900': themeStore.theme === 'dark',
        }"
      >
        <div class="overflow-x-auto no-scrollbar">
          <div class="flex space-x-2 min-w-full w-max">
            <button
              v-for="filter in filters"
              :key="filter"
              @click="setFilter(filter)"
              class="px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap"
              :class="{
                'bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-900/60 dark:text-indigo-300 dark:border-indigo-700':
                  activeFilter === filter,
                'bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700':
                  activeFilter !== filter,
              }"
            >
              {{ filter === "all" ? "All Projects" : filter }}
            </button>
          </div>
        </div>
      </div>

      <!-- Projects grid with improved mobile UX -->
      <div class="px-4 py-6">
        <div class="space-y-6">
          <!-- Project cards with interactive elements -->
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300"
          >
            <!-- Project image with overlay -->
            <div class="relative h-64 overflow-hidden group">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"
              >
                <div class="absolute inset-0 flex items-end p-6">
                  <h3 class="text-2xl font-bold text-white project-title">
                    {{ project.title }}
                  </h3>
                </div>
              </div>
            </div>

            <!-- Project details -->
            <div class="p-4">
              <p class="text-gray-700 dark:text-gray-300 text-sm mb-4">
                {{ project.description }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Project link -->
              <a
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium text-sm"
              >
                View Project
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- GitHub Link -->
      <div class="px-4 py-8 text-center">
        <a
          href="https://github.com/Jatinbhardwaj-093"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
        >
          <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
            />
          </svg>
          More Projects on GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar while keeping functionality */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.no-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* Grid pattern background */
.bg-grid-white\/10 {
  background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Card hover effect */
.rounded-xl {
  transition: all 0.3s ease;
}

.rounded-xl:active {
  transform: scale(0.98);
}

/* Filter button transitions */
button {
  transition: all 0.2s ease;
}

/* Project title styling */
.project-title {
  position: relative;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.project-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background: linear-gradient(90deg, #4f46e5, #818cf8);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.group:hover .project-title::after {
  width: 100%;
}

/* Card entrance animation */
.bg-white,
.dark\:bg-gray-800 {
  animation: projectCardEntrance 0.8s cubic-bezier(0.25, 1, 0.5, 1) backwards;
}

.bg-white:nth-child(1),
.dark\:bg-gray-800:nth-child(1) {
  animation-delay: 0.2s;
}

.bg-white:nth-child(2),
.dark\:bg-gray-800:nth-child(2) {
  animation-delay: 0.4s;
}

@keyframes projectCardEntrance {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Image hover effect with parallax and shine */
.group {
  overflow: hidden;
}

.group::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 100%
  );
  transform: skewX(-25deg);
  z-index: 2;
  transition: all 0.75s;
  opacity: 0;
}

.group:hover::before {
  animation: shine 1.5s cubic-bezier(0.25, 1, 0.5, 1);
}

@keyframes shine {
  0% {
    left: -100%;
    opacity: 0;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    left: 150%;
    opacity: 0;
  }
}

/* Ensure image aspect ratio is maintained */
img {
  aspect-ratio: 16/9;
  object-fit: cover;
}
</style>
