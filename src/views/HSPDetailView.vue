<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useThemeStore } from "../store/theme";
import { useRouter } from "vue-router";

const themeStore = useThemeStore();
const router = useRouter();

// Import HSP images
import HSP1 from "../assets/Project/HSP/HSP1.webp";
import HSP2 from "../assets/Project/HSP/HSP2.webp";
import HSP3 from "../assets/Project/HSP/HSP3.webp";
import HSP4 from "../assets/Project/HSP/HSP4.webp";
import HSP5 from "../assets/Project/HSP/HSP5.webp";
import HSP6 from "../assets/Project/HSP/HSP6.webp";
import HSP7 from "../assets/Project/HSP/HSP7.webp";

const images = [
  { src: HSP1, alt: "HouseHold Service Platform - Home Screen" },
  { src: HSP2, alt: "HouseHold Service Platform - Services Page" },
  { src: HSP3, alt: "HouseHold Service Platform - Booking Flow" },
  { src: HSP4, alt: "HouseHold Service Platform - Service Provider View" },
  { src: HSP5, alt: "HouseHold Service Platform - Payment System" },
  { src: HSP6, alt: "HouseHold Service Platform - Reviews Interface" },
  { src: HSP7, alt: "HouseHold Service Platform - Admin Dashboard" },
];

// Current slide index
const currentSlide = ref(0);

// Move to the next slide
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % images.length;
};

// Move to the previous slide
const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + images.length) % images.length;
};

// Auto-sliding functionality
let slideInterval: ReturnType<typeof setInterval> | null = null;

const startAutoSlide = () => {
  slideInterval = setInterval(() => {
    nextSlide();
  }, 5000); // Change slide every 5 seconds
};

const stopAutoSlide = () => {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
};

const goToSlide = (index: number) => {
  currentSlide.value = index;
};

const goBack = () => {
  router.go(-1); // Navigate back to previous page
};

onMounted(() => {
  startAutoSlide();
});
</script>

