<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useThemeStore } from "../store/theme";
import { getPostsByCategory } from "../data/blogs/index";
import BlogCard from "./blog/BlogCard.vue";

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

// Get blog posts for the active category
const currentPosts = computed(() => {
  const posts = getPostsByCategory(activeCategory.value);
  console.log(`Active category: ${activeCategory.value}`);
  console.log("Posts found:", posts);
  console.log("Posts length:", posts.length);

  // Sort posts by date in ascending order (oldest first)
  return posts.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
});

// Check if there are any posts for the current category
const hasPosts = computed(() => {
  return currentPosts.value.length > 0;
});

// Function to set active category
const setActiveCategory = (categoryId: string) => {
  activeCategory.value = categoryId;
};

// Banner image path based on active category
const bannerImagePath = computed(() => {
  try {
    // Special cases for GIF images
    if (
      activeCategory.value === "mathematics" ||
      activeCategory.value === "machine-learning"
    ) {
      return new URL(
        `../assets/images/BlogHeaderBanner/${activeCategory.value}.gif`,
        import.meta.url
      ).href;
    }

    // For other categories, use JPG
    return new URL(
      `../assets/images/BlogHeaderBanner/${activeCategory.value}.webp`,
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
  <div class="w-full max-w-[100vw] overflow-x-hidden bg-black">
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
    <div class="w-full py-4 shadow-md relative bg-gray-900">
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
              'bg-gray-700 text-white': activeCategory === category.id,
              'bg-gray-700 text-gray-300 hover:bg-gray-600 shadow':
                activeCategory !== category.id,
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
          class="flex items-center justify-center h-10 w-10 rounded-l-full shadow-md backdrop-blur-sm bg-gradient-to-l from-gray-900 to-black/90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 animate-arrow-pulse text-gray-400"
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
      <!-- Blog Posts Grid when posts are available -->
      <div
        v-if="hasPosts"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <BlogCard v-for="post in currentPosts" :key="post.id" :post="post" />
      </div>

      <!-- Coming Soon Section when no posts are available -->
      <div
        v-else
        class="rounded-xl shadow-lg p-4 sm:p-6 md:p-8 text-center max-w-2xl mx-auto border bg-gray-900 border-gray-700"
      >
        <div class="mb-4 sm:mb-6 flex justify-center">
          <img
            src="../assets/images/lost/zoro_lost.webp"
            alt="Zoro Lost"
            class="h-40 w-auto rounded-lg shadow-lg"
          />
        </div>
        <p
          class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-4"
        >
          More Content Coming Soon
        </p>
        <p
          class="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 mb-4 sm:mb-6"
        >
          I'm working on new articles about programming, mathematics, and my
          experiences with open source projects. Check back soon for updates.
        </p>
        <div
          class="p-3 sm:p-4 rounded-lg border bg-gray-900/20 border-gray-800/30"
        >
          <p class="text-xs sm:text-sm md:text-base italic text-gray-300">
            "Like Zoro, I've wandered off the path. Don't worry, I'll find my
            way back with new content soon!"
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
  box-shadow: 0 0 25px rgba(156, 163, 175, 0.15);
  transition: all 0.3s ease;
  overflow: hidden;
}

.newsletter-glow-box::before {
  content: "";
  position: absolute;
  inset: -1px;
  background: linear-gradient(
    90deg,
    rgba(156, 163, 175, 0.3),
    rgba(209, 213, 219, 0.3),
    rgba(156, 163, 175, 0.3)
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
