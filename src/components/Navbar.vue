<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const isDark = ref(true);
const isMenuOpen = ref(false);
const router = useRouter();

const toggleTheme = () => {
  const html = document.documentElement;
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
    isDark.value = false;
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
    isDark.value = true;
  }
};

const handleNavClick = (hash) => {
  isMenuOpen.value = false;
  // If we're not on home, go home first with hash
  if (router.currentRoute.value.path !== "/") {
    router.push({ path: "/", hash });
  } else {
    // If we are on home, let browser hash scroll
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
};

onMounted(() => {
  const html = document.documentElement;
  isDark.value = html.classList.contains("dark");
});
</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-stone-200/50 dark:border-stone-900/50">
    <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <router-link to="/" class="mono-text tracking-wider font-medium text-sm flex items-center gap-2 group text-stone-900 dark:text-stone-100">
        <span class="w-1.5 h-1.5 rounded-full bg-stone-800 dark:bg-stone-200 group-hover:scale-125 transition-transform"></span>
        <span>jatin.bhardwaj</span>
      </router-link>

      <nav class="hidden sm:flex items-center gap-8 text-xs font-medium tracking-wider uppercase text-stone-500 dark:text-stone-400">
        <a href="#about" @click.prevent="handleNavClick('#about')" class="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">About</a>
        <a href="#contributions" @click.prevent="handleNavClick('#contributions')" class="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">Contributions</a>
        <a href="#projects" @click.prevent="handleNavClick('#projects')" class="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">Selected Work</a>
        <router-link to="/blogs" class="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">Blogs</router-link>
      </nav>

      <div class="flex items-center gap-2 sm:gap-4">
        <!-- Theme Toggle -->
        <button 
          @click="toggleTheme" 
          class="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-900 text-stone-500 dark:text-stone-400 transition-colors" 
          aria-label="Toggle theme"
        >
          <!-- Sun Icon (visible in dark mode) -->
          <svg v-if="isDark" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <!-- Moon Icon (visible in light mode) -->
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>

        <a href="mailto:jatinbhardwaj093@gmail.com" class="hidden xs:inline-block bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 px-4 py-1.5 rounded text-xs font-mono tracking-tight hover:opacity-90 transition-opacity">
          /connect
        </a>

        <!-- Mobile Menu Hamburger -->
        <button 
          @click="isMenuOpen = !isMenuOpen"
          class="sm:hidden p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-900 text-stone-500 dark:text-stone-400 transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu dropdown -->
    <transition name="menu-slide">
      <div 
        v-if="isMenuOpen" 
        class="sm:hidden border-t border-stone-200/50 dark:border-stone-900/50 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4 text-xs font-medium tracking-wider uppercase text-stone-500 dark:text-stone-400"
      >
        <a href="#about" @click.prevent="handleNavClick('#about')" class="hover:text-stone-900 dark:hover:text-stone-100 transition-colors py-1">About</a>
        <a href="#contributions" @click.prevent="handleNavClick('#contributions')" class="hover:text-stone-900 dark:hover:text-stone-100 transition-colors py-1">Contributions</a>
        <a href="#projects" @click.prevent="handleNavClick('#projects')" class="hover:text-stone-900 dark:hover:text-stone-100 transition-colors py-1">Selected Work</a>
        <router-link to="/blogs" @click="isMenuOpen = false" class="hover:text-stone-900 dark:hover:text-stone-100 transition-colors py-1">Blogs</router-link>
        <a href="mailto:jatinbhardwaj093@gmail.com" class="xs:hidden bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 px-4 py-2 rounded text-center font-mono tracking-tight hover:opacity-90 transition-opacity mt-2">
          /connect
        </a>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all 0.2s ease;
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
