<script setup lang="ts">
import Experience from "../components/Experience.vue";
import Skills from "../components/Skills.vue";
import Education from "../components/Education.vue";
import Hobby from "../components/Hobby.vue";
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();
</script>

<template>
  <section class="py-8 md:py-12 lg:py-16 bg-gray-50 dark:bg-gray-900/30">
    <div class="container mx-auto px-4 md:px-6">
      <!-- About Me Header -->
      <div class="mb-12 text-center">
        <h1
          class="text-3xl md:text-4xl font-bold text-black mb-2"
          :class="{ 'text-white': themeStore.theme === 'dark' }"
        >
          About Me
        </h1>
        <div class="h-1 w-24 bg-indigo-600 mx-auto rounded-full mb-4"></div>
        <p class="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          I craft elegant solutions at the intersection of front-end design and
          back-end architecture. My analytical mindset and technical versatility
          enable me to transform complex problems into streamlined,
          user-centered applications.
        </p>
      </div>

      <!-- Experience Section -->
      <div class="mb-12">
        <h2
          class="text-2xl md:text-3xl font-bold text-black mb-6 text-center"
          :class="{ 'text-white': themeStore.theme === 'dark' }"
        >
          Professional Experience
        </h2>
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700"
        >
          <Experience />
        </div>
      </div>

      <!-- Skills Section -->
      <div class="mb-12">
        <h2
          class="text-2xl md:text-3xl font-bold text-black mb-6 text-center"
          :class="{ 'text-white': themeStore.theme === 'dark' }"
        >
          Skills & Expertise
        </h2>
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700"
        >
          <Skills />
        </div>
      </div>

      <!-- Two Column Layout for Education and Hobbies -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Education Section -->
        <div>
          <h2
            class="text-2xl font-bold text-black mb-6 text-center"
            :class="{ 'text-white': themeStore.theme === 'dark' }"
          >
            Education
          </h2>
          <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 h-full border border-gray-100 dark:border-gray-700"
          >
            <Education />
          </div>
        </div>

        <!-- Hobbies Section -->
        <div>
          <h2
            class="text-2xl font-bold text-black mb-6 text-center"
            :class="{ 'text-white': themeStore.theme === 'dark' }"
          >
            Hobbies & Interests
          </h2>
          <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 h-full border border-gray-100 dark:border-gray-700"
          >
            <Hobby />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-white,
.dark\:bg-gray-800 {
  transition: all 0.3s ease;
}

.bg-white:hover,
.dark\:bg-gray-800:hover {
  box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.1),
    0 10px 20px -5px rgba(0, 0, 0, 0.04);
  transform: translateY(-3px);
}

/* Ensure consistent section styling */
section {
  overflow: hidden;
}
</style>
