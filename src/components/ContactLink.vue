<template>
  <div
    class="flex items-center justify-start gap-x-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-10"
  >
    <a
      v-for="(link, index) in socialLinks"
      :key="index"
      :href="link.url"
      :target="link.target"
      :rel="link.rel"
      class="social-link"
    >
      <div
        class="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl transform transition-all duration-300 ease-in-out hover:from-purple-50 hover:to-purple-100 hover:shadow-lg hover:shadow-purple-200/50 dark:from-gray-800 dark:to-gray-900 dark:hover:from-purple-700 dark:hover:to-purple-300 dark:hover:shadow-black"
      >
        <!-- Star decoration (pseudo elements added in CSS) -->
        <div class="icon-container">
          <svg
            v-if="link.icon === 'gmail'"
            viewBox="0 0 24 24"
            class="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 fill-gray-600 group-hover:fill-purple-600 transition-colors duration-300 dark:fill-gray-300 dark:group-hover:fill-purple-200"
          >
            <path
              d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
            />
          </svg>

          <i
            v-else
            :class="link.icon"
            class="text-2xl sm:text-3xl md:text-4xl text-gray-600 group-hover:text-purple-600 transition-colors duration-300 dark:text-gray-300 dark:group-hover:text-purple-200"
          ></i>
        </div>

        <span
          class="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-purple-600 font-bold text-sm sm:text-base transform transition-all duration-300 group-hover:-translate-y-1 dark:text-purple-200"
        >
          {{ link.label }}
        </span>
      </div>
    </a>
  </div>
</template>

<script setup>
const socialLinks = [
  {
    url: "https://www.linkedin.com/in/jatin-bhardwaj-b5962921a/",
    icon: "bi bi-linkedin",
    label: "LinkedIn",
  },
  {
    url: "https://github.com/Jatinbhardwaj-093",
    icon: "bi bi-github",
    label: "GitHub",
  },
  {
    url: "https://x.com/Jatin0932",
    icon: "bi bi-twitter-x",
    label: "X",
  },
  {
    url: `https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=bhardwajjatin093@gmail.com&su=${encodeURIComponent(
      "Hello"
    )}&body=${encodeURIComponent("I wanted to ask about...")}`,
    icon: "gmail",
    label: "G Mail",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];
</script>

<style scoped>
.social-link {
  perspective: 1000px;
}

.social-link:hover div {
  transform: translateY(-10px) rotateY(10deg) scale(1.05);
  box-shadow: 0 15px 25px rgba(139, 92, 246, 0.2),
    0 5px 10px rgba(139, 92, 246, 0.1);
}

/* Container for the icon with sparkle effects */
.icon-container {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

/* Sparkle effect - top right */
.icon-container::before {
  content: "";
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(139, 92, 246, 0);
  top: -5px;
  right: -5px;
  transition: all 0.3s ease;
  opacity: 0;
}

/* Sparkle effect - bottom left */
.icon-container::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(139, 92, 246, 0);
  bottom: -5px;
  left: -5px;
  transition: all 0.3s ease;
  opacity: 0;
}

.group:hover .icon-container::before,
.group:hover .icon-container::after {
  background: rgba(139, 92, 246, 1);
  animation: pulse 2s infinite;
  opacity: 1;
}

.group:hover .icon-container::after {
  animation-delay: 0.3s;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.8;
  }
}

/* Dark mode adjustments */
:root[data-theme="dark"] .group:hover .icon-container::before,
:root[data-theme="dark"] .group:hover .icon-container::after {
  background: rgba(192, 132, 252, 1);
}

:root[data-theme="dark"] .social-link:hover div {
  box-shadow: 0 15px 25px rgba(88, 28, 135, 0.3),
    0 5px 10px rgba(88, 28, 135, 0.2);
}
</style>
