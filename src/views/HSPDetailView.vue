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

// Original images
const originalImages = [
  { src: HSP1, alt: "HouseHold Service Platform - Home Screen" },
  { src: HSP2, alt: "HouseHold Service Platform - Services Page" },
  { src: HSP3, alt: "HouseHold Service Platform - Booking Flow" },
  { src: HSP4, alt: "HouseHold Service Platform - Service Provider View" },
  { src: HSP5, alt: "HouseHold Service Platform - Payment System" },
  { src: HSP6, alt: "HouseHold Service Platform - Reviews Interface" },
  { src: HSP7, alt: "HouseHold Service Platform - Admin Dashboard" },
];

// Create array for our slider that includes clones for smooth looping effect
const images = [...originalImages];

// Current slide index
const currentSlide = ref(0);

// Flag to track if we're in transition
const inTransition = ref(false);

// Move to the next slide with smooth loop transition
const nextSlide = () => {
  if (inTransition.value) return; // Prevent transitions while one is in progress

  if (currentSlide.value === images.length - 1) {
    // We're at the last slide, need special handling for loop
    inTransition.value = true;

    // First fade out the current slide
    const strip = document.querySelector(".image-strip") as HTMLElement;
    if (strip) {
      strip.style.opacity = "0";

      // After fade out, quickly reset to first slide without animation
      setTimeout(() => {
        currentSlide.value = 0;

        // Then fade back in
        setTimeout(() => {
          strip.style.opacity = "1";
          inTransition.value = false;
        }, 50);
      }, 500);
    } else {
      // Fallback if DOM element not found
      currentSlide.value = 0;
      inTransition.value = false;
    }
  } else {
    // Normal slide transition
    currentSlide.value++;
  }
};

// Move to the previous slide
const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + images.length) % images.length;
};

// Auto-sliding functionality
let slideInterval: ReturnType<typeof setInterval> | null = null;

const startAutoSlide = () => {
  // Clear any existing interval to prevent multiple intervals
  stopAutoSlide();

  // Start the continuous strip movement
  slideInterval = setInterval(() => {
    nextSlide();
  }, 2500); // Faster slide transition for continuous effect
};

