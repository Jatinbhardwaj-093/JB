<script setup lang="ts">
import { ref, computed } from "vue";
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();

// Define blog categories with descriptions
const categories = ref([
  {
    id: "gsoc",
    name: "GSoC",
    title: "Google Summer of Code",
    description:
      "My journey and contributions during Google Summer of Code. Sharing experiences, challenges, and the open-source projects I've worked on.",
  },
  {
    id: "sympy",
    name: "SymPy",
    title: "SymPy Library",
    description:
      "Exploring symbolic mathematics with Python using SymPy. Tutorials, project insights, and advancements in computer algebra systems.",
  },
  {
    id: "mathematics",
    name: "Mathematics",
    title: "Mathematical Explorations",
    description:
      "Delving into mathematical concepts, theorems, and applications. From pure mathematics to practical problem-solving approaches.",
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    title: "Machine Learning Research",
    description:
      "Research papers, implementations, and insights in machine learning. Covering neural networks, algorithms, and cutting-edge AI developments.",
  },
  {
    id: "psychology",
    name: "Psychology",
    title: "Psychology Studies",
    description:
      "Exploring the human mind, behavior, and cognitive processes. Bridging technology with psychological insights and research.",
  },
]);

// Track active category
const activeCategory = ref("gsoc");

// Get the current category object based on active ID
const currentCategory = computed(() => {
  return (
    categories.value.find((cat) => cat.id === activeCategory.value) ||
    categories.value[0]
  );
});

// Function to set active category
const setActiveCategory = (categoryId: string) => {
  activeCategory.value = categoryId;
};

// Banner image path based on active category
const bannerImagePath = computed(() => {
  try {
    // Special case for mathematics - use GIF instead of JPG
    if (activeCategory.value === "mathematics") {
      return new URL(
        `../assets/images/BlogHeaderBanner/mathematics.gif`,
        import.meta.url
      ).href;
    }
    
    // For other categories, use JPG
    return new URL(
      `../assets/images/BlogHeaderBanner/${activeCategory.value}.jpg`,
      import.meta.url
    ).href;
  } catch (error) {
    // Fallback to cicada image if the file doesn't exist
    return new URL("../assets/images/cicada.jpg", import.meta.url).href;
  }
});

// Update banner image whenever active category changes
const handleCategoryChange = (categoryId: string) => {
  setActiveCategory(categoryId);
};
</script>

<template>
  <div
    class="w-full max-w-[100vw] overflow-x-hidden"
    :class="{
      'bg-gray-50': themeStore.theme === 'light',
      'bg-gray-900': themeStore.theme === 'dark',
    }"
  >
    <!-- Banner Image - Full width without container -->
    <div class="relative w-full">
      <div
        class="h-[15vh] md:h-[20vh] lg:h-[25vh] xl:h-[30vh] w-full overflow-hidden"
      >
        <img
          :src="bannerImagePath"
          :alt="`${currentCategory.name} Banner`"
          class="w-full h-full object-contain object-center"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end"
        >
          <div class="p-4 md:p-6 w-full">
            <div class="w-full px-4 sm:px-6">
              <h2
                class="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2"
              >
                {{ currentCategory.title }}
              </h2>
              <p class="text-sm text-gray-200 max-w-3xl hidden md:block">
                {{ currentCategory.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Tabs - Full width with a dark background -->
    <div
      class="w-full py-4 mb-10 shadow-md overflow-x-auto no-scrollbar"
      :class="{
        'bg-gray-100': themeStore.theme === 'light',
        'bg-gray-800': themeStore.theme === 'dark',
      }"
    >
      <div class="flex space-x-4 min-w-max justify-center px-4 w-full">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="handleCategoryChange(category.id)"
          class="px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200"
          :class="{
            'bg-indigo-600 text-white': activeCategory === category.id,
            'bg-white text-gray-700 hover:bg-gray-200 shadow':
              activeCategory !== category.id && themeStore.theme === 'light',
            'bg-gray-700 text-gray-300 hover:bg-gray-600 shadow':
              activeCategory !== category.id && themeStore.theme === 'dark',
          }"
        >
          {{ category.name }}
        </button>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl overflow-hidden py-8 md:py-14">
      <!-- Coming Soon Section with Zoro Lost GIF -->
      <div
        class="rounded-xl shadow-lg p-8 text-center max-w-2xl mx-auto border"
        :class="{
          'bg-white border-gray-100': themeStore.theme === 'light',
          'bg-gray-800 border-gray-700': themeStore.theme === 'dark',
        }"
      >
        <div class="mb-6 flex justify-center">
          <img
            src="../assets/images/lost/zoro_lost.gif"
            alt="Zoro Lost"
            class="h-40 w-auto rounded-lg shadow-lg"
          />
        </div>
        <h2
          class="text-2xl font-bold text-black mb-4"
          :class="{ 'text-white': themeStore.theme === 'dark' }"
        >
          Blog Section Coming Soon
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          I'm currently working on creating valuable content to share with you.
          My blog will feature articles about web development, data science, and
          other tech topics I'm passionate about.
        </p>
        <div
          class="p-4 rounded-lg border"
          :class="{
            'bg-indigo-50 border-indigo-100': themeStore.theme === 'light',
            'bg-indigo-900/20 border-indigo-800/30':
              themeStore.theme === 'dark',
          }"
        >
          <p
            class="text-sm italic"
            :class="{
              'text-gray-700': themeStore.theme === 'light',
              'text-gray-300': themeStore.theme === 'dark',
            }"
          >
            "The writer is lost in doing another work. He'll find their way back
            soon!"
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Responsive spacing adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 16px;
    padding-right: 16px;
  }
}

/* Hide scrollbar but allow scrolling */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.no-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

/* Animation for coming soon */
.coming-soon {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

/* Newsletter subscription glow effect */
.newsletter-glow-box {
  position: relative;
  box-shadow: 0 0 25px rgba(79, 70, 229, 0.15);
  transition: all 0.3s ease;
  overflow: hidden;
}

.newsletter-glow-box::before {
  content: "";
  position: absolute;
  inset: -1px;
  background: linear-gradient(
    90deg,
    rgba(79, 70, 229, 0.3),
    rgba(129, 140, 248, 0.3),
    rgba(79, 70, 229, 0.3)
  );
  background-size: 200% 100%;
  border-radius: 0.75rem; /* matches rounded-xl */
  z-index: -1;
  animation: border-glow 3s linear infinite;
}

@keyframes border-glow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Add a floating animation to the subscription box for extra effect */
.newsletter-glow-box {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* Add the slow pulse animation for the outer glow */
@keyframes pulse-slow {
  0% {
    opacity: 0.5;
    transform: scale(0.98);
  }
  50% {
    opacity: 0.8;
    transform: scale(1);
  }
  100% {
    opacity: 0.5;
    transform: scale(0.98);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

/* Add extra styling for the newsletter container */
.newsletter-glow-container {
  filter: drop-shadow(0 4px 12px rgba(79, 70, 229, 0.25));
}

/* Banner image transitions */
img {
  transition: all 0.5s ease-in-out;
}
</style>
