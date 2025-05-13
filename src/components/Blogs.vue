<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();
const filterTabsContainer = ref<HTMLElement | null>(null);

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

  // Scroll to center the selected category button
  setTimeout(() => {
    const selectedButton = document.querySelector(
      `button[data-category="${categoryId}"]`
    );
    if (selectedButton && filterTabsContainer.value) {
      const containerWidth = filterTabsContainer.value.clientWidth;
      const buttonRect = selectedButton.getBoundingClientRect();
      const containerRect = filterTabsContainer.value.getBoundingClientRect();

      // Calculate position to center the button
      const scrollPosition =
        buttonRect.left +
        buttonRect.width / 2 -
        (containerRect.left + containerWidth / 2);

      // Scroll to center the button
      filterTabsContainer.value.scrollBy({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, 50);
};

// Function to handle scrolling in the tabs container when arrow is clicked
const scrollFilterTabs = (direction = "right", amount = 200) => {
  if (filterTabsContainer.value) {
    filterTabsContainer.value.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  }
};

// Reactive refs to track scroll state
const showScrollIndicator = ref(false);
const scrollPosition = ref(0);

// Check if tabs container has overflow that requires scrolling
const checkForScrollOverflow = () => {
  if (filterTabsContainer.value) {
    // Update scroll position
    scrollPosition.value = filterTabsContainer.value.scrollLeft;

    // Show indicator if content width exceeds container width
    showScrollIndicator.value =
      filterTabsContainer.value.scrollWidth >
      filterTabsContainer.value.clientWidth;
  }
};

// Handle scroll events to update arrow visibility
const handleScroll = () => {
  if (filterTabsContainer.value) {
    scrollPosition.value = filterTabsContainer.value.scrollLeft;
  }
};

onMounted(() => {
  checkForScrollOverflow();

  // Set up event listeners
  window.addEventListener("resize", checkForScrollOverflow);

  if (filterTabsContainer.value) {
    filterTabsContainer.value.addEventListener("scroll", handleScroll);
  }

  // Initial scroll to active category (with a slight delay for rendering)
  setTimeout(() => {
    const activeEl = document.querySelector(
      `button[data-category="${activeCategory.value}"]`
    );
    if (activeEl && filterTabsContainer.value) {
      const containerWidth = filterTabsContainer.value.clientWidth;
      const activeElLeft = activeEl.getBoundingClientRect().left;
      const containerLeft =
        filterTabsContainer.value.getBoundingClientRect().left;

      // Center the active element
      const scrollTo =
        activeElLeft -
        containerLeft -
        containerWidth / 2 +
        activeEl.clientWidth / 2;
      filterTabsContainer.value.scrollTo({
        left: scrollTo > 0 ? scrollTo : 0,
        behavior: "smooth",
      });
    }
  }, 200);
});
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
        class="h-[15vh] md:h-[25vh] lg:h-[25vh] xl:h-[30vh] w-full overflow-hidden"
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
              <p
                class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2"
              >
                <span class="hidden sm:inline">{{
                  currentCategory.title
                }}</span>
                <span class="sm:hidden">
                  {{
                    currentCategory.id === "gsoc"
                      ? "GSoC"
                      : currentCategory.id === "machine-learning"
                      ? "ML Research"
                      : currentCategory.title
                  }}
                </span>
              </p>
              <p
                class="text-xs sm:text-xs md:text-sm text-gray-200 max-w-3xl hidden md:block"
              >
                {{ currentCategory.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Tabs - Full width with a dark background -->
    <div
      class="w-full py-4 mb-10 shadow-md relative"
      :class="{
        'bg-gray-100': themeStore.theme === 'light',
        'bg-gray-800': themeStore.theme === 'dark',
      }"
    >
      <div
        class="overflow-x-auto no-scrollbar scroll-smooth"
        ref="filterTabsContainer"
      >
        <div class="flex space-x-4 min-w-max justify-center px-4 w-full">
          <button
            v-for="category in categories"
            :key="category.id"
            :data-category="category.id"
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

      <!-- Right scroll indicator arrow -->
      <div
        v-if="showScrollIndicator"
        class="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer"
        title="Scroll for more categories"
        @click="scrollFilterTabs('right')"
      >
        <div
          class="flex items-center justify-center h-10 w-10 rounded-l-full shadow-md backdrop-blur-sm"
          :class="{
            'bg-gradient-to-l from-gray-100 to-white/90':
              themeStore.theme === 'light',
            'bg-gradient-to-l from-gray-800 to-gray-900/90':
              themeStore.theme === 'dark',
          }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 animate-arrow-pulse"
            :class="{
              'text-indigo-600': themeStore.theme === 'light',
              'text-indigo-400': themeStore.theme === 'dark',
            }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl overflow-hidden py-8 md:py-14">
      <!-- Coming Soon Section with Zoro Lost GIF -->
      <div
        class="rounded-xl shadow-lg p-4 sm:p-6 md:p-8 text-center max-w-2xl mx-auto border"
        :class="{
          'bg-white border-gray-100': themeStore.theme === 'light',
          'bg-gray-800 border-gray-700': themeStore.theme === 'dark',
        }"
      >
        <div class="mb-4 sm:mb-6 flex justify-center">
          <img
            src="../assets/images/lost/zoro_lost.jpg"
            alt="Zoro Lost"
            class="h-40 w-auto rounded-lg shadow-lg"
          />
        </div>
        <p
          class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-black mb-2 sm:mb-4"
          :class="{ 'text-white': themeStore.theme === 'dark' }"
        >
          Blogs Coming Soon
        </p>
        <p
          class="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6"
        >
          I'm currently working on creating valuable content to share with you.
          My blog will feature articles about web development, data science, and
          other tech topics I'm passionate about.
        </p>
        <div
          class="p-3 sm:p-4 rounded-lg border"
          :class="{
            'bg-indigo-50 border-indigo-100': themeStore.theme === 'light',
            'bg-indigo-900/20 border-indigo-800/30':
              themeStore.theme === 'dark',
          }"
        >
          <p
            class="text-xs sm:text-sm md:text-base italic"
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

/* Enhanced arrow pulse animations for the scroll indicators */
.animate-arrow-pulse {
  animation: arrow-pulse-right 1.5s ease-in-out infinite;
}

.animate-arrow-pulse-left {
  animation: arrow-pulse-left 1.5s ease-in-out infinite;
}

@keyframes arrow-pulse-right {
  0% {
    opacity: 0.7;
    transform: translateX(-3px);
  }
  50% {
    opacity: 1;
    transform: translateX(2px);
  }
  100% {
    opacity: 0.7;
    transform: translateX(-3px);
  }
}

@keyframes arrow-pulse-left {
  0% {
    opacity: 0.7;
    transform: translateX(3px);
  }
  50% {
    opacity: 1;
    transform: translateX(-2px);
  }
  100% {
    opacity: 0.7;
    transform: translateX(3px);
  }
}
</style>
