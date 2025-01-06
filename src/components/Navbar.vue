<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();
const navRef = ref<HTMLElement | null>(null);

const themes = ref<string[]>(["Light", "Dark"]);
const selectedTheme = ref<string>(themeStore.theme.charAt(0).toUpperCase() + themeStore.theme.slice(1));

const isDropdownOpen = ref<boolean>(false);
const isMobileMenuOpen = ref<boolean>(false);

const handleClickOutside = (event: MouseEvent) => {
  if (navRef.value && !navRef.value.contains(event.target as Node)) {
    isMobileMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const toggleMobileMenu = (event: MouseEvent) => {
  event.stopPropagation();
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const toggleTheme = (theme: string) => {
  themeStore.theme = theme.toLowerCase();
  themeStore.applyTheme();
  selectedTheme.value = theme;
  isDropdownOpen.value = false;
};

watch(
  () => themeStore.theme,
  (newTheme) => {
    selectedTheme.value = newTheme.charAt(0).toUpperCase() + newTheme.slice(1);
  }
);
</script>
<template>
  <div :data-theme="themeStore.theme" ref="navRef">
    <div class="w-[95%] mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-6 flex items-center justify-between">
      <img src="../assets/images/Navbar/Logo.png" alt="Logo" class="w-68 h-16">
      
      <div class="flex items-center space-x-4">
        <!-- Burger Menu Button for sm and md screens -->
        <button 
          @click="toggleMobileMenu"
          class="text-gray-800 dark:text-white focus:outline-none lg:hidden p-2 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 w-12 h-12 flex items-center justify-center"
        >
          <i class="bi text-2xl" :class="isMobileMenuOpen ? 'bi-x-lg' : 'bi-list'"></i>
        </button>
      </div>

      <!-- Overlay -->
      <div 
        v-show="isMobileMenuOpen"
        class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
        @click="closeMobileMenu"
      ></div>

      <!-- Mobile Menu -->
      <div
        class="fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden overflow-y-auto"
        :class="isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'"
      >
        <!-- Close button -->
        <button 
          @click="closeMobileMenu"
          class="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
        >
          <i class="bi bi-x-lg text-xl"></i>
        </button>

        <!-- Mobile menu content -->
        <div class="pt-16 px-6">
          <!-- Theme Toggle at Top -->
          <div class="mb-8 flex items-center justify-end">
            <div class="relative">
              <button
                @click="toggleTheme(themeStore.theme === 'light' ? 'Dark' : 'Light')"
                class="theme-button flex items-center space-x-2 px-4 py-2 rounded-lg"
                :class="[
                  themeStore.theme === 'dark' 
                    ? 'bg-gray-800 text-white hover:bg-gray-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                ]"
              >
                <i class="bi text-xl" :class="themeStore.theme === 'dark' ? 'bi-moon-stars-fill' : 'bi-sun-fill'"></i>
                <span class="ml-2">{{ selectedTheme }}</span>
              </button>
            </div>
          </div>

          <!-- Navigation Links -->
          <div class="space-y-6">
            <router-link 
              v-for="(link, index) in [
                { name: 'home', icon: 'bi-house-door-fill', text: 'Home' },
                { name: 'about', icon: 'bi-info-circle-fill', text: 'About' },
                { name: 'projects', icon: 'bi-clipboard-fill', text: 'Projects' },
                { name: 'contact', icon: 'bi-envelope-fill', text: 'Contact' }
              ]"
              :key="index"
              :to="{ name: link.name }"
              class="flex items-center space-x-3 group"
              @click="isMobileMenuOpen = false"
            >
              <i 
                :class="[
                  link.icon,
                  'text-2xl',
                  themeStore.theme === 'dark' ? 'text-white group-hover:text-purple-400' : 'text-gray-800 group-hover:text-purple-700'
                ]"
              ></i>
              <span 
                class="font-semibold text-xl"
                :class="themeStore.theme === 'dark' ? 'text-white group-hover:text-purple-400' : 'text-gray-800 group-hover:text-purple-700'"
              >
                {{ link.text }}
              </span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex space-x-8 items-center">
        <router-link :to="{ name: 'home' }" class="group">
          <div class="relative group">
            <i
              class="bi bi-house-door-fill text-2xl text-gray-800 md:block lg:hidden group-hover:text-purple-700"
              :class="{ 'text-white': themeStore.theme === 'dark' }"
            ></i>
            <span
              class="absolute top-full left-1/2 transform -translate-x-1/2 text-sm font-semibold md:block lg:hidden text-gray-800 opacity-0 transition-all duration-300 group-hover:bottom-[0] group-hover:opacity-100"
              :class="{ 'text-white': themeStore.theme === 'dark' }"
            >
              Home
            </span>
          </div>
          <span
            class="hidden lg:inline-block font-semibold text-xl text-gray-800 group relative hover:text-purple-700"
            :class="{ 'text-white hover:text-purple-400': themeStore.theme === 'dark' }"
          >
            Home
            <span
              class="absolute left-0 bottom-[-2px] w-0 h-1 rounded-xl bg-purple-700 transition-all duration-300 ease-in-out group-hover:w-full"
              :class="{ 'bg-purple-400': themeStore.theme === 'dark' }"
            ></span>
          </span>
        </router-link>

        <router-link :to="{ name: 'about' }" class="group">
          <div class="relative group">
            <i
              class="bi bi-info-circle-fill text-2xl text-gray-800 md:block lg:hidden group-hover:text-purple-700"
              :class="{ 'text-white': themeStore.theme === 'dark' }"
            ></i>
            <span
              class="absolute top-full left-1/2 transform -translate-x-1/2 text-sm font-semibold md:block lg:hidden text-gray-800 opacity-0 transition-all duration-300 group-hover:bottom-[0] group-hover:opacity-100"
              :class="{ 'text-white': themeStore.theme === 'dark' }"
            >
              About
            </span>
          </div>
          <span
            class="hidden lg:inline-block font-semibold text-xl text-gray-800 group relative hover:text-purple-700"
            :class="{ 'text-white hover:text-purple-400': themeStore.theme === 'dark' }"
          >
            About
            <span
              class="absolute left-0 bottom-[-2px] w-0 h-1 rounded-xl bg-purple-700 transition-all duration-300 ease-in-out group-hover:w-full"
              :class="{ 'bg-purple-400': themeStore.theme === 'dark' }"
            ></span>
          </span>
        </router-link>

        <router-link :to="{ name: 'projects' }" class="group">
          <div class="relative group">
            <i
              class="bi bi-clipboard-fill text-2xl text-gray-800 md:block lg:hidden group-hover:text-purple-700"
              :class="{ 'text-white': themeStore.theme === 'dark' }"
            ></i>
            <span
              class="absolute top-full left-1/2 transform -translate-x-1/2 text-sm font-semibold md:block lg:hidden text-gray-800 opacity-0 transition-all duration-300 group-hover:bottom-[0] group-hover:opacity-100"
              :class="{ 'text-white': themeStore.theme === 'dark' }"
            >
              Projects
            </span>
          </div>
          <span
            class="hidden lg:inline-block font-semibold text-xl text-gray-800 group relative hover:text-purple-700"
            :class="{ 'text-white hover:text-purple-400': themeStore.theme === 'dark' }"
          >
            Projects
            <span
              class="absolute left-0 bottom-[-2px] w-0 h-1 rounded-xl bg-purple-700 transition-all duration-300 ease-in-out group-hover:w-full"
              :class="{ 'bg-purple-400': themeStore.theme === 'dark' }"
            ></span>
          </span>
        </router-link>

        <router-link :to="{ name: 'contact' }" class="group">
          <div class="relative group">
            <i
              class="bi bi-envelope-fill text-2xl text-gray-800 md:block lg:hidden group-hover:text-purple-700"
              :class="{ 'text-white': themeStore.theme === 'dark' }"
            ></i>
            <span
              class="absolute top-full left-1/2 transform -translate-x-1/2 text-sm font-semibold md:block lg:hidden text-gray-800 opacity-0 transition-all duration-300 group-hover:bottom-[0] group-hover:opacity-100"
              :class="{ 'text-white': themeStore.theme === 'dark' }"
            >
              Contact
            </span>
          </div>
          <span
            class="hidden lg:inline-block font-semibold text-xl text-gray-800 group relative hover:text-purple-700"
            :class="{ 'text-white hover:text-purple-400': themeStore.theme === 'dark' }"
          >
            Contact
            <span
              class="absolute left-0 bottom-[-2px] w-0 h-1 rounded-xl bg-purple-700 transition-all duration-300 ease-in-out group-hover:w-full"
              :class="{ 'bg-purple-400': themeStore.theme === 'dark' }"
            ></span>
          </span>
        </router-link>

        <!-- Theme Toggle Button -->
        <div class="relative">
          <button
            @click="toggleTheme(themeStore.theme === 'light' ? 'Dark' : 'Light')"
            class="theme-button flex items-center space-x-2 px-4 py-2 rounded-lg"
            :class="[
              themeStore.theme === 'dark' 
                ? 'bg-gray-800 text-white hover:bg-gray-700' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            ]"
          >
            <i class="bi text-xl" :class="themeStore.theme === 'dark' ? 'bi-moon-stars-fill' : 'bi-sun-fill'"></i>
            <span class="ml-2">{{ selectedTheme }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.theme-button {
  position: relative;
  transition: all 0.3s ease;
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.theme-button::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: all 0.3s ease;
}

.theme-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.theme-button:hover::before {
  opacity: 1;
}

.theme-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dark .theme-button {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.dark .theme-button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

a:hover {
  transition: all 0.3s ease;
}
</style>