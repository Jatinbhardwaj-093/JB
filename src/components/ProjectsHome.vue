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
  <div class="flex flex-col items-center">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 projects-container w-full mb-8">
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        class="project-card rounded-xl overflow-hidden shadow-lg transition-all duration-300 border bg-gray-800 border-gray-700 flex flex-col h-full"
      >
        <!-- Image -->
        <div class="relative overflow-hidden group h-48 flex-shrink-0">
          <img
            :src="project.image"
            :alt="`${project.title} screenshot`"
            class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
            loading="eager"
            @error="handleImageError($event, project.id)"
          />
          <div
            class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"
          ></div>
        </div>

        <!-- Content -->
        <div class="p-5 flex flex-col flex-grow">
          <h3 class="text-xl font-bold text-white mb-2 line-clamp-1">
            {{ project.title }}
          </h3>
          
          <p class="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
            {{ project.description }}
          </p>
          
          <!-- Tech Stack -->
          <div class="flex flex-wrap gap-2 mb-4">
             <span 
               v-for="tech in project.technologies" 
               :key="tech.name"
               class="px-2 py-1 text-xs font-medium bg-gray-700/50 text-gray-300 rounded-md border border-gray-600/50"
             >
               {{ tech.name }}
             </span>
          </div>

          <!-- Footer -->
          <div class="pt-4 border-t border-gray-700 flex items-center justify-between mt-auto">
             <a
              :href="getRepoUrl(project.links)"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group/link"
            >
              <svg class="w-5 h-5 text-gray-400 group-hover/link:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
              <span>View Source</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <router-link
      to="/projects"
      class="group inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-all duration-300 hover:shadow-lg border border-gray-700 hover:border-gray-600"
    >
      <span class="font-medium">View All Projects</span>
      <svg 
        class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
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
  transform: translateY(-5px);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}
</style>
