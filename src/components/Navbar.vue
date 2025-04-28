<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();
const navRef = ref<HTMLElement | null>(null);
const selectedTheme = ref<string>(
  themeStore.theme.charAt(0).toUpperCase() + themeStore.theme.slice(1)
);
const isMobileMenuOpen = ref<boolean>(false);

const handleClickOutside = (event: MouseEvent) => {
  if (navRef.value && !navRef.value.contains(event.target as Node)) {
    isMobileMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
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
        <!-- Logo -->
        <router-link to="/" class="logo-container flex items-center space-x-2"
          ><!-- Reduced space-x from 3 to 2 -->
          <!-- Reduced size from w-12 h-12 to w-10 h-10 -->
          <img
            src="../assets/images/Navbar/Logo.png"
            alt="Logo"
            class="w-10 h-10 object-contain"
          />
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
          class="mobile-menu-button md:hidden p-2 text-gray-600 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
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

      <!-- Mobile menu with improved styling -->
      <div
        v-show="isMobileMenuOpen"
        class="mobile-menu md:hidden mt-3 py-2 border-t border-gray-200 dark:border-gray-700 rounded-lg"
      >
        <div class="flex flex-col space-y-2">
          <!-- Reduced space-y from 4 to 2 -->
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
            class="nav-link px-2 py-2 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
            :class="
              $route.name === link.name
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-gray-700 dark:text-gray-200'
            "
          >
            {{ link.text }}
          </router-link>

          <!-- Theme toggle in mobile menu -->
          <button
            @click="toggleTheme"
            class="theme-toggle px-2 py-2 flex items-center space-x-2 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            <span v-if="themeStore.theme === 'light'">
              <svg
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
            </span>
            <span v-else>
              <svg
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
            </span>
            <span>{{
              themeStore.theme === "light" ? "Dark Mode" : "Light Mode"
            }}</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  backdrop-filter: blur(10px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  animation: fadeInDown 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
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
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.logo-container:hover img {
  transform: scale(1.1) rotate(5deg);
}

/* Menu item hover effect with animated underline */
.nav-link {
  position: relative;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
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
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  opacity: 0.7;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-link:hover {
  transform: translateY(-2px);
  color: #4f46e5;
}

.router-link-active {
  color: #4f46e5;
  font-weight: 600;
}

/* Enhanced theme toggle animation */
.theme-toggle {
  position: relative;
  overflow: hidden;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.theme-toggle:hover {
  transform: rotate(15deg) scale(1.15);
}

.theme-toggle:active {
  transform: scale(0.9);
}

.theme-toggle::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.2) 0%,
    rgba(99, 102, 241, 0) 70%
  );
  opacity: 0;
  transform: scale(0);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.theme-toggle:hover::before {
  opacity: 1;
  transform: scale(2);
}

/* Mobile menu button animation */
.mobile-menu-button {
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.mobile-menu-button:hover {
  transform: scale(1.1);
  color: #4f46e5;
}

.mobile-menu-button:active {
  transform: scale(0.95);
}

/* Mobile menu animation */
.mobile-menu {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: top;
}

.mobile-menu.open {
  animation: slideDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.mobile-menu.closed {
  animation: slideUp 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: scaleY(0);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
}

@keyframes slideUp {
  from {
    opacity: 1;
    transform: scaleY(1);
  }
  to {
    opacity: 0;
    transform: scaleY(0);
  }
}

/* Floating animation for navbar on scroll */
.navbar.scrolled {
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
  animation: float 5s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
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
    max-height: 80vh;
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
  .mobile-menu {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }

  .nav-link::after {
    transition: none !important;
  }
}
</style>
