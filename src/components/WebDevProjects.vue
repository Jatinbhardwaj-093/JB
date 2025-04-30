<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();

// Import project images directly
import isepImage from "../assets/images/WebDevProjects/ISEP.png";
import hspImage from "../assets/images/WebDevProjects/HSP.png";

// Helper function to get correct image URLs for technology icons
const getIconUrl = (path) => {
  return new URL(`../assets/images/${path}`, import.meta.url).href;
};

// Add direct references to image paths for better reliability
const projectImagePaths = {
  isep: isepImage,
  hsp: hspImage,
};

const projects = ref([
  {
    id: 1,
    title: "Influencer-Sponsor Engagement Platform",
    description:
      "A comprehensive collaboration platform connecting influencers with sponsors and sponsorship opportunities.",
    image: isepImage,
    technologies: [
      { name: "HTML5", img: "HTML5.png" },
      { name: "CSS3", img: "CSS3.png" },
      { name: "JavaScript", img: "JavaScript.png" },
      { name: "Flask", img: "Flask.png" },
      { name: "SQLite", img: "SQLite.png" },
      { name: "Git", img: "Git.png" },
    ],
    links: [
      {
        type: "github",
        url: "https://github.com/Jatinbhardwaj-093/Infulencer-Sponsor-Engagement-Platform",
        icon: "bi bi-github",
      },
      {
        type: "drive",
        url: "https://drive.google.com/drive/folders/1SLRgwuTLKnKVfdY9br0idI0x_NHyb0Qn?usp=drive_link",
        icon: "bi bi-google",
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
    description:
      "A booking service platform that helps users find and schedule household services with verified service providers.",
    image: hspImage,
    technologies: [
      { name: "Vue.js", img: "Vue.js.png" },
      { name: "Flask", img: "Flask.png" },
      { name: "SQLite", img: "SQLite.png" },
      { name: "Redis", img: "Redis.png" },
      { name: "Celery", img: "Celery.png" },
      { name: "Git", img: "Git.png" },
    ],
    links: [
      {
        type: "github",
        url: "https://github.com/Jatinbhardwaj-093/HouseHold-Service-Platform",
        icon: "bi bi-github",
      },
      {
        type: "drive",
        url: "https://drive.google.com/drive/folders/1YR5UsPf4jtXYstgQJDPUFEjy33uew83I?usp=drive_link",
        icon: "bi bi-google",
      },
      {
        type: "figma",
        url: "https://www.figma.com/design/a5MomTlXdFQ1qz7lAzog7E/Househod-Service-MAD-1?node-id=0-1&t=Xo1ho1DEgCnSpn03-1",
        icon: "bi bi-figma",
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

const activeTab = ref("all");

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
    }
  }
};
</script>

<template>
  <section class="py-10">
    <div class="container mx-auto px-4">
      <div class="mb-10 text-center">
        <h2
          class="text-3xl font-bold mb-2"
          :class="{
            'text-white': themeStore.theme === 'dark',
            'text-black': themeStore.theme === 'light',
          }"
        >
          Featured Projects
        </h2>
        <div class="h-1 w-24 bg-indigo-600 mx-auto rounded-full"></div>
        <p
          class="mt-4 max-w-2xl mx-auto"
          :class="{
            'text-gray-300': themeStore.theme === 'dark',
            'text-gray-600': themeStore.theme === 'light',
          }"
        >
          Explore some of my latest web development projects, combining elegant
          design with powerful functionality.
        </p>
      </div>

      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 projects-container"
      >
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="project-card rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl border"
          :class="{
            'transform-gpu hover:-translate-y-2': index % 2 === 0,
            'transform-gpu hover:translate-y-2': index % 2 !== 0,
            'bg-gray-800/60 border-gray-700': themeStore.theme === 'dark',
            'bg-white border-gray-100': themeStore.theme === 'light',
          }"
        >
          <!-- Image -->
          <div class="relative overflow-hidden group min-h-[160px]">
            <img
              :src="project.image"
              :alt="`${project.title} screenshot`"
              class="w-full min-h-[160px] h-64 object-cover object-top transition-transform duration-700 group-hover:scale-105"
              loading="eager"
              @error="handleImageError($event, project.id)"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"
            ></div>

            <!-- Project title overlay -->
            <div class="absolute inset-0 flex items-end p-4 sm:p-6">
              <h3
                class="text-lg sm:text-xl md:text-2xl font-bold text-white project-title"
              >
                {{ project.title }}
              </h3>
            </div>
          </div>

          <!-- Content -->
          <div class="p-5 space-y-3">
            <p
              :class="{
                'text-gray-300': themeStore.theme === 'dark',
                'text-gray-700': themeStore.theme === 'light',
              }"
            >
              {{ project.description }}
            </p>

            <!-- Features -->
            <div class="space-y-2">
              <h4
                class="font-semibold"
                :class="{
                  'text-white': themeStore.theme === 'dark',
                  'text-black': themeStore.theme === 'light',
                }"
              >
                Key Features:
              </h4>
              <ul class="list-disc pl-5 space-y-1">
                <li
                  v-for="(feature, i) in project.features"
                  :key="i"
                  class="text-sm"
                  :class="{
                    'text-gray-300': themeStore.theme === 'dark',
                    'text-gray-700': themeStore.theme === 'light',
                  }"
                >
                  {{ feature }}
                </li>
              </ul>
            </div>

            <!-- Technologies -->
            <div class="mt-3">
              <h4
                class="font-semibold mb-2"
                :class="{
                  'text-white': themeStore.theme === 'dark',
                  'text-black': themeStore.theme === 'light',
                }"
              >
                Technologies Used:
              </h4>
              <div class="flex flex-wrap gap-1.5 tags-container">
                <div
                  v-for="(tech, i) in project.technologies"
                  :key="i"
                  class="tech-badge group flex items-center gap-1 px-1.5 py-1 rounded-full"
                  :class="{
                    'bg-gray-700/70': themeStore.theme === 'dark',
                    'bg-gray-100': themeStore.theme === 'light',
                  }"
                >
                  <div
                    class="w-4 h-4 rounded-md overflow-hidden flex items-center justify-center"
                    :class="{
                      'bg-gray-800': themeStore.theme === 'dark',
                      'bg-white': themeStore.theme === 'light',
                    }"
                  >
                    <img
                      :src="getIconUrl(tech.img)"
                      :alt="`${tech.name} icon`"
                      class="w-4 h-4 object-contain"
                    />
                  </div>
                  <span
                    class="text-xs font-medium"
                    :class="{
                      'text-gray-300': themeStore.theme === 'dark',
                      'text-gray-700': themeStore.theme === 'light',
                    }"
                    >{{ tech.name }}</span
                  >
                </div>
              </div>
            </div>

            <!-- Links -->
            <div
              class="pt-3 mt-3 border-t flex justify-between items-center"
              :class="{
                'border-gray-700': themeStore.theme === 'dark',
                'border-gray-100': themeStore.theme === 'light',
              }"
            >
              <div class="flex space-x-3">
                <a
                  v-for="(link, i) in project.links"
                  :key="i"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="link-button p-2 rounded-full transition-colors duration-300"
                  :class="{
                    'text-gray-400 hover:text-indigo-400 hover:bg-gray-700':
                      themeStore.theme === 'dark',
                    'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50':
                      themeStore.theme === 'light',
                  }"
                  :aria-label="`Link to ${link.type} for ${project.title}`"
                >
                  <i :class="link.icon" class="text-lg"></i>
                </a>
              </div>

              <a
                :href="project.links[0].url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 btn-view-project"
              >
                View Project
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- More Projects Button -->
      <div class="mt-8 text-center">
        <a
          href="https://github.com/Jatinbhardwaj-093"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
        >
          <i class="bi bi-github mr-2"></i>
          View More on GitHub
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-container {
  perspective: 1000px;
}

