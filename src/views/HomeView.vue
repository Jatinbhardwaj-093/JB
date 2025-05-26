<script setup lang="ts">
import Intro from "../components/Intro.vue"; // Assuming the new Intro.vue
// Removed themeStore and other refs if Intro.vue handles its own theme logic and data
</script>

<template>
  <div>
    <Intro />
  </div>
</template>

<style scoped>
/* Enhanced animations for the modern mobile design */

/* Prevent scroll during initial render */
body:not(.loaded) {
  overflow-x: hidden !important;
  max-width: 100vw !important;
}

html:not(.loaded) {
  overflow-x: hidden !important;
  max-width: 100vw !important;
}

/* Force all elements to respect boundaries during load */
*:not(.absolute) {
  max-width: 100% !important;
  overflow-x: hidden !important;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes spinSlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease forwards;
  opacity: 0;
}

.animate-scale-in {
  animation: scaleIn 0.6s ease forwards;
  opacity: 0;
}

.animate-spin-slow {
  animation: spinSlow 3s linear infinite;
}

/* Delay classes */
.delay-200 {
  animation-delay: 0.2s;
}

.delay-300 {
  animation-delay: 0.3s;
}

.delay-400 {
  animation-delay: 0.4s;
}

.delay-500 {
  animation-delay: 0.5s;
}

.delay-600 {
  animation-delay: 0.6s;
}

.delay-700 {
  animation-delay: 0.7s;
}

.delay-800 {
  animation-delay: 0.8s;
}

/* Subtle bounce animation for interactive elements */
@keyframes bounceSoft {
  0%,
  100% {
    transform: translateY(0) translateX(-50%);
  }
  50% {
    transform: translateY(-10px) translateX(-50%);
  }
}

.animate-bounce-subtle {
  animation: bounceSoft 2s infinite ease-in-out;
}

/* Enhanced hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:scale-110:hover {
  transform: scale(1.1);
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Glassmorphism effects */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Gradient text effects */
.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Responsive design improvements */
@media (max-width: 767px) {
  /* Prevent scroll during load by ensuring elements are contained */
  .block.md\:hidden {
    position: relative;
    contain: layout style paint;
  }

  /* Ensure smooth animations on mobile */
  .animate-fade-in-up,
  .animate-scale-in {
    transform: none;
    opacity: 1;
    animation: none;
  }

  /* Force show animations only when loaded */
  .loaded .animate-fade-in-up {
    animation: fadeInUp 0.6s ease forwards;
    opacity: 0;
  }

  .loaded .animate-scale-in {
    animation: scaleIn 0.5s ease forwards;
    opacity: 0;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Dark mode transitions */
.dark\:bg-gray-900,
.dark\:bg-gray-800 {
  transition: background-color 0.3s ease;
}

/* Prevent horizontal scroll - Enhanced */
.max-w-\[100vw\] {
  max-width: 100vw;
}

.overflow-x-hidden {
  overflow-x: hidden;
}

.overflow-hidden {
  overflow: hidden;
}

/* Ensure no content causes overflow during load */
* {
  max-width: 100%;
  box-sizing: border-box;
}

/* Specific fixes for potential overflow elements */
.absolute {
  max-width: none; /* Allow absolute positioned elements to exceed container */
}

/* Prevent layout shifts during animation load */
.animate-fade-in-up,
.animate-scale-in {
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0); /* Force hardware acceleration */
}

/* Comprehensive overflow prevention for HomeView */
.home-view-container {
  width: 100% !important;
  max-width: 100vw !important;
  overflow-x: hidden !important;
  contain: layout style paint;
}

.mobile-home-container {
  width: 100% !important;
  max-width: 100vw !important;
  overflow-x: hidden !important;
  contain: layout style paint;
}

/* Additional safety measures */
.home-view-container *,
.mobile-home-container * {
  max-width: 100% !important;
}

.home-view-container .absolute,
.mobile-home-container .absolute {
  max-width: none !important; /* Allow absolute positioned elements */
}

/* Ensure containers never exceed viewport */
.min-h-screen {
  min-height: 100vh;
  min-height: 100dvh; /* Dynamic viewport height for mobile */
  width: 100% !important;
  max-width: 100vw !important;
}

/* Button enhancements */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Card hover effects */
.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
