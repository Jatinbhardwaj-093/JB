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
      <!-- Left Wing - butterfly style with fold line between top and bottom halves -->
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
        <!-- Main butterfly wing shape - left top half -->
        <path
          d="M44 40 C35 30, 25 25, 15 35 C10 40, 12 45, 15 48 C25 55, 35 45, 44 40"
          fill="transparent"
          :stroke="outlineColor"
          stroke-width="1.5"
          class="wing-element"
        />

        <!-- Left bottom half -->
        <path
          d="M44 40 C35 45, 25 55, 18 65 C15 70, 20 72, 25 68 C35 60, 40 50, 44 40"
          fill="transparent"
          :stroke="outlineColor"
          stroke-width="1.5"
          class="wing-element"
        />

        <!-- Fold line between upper and lower wing -->
        <path
          d="M44 40 L15 45"
          fill="none"
          :stroke="outlineColor"
          stroke-opacity="0.9"
          stroke-width="1.0"
          stroke-linecap="round"
          class="fold-line"
        />

        <!-- Wing veins - butterfly style -->
        <path
          d="M44 40 L35 32 M44 40 L30 30 M44 40 L25 35 M44 40 L18 40
           M44 40 L30 50 M44 40 L25 60 M44 40 L22 65"
          fill="none"
          :stroke="outlineColor"
          stroke-opacity="0.7"
          stroke-width="0.8"
          stroke-linecap="round"
        />

        <!-- Wing decorative spots -->
        <circle
          cx="30"
          cy="35"
          r="1.2"
          :stroke="outlineColor"
          stroke-width="0.8"
          fill="transparent"
        />
        <circle
          cx="28"
          cy="45"
          r="1.0"
          :stroke="outlineColor"
          stroke-width="0.8"
          fill="transparent"
        />
        <circle
          cx="25"
          cy="55"
          r="1.0"
          :stroke="outlineColor"
          stroke-width="0.8"
          fill="transparent"
        />
        <circle
          cx="35"
          cy="40"
          r="0.8"
          :stroke="outlineColor"
          stroke-width="0.8"
          fill="transparent"
        />
      </g>

      <!-- Right Wing - butterfly style with fold line between top and bottom halves -->
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
        <!-- Main butterfly wing shape - right top half -->
        <path
          d="M56 40 C65 30, 75 25, 85 35 C90 40, 88 45, 85 48 C75 55, 65 45, 56 40"
          fill="transparent"
          :stroke="outlineColor"
          stroke-width="1.5"
          class="wing-element"
        />

        <!-- Right bottom half -->
        <path
          d="M56 40 C65 45, 75 55, 82 65 C85 70, 80 72, 75 68 C65 60, 60 50, 56 40"
          fill="transparent"
          :stroke="outlineColor"
          stroke-width="1.5"
          class="wing-element"
        />

        <!-- Fold line between upper and lower wing -->
        <path
          d="M56 40 L85 45"
          fill="none"
          :stroke="outlineColor"
          stroke-opacity="0.9"
          stroke-width="1.0"
          stroke-linecap="round"
          class="fold-line"
        />

        <!-- Wing veins - butterfly style -->
        <path
          d="M56 40 L65 32 M56 40 L70 30 M56 40 L75 35 M56 40 L82 40
           M56 40 L70 50 M56 40 L75 60 M56 40 L78 65"
          fill="none"
          :stroke="outlineColor"
          stroke-opacity="0.7"
          stroke-width="0.8"
          stroke-linecap="round"
        />

        <!-- Wing decorative spots -->
        <circle
          cx="70"
          cy="35"
          r="1.2"
          :stroke="outlineColor"
          stroke-width="0.8"
          fill="transparent"
        />
        <circle
          cx="72"
          cy="45"
          r="1.0"
          :stroke="outlineColor"
          stroke-width="0.8"
          fill="transparent"
        />
        <circle
          cx="75"
          cy="55"
          r="1.0"
          :stroke="outlineColor"
          stroke-width="0.8"
          fill="transparent"
        />
        <circle
          cx="65"
          cy="40"
          r="0.8"
          :stroke="outlineColor"
          stroke-width="0.8"
          fill="transparent"
        />
      </g>

      <!-- Body - slightly refined for butterfly appearance -->
      <path
        d="M50 62 L50 34 Q50 30, 53 30 L57 30 Q60 30, 60 34 L60 44 Q60 52, 55 57 L50 62 Q45 57, 40 52 L40 34 Q40 30, 43 30 L47 30 Q50 30, 50 34"
        fill="transparent"
        :stroke="outlineColor"
        stroke-width="1.5"
      />

      <!-- Head - outline only -->
      <circle
        cx="50"
        cy="30"
        r="5"
        fill="transparent"
        :stroke="outlineColor"
        stroke-width="1.5"
      />

      <!-- Eyes -->
      <circle cx="48" cy="29" r="1.2" :fill="outlineColor" />
      <circle cx="52" cy="29" r="1.2" :fill="outlineColor" />

      <!-- Antennae - longer, curvier butterfly style -->
      <path
        d="M46 27 Q40 18, 38 20 Q37 22, 38 23"
        fill="none"
        :stroke="outlineColor"
        stroke-width="1.2"
        stroke-linecap="round"
      />
      <path
        d="M54 27 Q60 18, 62 20 Q63 22, 62 23"
        fill="none"
        :stroke="outlineColor"
        stroke-width="1.2"
        stroke-linecap="round"
      />

      <!-- Legs - more delicate butterfly style -->
      <path
        d="M45 38 C43 40, 41 42, 38 43"
        fill="none"
        :stroke="outlineColor"
        stroke-width="1.0"
        stroke-linecap="round"
      />
      <path
        d="M45 45 C43 47, 41 49, 38 50"
        fill="none"
        :stroke="outlineColor"
        stroke-width="1.0"
        stroke-linecap="round"
      />
      <path
        d="M45 52 C43 54, 41 56, 38 57"
        fill="none"
        :stroke="outlineColor"
        stroke-width="1.0"
        stroke-linecap="round"
      />
      <path
        d="M55 38 C57 40, 59 42, 62 43"
        fill="none"
        :stroke="outlineColor"
        stroke-width="1.0"
        stroke-linecap="round"
      />
      <path
        d="M55 45 C57 47, 59 49, 62 50"
        fill="none"
        :stroke="outlineColor"
        stroke-width="1.0"
        stroke-linecap="round"
      />
      <path
        d="M55 52 C57 54, 59 56, 62 57"
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