.project-card {
  position: relative;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transform-style: preserve-3d;
  transform: translateZ(0);
  background: var(--card-bg, #ffffff);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  animation: projectCardEntrance 0.8s cubic-bezier(0.25, 1, 0.5, 1) backwards;
}

.project-card:nth-child(1) {
  animation-delay: 0.2s;
}
.project-card:nth-child(2) {
  animation-delay: 0.4s;
}
.project-card:nth-child(3) {
  animation-delay: 0.6s;
}
.project-card:nth-child(4) {
  animation-delay: 0.8s;
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

.project-card:hover {
  transform: translateY(-12px) translateZ(10px) scale(1.01);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.project-card img {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transform: scale(1);
  filter: brightness(1) saturate(1);
}

.project-card:hover img {
  transform: scale(1.05);
  filter: brightness(1.1) saturate(1.1);
}

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

.project-card:hover .project-title::after {
  width: 100%;
}

.project-card:hover .project-title {
  color: var(--title-hover, #4f46e5);
}

.tags-container span {
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateZ(0);
  animation: tagEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.tags-container span:nth-child(1) {
  animation-delay: 0.8s;
}
.tags-container span:nth-child(2) {
  animation-delay: 0.9s;
}
.tags-container span:nth-child(3) {
  animation-delay: 1s;
}
.tags-container span:nth-child(4) {
  animation-delay: 1.1s;
}

@keyframes tagEntrance {
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.project-card:hover .tags-container span {
  background: var(--tag-bg-hover, #e0e7ff);
  color: var(--tag-color-hover, #4f46e5);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px -2px rgba(79, 70, 229, 0.2);
}

.btn-view-project {
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateZ(0);
  z-index: 1;
}

.btn-view-project::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #4f46e5, #818cf8);
  opacity: 0;
  z-index: -1;
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-view-project:hover {
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.btn-view-project:hover::before {
  opacity: 1;
}

.btn-view-project svg {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-view-project:hover svg {
  transform: translateX(4px);
}

/* Dark mode specific adjustments */
:root[data-theme="dark"] .project-card {
  --card-bg: #1f2937;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

:root[data-theme="dark"] .project-card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 10px 10px -5px rgba(0, 0, 0, 0.2);
}

:root[data-theme="dark"] .project-title {
  --title-hover: #818cf8;
}

:root[data-theme="dark"] .tags-container span {
  --tag-bg-hover: #3730a3;
  --tag-color-hover: #e0e7ff;
}

/* Loading state animation */
.loading-skeleton {
  position: relative;
  overflow: hidden;
  background: #e2e8f0;
  animation: skeletonPulse 1.5s ease-in-out infinite;
}

:root[data-theme="dark"] .loading-skeleton {
  background: #374151;
}

.loading-skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 2s infinite;
}

:root[data-theme="dark"] .loading-skeleton::after {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 20%,
    rgba(255, 255, 255, 0.2) 60%,
    rgba(255, 255, 255, 0)
  );
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

@keyframes skeletonPulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Responsive animations */
@media (max-width: 768px) {
  .project-card {
    animation-delay: calc(0.15s * var(--index, 0));
  }

  .project-card:hover {
    transform: translateY(-8px) translateZ(5px);
  }
}

/* Image hover effect with parallax and shine effect */
.project-card .relative {
  overflow: hidden;
}

.project-card:hover img {
  transform: scale(1.07);
}

.project-card .relative::before {
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

.project-card:hover .relative::before {
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

/* Technology badges with pop effect */
.tech-badge {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: fadeIn 0.5s ease-out both;
  animation-delay: calc(var(--badge-index, 0) * 100ms + 800ms);
}

.tech-badge:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Enhanced link button effects */
.link-button {
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.link-button::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.2) 0%,
    rgba(99, 102, 241, 0) 70%
  );
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.5s cubic-bezier(0.25, 1, 0.5, 1),
    height 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: -1;
}

.link-button:hover {
  transform: translateY(-3px);
}

.link-button:hover::before {
  width: 300%;
  height: 300%;
}

.link-button:active {
  transform: translateY(0) scale(0.95);
}

/* View Project link animation */
a.inline-flex {
  position: relative;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
}

a.inline-flex::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

a.inline-flex:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

a.inline-flex svg {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

a.inline-flex:hover svg {
  transform: translateX(5px);
}

/* More Projects Button animation */
.mt-8 a {
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.mt-8 a::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.mt-8 a:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px -10px rgba(99, 102, 241, 0.6);
}

.mt-8 a:hover::before {
  animation: buttonShine 1.5s infinite;
}

@keyframes buttonShine {
  0% {
    left: -100%;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}

.mt-8 a:active {
  transform: translateY(0) scale(0.98);
}

/* Section title animation */
h2.text-3xl {
  position: relative;
  display: inline-block;
  animation: titleFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes titleFadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.h-1.w-24 {
  animation: lineExpand 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  transform-origin: center;
}

@keyframes lineExpand {
  0% {
    transform: scaleX(0);
    opacity: 0;
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
}

/* Ensure images display correctly on mobile */
@media (max-width: 640px) {
  .project-card img {
    display: block !important; /* Force display in case error handler hides it */
    min-height: 160px;
    max-height: 200px;
    width: 100%;
    object-position: center top;
  }

  .project-card .relative {
    background-color: #1f1f1f; /* Fallback background if image fails */
  }
}

/* Base image styling enhancements */
.project-card img {
  max-width: 100%;
  object-fit: cover;
  backface-visibility: hidden; /* Prevents glitches during animation */
  will-change: transform; /* Optimizes for animation */
}
</style>
