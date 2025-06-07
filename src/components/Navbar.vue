<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();
const navRef = ref<HTMLElement | null>(null);
const selectedTheme = ref<string>(
  themeStore.theme.charAt(0).toUpperCase() + themeStore.theme.slice(1)
);
const isMobileMenuOpen = ref<boolean>(false);

// Removed all swipe detection variables and functions

const handleClickOutside = (event: MouseEvent) => {
  if (navRef.value && !navRef.value.contains(event.target as Node)) {
    isMobileMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  // Removed touch event listeners
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  // Removed touch event listeners
});

const toggleMobileMenu = (event?: Event) => {
  // Prevent event from bubbling up to document
  if (event) {
    event.stopPropagation();
  }
  isMobileMenuOpen.value = !isMobileMenuOpen.value;

  // Prevent body scrolling when menu is open
  document.body.style.overflow = isMobileMenuOpen.value ? "hidden" : "";
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
    <div class="container mx-auto px-2 overflow-hidden">
      <!-- Removed padding for mobile view -->
      <div class="flex justify-between items-center py-1.5 h-[50px] md:h-auto">
        <!-- More compact logo on mobile -->
        <router-link
          to="/"
          class="logo-container flex items-center space-x-1 md:space-x-2"
        >
          <div
            class="relative w-10 h-10 md:w-14 md:h-14 rounded-full bg-blue-900 m-1 p-0.5 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            <img
              src="../assets/images/profileImage/navbar_logo.png"
              alt="JB Logo"
              class="w-full h-full rounded-full object-cover"
            />
          </div>
          <span
            class="text-base md:text-2xl font-bold transition-colors duration-300"
            :class="{
              'text-white': themeStore.theme === 'dark',
              'text-black': themeStore.theme === 'light',
            }"
            >JB</span
          >
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
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

        <!-- Completely redesigned hamburger menu button with improved hit area -->
        <div class="md:hidden relative z-50">
          <button
            @click.stop="toggleMobileMenu"
            class="mobile-menu-button block w-10 h-10 rounded-lg focus:outline-none bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
            style="touch-action: manipulation"
          >
            <div class="absolute inset-0 flex items-center justify-center">
              <!-- Hamburger icon when closed -->
              <svg
                v-if="!isMobileMenuOpen"
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-gray-700 dark:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <!-- X icon when open -->
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-gray-700 dark:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu with overlay styling - moved outside the container -->
    <div
      class="mobile-menu fixed md:hidden right-0 top-0 h-screen w-4/5 max-w-sm z-50 border-l overflow-y-auto transition-colors duration-300"
      :class="{
        'menu-open': isMobileMenuOpen,
        'menu-closed': !isMobileMenuOpen,
        'bg-white border-gray-200': themeStore.theme === 'light',
        'bg-gray-900 border-gray-700': themeStore.theme === 'dark',
      }"
    >
      <div class="p-6 min-h-full flex flex-col">
        <!-- Restoring the close button at the top of the menu -->
        <div class="flex justify-end mb-4">
          <button
            @click="closeMobileMenu"
            class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-600 dark:text-gray-300"
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

        <div class="flex flex-col space-y-5 flex-grow mt-6">
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

/* Logo container */
.logo-container {
  position: relative;
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
  transition: all 0.15s ease;
  touch-action: manipulation; /* Improve mobile tap */
  -webkit-tap-highlight-color: transparent; /* Remove tap highlight on iOS */
  display: flex; /* Ensure the button wraps around the SVG tightly */
  align-items: center;
  justify-content: center;
  user-select: none;
}

.mobile-menu-button:active {
  transform: scale(0.95);
  background-color: rgba(0, 0, 0, 0.05);
}

/* Mobile menu slide animation */
.mobile-menu {
  position: fixed;
  right: 0;
  top: 0;
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  visibility: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden; /* For smoother animation in Safari */
  max-width: 300px;
  width: 80%; /* Use percentage instead of viewport units */
  height: 100%;
  height: 100dvh; /* Use dynamic viewport height when available */
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 50;
  touch-action: pan-y; /* Only allow vertical scrolling */
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
}

.mobile-menu.menu-open {
  transform: translateX(0); /* Simplified transform */
  visibility: visible;
}

.menu-closed {
  transform: translateX(100%);
  visibility: hidden;
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
