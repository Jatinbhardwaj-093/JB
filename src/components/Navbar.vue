<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useThemeStore } from "../store/theme";
import CicadaLogo from "./CicadaLogo.vue";

const themeStore = useThemeStore();
const navRef = ref<HTMLElement | null>(null);
const selectedTheme = ref<string>(
  themeStore.theme.charAt(0).toUpperCase() + themeStore.theme.slice(1)
);
const isMobileMenuOpen = ref<boolean>(false);

// Improved swipe detection variables
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
const SWIPE_THRESHOLD = 70; // Reduced threshold for easier detection
const SWIPE_ANGLE_THRESHOLD = 30; // Angle in degrees to determine horizontal swipe

const handleClickOutside = (event: MouseEvent) => {
  if (navRef.value && !navRef.value.contains(event.target as Node)) {
    isMobileMenuOpen.value = false;
  }
};

// Improved touch event handlers for swipe detection
const handleTouchStart = (event: TouchEvent) => {
  touchStartX = event.changedTouches[0].screenX;
  touchStartY = event.changedTouches[0].screenY;
};

const handleTouchEnd = (event: TouchEvent) => {
  touchEndX = event.changedTouches[0].screenX;
  touchEndY = event.changedTouches[0].screenY;
  handleSwipe();
};

// Calculate swipe direction with improved angle detection
const handleSwipe = () => {
  const deltaX = touchStartX - touchEndX;
  const deltaY = touchStartY - touchEndY;

  // Calculate angle to determine if it's a horizontal swipe
  const angle = Math.abs((Math.atan2(deltaY, deltaX) * 180) / Math.PI);
  const isHorizontalSwipe =
    angle <= SWIPE_ANGLE_THRESHOLD || angle >= 180 - SWIPE_ANGLE_THRESHOLD;

  if (isHorizontalSwipe) {
    // Left swipe (from right to left)
    if (deltaX > SWIPE_THRESHOLD && !isMobileMenuOpen.value) {
      isMobileMenuOpen.value = true;
    }
    // Right swipe (from left to right)
    else if (deltaX < -SWIPE_THRESHOLD && isMobileMenuOpen.value) {
      isMobileMenuOpen.value = false;
    }
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);

  // Add touch event listeners for all mobile devices
  document.addEventListener("touchstart", handleTouchStart, { passive: true });
  document.addEventListener("touchend", handleTouchEnd, { passive: true });
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("touchstart", handleTouchStart);
  document.removeEventListener("touchend", handleTouchEnd);
});

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const toggleTheme = () => {
  themeStore.theme = themeStore.theme === "light" ? "dark" : "light";
  themeStore.applyTheme();
  selectedTheme.value =
    themeStore.theme.charAt(0).toUpperCase() + themeStore.theme.slice(1);
};

watch(
  () => themeStore.theme,
  (newTheme) => {
    selectedTheme.value = newTheme.charAt(0).toUpperCase() + newTheme.slice(1);
  }
);
</script>