<template>
  <div class="container mx-auto px-4 py-16 min-h-screen">
    <!-- Back button -->
    <button
      @click="goBack"
      class="mb-6 inline-flex items-center px-4 py-2 rounded-lg transition-all duration-300"
      :class="{
        'bg-gray-800 text-white hover:bg-gray-700': themeStore.theme === 'dark',
        'bg-gray-100 text-gray-800 hover:bg-gray-200':
          themeStore.theme === 'light',
      }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      Back to Projects
    </button>

    <!-- Project Header -->
    <div class="text-center mb-8">
      <h1
        class="text-4xl font-bold mb-4"
        :class="{
          'text-white': themeStore.theme === 'dark',
          'text-gray-900': themeStore.theme === 'light',
        }"
      >
        HouseHold Service Platform
      </h1>
      <div class="h-1 w-32 bg-indigo-600 mx-auto rounded-full"></div>
      <p
        class="mt-4 max-w-3xl mx-auto text-lg"
        :class="{
          'text-gray-300': themeStore.theme === 'dark',
          'text-gray-600': themeStore.theme === 'light',
        }"
      >
        A comprehensive platform connecting home service providers with
        customers, featuring real-time tracking, secure payments, and a robust
        review system.
      </p>
    </div>

    <!-- Image Carousel -->
    <div
      class="relative max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl mb-8"
      @mouseenter="stopAutoSlide"
      @mouseleave="startAutoSlide"
      :class="{
        'border border-gray-700': themeStore.theme === 'dark',
        'border border-gray-200': themeStore.theme === 'light',
      }"
    >
      <!-- Slides -->
      <div class="relative h-[500px]">
        <transition-group name="fade">
          <div
            v-for="(image, index) in images"
            :key="image.src"
            v-show="currentSlide === index"
            class="absolute top-0 left-0 w-full h-full"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              class="w-full h-full object-contain"
            />
            <div
              class="absolute bottom-0 left-0 right-0 p-4 text-center bg-black bg-opacity-60 text-white"
            >
              {{ image.alt }}
            </div>
          </div>
        </transition-group>
      </div>

      <!-- Navigation arrows -->
      <button
        @click="prevSlide"
        class="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-all duration-300"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        @click="nextSlide"
        class="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-all duration-300"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
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
      </button>

      <!-- Dots navigation -->
      <div
        class="absolute bottom-16 left-0 right-0 flex justify-center space-x-2 pt-4"
      >
        <button
          v-for="(_, index) in images"
          :key="index"
          @click="goToSlide(index)"
          class="w-3 h-3 rounded-full transition-all duration-300"
          :class="[
            currentSlide === index
              ? 'bg-indigo-600 scale-125'
              : 'bg-white bg-opacity-50 hover:bg-opacity-75',
          ]"
          :aria-label="`Go to slide ${index + 1}`"
        ></button>
      </div>
    </div>

    <!-- Project Details Section -->
    <div
      class="max-w-5xl mx-auto p-6 rounded-xl shadow-lg mb-8"
      :class="{
        'bg-gray-800': themeStore.theme === 'dark',
        'bg-white': themeStore.theme === 'light',
      }"
    >
      <h2
        class="text-2xl font-bold mb-4"
        :class="{
          'text-white': themeStore.theme === 'dark',
          'text-gray-900': themeStore.theme === 'light',
        }"
      >
        Project Overview
      </h2>
      <p
        class="mb-6"
        :class="{
          'text-gray-300': themeStore.theme === 'dark',
          'text-gray-700': themeStore.theme === 'light',
        }"
      >
        The HouseHold Service Platform is a comprehensive solution designed to
        connect users with verified service providers for various household
        needs. The platform streamlines the process of finding, booking, and
        paying for services while ensuring quality and reliability through a
        robust verification and review system.
      </p>

      <h3
        class="text-xl font-semibold mb-3 mt-6"
        :class="{
          'text-white': themeStore.theme === 'dark',
          'text-gray-900': themeStore.theme === 'light',
        }"
      >
        Key Features
      </h3>
      <ul
        class="list-disc pl-5 space-y-2 mb-6"
        :class="{
          'text-gray-300': themeStore.theme === 'dark',
          'text-gray-700': themeStore.theme === 'light',
        }"
      >
        <li>
          <strong>Real-time Service Provider Tracking:</strong> Users can track
          assigned service providers in real-time on a map interface.
        </li>
        <li>
          <strong>Secure Payment Processing:</strong> Integrated payment system
          for safe and convenient transactions.
        </li>
        <li>
          <strong>Rating and Review System:</strong> Comprehensive feedback
          mechanism to ensure service quality.
        </li>
        <li>
          <strong>Service Provider Verification:</strong> Rigorous verification
          process including background checks and skill assessments.
        </li>
        <li>
          <strong>Scheduling System:</strong> Flexible booking system that works
          with both user preferences and provider availability.
        </li>
        <li>
          <strong>Admin Dashboard:</strong> Powerful back-end tools for managing
          users, providers, and service offerings.
        </li>
      </ul>

      <h3
        class="text-xl font-semibold mb-3 mt-6"
        :class="{
          'text-white': themeStore.theme === 'dark',
          'text-gray-900': themeStore.theme === 'light',
        }"
      >
        Technologies Used
      </h3>
      <div class="flex flex-wrap gap-3 mb-6">
        <span
          class="px-3 py-1 rounded-full text-sm font-medium"
          :class="{
            'bg-gray-700 text-gray-200': themeStore.theme === 'dark',
            'bg-gray-200 text-gray-800': themeStore.theme === 'light',
          }"
          >Vue.js</span
        >
        <span
          class="px-3 py-1 rounded-full text-sm font-medium"
          :class="{
            'bg-gray-700 text-gray-200': themeStore.theme === 'dark',
            'bg-gray-200 text-gray-800': themeStore.theme === 'light',
          }"
          >Flask</span
        >
        <span
          class="px-3 py-1 rounded-full text-sm font-medium"
          :class="{
            'bg-gray-700 text-gray-200': themeStore.theme === 'dark',
            'bg-gray-200 text-gray-800': themeStore.theme === 'light',
          }"
          >SQLite</span
        >
        <span
          class="px-3 py-1 rounded-full text-sm font-medium"
          :class="{
            'bg-gray-700 text-gray-200': themeStore.theme === 'dark',
            'bg-gray-200 text-gray-800': themeStore.theme === 'light',
          }"
          >Redis</span
        >
        <span
          class="px-3 py-1 rounded-full text-sm font-medium"
          :class="{
            'bg-gray-700 text-gray-200': themeStore.theme === 'dark',
            'bg-gray-200 text-gray-800': themeStore.theme === 'light',
          }"
          >Celery</span
        >
      </div>

      <!-- Project Links -->
      <div class="flex flex-wrap gap-4 mt-8">
        <a
          href="https://github.com/Jatinbhardwaj-093/HouseHold-Service-Platform"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-4 py-2 rounded-lg transition-all duration-300"
          :class="{
            'bg-gray-700 text-white hover:bg-gray-600':
              themeStore.theme === 'dark',
            'bg-gray-200 text-gray-800 hover:bg-gray-300':
              themeStore.theme === 'light',
          }"
        >
          <i class="bi bi-github mr-2 text-lg"></i>
          GitHub Repository
        </a>
        <a
          href="https://drive.google.com/drive/folders/1YR5UsPf4jtXYstgQJDPUFEjy33uew83I?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-4 py-2 rounded-lg transition-all duration-300"
          :class="{
            'bg-gray-700 text-white hover:bg-gray-600':
              themeStore.theme === 'dark',
            'bg-gray-200 text-gray-800 hover:bg-gray-300':
              themeStore.theme === 'light',
          }"
        >
          <img
            :src="
              themeStore.theme === 'dark'
                ? '/JB-Portfolio/images/icons/google-docs-dark.svg'
                : '/JB-Portfolio/images/icons/google-docs.svg'
            "
            alt="Documentation"
            class="w-5 h-5 mr-2 doc-icon-detail"
          />
          Documentation
        </a>
        <a
          href="https://www.figma.com/design/a5MomTlXdFQ1qz7lAzog7E/Househod-Service-MAD-1?node-id=0-1&t=Xo1ho1DEgCnSpn03-1"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-4 py-2 rounded-lg transition-all duration-300"
          :class="{
            'bg-gray-700 text-white hover:bg-gray-600':
              themeStore.theme === 'dark',
            'bg-gray-200 text-gray-800 hover:bg-gray-300':
              themeStore.theme === 'light',
          }"
        >
          <i
            class="bi bi-figma mr-2 text-lg"
            :style="{
              color: themeStore.theme === 'dark' ? '#ff7262' : '#f24e1e',
            }"
          ></i>
          Figma Design
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.doc-icon-detail {
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.2));
  transform: scale(1.25);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  border-radius: 2px;
  overflow: visible;
}

a:hover .doc-icon-detail {
  transform: scale(1.35);
  filter: drop-shadow(0px 3px 5px rgba(66, 133, 244, 0.4));
}
</style>
