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
        class="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-700 rounded-xl transform transition-all duration-500 ease-in-out hover:from-gray-700 hover:via-gray-600 hover:to-gray-500 hover:shadow-2xl hover:shadow-gray-500/30 border border-gray-600/50 hover:border-gray-400"
        style="
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1),
            inset 0 2px 0 rgba(255, 255, 255, 0.3),
            inset 0 -2px 0 rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.2);
        "
      >
        <!-- Star decoration (pseudo elements added in CSS) -->
        <div class="icon-container">
          <svg
            v-if="link.icon === 'gmail'"
            viewBox="0 0 24 24"
            class="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 fill-gray-300 group-hover:fill-gray-100 transition-colors duration-300"
          >
            <path
              d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
            />
          </svg>

          <i
            v-else
            :class="link.icon"
            class="text-2xl sm:text-3xl md:text-4xl text-gray-300 group-hover:text-gray-100 transition-colors duration-300"
          ></i>
        </div>

        <span
          class="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-gray-200 font-bold text-sm sm:text-base transform transition-all duration-300 group-hover:-translate-y-1"
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
  perspective: 1200px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.social-link:hover div {
  transform: translateY(-12px) rotateY(15deg) rotateX(10deg) scale(1.08);
  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.25),
    0 10px 20px rgba(139, 92, 246, 0.15), inset 0 3px 0 rgba(255, 255, 255, 0.4),
    inset 0 -3px 0 rgba(0, 0, 0, 0.15), 0 0 0 2px rgba(139, 92, 246, 0.3);
}

.social-link:active div {
  transform: translateY(-6px) rotateY(8deg) rotateX(5deg) scale(1.02);
  box-shadow: 0 10px 20px rgba(139, 92, 246, 0.2),
    0 5px 10px rgba(139, 92, 246, 0.1), inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Container for the icon with sparkle effects */
.icon-container {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.group:hover .icon-container {
  transform: scale(1.1);
}

/* Enhanced sparkle effect - top right */
.icon-container::before {
  content: "✨";
  position: absolute;
  font-size: 8px;
  top: -8px;
  right: -8px;
  transition: all 0.4s ease;
  opacity: 0;
  transform: scale(0) rotate(0deg);
}

/* Enhanced sparkle effect - bottom left */
.icon-container::after {
  content: "⭐";
  position: absolute;
  font-size: 10px;
  bottom: -8px;
  left: -8px;
  transition: all 0.4s ease;
  opacity: 0;
  transform: scale(0) rotate(0deg);
}

.group:hover .icon-container::before {
  opacity: 1;
  transform: scale(1) rotate(360deg);
  animation: sparkle 2s infinite ease-in-out;
}

.group:hover .icon-container::after {
  opacity: 1;
  transform: scale(1) rotate(-360deg);
  animation: sparkle 2s infinite ease-in-out;
  animation-delay: 0.3s;
}

@keyframes sparkle {
  0%,
  100% {
    transform: scale(0.8) rotate(0deg);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.2) rotate(180deg);
    opacity: 1;
  }
}

/* Unified monochrome/dark style */
.social-link:hover div {
  box-shadow: 0 20px 40px rgba(168, 85, 247, 0.3),
    0 10px 20px rgba(168, 85, 247, 0.2), inset 0 3px 0 rgba(255, 255, 255, 0.2),
    inset 0 -3px 0 rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(168, 85, 247, 0.4);
}

.social-link:active div {
  box-shadow: 0 10px 20px rgba(168, 85, 247, 0.25),
    0 5px 10px rgba(168, 85, 247, 0.15), inset 0 2px 4px rgba(0, 0, 0, 0.4);
}

/* Additional 3D depth for icons */
.social-link svg,
.social-link i {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: all 0.3s ease;
}

.group:hover svg,
.group:hover i {
  filter: drop-shadow(0 4px 8px rgba(168, 85, 247, 0.4));
}
</style>
