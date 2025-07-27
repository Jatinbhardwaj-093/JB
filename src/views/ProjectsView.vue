<script setup lang="ts">
import Projects from "../components/Projects.vue";
import { useThemeStore } from "../store/theme";
import { ref, computed } from "vue";

// Import the project images directly for reliable loading
import isepImage from "../assets/images/Projects/ISEP.webp";
import hspImage from "../assets/images/Projects/HSP.webp";
import sympyImage from "../assets/images/Projects/sympy.webp";
import gsocImage from "../assets/images/Projects/gsoc.webp";

const themeStore = useThemeStore();

// Projects data for mobile view - Updated with direct image imports
const projects = ref([
  {
    id: 3,
    title: "Google Summer of Code at SymPy",
    image: sympyImage,
    secondaryImage: gsocImage,
    description:
      "Implementing a formal power series domain system for SymPy to enhance its symbolic mathematics capabilities, with expected completion in Summer 2025.",
    tags: ["SymPy", "Python", "Cython", "C", "Pytest", "Hypothesis", "Codecov"],
    link: "https://summerofcode.withgoogle.com/programs/2025/projects/8VslkGZ9",
    upcoming: true,
  },
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
const filters = ["all", "Web Dev", "Open Source"];

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
    if (activeFilter.value === "Open Source") {
      return project.id === 3; // SymPy project is open source
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

    <!-- Mobile Version - Custom Design -->
    <div class="block md:hidden min-h-screen bg-gray-900">
      <!-- Header with animated gradient background -->
      <div class="relative overflow-hidden">
        <div
          class="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-700 z-0"
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
        class="sticky top-16 z-20 px-4 py-4 filter-tabs-container bg-gray-900"
      >
        <div class="overflow-x-auto no-scrollbar">
          <div class="flex space-x-2 min-w-full w-max">
            <button
              v-for="filter in filters"
              :key="filter"
              @click="setFilter(filter)"
              class="px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap select-none"
              :class="{
                'bg-gray-200 text-gray-700 border border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600':
                  activeFilter === filter,
                'bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700':
                  activeFilter !== filter,
              }"
              style="transition: none; transform: none"
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
            class="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300"
          >
            <!-- Project image with overlay -->
            <div class="relative h-64 overflow-hidden group">
              <!-- Special dual image layout for GSoC+SymPy project -->
              <template v-if="project.id === 3">
                <div
                  class="flex items-center justify-center w-full h-full px-0"
                >
                  <img
                    :src="project.secondaryImage"
                    alt="GSoC logo"
                    class="w-1/2 h-full object-contain p-0 pr-1 transition-transform duration-700 group-hover:scale-105"
                  />
                  <img
                    :src="project.image"
                    alt="SymPy logo"
                    class="w-1/2 h-full object-contain p-0 pl-1 transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </template>
              <!-- Standard image for other projects -->
              <template v-else>
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </template>
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"
              >
                <div class="absolute inset-0 flex items-end p-6">
                  <p
                    class="text-lg sm:text-2xl font-bold text-white project-title"
                  >
                    {{ project.title }}
                  </p>
                </div>
              </div>
              <!-- Upcoming badge -->
              <div
                v-if="project.upcoming"
                class="absolute top-4 right-4 bg-gray-700 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md transform transition-transform duration-300 hover:scale-105"
              >
                Upcoming
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
                  class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Project link - matched with desktop -->
              <router-link
                v-if="project.id === 2"
                to="/projects/hsp"
                class="inline-flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 btn-view-project"
              >
                <span class="relative">
                  View Project
                  <span
                    class="absolute bottom-0 left-0 w-full h-0.5 bg-current transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                  ></span>
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-1 h-4 w-4 transition-transform duration-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </router-link>
              <a
                v-else
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 btn-view-project"
              >
                <span class="relative">
                  View Project
                  <span
                    class="absolute bottom-0 left-0 w-full h-0.5 bg-current transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                  ></span>
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-1 h-4 w-4 transition-transform duration-300"
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
          class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-700 hover:bg-gray-800 transition-colors duration-300"
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

/* Card hover effect - matched with desktop */
.rounded-xl {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.dark\:bg-gray-900 {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.rounded-xl:hover {
  transform: translateY(-12px) translateZ(10px) scale(1.01);
}

.rounded-xl:active {
  transform: scale(0.98);
}

/* Filter buttons - removed hover transitions */
/* button {
  transition: all 0.2s ease;
} */

/* Filter tab specific styles - disable hover effects and ALL animations on small screens */
.flex.space-x-2.min-w-full.w-max button {
  transition: none !important;
  transform: none !important;
  pointer-events: auto; /* Keep clickable */
  cursor: pointer;
}

.flex.space-x-2.min-w-full.w-max button:hover {
  transform: none !important;
  box-shadow: none !important;
}

/* Comprehensive animation removal for filter tabs container on small screens */
@media (max-width: 640px) {
  .filter-tabs-container,
  .filter-tabs-container * {
    animation: none !important;
    transition: none !important;
    transform: none !important;
    will-change: auto !important;
  }

  .filter-tabs-container button {
    animation: none !important;
    transition: none !important;
    transform: none !important;
    will-change: auto !important;
  }

  .filter-tabs-container button:hover,
  .filter-tabs-container button:focus,
  .filter-tabs-container button:active {
    animation: none !important;
    transition: none !important;
    transform: none !important;
    box-shadow: none !important;
    will-change: auto !important;
  }

  /* Override any inherited animations */
  .filter-tabs-container .flex,
  .filter-tabs-container .space-x-2,
  .filter-tabs-container .min-w-full,
  .filter-tabs-container .w-max {
    animation: none !important;
    transition: none !important;
    transform: none !important;
    will-change: auto !important;
  }
}

/* Project title styling - matched with desktop version */
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
  background: white; /* White underline to match desktop */
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.group:hover .project-title::after {
  width: 100%;
}

/* Add drop shadow on hover to match desktop */
.group:hover .project-title {
  color: white;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}

/* Card entrance animation - matched with desktop */
.bg-white:not(.filter-tabs-container),
.dark\:bg-gray-900:not(.filter-tabs-container) {
  transform-style: preserve-3d;
  transform: translateZ(0);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.bg-white:nth-child(1),
.dark\:bg-gray-900:nth-child(1) {
  animation-delay: 0.2s;
}

.bg-white:nth-child(2),
.dark\:bg-gray-900:nth-child(2) {
  animation-delay: 0.4s;
}

.bg-white:nth-child(3),
.dark\:bg-gray-900:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes projectCardEntrance {
  0% {
    opacity: 0;
    transform: translateY(60px) translateZ(-30px) rotateX(-10deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) translateZ(0) rotateX(0);
  }
}

/* Enhanced hover effect to match desktop */
.bg-white:hover,
.dark\:bg-gray-900:hover {
  transform: translateY(-12px) translateZ(10px) scale(1.01);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* GSoC and SymPy image responsive fixes for mobile */
@media (max-width: 640px) {
  /* GSoC project image container adjustments - Made bigger */
  .flex.items-center.justify-center.w-full.h-full.px-0 {
    min-height: 200px !important;
    height: 250px !important;
    padding: 1.5rem 0;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .flex.items-center.justify-center.w-full.h-full.px-0 img:first-child {
    object-fit: contain !important;
    max-height: 160px !important;
    width: 60% !important;
    max-width: 60% !important;
    height: auto !important;
  }

  .flex.items-center.justify-center.w-full.h-full.px-0 img:last-child {
    object-fit: contain !important;
    max-height: 160px !important;
    width: 40% !important;
    max-width: 40% !important;
    height: auto !important;
  }

  /* Optimize for very small screens - Made bigger */
  @media (max-width: 375px) {
    .flex.items-center.justify-center.w-full.h-full.px-0 {
      min-height: 180px !important;
      height: 220px !important;
      padding: 1rem 0;
    }

    .flex.items-center.justify-center.w-full.h-full.px-0 img {
      max-height: 130px !important;
      width: 47% !important;
      max-width: 47% !important;
    }
  }
}
</style>
