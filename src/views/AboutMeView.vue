<script setup lang="ts">
import Experience from "../components/Experience.vue";
import Skills from "../components/Skills.vue";
import EducationHobbies from "../components/EducationHobbies.vue";
import { useThemeStore } from "../store/theme";
import { ref } from "vue";

const themeStore = useThemeStore();
const activeTab = ref("experience");

// Tabs for mobile view
const tabs = [
  { id: "experience", title: "Experience" },
  { id: "skills", title: "Skills" },
  { id: "education", title: "Education" },
  { id: "hobbies", title: "Hobbies" },
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
  <div class="about-view">
    <!-- Desktop Version -->
    <section class="hidden md:block py-8 md:py-12 lg:py-16">
      <div class="container mx-auto px-4 md:px-6 overflow-y-hidden">
        <!-- About Me Header -->
        <div class="mb-12 text-center">
          <h1
            class="text-3xl md:text-4xl font-bold text-black mb-2 about-title bg-gradient-to-r from-gray-900 to-gray-900 dark:from-gray-50 dark:to-white bg-clip-text text-transparent"
          >
            About Me
          </h1>
          <div
            class="h-1 w-24 bg-gray-600 dark:bg-gray-400 mx-auto rounded-full mb-4 about-underline"
          ></div>
          <p class="max-w-3xl mx-auto text-gray-200">
            I love solving problems with code and mathematics. I explore
            artificial intelligence, contribute to open source, and build
            applications that make a difference.
          </p>
        </div>

        <!-- Experience Section -->
        <div class="mb-12">
          <h2
            class="text-2xl md:text-3xl font-bold mb-6 text-center text-white"
          >
            Professional Experience
          </h2>
          <div
            class="bg-white dark:bg-black rounded-xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700"
          >
            <Experience />
          </div>
        </div>

        <!-- Skills Section -->
        <div class="mb-12">
          <h2
            class="text-2xl md:text-3xl font-bold mb-6 text-center text-white"
          >
            Current Technology
          </h2>
          <div
            class="bg-white dark:bg-black rounded-xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700"
          >
            <Skills />
          </div>
        </div>

        <!-- Education & Hobbies Combined Section -->
        <div>
          <EducationHobbies />
        </div>
      </div>
    </section>

    <!-- Mobile Version - Custom Design -->
    <section
      class="block md:hidden bg-gray-50 dark:bg-gray-900/30 w-full overflow-hidden"
    >
      <!-- Hero Banner -->
      <div class="relative bg-gray-700 dark:bg-gray-800 overflow-hidden">
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
            I love solving problems with code and mathematics. I explore AI,
            contribute to open source, and build helpful applications.
          </p>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div
        class="sticky top-16 z-20 shadow-md px-2 py-3 w-full max-w-[100vw] overflow-hidden bg-gray-800"
      >
        <div
          class="flex space-x-3 w-max min-w-full px-2 py-1 overflow-x-auto no-scrollbar"
        >
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="setActiveTab(tab.id)"
            class="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex-shrink-0"
            :class="{
              'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200':
                activeTab === tab.id,
              'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300':
                activeTab !== tab.id,
            }"
          >
            {{ tab.title }}
          </button>
        </div>

        <!-- Right scroll indicator arrow -->
        <div
          class="absolute right-1 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none"
        >
          <div
            class="flex items-center justify-center h-8 w-8 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pr-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-500 dark:text-gray-400 animate-pulse-gentle"
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
          </div>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="py-6 pb-12">
        <!-- Experience Tab Content -->
        <div
          id="experience-content"
          class="p-2"
          :class="{
            block: activeTab === 'experience',
            hidden: activeTab !== 'experience',
          }"
        >
          <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-md px-2 py-5 mb-2"
          >
            <p class="text-2xl text-center font-bold text-white">Experience</p>
            <div
              class="h-1 w-24 bg-gray-600 dark:bg-gray-400 mx-auto rounded-full mb-6"
            ></div>

            <Experience />
          </div>
        </div>

        <!-- Skills Tab Content -->
        <div
          id="skills-content"
          class="p-2"
          :class="{
            block: activeTab === 'skills',
            hidden: activeTab !== 'skills',
          }"
        >
          <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-md px-2 py-5 mb-2"
          >
            <p class="text-2xl text-center font-bold text-white">
              Current Technology
            </p>
            <div
              class="h-1 w-24 bg-gray-600 dark:bg-gray-400 mx-auto rounded-full mb-6"
            ></div>
            <Skills />
          </div>
        </div>

        <!-- Education Tab Content -->
        <div
          id="education-content"
          class="p-2"
          :class="{
            block: activeTab === 'education',
            hidden: activeTab !== 'education',
          }"
        >
          <div class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-5 mb-2">
            <EducationHobbies :mobile-active-tab="'education'" />
          </div>
        </div>

        <!-- Hobbies Tab Content -->
        <div
          id="hobbies-content"
          class="p-2"
          :class="{
            block: activeTab === 'hobbies',
            hidden: activeTab !== 'hobbies',
          }"
        >
          <div class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-5 mb-2">
            <EducationHobbies :mobile-active-tab="'hobbies'" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bg-white,
.dark\:bg-gray-900 {
  transition: all 0.3s ease;
}

.bg-white:hover,
.dark\:bg-gray-900:hover {
  box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.1),
    0 10px 20px -5px rgba(0, 0, 0, 0.04);
}

/* Ensure consistent section styling */
section,
div {
  max-width: 100%;
  box-sizing: border-box;
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
button.bg-gray-200::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #4b5563;
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

/* Force content to stay within bounds */
.about-view {
  position: relative;
}

/* Add gentle pulsing animation for the arrow */
.animate-pulse-gentle {
  animation: pulsegently 2s infinite ease-in-out;
}

@keyframes pulsegently {
  0%,
  100% {
    opacity: 0.7;
    transform: translateX(0);
  }
  50% {
    opacity: 1;
    transform: translateX(3px);
  }
}

/* Section title animation - matching Projects component */
.about-title {
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

.about-underline {
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
</style>
