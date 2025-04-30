<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useThemeStore } from "../store/theme";

const props = defineProps({
  animate: {
    type: Boolean,
    default: false,
  },
});

// Setup variables and refs
const route = useRoute();
const themeStore = useThemeStore();
const isAnimating = ref(false);
const wingsOpen = ref(false);
const leftWingTransform = ref("rotate(0)");
const rightWingTransform = ref("rotate(0)");
// Colors for outline-based design
const outlineColor = ref("#4f46e5"); // Indigo-600 to match your site's theme
const fillColor = ref("transparent");

// Animation timing variables
const animationDuration = 700; // milliseconds

// Watch for route changes to trigger animation
watch(
  () => route.name,
  () => {
    if (props.animate) {
      triggerAnimation();
    }
  }
);

// Watch theme changes to update colors - using your site's existing color theme
watch(
  () => themeStore.theme,
  (newTheme) => {
    outlineColor.value = newTheme === "dark" ? "#818cf8" : "#4f46e5"; // indigo-400 for dark, indigo-600 for light
  },
  { immediate: true }
);

// Initialize on component mount
onMounted(() => {
  outlineColor.value = themeStore.theme === "dark" ? "#818cf8" : "#4f46e5";

  // Optional initial animation
  if (props.animate) {
    setTimeout(() => {
      triggerAnimation();
    }, 500);
  }
});

// Animation logic with more perpendicular wing movement
function triggerAnimation() {
  if (isAnimating.value) return;

  isAnimating.value = true;

  // Open wings with more perpendicular motion
  leftWingTransform.value = "rotate(-60deg) scale(1.08)";
  rightWingTransform.value = "rotate(60deg) scale(1.08)";
  wingsOpen.value = true;

  // Wait then close wings to a slightly open position
  setTimeout(() => {
    leftWingTransform.value = "rotate(-12deg) scale(1.02)";
    rightWingTransform.value = "rotate(12deg) scale(1.02)";

    setTimeout(() => {
      isAnimating.value = false;
    }, animationDuration);
  }, animationDuration);
}

// Handle hover animation with more dramatic perpendicular wing opening
function handleHover() {
  if (!isAnimating.value) {
    leftWingTransform.value = "rotate(-35deg) scale(1.05)";
    rightWingTransform.value = "rotate(35deg) scale(1.05)";
  }
}

function handleHoverEnd() {
  if (!isAnimating.value) {
    leftWingTransform.value = "rotate(-12deg) scale(1.02)";
    rightWingTransform.value = "rotate(12deg) scale(1.02)";
  }
}
</script>

