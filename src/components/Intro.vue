<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();

const firstName = ref("Jatin");
const lastName = ref("Bhardwaj");
const title = ref("Cloud Computing | AI & ML | Mathematics");
const tagline = ref("Crafting intelligent solutions for a connected world.");
const profileImageUrl = ref("../assets/images/profileImage/myimage.png");
const location = ref("Delhi, India");

const isLoaded = ref(false);
const mouseX = ref(0);
const mouseY = ref(0);

const handleMouseMove = (event: MouseEvent) => {
  mouseX.value = event.clientX;
  mouseY.value = event.clientY;
};

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true;
  }, 100);
  window.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
});

const backgroundStyle = computed(() => {
  const xPercent = (mouseX.value / window.innerWidth) * 100;
  const yPercent = (mouseY.value / window.innerHeight) * 100;
  return {
    background: `radial-gradient(circle at ${xPercent}% ${yPercent}%, 
      ${
        themeStore.theme === "dark"
          ? "rgba(56, 189, 248, 0.1)"
          : "rgba(199, 210, 254, 0.2)"
      } 0%, 
      ${
        themeStore.theme === "dark"
          ? "rgba(12, 74, 110, 0.1)"
          : "rgba(239, 246, 255, 0.1)"
      } 30%, 
      transparent 70%)`,
  };
});
</script>

<template>
  <section
    class="min-h-screen relative overflow-hidden transition-colors duration-500 text-center"
    :class="
      themeStore.theme === 'dark'
        ? 'bg-slate-900 text-gray-100'
        : 'bg-gray-50 text-gray-900'
    "
    style="display: table; width: 100%; height: 100vh"
  >
    <!-- Interactive Aurora Background -->
    <div
      class="absolute inset-0 z-0 transition-opacity duration-1000 opacity-0"
      :class="{ 'opacity-100': isLoaded }"
      :style="backgroundStyle"
    ></div>

    <!-- Main Content Container -->
    <div style="display: table-cell; vertical-align: middle">
      <div
        class="relative z-10 w-full max-w-4xl mx-auto text-center"
      >
        <!-- Profile Image -->
        <div
          class="transition-all duration-1000 ease-out transform opacity-0 scale-75 inline-block"
          :class="{ 'opacity-100 scale-100': isLoaded }"
        >
          <div class="relative w-60 h-60 mx-auto">
            <img
              src="../../src/assets/images/profileImage/myimage.png"
              alt="Profile Photo"
              class="relative w-full h-full object-cover rounded-full border-4 shadow-xl"
              :class="
                themeStore.theme === 'dark'
                  ? 'border-slate-700'
                  : 'border-white'
              "
            />
          </div>
        </div>

        <!-- Location -->
        <div
          class="transition-all duration-1000 ease-out delay-200 transform opacity-0 translate-y-4"
          :class="{ 'opacity-100 translate-y-0': isLoaded }"
          style="display: block; margin-top: -45px; margin-bottom: 20px;"
        >
          <div style="display: inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 inline-block align-middle mr-1"
              :class="
                themeStore.theme === 'dark' ? 'text-sky-400' : 'text-sky-600'
              "
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
            <span
              class="text-sm align-middle"
              :class="
                themeStore.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              "
            >
              {{ location }}
            </span>
          </div>
        </div>

        <!-- Name -->
        <div
          class="transition-all duration-1000 ease-out delay-100 transform opacity-0 translate-y-4 block"
          :class="{ 'opacity-100 translate-y-0': isLoaded }"
          style="margin-top: 1.25rem"
        >
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span
              class="bg-clip-text text-transparent"
              :class="
                themeStore.theme === 'dark'
                  ? 'bg-gradient-to-r from-sky-300 via-indigo-400 to-purple-400'
                  : 'bg-gradient-to-r from-sky-600 via-indigo-700 to-purple-700'
              "
            >
              {{ firstName }} {{ lastName }}
            </span>
          </h1>
        </div>

        <!-- Title -->
        <div
          class="transition-all duration-1000 ease-out delay-200 transform opacity-0 translate-y-4 block"
          :class="{ 'opacity-100 translate-y-0': isLoaded }"
          style="margin-top: 0.75rem"
        >
          <p
            class="text-lg sm:text-xl font-light tracking-wide"
            :class="
              themeStore.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            "
          >
            {{ title }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div
          class="transition-all duration-1000 ease-out delay-400 transform opacity-0 translate-y-4 block"
          :class="{ 'opacity-100 translate-y-0': isLoaded }"
          style="margin-top: 2rem"
        >
          <router-link
            to="/projects"
            class="block sm:inline-block px-6 py-3 sm:px-8 sm:py-3.5 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 mx-auto sm:mx-2 mb-4 sm:mb-0"
            style="max-width: 300px"
            :class="
              themeStore.theme === 'dark'
                ? 'bg-sky-500 hover:bg-sky-400 text-white focus:ring-sky-400 focus:ring-offset-slate-900'
                : 'bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-600 focus:ring-offset-gray-50'
            "
          >
            Explore Projects
          </router-link>
          <router-link
            to="/contact"
            class="block sm:inline-block px-6 py-3 sm:px-8 sm:py-3.5 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 mx-auto sm:mx-2"
            style="max-width: 300px"
            :class="
              themeStore.theme === 'dark'
                ? 'bg-transparent border-2 border-indigo-400 text-indigo-300 hover:bg-indigo-400 hover:text-slate-900 focus:ring-indigo-400 focus:ring-offset-slate-900'
                : 'bg-transparent border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-600 hover:text-white focus:ring-indigo-600 focus:ring-offset-gray-50'
            "
          >
            Get in Touch
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
