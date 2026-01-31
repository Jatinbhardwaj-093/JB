<script setup lang="ts">
import { ref, computed } from "vue";
import { getPostsByCategory } from "../data/blogs/index";
import { useRouter } from "vue-router";
import gsocImage from "../assets/images/Projects/gsoc.webp";
import sympyImage from "../assets/images/Projects/sympy.webp";

const router = useRouter();
const isExpanded = ref(false);

// Get all GSoC blog posts
const gsocPosts = computed(() => {
  const posts = getPostsByCategory("gsoc");
  return posts.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
});

// Extract week number from title for cleaner display
const getWeekLabel = (title: string): string => {
  // Extract week info from title like "GSoC-25: Week-1 - ..." or "GSoC: Tips to..."
  const weekMatch = title.match(/Week[- ](\d+(?:-\d+)?)/i);
  if (weekMatch) {
    return `Week ${weekMatch[1]}`;
  }
  // For non-week posts like "Tips to start with Open Source"
  return title.replace(/^GSoC:\s*/i, "").substring(0, 30) + "...";
};

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const goToBlogPost = (postId: string) => {
  router.push({ name: "BlogPost", params: { id: postId } });
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 relative w-full">
        <!-- GSoC Blog Card -->
        <div
          class="blog-card rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl border bg-gray-800/60 border-gray-700 cursor-pointer relative overflow-hidden"
          @click="toggleExpand"
        >
          <!-- Header with Icon -->
          <div class="relative overflow-hidden group h-32 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center gap-3">
            <img
              :src="gsocImage"
              alt="GSoC logo"
              class="h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
              loading="eager"
            />
            <img
              :src="sympyImage"
              alt="SymPy logo"
              class="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
              loading="eager"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            
            <!-- Title Overlay -->
            <div class="absolute inset-0 flex items-end p-3">
              <h3 class="text-sm font-semibold text-white">GSoC 2025 @ Sympy</h3>
            </div>
          </div>

          <!-- Content -->
          <div class="p-3">
            <div
              v-if="!isExpanded"
              class="flex items-center justify-between gap-2 mb-2"
            >
              <span class="text-xs text-gray-400">{{ gsocPosts.length }} posts</span>
              <svg
                class="w-4 h-4 text-gray-400 transition-transform duration-300"
                :style="{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>

            <!-- Blog Posts List (when expanded - inside card) -->
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              leave-active-class="transition-all duration-300 ease-in"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-96"
              leave-from-class="opacity-100 max-h-96"
              leave-to-class="opacity-0 max-h-0"
            >
              <div
                v-if="isExpanded"
                class="space-y-1"
              >
                <div class="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-gray-700">
                  <span class="text-xs text-gray-400">{{ gsocPosts.length }} posts</span>
                  <svg
                    class="w-4 h-4 text-gray-400 transition-transform duration-300"
                    :style="{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
                <button
                  v-for="post in gsocPosts"
                  :key="post.id"
                  @click.stop="goToBlogPost(post.id)"
                  class="w-full text-left p-2 rounded hover:bg-gray-700/50 transition-colors duration-200 text-xs"
                >
                  <p class="text-gray-200">
                    {{ getWeekLabel(post.title) }}
                  </p>
                  <p class="text-gray-500 text-xs">
                    {{ new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    }) }}
                  </p>
                </button>
              </div>
            </transition>
          </div>
        </div>
  </div>
</template>

<style scoped>
/* Smooth transitions for expand/collapse */
.max-h-96 {
  max-height: 24rem;
}

.max-h-0 {
  overflow: hidden;
}
</style>
