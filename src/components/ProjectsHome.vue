<script setup lang="ts">
import { ref, onMounted } from "vue";

// Import project images directly
import isepImage from "../assets/images/Projects/ISEP.webp";
import hspImage from "../assets/images/Projects/HSP.webp";
import sympyImage from "../assets/images/Projects/sympy.webp";
import gsocImage from "../assets/images/Projects/gsoc.webp";

// Function to get technology-specific colors (monochrome - all same shade)
const getTechColor = (techName: string) => {
  // All technologies use the same gray shade for consistent monochrome design
  return "bg-gray-600";
};

// Get Google Doc icon based on theme
const getGoogleDocIcon = () => {
  return new URL("../assets/images/Projects/Links/gdocs.webp", import.meta.url)
    .href;
};

// Get Figma icon
const getFigmaIcon = () => {
  return new URL("../assets/images/Projects/Links/figma.webp", import.meta.url)
    .href;
};

// Get GitHub icon
const getGitHubIcon = () => {
  return new URL("../assets/images/GitHub.png", import.meta.url).href;
};

// Get GSoC icon
const getGSoCIcon = () => {
  return new URL("../assets/icons/GSoC-icon.svg", import.meta.url).href;
};

// Add direct references to image paths for better reliability
const projectImagePaths = {
  isep: isepImage,
  hsp: hspImage,
  sympy: sympyImage,
  gsoc: gsocImage,
};

const projects = ref([
  {
    id: 3,
    title: "Google Summer of Code at SymPy",
    description:
      "Formal power series system for symbolic mathematics.",
    image: sympyImage,
    technologies: [
      { name: "Python" },
      { name: "Cython" },
      { name: "SymPy" },
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
      "Dual backend architecture with Python and Cython",
      "85x-1680x performance improvements",
      "Comprehensive testing with pytest and Hypothesis",
    ],
  },
  {
    id: 1,
    title: "Influencer-Sponsor Platform",
    description:
      "Collaboration platform connecting influencers with sponsors.",
    image: isepImage,
    technologies: [
      { name: "Flask" },
      { name: "JavaScript" },
      { name: "SQLite" },
    ],
    links: [
      {
        type: "github",
        url: "https://github.com/Jatinbhardwaj-093/Infulencer-Sponsor-Engagement-Platform",
      },
    ],
    features: [
      "Profile matching system",
      "Analytics dashboard",
      "Secure messaging",
    ],
  },
  {
    id: 2,
    title: "Household Service Platform",
    description:
      "Booking platform for household services with verified providers.",
    image: hspImage,
    technologies: [
      { name: "Vue.js" },
      { name: "Flask" },
      { name: "Redis" },
    ],
    links: [
      {
        type: "github",
        url: "https://github.com/Jatinbhardwaj-093/HouseHold-Service-Platform",
      },
    ],
    features: [
      "Real-time tracking",
      "Payment processing",
      "Rating system",
    ],
  },
]);

const activeTab = ref("all");

// Feature preview & expand state per project
const previewCount = 2; // show first 2 features by default
const expanded = ref<Record<number, boolean>>({});

const isExpanded = (id: number) => !!expanded.value[id];

const toggleExpand = (id: number) => {
  // preserve reactivity by replacing the object
  expanded.value = { ...expanded.value, [id]: !expanded.value[id] };
};

// Improved error handling for images
const handleImageError = (e: Event, projectId: number) => {
  const target = e.target as HTMLImageElement;
  console.error(`Image failed to load for project ${projectId}`);
  if (target) {
    // Instead of hiding, set a fallback background color
    target.style.backgroundColor = "#1f1f1f";
    // Try reloading the image with a different approach
    if (projectId === 1) {
      target.src = projectImagePaths.isep;
    } else if (projectId === 2) {
      target.src = projectImagePaths.hsp;
    } else if (projectId === 3) {
      target.src = projectImagePaths.sympy;
    }
  }
};

// Return the GitHub repo URL if present, otherwise fallback to first available link or '#'
const getRepoUrl = (links: Array<{ type: string; url: string }>) => {
  if (!links || links.length === 0) return "#";
  const gh = links.find((l) => l.type === "github");
  return gh ? gh.url : links[0].url;
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-3 projects-container">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="project-card rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl border"
          :class="{
            'transform-gpu hover:-translate-y-2': index % 2 === 0,
            'transform-gpu hover:translate-y-2': index % 2 !== 0,
            'bg-gray-800/60 border-gray-700': true,
          }"
        >
          <!-- Image -->
          <div class="relative overflow-hidden group h-32">
            <template v-if="project.id === 3">
              <div
                class="flex items-center justify-center w-full h-full px-2 overflow-hidden"
              >
                <img
                  :src="gsocImage"
                  alt="GSoC logo"
                  class="w-1/3 h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="eager"
                />
                <img
                  :src="sympyImage"
                  alt="SymPy logo"
                  class="w-1/4 h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="eager"
                  @error="handleImageError($event, project.id)"
                />
              </div>
            </template>
            <template v-else>
              <img
                :src="project.image"
                :alt="`${project.title} screenshot`"
                class="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                loading="eager"
                @error="handleImageError($event, project.id)"
              />
            </template>
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
            ></div>

            <!-- Project title overlay -->
            <div class="absolute inset-0 flex items-end p-2">
              <h3
                class="text-xs font-semibold text-white leading-tight"
              >
                {{ project.title }}
              </h3>
            </div>
          </div>

          <!-- Content -->
          <div class="p-3">
            <a
              :href="getRepoUrl(project.links)"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs text-gray-400 hover:text-gray-200 flex items-center justify-center gap-1"
            >
              <span>View</span>
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
  </div>
</template>

<style scoped>
.project-card {
  transition: all 0.3s ease;
  background: #1f2937;
  opacity: 0;
  animation: fadeIn 0.4s ease-out forwards;
  overflow: hidden;
}

.project-card:nth-child(1) {
  animation-delay: 0.05s;
}
.project-card:nth-child(2) {
  animation-delay: 0.1s;
}
.project-card:nth-child(3) {
  animation-delay: 0.15s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.project-card img {
  transition: transform 0.3s ease;
}

.project-card:hover img {
  transform: scale(1.08);
}

@media (max-width: 768px) {
  .project-card {
    margin-bottom: 0;
  }
}
</style>
