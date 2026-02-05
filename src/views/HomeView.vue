<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import Intro from "../components/Intro.vue";
import ExperienceHome from "../components/ExperienceHome.vue";
import SkillsHome from "../components/SkillsHome.vue";
import ProjectsHome from "../components/ProjectsHome.vue";
import BlogsHome from "../components/BlogsHome.vue";
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();

let observer: IntersectionObserver | null = null;

onMounted(() => {
  // Create intersection observer for scroll animations
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  // Observe all sections
  const sections = document.querySelectorAll(".scroll-reveal");
  sections.forEach((section) => observer?.observe(section));
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <div class="overflow-hidden w-full smooth-scroll">
    <!-- Intro Section -->
    <section id="intro" class="min-h-[90vh]">
      <Intro />
    </section>

    <!-- About Section -->
    <section id="about" class="pt-2 pb-20 md:pb-24 px-4 md:px-6 scroll-reveal flex justify-center relative">
      <div class="w-full max-w-4xl">
        <!-- Experience Header -->
        <div class="mb-8 relative">
          <!-- Divider above title -->
          <div class="absolute -top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent"></div>
          <h1
            class="text-2xl md:text-3xl font-semibold mb-2 text-gray-900 dark:text-white"
          >
            Experience
          </h1>
          <div
            class="h-px w-16 bg-gray-600 dark:bg-gray-400 rounded-full mb-4"
          ></div>
        </div>

        <!-- Experience Section -->
        <div class="scroll-reveal">
          <ExperienceHome />
        </div>
      </div>
      <!-- Subtle divider with fade -->
      <div class="absolute left-0 right-0 bottom-0 my-12 h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent"></div>
    </section>

    <!-- Tech Section -->
    <section id="tech" class="pt-2 pb-20 md:pb-24 px-4 md:px-6 scroll-reveal flex justify-center relative">
      <div class="w-full max-w-4xl">
        <!-- Tech Header -->
        <div class="mb-8">
          <h2
            class="text-2xl md:text-3xl font-semibold mb-2 text-gray-900 dark:text-white"
          >
            Tools & Technologies
          </h2>
          <div
            class="h-px w-16 bg-gray-600 dark:bg-gray-400 rounded-full mb-4"
          ></div>
        </div>
        <div class="scroll-reveal">
          <SkillsHome />
        </div>
      </div>
      <!-- Subtle divider with fade -->
      <div class="absolute left-0 right-0 bottom-0 my-12 h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent"></div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="pt-2 pb-20 md:pb-24 px-4 md:px-6 scroll-reveal flex justify-center relative">
      <div class="w-full max-w-4xl">
        <div class="mb-8 scroll-reveal">
          <h1
            class="text-2xl md:text-3xl font-semibold mb-2 text-gray-900 dark:text-white"
          >
            Featured Projects
          </h1>
          <div
            class="h-px w-16 bg-gray-600 dark:bg-gray-400 rounded-full mb-4"
          ></div>
        </div>
        <ProjectsHome />
      </div>
      <!-- Subtle divider with fade -->
      <div class="absolute left-0 right-0 bottom-0 my-12 h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent"></div>
    </section>

    <!-- Blogs Section -->
    <section id="blogs" class="pt-2 pb-16 md:pb-20 px-4 md:px-6 scroll-reveal flex justify-center">
      <div class="w-full max-w-4xl">
        <div class="mb-8 scroll-reveal">
          <h1
            class="text-2xl md:text-3xl font-semibold mb-2 text-gray-900 dark:text-white"
          >
            Blog
          </h1>
          <div
            class="h-px w-16 bg-gray-600 dark:bg-gray-400 rounded-full mb-4"
          ></div>
        </div>
        <BlogsHome />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Smooth scrolling */
.smooth-scroll {
  scroll-behavior: smooth;
}

html {
  scroll-behavior: smooth;
}

section {
  scroll-margin-top: 80px;
  scroll-snap-align: start;
}

/* Optimize scroll performance */
.overflow-x-hidden {
  -webkit-overflow-scrolling: touch;
}

/* Scroll reveal animations */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger animation delays for child elements */
.scroll-reveal:nth-child(1) {
  transition-delay: 0s;
}

.scroll-reveal:nth-child(2) {
  transition-delay: 0.1s;
}

.scroll-reveal:nth-child(3) {
  transition-delay: 0.2s;
}

.scroll-reveal:nth-child(4) {
  transition-delay: 0.3s;
}
</style>