<template>
  <div
    class="cicada-logo"
    @mouseenter="handleHover"
    @mouseleave="handleHoverEnd"
    :style="{ cursor: 'pointer' }"
  >
    <svg
      width="65"
      height="65"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Left Wing - more realistic cicada style -->
      <g
        :style="{
          transform: leftWingTransform,
          transformOrigin: '44px 40px',
          transition:
            'transform ' +
            animationDuration / 1000 +
            's cubic-bezier(0.34, 1.56, 0.64, 1)',
        }"
      >
        <!-- Main cicada wing shape - left -->
        <path
          d="M44 40 C35 28, 20 20, 10 35 C5 42, 8 48, 12 52 C20 58, 35 45, 44 40"
          :fill="fillColor"
          :stroke="outlineColor"
          stroke-width="1.5"
          class="wing-element"
        />

        <!-- Wing veins - more detailed cicada style -->
        <path
          d="M44 40 L35 30 M44 40 L28 28 M44 40 L22 33 M44 40 L15 40
           M44 40 L25 45 M44 40 L20 50 M44 40 L15 52"
          fill="none"
          :stroke="outlineColor"
          stroke-opacity="0.7"
          stroke-width="0.8"
          stroke-linecap="round"
        />

        <!-- Wing membrane pattern -->
        <path
          d="M30 35 Q25 37, 20 42 Q18 45, 20 47 Q25 50, 30 45 Q32 42, 30 35"
          :fill="fillColor"
          :stroke="outlineColor"
          stroke-opacity="0.4"
          stroke-width="0.6"
        />

        <!-- Wing texture lines -->
        <path
          d="M15 45 Q25 42, 35 35 M18 48 Q27 45, 37 38"
          fill="none"
          :stroke="outlineColor"
          stroke-opacity="0.3"
          stroke-width="0.5"
        />
      </g>

      <!-- Right Wing - more realistic cicada style -->
      <g
        :style="{
          transform: rightWingTransform,
          transformOrigin: '56px 40px',
          transition:
            'transform ' +
            animationDuration / 1000 +
            's cubic-bezier(0.34, 1.56, 0.64, 1)',
        }"
      >
        <!-- Main cicada wing shape - right -->
        <path
          d="M56 40 C65 28, 80 20, 90 35 C95 42, 92 48, 88 52 C80 58, 65 45, 56 40"
          :fill="fillColor"
          :stroke="outlineColor"
          stroke-width="1.5"
          class="wing-element"
        />

        <!-- Wing veins - more detailed cicada style -->
        <path
          d="M56 40 L65 30 M56 40 L72 28 M56 40 L78 33 M56 40 L85 40
           M56 40 L75 45 M56 40 L80 50 M56 40 L85 52"
          fill="none"
          :stroke="outlineColor"
          stroke-opacity="0.7"
          stroke-width="0.8"
          stroke-linecap="round"
        />

        <!-- Wing membrane pattern -->
        <path
          d="M70 35 Q75 37, 80 42 Q82 45, 80 47 Q75 50, 70 45 Q68 42, 70 35"
          :fill="fillColor"
          :stroke="outlineColor"
          stroke-opacity="0.4"
          stroke-width="0.6"
        />

        <!-- Wing texture lines -->
        <path
          d="M85 45 Q75 42, 65 35 M82 48 Q73 45, 63 38"
          fill="none"
          :stroke="outlineColor"
          stroke-opacity="0.3"
          stroke-width="0.5"
        />
      </g>

      <!-- Second pair of wings (underneath) -->
      <path
        d="M44 42 C40 45, 35 55, 38 60 C40 62, 45 60, 48 55 C49 52, 48 47, 44 42"
        :fill="fillColor"
        :stroke="outlineColor"
        stroke-opacity="0.6"
        stroke-width="0.8"
      />
      <path
        d="M56 42 C60 45, 65 55, 62 60 C60 62, 55 60, 52 55 C51 52, 52 47, 56 42"
        :fill="fillColor"
        :stroke="outlineColor"
        stroke-opacity="0.6"
        stroke-width="0.8"
      />

      <!-- Body - more detailed cicada style -->
      <path
        d="M50 65 L50 35 Q50 30, 53 32 L57 32 Q60 30, 60 35 L60 45 Q60 55, 55 60 L50 65 Q45 60, 40 55 L40 35 Q40 30, 43 32 L47 32 Q50 30, 50 35"
        :fill="fillColor"
        :stroke="outlineColor"
        stroke-width="1.5"
      />

      <!-- Body segments -->
      <path
        d="M46 38 L54 38 M46 42 L54 42 M46 46 L54 46 M46 50 L54 50 M47 54 L53 54 M48 58 L52 58"
        fill="none"
        :stroke="outlineColor"
        stroke-opacity="0.8"
        stroke-width="0.8"
      />

      <!-- Head - more detailed -->
      <circle
        cx="50"
        cy="32"
        r="5"
        :fill="fillColor"
        :stroke="outlineColor"
        stroke-width="1.5"
      />

      <!-- Head markings -->
      <path
        d="M47 31 L53 31 M48 34 L52 34"
        fill="none"
        :stroke="outlineColor"
        stroke-opacity="0.8"
        stroke-width="0.8"
      />

      <!-- Eyes - cicada has large compound eyes -->
      <circle cx="46" cy="30" r="2" :fill="outlineColor" opacity="0.8" />
      <circle cx="54" cy="30" r="2" :fill="outlineColor" opacity="0.8" />

      <!-- Antennae - thinner and longer for cicadas -->
      <path
        d="M47 28 Q43 22, 41 24 Q40 25, 41 27"
        fill="none"
        :stroke="outlineColor"
        stroke-width="1.0"
        stroke-linecap="round"
      />
      <path
        d="M53 28 Q57 22, 59 24 Q60 25, 59 27"
        fill="none"
        :stroke="outlineColor"
        stroke-width="1.0"
        stroke-linecap="round"
      />

      <!-- Legs - cicada has strong front legs -->
      <path
        d="M45 38 C40 39, 38 42, 35 45"
        fill="none"
        :stroke="outlineColor"
        stroke-width="1.0"
        stroke-linecap="round"
      />
      <path
        d="M45 45 C40 47, 38 49, 36 52"
        fill="none"
        :stroke="outlineColor"
        stroke-width="1.0"
        stroke-linecap="round"
      />
      <path
        d="M45 52 C42 54, 40 56, 38 59"
        fill="none"
        :stroke="outlineColor"
        stroke-width="1.0"
        stroke-linecap="round"
      />
      <path
        d="M55 38 C60 39, 62 42, 65 45"
        fill="none"
        :stroke="outlineColor"
        stroke-width="1.0"
        stroke-linecap="round"
      />
      <path
        d="M55 45 C60 47, 62 49, 64 52"
        fill="none"
        :stroke="outlineColor"
        stroke-width="1.0"
        stroke-linecap="round"
      />
      <path
        d="M55 52 C58 54, 60 56, 62 59"
        fill="none"
        :stroke="outlineColor"
        stroke-width="1.0"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<style scoped>
.cicada-logo {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.cicada-logo:hover {
  transform: scale(1.05);
}

.wing-element {
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.2));
}

/* Subtle flutter animation for the wings */
@keyframes wing-flutter {
  0%,
  100% {
    stroke-width: 1.5;
  }
  50% {
    stroke-width: 1.7;
  }
}

/* Subtle fold line animation */
@keyframes fold-line-pulse {
  0%,
  100% {
    stroke-dasharray: 0;
    stroke-opacity: 0.9;
  }
  50% {
    stroke-dasharray: 1;
    stroke-opacity: 1;
  }
}

.wing-element {
  animation: wing-flutter 6s ease-in-out infinite;
}

.fold-line {
  animation: fold-line-pulse 4s ease-in-out infinite;
}
</style>
