<script setup lang="ts">
import { ref } from "vue";

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  link: string;
  status: "published" | "coming-soon";
}

const blogs = ref<Blog[]>([
  {
    id: 1,
    title: "Sympy 3D Geometry Extension",
    excerpt:
      "Extending Sympy's capabilities for three-dimensional geometric computations with practical applications in computational geometry.",
    date: "April 20, 2025",
    category: "Mathematics",
    image: "https://via.placeholder.com/800x450?text=Sympy+3D+Geometry",
    link: "https://jatinbhardwaj-093.github.io/JB-blog/",
    status: "published",
  },
  {
    id: 2,
    title: "Building Responsive Vue.js Applications",
    excerpt:
      "Best practices for creating responsive, mobile-first Vue.js applications with Tailwind CSS and performance optimization techniques.",
    date: "Coming soon",
    category: "Web Development",
    image: "https://via.placeholder.com/800x450?text=Vue.js+Applications",
    link: "#",
    status: "coming-soon",
  },
  {
    id: 3,
    title: "Machine Learning Model Deployment Strategies",
    excerpt:
      "Exploring different approaches to deploying machine learning models in production environments with scalability considerations.",
    date: "Coming soon",
    category: "Machine Learning",
    image: "https://via.placeholder.com/800x450?text=ML+Deployment",
    link: "#",
    status: "coming-soon",
  },
]);
</script>

<template>
  <div class="py-10 md:py-16 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="text-center mb-12">
        <h1
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
        >
          My Blog
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Sharing my thoughts and insights on web development, data science, and
          everything in between. Check back regularly for new content!
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Individual Blog Cards -->
        <div
          v-for="blog in blogs"
          :key="blog.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] flex flex-col h-full border border-gray-100 dark:border-gray-700"
        >
          <!-- Blog Image -->
          <div class="relative h-48 overflow-hidden">
            <img
              :src="blog.image"
              :alt="blog.title"
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div class="absolute top-0 right-0 m-4">
              <span
                class="px-3 py-1 text-xs font-medium rounded-full"
                :class="
                  blog.status === 'published'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                "
              >
                {{ blog.status === "published" ? "Published" : "Coming Soon" }}
              </span>
            </div>
            <div class="absolute bottom-0 left-0 m-4">
              <span
                class="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
              >
                {{ blog.category }}
              </span>
            </div>
          </div>

          <!-- Blog Content -->
          <div class="p-6 flex flex-col flex-grow">
            <div class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              {{ blog.date }}
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {{ blog.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
              {{ blog.excerpt }}
            </p>
            <a
              :href="blog.link"
              :class="
                blog.status === 'published'
                  ? 'cursor-pointer hover:bg-indigo-700'
                  : 'cursor-not-allowed opacity-70'
              "
              class="mt-auto text-center py-2 px-4 bg-indigo-600 text-white rounded-lg transition-all duration-200"
            >
              {{ blog.status === "published" ? "Read Article" : "Coming Soon" }}
            </a>
          </div>
        </div>
      </div>

      <!-- Newsletter Subscription -->
      <div
        class="mt-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-8 text-center"
      >
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Subscribe to My Newsletter
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Stay updated with my latest articles, projects, and insights. No spam,
          just valuable content directly to your inbox.
        </p>
        <div class="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            class="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          />
          <button
            class="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Card hover effect */
.card-hover {
  transition: all 0.3s ease;
}
.card-hover:hover {
  transform: translateY(-5px);
}

/* Responsive spacing adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 16px;
    padding-right: 16px;
  }
}

/* Dark mode adjustments */
:root[data-theme="dark"] input {
  background-color: #1f2937;
  color: #e5e7eb;
  border-color: #4b5563;
}
</style>
