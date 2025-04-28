<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();

const firstName = ref("Jatin");
const lastName = ref("Bhardwaj");
const jobTitle = ref("Web Developer & Data Scientist");
const isAnimationComplete = ref(false);
const specializations = ref([
  "Web Development",
  "Data Science",
  "Machine Learning",
  "AI",
]);

onMounted(() => {
  setTimeout(() => {
    isAnimationComplete.value = true;
  }, 400); // Further reduced from 600ms for a snappier feel
});
</script>

<template>
  <section class="py-4 md:py-6 lg:py-8">
    <!-- Further reduced vertical spacing for better mobile view -->
    <div class="container mx-auto px-4 md:px-6">
      <div
        class="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-10"
      >
        <!-- Left column: Text content -->
        <div class="w-full lg:w-1/2 space-y-2 text-center lg:text-left">
          <!-- Reduced space between elements -->
          <div class="relative">
            <span
              class="absolute -top-6 -left-2 text-5xl text-indigo-200/20 dark:text-indigo-800/20 font-bold"
              >&lt;/&gt;</span
            >
            <h2
              class="text-lg font-medium text-indigo-600 dark:text-indigo-400"
            >
              Hello, I am
            </h2>
            <h1
              class="mt-2 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              <span
                class="block fade-in text-black"
                :class="{ 'text-white': themeStore.theme === 'dark' }"
                >{{ firstName }}</span
              >
              <span
                class="block text-indigo-600 dark:text-indigo-400 fade-in delay-100"
                >{{ lastName }}</span
              >
            </h1>
            <h3
              class="mt-3 text-xl sm:text-2xl font-medium text-gray-600 dark:text-gray-300 fade-in delay-200"
            >
              {{ jobTitle }}
            </h3>
          </div>

          <p
            class="text-base sm:text-lg text-gray-600 dark:text-gray-300 fade-in delay-300 max-w-2xl mx-auto lg:mx-0"
          >
            I transform complex technical challenges into elegant digital
            solutions. By combining data-driven insights with polished UI
            implementations, I create web applications that deliver meaningful
            experiences and tangible results.
          </p>

          <div
            class="flex flex-wrap gap-2 justify-center lg:justify-start fade-in delay-400"
          >
            <span
              v-for="(tag, index) in specializations"
              :key="index"
              class="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/60 transition-colors"
            >
              {{ tag }}
            </span>
          </div>

          <div
            class="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2 fade-in delay-500"
          >
            <router-link
              to="/projects"
              class="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
            >
              View Projects
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 ml-1.5 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </router-link>
            <router-link
              to="/contact"
              class="inline-flex items-center justify-center px-5 py-2.5 border border-indigo-600 text-base font-medium rounded-md text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors duration-300"
            >
              Contact Me
            </router-link>
          </div>

          <!-- Social Icons with subtle hover effects -->
          <div
            class="flex justify-center lg:justify-start space-x-4 pt-2 fade-in delay-600"
          >
            <a
              href="https://www.linkedin.com/in/jatin-bhardwaj-b5962921a/"
              class="social-icon-link"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              data-tooltip="LinkedIn"
            >
              <svg
                class="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
            <a
              href="https://github.com/Jatinbhardwaj-093"
              class="social-icon-link"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              data-tooltip="GitHub"
            >
              <svg
                class="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>
            <a
              href="https://x.com/Jatin0932"
              class="social-icon-link"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              data-tooltip="Twitter"
            >
              <svg
                class="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                />
              </svg>
            </a>
            <a
              href="mailto:bhardwajjatin093@gmail.com"
              class="social-icon-link"
              aria-label="Email"
              data-tooltip="Email"
            >
              <svg
                class="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Right column: Profile image -->
        <div class="w-full lg:w-1/2 mt-6 lg:mt-0 fade-in delay-300">
          <div class="relative max-w-md mx-auto">
            <!-- Enhanced glow effect with animated gradient -->
            <div
              class="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-xl blur-xl opacity-70 group-hover:opacity-100 animate-glow-pulse"
            ></div>

            <div
              class="relative rounded-xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl"
            >
              <div class="aspect-ratio-container profile-image-container">
                <img
                  src="../assets/images/profileImage/myimage2.png"
                  alt="Jatin Bhardwaj"
                  class="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"
                ></div>
                <!-- Inner shine effect -->
                <div class="absolute inset-0 opacity-0 hover:opacity-40 shine-effect"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Simplified and more subtle animation classes */