const stopAutoSlide = () => {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
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
  <div class="container mx-auto px-4 py-4 min-h-screen">
    <!-- Improved back button with gradient effect -->
    <div class="flex justify-end mb-3">
      <button
        @click="goBack"
        class="inline-flex items-center px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 shadow-sm hover:shadow-md transform hover:translate-x-0.5"
        :class="{
          'bg-gradient-to-r from-blue-600 to-indigo-600 text-white':
            themeStore.theme === 'dark',
          'bg-gradient-to-r from-blue-500 to-indigo-500 text-white':
            themeStore.theme === 'light',
        }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-1.5"
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
        <span>Back to Projects</span>
      </button>
    </div>

    <!-- Project Header -->
    <div class="text-center mb-6">
      <h1
        class="text-4xl font-bold mb-3"
        :class="{
          'text-white': themeStore.theme === 'dark',
          'text-gray-900': themeStore.theme === 'light',
        }"
      >
        HouseHold Service Platform
      </h1>
      <div class="h-1 w-24 bg-indigo-600 mx-auto rounded-full"></div>
      <p
        class="mt-2 max-w-3xl mx-auto text-base"
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

    <!-- Continuous Image Strip -->
    <div
      class="max-w-5xl mx-auto mb-8 overflow-hidden rounded-xl"
      :class="{
        'border border-gray-700': themeStore.theme === 'dark',
        'border border-gray-200': themeStore.theme === 'light',
      }"
      @mouseenter="stopAutoSlide"
      @mouseleave="startAutoSlide"
    >
      <div class="relative overflow-hidden">
        <!-- Continuous Image Strip with Smooth Loop -->
        <div class="overflow-hidden">
          <div
            class="image-strip flex transition-transform duration-1000 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div
              v-for="(image, index) in images"
              :key="image.src"
              class="min-w-full h-[350px] flex-shrink-0 relative"
            >
              <img
                :src="image.src"
                :alt="image.alt"
                class="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Minimal Strip Indicator -->
      <div
        class="flex justify-center space-x-2 py-2 bg-gray-100 dark:bg-gray-800"
      >
        <div
          v-for="(_, index) in images"
          :key="index"
          class="w-10 h-1 rounded-full transition-all duration-300"
          :class="[
            currentSlide === index
              ? 'bg-indigo-600 w-16'
              : themeStore.theme === 'dark'
              ? 'bg-gray-600'
              : 'bg-gray-300',
          ]"
        ></div>
      </div>
    </div>

    <!-- Enhanced Project Details Section -->
    <div
      class="max-w-5xl mx-auto rounded-xl shadow-lg mb-8 overflow-hidden"
      :class="{
        'bg-gray-800 border border-gray-700': themeStore.theme === 'dark',
        'bg-white border border-gray-100': themeStore.theme === 'light',
      }"
    >
      <!-- Section Header with Gradient -->
      <div
        class="p-6 border-b"
        :class="{
          'bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700':
            themeStore.theme === 'dark',
          'bg-gradient-to-r from-blue-50 to-indigo-50 border-gray-200':
            themeStore.theme === 'light',
        }"
      >
        <h2
          class="text-2xl font-bold mb-2 flex items-center"
          :class="{
            'text-white': themeStore.theme === 'dark',
            'text-gray-900': themeStore.theme === 'light',
          }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Project Overview
        </h2>
        <p
          class="mb-0 leading-relaxed"
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
      </div>

      <!-- Card content container -->
      <div class="p-6">
        <h3
          class="text-xl font-semibold mb-3 mt-6 flex items-center"
          :class="{
            'text-white': themeStore.theme === 'dark',
            'text-gray-900': themeStore.theme === 'light',
          }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Key Features
        </h3>

        <div class="grid md:grid-cols-2 gap-4 mb-6">
          <div
            class="p-4 rounded-lg flex items-start"
            :class="{
              'bg-gray-700': themeStore.theme === 'dark',
              'bg-gray-50': themeStore.theme === 'light',
            }"
          >
            <div
              class="rounded-full p-2 mr-3 flex-shrink-0 bg-blue-600 bg-opacity-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <h4
                class="font-medium mb-1"
                :class="{
                  'text-white': themeStore.theme === 'dark',
                  'text-gray-900': themeStore.theme === 'light',
                }"
              >
                Real-time Tracking
              </h4>
              <p
                class="text-sm"
                :class="{
                  'text-gray-300': themeStore.theme === 'dark',
                  'text-gray-600': themeStore.theme === 'light',
                }"
              >
                Users can track assigned service providers in real-time on a map
                interface.
              </p>
            </div>
          </div>

          <div
            class="p-4 rounded-lg flex items-start"
            :class="{
              'bg-gray-700': themeStore.theme === 'dark',
              'bg-gray-50': themeStore.theme === 'light',
            }"
          >
            <div
              class="rounded-full p-2 mr-3 flex-shrink-0 bg-green-600 bg-opacity-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <h4
                class="font-medium mb-1"
                :class="{
                  'text-white': themeStore.theme === 'dark',
                  'text-gray-900': themeStore.theme === 'light',
                }"
              >
                Secure Payments
              </h4>
              <p
                class="text-sm"
                :class="{
                  'text-gray-300': themeStore.theme === 'dark',
                  'text-gray-600': themeStore.theme === 'light',
                }"
              >
                Integrated payment system for safe and convenient transactions.
              </p>
            </div>
          </div>

          <div
            class="p-4 rounded-lg flex items-start"
            :class="{
              'bg-gray-700': themeStore.theme === 'dark',
              'bg-gray-50': themeStore.theme === 'light',
            }"
          >
            <div
              class="rounded-full p-2 mr-3 flex-shrink-0 bg-yellow-600 bg-opacity-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <div>
              <h4
                class="font-medium mb-1"
                :class="{
                  'text-white': themeStore.theme === 'dark',
                  'text-gray-900': themeStore.theme === 'light',
                }"
              >
                Rating & Reviews
              </h4>
              <p
                class="text-sm"
                :class="{
                  'text-gray-300': themeStore.theme === 'dark',
                  'text-gray-600': themeStore.theme === 'light',
                }"
              >
                Comprehensive feedback mechanism to ensure service quality.
              </p>
            </div>
          </div>

          <div
            class="p-4 rounded-lg flex items-start"
            :class="{
              'bg-gray-700': themeStore.theme === 'dark',
              'bg-gray-50': themeStore.theme === 'light',
            }"
          >
            <div
              class="rounded-full p-2 mr-3 flex-shrink-0 bg-purple-600 bg-opacity-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h4
                class="font-medium mb-1"
                :class="{
                  'text-white': themeStore.theme === 'dark',
                  'text-gray-900': themeStore.theme === 'light',
                }"
              >
                Provider Verification
              </h4>
              <p
                class="text-sm"
                :class="{
                  'text-gray-300': themeStore.theme === 'dark',
                  'text-gray-600': themeStore.theme === 'light',
                }"
              >
                Rigorous verification process including background checks and
                skill assessments.
              </p>
            </div>
          </div>

          <div
            class="p-4 rounded-lg flex items-start"
            :class="{
              'bg-gray-700': themeStore.theme === 'dark',
              'bg-gray-50': themeStore.theme === 'light',
            }"
          >
            <div
              class="rounded-full p-2 mr-3 flex-shrink-0 bg-red-600 bg-opacity-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h4
                class="font-medium mb-1"
                :class="{
                  'text-white': themeStore.theme === 'dark',
                  'text-gray-900': themeStore.theme === 'light',
                }"
              >
                Scheduling System
              </h4>
              <p
                class="text-sm"
                :class="{
                  'text-gray-300': themeStore.theme === 'dark',
                  'text-gray-600': themeStore.theme === 'light',
                }"
              >
                Flexible booking system that works with both user preferences
                and provider availability.
              </p>
            </div>
          </div>

          <div
            class="p-4 rounded-lg flex items-start"
            :class="{
              'bg-gray-700': themeStore.theme === 'dark',
              'bg-gray-50': themeStore.theme === 'light',
            }"
          >
            <div
              class="rounded-full p-2 mr-3 flex-shrink-0 bg-indigo-600 bg-opacity-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h4
                class="font-medium mb-1"
                :class="{
                  'text-white': themeStore.theme === 'dark',
                  'text-gray-900': themeStore.theme === 'light',
                }"
              >
                Admin Dashboard
              </h4>
              <p
                class="text-sm"
                :class="{
                  'text-gray-300': themeStore.theme === 'dark',
                  'text-gray-600': themeStore.theme === 'light',
                }"
              >
                Powerful back-end tools for managing users, providers, and
                service offerings.
              </p>
            </div>
          </div>
        </div>

        <!-- Technologies Section -->
        <div class="mb-8">
          <h3
            class="text-xl font-semibold mb-4 flex items-center"
            :class="{
              'text-white': themeStore.theme === 'dark',
              'text-gray-900': themeStore.theme === 'light',
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Technologies Used
          </h3>

          <div class="flex flex-wrap gap-3">
            <div
              class="px-4 py-2 rounded-lg text-sm font-medium flex items-center"
              :class="{
                'bg-gray-700 text-blue-300': themeStore.theme === 'dark',
                'bg-blue-50 text-blue-700': themeStore.theme === 'light',
              }"
            >
              <span class="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Vue.js
            </div>
            <div
              class="px-4 py-2 rounded-lg text-sm font-medium flex items-center"
              :class="{
                'bg-gray-700 text-green-300': themeStore.theme === 'dark',
                'bg-green-50 text-green-700': themeStore.theme === 'light',
              }"
            >
              <span class="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Flask
            </div>
            <div
              class="px-4 py-2 rounded-lg text-sm font-medium flex items-center"
              :class="{
                'bg-gray-700 text-yellow-300': themeStore.theme === 'dark',
                'bg-yellow-50 text-yellow-700': themeStore.theme === 'light',
              }"
            >
              <span class="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
              SQLite
            </div>
            <div
              class="px-4 py-2 rounded-lg text-sm font-medium flex items-center"
              :class="{
                'bg-gray-700 text-red-300': themeStore.theme === 'dark',
                'bg-red-50 text-red-700': themeStore.theme === 'light',
              }"
            >
              <span class="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
              Redis
            </div>
            <div
              class="px-4 py-2 rounded-lg text-sm font-medium flex items-center"
              :class="{
                'bg-gray-700 text-purple-300': themeStore.theme === 'dark',
                'bg-purple-50 text-purple-700': themeStore.theme === 'light',
              }"
            >
              <span class="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Celery
            </div>
          </div>
        </div>

        <!-- Project Links -->
        <div
          class="border-t pt-6 mt-6"
          :class="{
            'border-gray-700': themeStore.theme === 'dark',
            'border-gray-200': themeStore.theme === 'light',
          }"
        >
          <h3
            class="text-lg font-semibold mb-4 flex items-center"
            :class="{
              'text-white': themeStore.theme === 'dark',
              'text-gray-900': themeStore.theme === 'light',
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            Project Resources
          </h3>

          <div class="flex flex-wrap gap-4">
            <a
              href="https://github.com/Jatinbhardwaj-093/HouseHold-Service-Platform"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-4 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow"
              :class="{
                'bg-gray-700 text-white hover:bg-gray-600':
                  themeStore.theme === 'dark',
                'bg-white text-gray-800 hover:bg-gray-50 border border-gray-200':
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
              class="inline-flex items-center px-4 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow"
              :class="{
                'bg-gray-700 text-white hover:bg-gray-600':
                  themeStore.theme === 'dark',
                'bg-white text-gray-800 hover:bg-gray-50 border border-gray-200':
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
              class="inline-flex items-center px-4 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow"
              :class="{
                'bg-gray-700 text-white hover:bg-gray-600':
                  themeStore.theme === 'dark',
                'bg-white text-gray-800 hover:bg-gray-50 border border-gray-200':
                  themeStore.theme === 'light',
              }"
            >
              <div class="flex items-center">
                <div class="figma-icon-wrapper mr-2 relative">
                  <svg
                    width="16"
                    height="24"
                    viewBox="0 0 16 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="figma-icon"
                  >
                    <path
                      d="M4 24C6.20914 24 8 22.2091 8 20V16H4C1.79086 16 0 17.7909 0 20C0 22.2091 1.79086 24 4 24Z"
                      fill="#0ACF83"
                    />
                    <path
                      d="M0 12C0 9.79086 1.79086 8 4 8H8V16H4C1.79086 16 0 14.2091 0 12Z"
                      fill="#A259FF"
                    />
                    <path
                      d="M0 4C0 1.79086 1.79086 0 4 0H8V8H4C1.79086 8 0 6.20914 0 4Z"
                      fill="#F24E1E"
                    />
                    <path
                      d="M8 0H12C14.2091 0 16 1.79086 16 4C16 6.20914 14.2091 8 12 8H8V0Z"
                      fill="#FF7262"
                    />
                    <path
                      d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
                      fill="#1ABCFE"
                    />
                  </svg>
                  <div class="figma-glow"></div>
                </div>
                <span>Figma Design</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth continuous scrolling strip effect */
.transition-transform {
  will-change: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Smooth looping transition */
.image-strip {
  opacity: 1;
  transition: opacity 0.5s ease;
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

/* Figma icon styling */
.figma-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  overflow: visible;
  transition: all 0.3s ease;
}

.figma-icon {
  z-index: 2;
  position: relative;
  transition: all 0.3s ease;
}

.figma-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 1;
  transform: scale(0);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

a:hover .figma-icon {
  transform: scale(1.15);
}

a:hover .figma-glow {
  transform: scale(1.2);
  background: radial-gradient(
    circle,
    rgba(242, 78, 30, 0.2) 0%,
    rgba(255, 114, 97, 0) 70%
  );
  box-shadow: 0 0 20px 2px rgba(242, 78, 30, 0.2);
}
</style>
