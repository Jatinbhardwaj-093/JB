<script setup lang="ts">
import Experience from "../components/Experience.vue";
import Skills from "../components/Skills.vue";
import Education from "../components/Education.vue";
import Hobby from "../components/Hobby.vue";
import { useThemeStore } from "../store/theme";
import { ref } from "vue";

const themeStore = useThemeStore();
const activeTab = ref("experience");

// Tabs for mobile view
const tabs = [
  { id: "experience", title: "Experience" },
  { id: "skills", title: "Skills" },
  { id: "education", title: "Education" },
  { id: "hobby", title: "Hobbies" },
];

const setActiveTab = (tabId) => {
  activeTab.value = tabId;

  // Smooth scroll to the tab content
  setTimeout(() => {
    const element = document.getElementById(tabId + "-content");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, 100);
};
</script>

<template>
  <!-- Desktop Version -->
  <section
    class="hidden md:block py-8 md:py-12 lg:py-16 bg-gray-50 dark:bg-gray-900/30"
  >
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

  <!-- Mobile Version - Custom Design -->
  <section class="block md:hidden bg-gray-50 dark:bg-gray-900/30">
    <!-- Hero Banner -->
    <div class="relative bg-indigo-600 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          class="absolute bottom-0 left-0 w-full opacity-20"
        >
          <path
            fill="#ffffff"
            fill-opacity="1"
            d="M0,32L30,58.7C60,85,120,139,180,149.3C240,160,300,128,360,122.7C420,117,480,139,540,149.3C600,160,660,160,720,144C780,128,840,96,900,101.3C960,107,1020,149,1080,165.3C1140,181,1200,171,1260,149.3C1320,128,1380,96,1410,80L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div class="relative z-10 px-4 py-16 text-center">
        <h1 class="text-3xl font-bold text-white mb-2">About Me</h1>
        <div class="h-1 w-16 bg-white/70 mx-auto rounded-full mb-4"></div>
        <p class="text-white/90 max-w-md mx-auto text-sm">
          I'm passionate about building seamless digital experiences that solve
          real problems through elegant code and thoughtful design.
        </p>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div
      class="sticky top-16 z-20 bg-white dark:bg-gray-900 shadow-md px-2 py-3"
    >
      <div class="overflow-x-auto no-scrollbar">
        <div class="flex space-x-2 w-max min-w-full px-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="setActiveTab(tab.id)"
            class="px-4 py-2 rounded-lg text-sm font-medium min-w-[90px] transition-all duration-300"
            :class="{
              'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300':
                activeTab === tab.id,
              'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300':
                activeTab !== tab.id,
            }"
          >
            {{ tab.title }}
          </button>
        </div>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="px-4 py-6">
      <!-- Experience Tab Content -->
      <div
        id="experience-content"
        :class="{
          block: activeTab === 'experience',
          hidden: activeTab !== 'experience',
        }"
      >
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 mb-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Experience
          </h2>
          <Experience />
        </div>
      </div>

      <!-- Skills Tab Content -->
      <div
        id="skills-content"
        :class="{
          block: activeTab === 'skills',
          hidden: activeTab !== 'skills',
        }"
      >
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 mb-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Expertise
          </h2>
          <div class="skills-container">
            <Skills />
          </div>
        </div>
      </div>

      <!-- Education Tab Content -->
      <div
        id="education-content"
        :class="{
          block: activeTab === 'education',
          hidden: activeTab !== 'education',
        }"
      >
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 mb-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Education
          </h2>
          <Education />
        </div>
      </div>

      <!-- Hobbies Tab Content -->
      <div
        id="hobby-content"
        :class="{ block: activeTab === 'hobby', hidden: activeTab !== 'hobby' }"
      >
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 mb-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Hobbies & Interests
          </h2>
          <Hobby />
        </div>
      </div>
    </div>

    <!-- Quick Contact CTA -->
    <div class="px-4 py-8 bg-gray-100 dark:bg-gray-800">
      <div class="text-center">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Want to collaborate?
        </h3>
        <p class="text-gray-700 dark:text-gray-300 mb-4 text-sm">
          I'm always open to interesting projects and opportunities.
        </p>
        <router-link
          to="/contact"
          class="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Get in Touch
        </router-link>
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

/* Hide scrollbar while keeping functionality */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.no-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* Smooth transitions for tab switching */
[id$="-content"] {
  transition: all 0.3s ease-out;
}

/* Tab indicator animation */
button.bg-indigo-100::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #6366f1;
  transform: scaleX(1);
  transform-origin: bottom left;
  transition: transform 0.3s ease-out;
}

/* If screen is small enough, make tabs take equal width */
@media (max-width: 360px) {
  .min-w-\[90px\] {
    min-width: 0;
    flex: 1;
  }
}
</style>