.fade-in {
  opacity: 0;
  transform: translateY(10px); /* Reduced from 20px for subtlety */
  animation: fadeIn 0.5s ease-out forwards; /* Reduced from 0.8s for quicker animation */
  will-change: opacity, transform;
}

.delay-100 {
  animation-delay: 0.1s; /* Reduced from 0.2s */
}

.delay-200 {
  animation-delay: 0.2s; /* Reduced from 0.4s */
}

.delay-300 {
  animation-delay: 0.3s; /* Reduced from 0.6s */
}

.delay-400 {
  animation-delay: 0.4s; /* Reduced from 0.8s */
}

.delay-500 {
  animation-delay: 0.5s; /* Reduced from 1s */
}

.delay-600 {
  animation-delay: 0.6s; /* Reduced from 1.2s */
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Aspect ratio handling for profile image */
.aspect-ratio-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 110%;
  overflow: hidden;
}

.aspect-ratio-container > img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 15%;
}

/* Subtle social icon hover effects */
.social-icon-link {
  @apply text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  position: relative;
  transition: all 0.2s ease; /* Faster transition */
}

.social-icon-link:hover {
  transform: translateY(-1px); /* Reduced from -2px */
}

/* Add subtle hover effect for social icons */
.social-icon-link:hover svg {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}

/* Dark mode adjustments */
:root[data-theme="dark"] .social-icon-link {
  color: #9ca3af;
}

:root[data-theme="dark"] .social-icon-link:hover {
  color: #818cf8;
}

/* Reduced motion preference support */
@media (prefers-reduced-motion: reduce) {
  .fade-in {
    animation: none;
    opacity: 1;
  }

  .social-icon-link:hover,
  .aspect-ratio-container > img:hover {
    transform: none;
  }
}

/* Better responsive spacing */
@media (max-width: 640px) {
  .space-y-2 > * + * {
    margin-top: 0.5rem;
  }

  h1 {
    font-size: 2.5rem; /* Smaller font size on mobile */
  }

  h3 {
    font-size: 1.25rem; /* Smaller subtitle on mobile */
  }

  .py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}

@media (min-width: 1024px) {
  /* Keep existing styles */
}

/* Tooltip styles */
.social-icon-link::before {
  content: attr(data-tooltip);
  position: absolute;
  top: 100%; /* Changed from bottom: 100% to top: 100% to show below */
  left: 50%;
  transform: translateX(-50%) translateY(-5px); /* Changed Y value from 5px to -5px */
  padding: 0.3rem 0.6rem;
  border-radius: 0.25rem;
  background: #4f46e5;
  color: white;
  font-size: 0.75rem;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: all 0.2s ease;
  z-index: 10;
}

.social-icon-link:hover::before {
  opacity: 1;
  transform: translateX(-50%) translateY(5px); /* Changed Y value from -5px to 5px */
}

/* Profile Image Glow Effects */
@keyframes glow-pulse {
  0% {
    opacity: 0.6;
    transform: scale(0.98);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.01);
  }
  100% {
    opacity: 0.6;
    transform: scale(0.98);
  }
}

.animate-glow-pulse {
  animation: glow-pulse 3s ease-in-out infinite;
}

.profile-image-container {
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease;
}

.profile-image-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.5);
}

/* Shine effect animation */
.shine-effect {
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
  transition: opacity 0.3s ease;
  z-index: 2;
}

.profile-image-container:hover .shine-effect {
  opacity: 0.4;
  animation: shine 1.5s ease-in-out;
}

@keyframes shine {
  to {
    left: 100%;
  }
}
</style>