<template>
  <nav
    :data-theme="themeStore.theme"
    ref="navRef"
    class="navbar sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300"
  >
    <div class="container mx-auto px-4 py-3">
      <!-- Reduced padding-y from py-4 to py-3 -->
      <div class="flex justify-between items-center">
        <!-- Updated to use the elegant cicada logo -->
        <router-link to="/" class="logo-container flex items-center space-x-2">
          <CicadaLogo :animate="true" />
          <span
            class="text-xl font-bold text-black"
            :class="{ 'text-white': themeStore.theme === 'dark' }"
            >JB</span
          >
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <!-- Reduced space-x from 8 to 6 -->
          <router-link
            v-for="(link, index) in [
              { name: 'home', text: 'Home' },
              { name: 'about', text: 'About' },
              { name: 'projects', text: 'Projects' },
              { name: 'blogs', text: 'Blog' },
              { name: 'contact', text: 'Contact' },
            ]"
            :key="index"
            :to="{ name: link.name }"
            class="nav-link font-medium text-gray-600 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
            :class="
              $route.name === link.name
                ? 'text-indigo-600 dark:text-indigo-400'
                : ''
            "
          >
            {{ link.text }}
          </router-link>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="theme-toggle p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-300"
            aria-label="Toggle theme"
          >
            <svg
              v-if="themeStore.theme === 'light'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>
        </div>

        <!-- Mobile menu button -->
        <button
          @click="toggleMobileMenu"
          class="mobile-menu-button md:hidden !block md:!hidden p-2 text-gray-600 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            v-if="!isMobileMenuOpen"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu with overlay styling - moved outside the container -->
    <div
      class="mobile-menu fixed md:hidden right-0 top-0 h-screen w-4/5 max-w-sm bg-white dark:bg-gray-900 shadow-lg z-50 border-l border-gray-200 dark:border-gray-700 overflow-y-auto"
      :class="{ 'menu-open': isMobileMenuOpen }"
    >
      <div class="p-6 min-h-full flex flex-col">
        <!-- Removed the duplicate close button div -->

        <div class="flex flex-col space-y-5 mt-6 flex-grow">
          <router-link
            v-for="(link, index) in [
              { name: 'home', text: 'Home' },
              { name: 'about', text: 'About' },
              { name: 'projects', text: 'Projects' },
              { name: 'blogs', text: 'Blog' },
              { name: 'contact', text: 'Contact' },
            ]"
            :key="index"
            :to="{ name: link.name }"
            @click="closeMobileMenu"
            class="nav-link px-3 py-4 text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
            :class="
              $route.name === link.name
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-gray-700 dark:text-gray-200'
            "
          >
            {{ link.text }}
          </router-link>

          <!-- Theme toggle in mobile menu - simplified animation -->
          <button
            @click="toggleTheme"
            class="mobile-theme-toggle mt-auto px-3 py-4 flex items-center space-x-3 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            <span v-if="themeStore.theme === 'light'">
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
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </span>
            <span v-else>
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
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </span>
            <span class="text-lg">{{
              themeStore.theme === "light" ? "Dark Mode" : "Light Mode"
            }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Background overlay when mobile menu is open -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden overlay-fade-in"
      @click="closeMobileMenu"
    ></div>
  </nav>
</template>

<style scoped>
.navbar {
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  animation: fadeInDown 0.5s ease forwards;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Logo animation */
.logo-container {
  position: relative;
  overflow: hidden;
}

.logo-container img {
  transition: transform 0.3s ease;
}

.logo-container:hover img {
  transform: scale(1.05);
}

/* Menu item hover effect with animated underline */
.nav-link {
  position: relative;
  transition: all 0.2s ease;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
  opacity: 0.7;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-link:hover {
  color: #4f46e5;
}

.router-link-active {
  color: #4f46e5;
  font-weight: 600;
}

/* Simplified theme toggle animation */
.theme-toggle {
  position: relative;
  transition: all 0.2s ease;
}

/* Mobile-specific theme toggle with even more subtle animation */
.mobile-theme-toggle {
  transition: background-color 0.2s ease;
}

/* Mobile menu button improvements for better tap response */
.mobile-menu-button {
  position: relative;
  z-index: 60; /* Make it above the overlay */
  transition: all 0.2s ease;
  touch-action: manipulation; /* Improve mobile tap */
  -webkit-tap-highlight-color: transparent; /* Remove tap highlight on iOS */
  padding: 8px; /* Sized for the hamburger icon only */
  display: flex; /* Ensure the button wraps around the SVG tightly */
  align-items: center;
  justify-content: center;
}

/* Remove the expanded tap area pseudo-element */
/* Commented out to restrict the clickable area to just the button itself
.mobile-menu-button::before {
  content: '';
  position: absolute;
  top: -8px;
  right: -8px;
  bottom: -8px;
  left: -8px;
  z-index: -1;
}
*/

/* Mobile menu slide animation */
.mobile-menu {
  transform: translateX(100%);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  visibility: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden; /* For smoother animation in Safari */
  perspective: 1000px;
}

.mobile-menu.menu-open {
  transform: translateX(0);
  visibility: visible;
}

/* Background overlay animation */
.overlay-fade-in {
  animation: fadeIn 0.25s ease forwards;
  will-change: opacity;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Dark mode specific styles */
:root[data-theme="dark"] .nav-link:hover,
:root[data-theme="dark"] .router-link-active {
  color: #818cf8;
}

/* Additional mobile responsiveness improvements */
@media (max-width: 640px) {
  .navbar {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .mobile-menu {
    max-height: 100vh;
    overflow-y: auto;
  }

  .nav-link {
    padding: 0.5rem;
  }
}

/* Reduced animation for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  .navbar,
  .logo-container img,
  .nav-link,
  .theme-toggle,
  .mobile-menu-button,
  .mobile-theme-toggle,
  .mobile-menu {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}
</style>
