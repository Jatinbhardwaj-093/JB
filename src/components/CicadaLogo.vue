<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useThemeStore } from "../store/theme";

const props = defineProps({
  animate: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "md", // xs, sm, md, lg, xl
  },
});

// Setup variables and refs
const route = useRoute();
const themeStore = useThemeStore();
const isAnimating = ref(false);
const wingsOpen = ref(false);
const isHovering = ref(false);
const leftWingTransform = ref("rotate(0)");
const rightWingTransform = ref("rotate(0)");
const mouseX = ref(0);
const mouseY = ref(0);

// Computed size dimensions
const sizeMap = {
  xs: 35,
  sm: 45,
  md: 55,
  lg: 75,
  xl: 95,
};

const logoSize = computed(() => sizeMap[props.size] || sizeMap.md);

// Dynamic colors based on theme
const colors = computed(() => {
  if (themeStore.theme === "dark") {
    return {
      primary: "#6366f1",
      secondary: "#8b5cf6",
      accent: "#ec4899",
      glow: "rgba(99, 102, 241, 0.3)",
      wing: "rgba(139, 92, 246, 0.2)",
      body: "rgba(99, 102, 241, 0.15)",
    };
  }
  return {
    primary: "#4f46e5",
    secondary: "#7c3aed",
    accent: "#db2777",
    glow: "rgba(79, 70, 229, 0.2)",
    wing: "rgba(124, 58, 237, 0.15)",
    body: "rgba(79, 70, 229, 0.1)",
  };
});

// Animation timing
const animationDuration = 1200;

// Mouse tracking for interactive effects
const handleMouseMove = (event: MouseEvent) => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  mouseX.value = ((event.clientX - rect.left) / rect.width - 0.5) * 20;
  mouseY.value = ((event.clientY - rect.top) / rect.height - 0.5) * 20;
};

// Watch for route changes to trigger animation
watch(
  () => route.name,
  () => {
    if (props.animate) {
      triggerAnimation();
    }
  }
);

onMounted(() => {
  if (props.animate) {
    setTimeout(() => {
      triggerAnimation();
    }, 800);
  }
});

// Enhanced animation with multiple phases
function triggerAnimation() {
  if (isAnimating.value) return;

  isAnimating.value = true;
  wingsOpen.value = true;

  // Phase 1: Wings spread wide
  leftWingTransform.value = "rotate(-80deg) translateX(-15px) scale(1.2)";
  rightWingTransform.value = "rotate(80deg) translateX(15px) scale(1.2)";

  setTimeout(() => {
    // Phase 2: Wings flutter
    leftWingTransform.value = "rotate(-45deg) translateX(-8px) scale(1.1)";
    rightWingTransform.value = "rotate(45deg) translateX(8px) scale(1.1)";

    setTimeout(() => {
      // Phase 3: Wings settle to resting position
      leftWingTransform.value = "rotate(-20deg) translateX(-3px) scale(1.05)";
      rightWingTransform.value = "rotate(20deg) translateX(3px) scale(1.05)";

      setTimeout(() => {
        isAnimating.value = false;
      }, 400);
    }, 300);
  }, 500);
}

function handleHover() {
  if (!isAnimating.value) {
    isHovering.value = true;
    leftWingTransform.value = "rotate(-50deg) translateX(-10px) scale(1.15)";
    rightWingTransform.value = "rotate(50deg) translateX(10px) scale(1.15)";
  }
}

function handleHoverEnd() {
  if (!isAnimating.value) {
    isHovering.value = false;
    leftWingTransform.value = "rotate(-20deg) translateX(-3px) scale(1.05)";
    rightWingTransform.value = "rotate(20deg) translateX(3px) scale(1.05)";
  }
}
</script>

<template>
  <div
    class="cicada-logo"
    :class="{
      'is-animating': isAnimating,
      'is-hovering': isHovering,
      'theme-animating': themeStore.isAnimating,
    }"
    :style="{
      '--logo-size': logoSize + 'px',
      '--mouse-x': mouseX + 'px',
      '--mouse-y': mouseY + 'px',
    }"
    @mouseenter="handleHover"
    @mouseleave="handleHoverEnd"
    @mousemove="handleMouseMove"
  >
    <!-- Background glow effects -->
    <div
      class="logo-glow"
      :style="{
        background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
      }"
    ></div>
    <div class="logo-pulse" :style="{ borderColor: colors.primary }"></div>

    <!-- Main SVG Container -->
    <div class="svg-container">
      <svg
        :width="logoSize"
        :height="logoSize"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        class="cicada-svg"
      >
        <!-- Background circle -->
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          :stroke="colors.primary"
          stroke-width="0.5"
          opacity="0.3"
          class="bg-circle"
        />

        <!-- Left Wing -->
        <g
          :style="{
            transform: leftWingTransform,
            transformOrigin: '44px 40px',
            transition: `transform ${
              animationDuration / 1000
            }s cubic-bezier(0.34, 1.56, 0.64, 1)`,
          }"
          class="wing left-wing"
        >
          <!-- Main wing shape -->
          <path
            d="M44 40 C35 28, 20 20, 10 35 C5 42, 8 48, 12 52 C20 58, 35 45, 44 40"
            :fill="colors.wing"
            :stroke="colors.primary"
            stroke-width="1.5"
            class="wing-main"
          />

          <!-- Wing veins -->
          <path
            d="M44 40 L35 30 M44 40 L28 28 M44 40 L22 33 M44 40 L15 40 M44 40 L25 45 M44 40 L20 50"
            fill="none"
            :stroke="colors.secondary"
            stroke-opacity="0.8"
            stroke-width="0.8"
            stroke-linecap="round"
            class="wing-veins"
          />

          <!-- Wing patterns -->
          <path
            d="M30 35 Q25 37, 20 42 Q18 45, 20 47 Q25 50, 30 45 Q32 42, 30 35"
            :fill="colors.accent"
            fill-opacity="0.2"
            :stroke="colors.accent"
            stroke-opacity="0.6"
            stroke-width="0.8"
            class="wing-pattern"
          />
        </g>

        <!-- Right Wing -->
        <g
          :style="{
            transform: rightWingTransform,
            transformOrigin: '56px 40px',
            transition: `transform ${
              animationDuration / 1000
            }s cubic-bezier(0.34, 1.56, 0.64, 1)`,
          }"
          class="wing right-wing"
        >
          <!-- Main wing shape -->
          <path
            d="M56 40 C65 28, 80 20, 90 35 C95 42, 92 48, 88 52 C80 58, 65 45, 56 40"
            :fill="colors.wing"
            :stroke="colors.primary"
            stroke-width="1.5"
            class="wing-main"
          />

          <!-- Wing veins -->
          <path
            d="M56 40 L65 30 M56 40 L72 28 M56 40 L78 33 M56 40 L85 40 M56 40 L75 45 M56 40 L80 50"
            fill="none"
            :stroke="colors.secondary"
            stroke-opacity="0.8"
            stroke-width="0.8"
            stroke-linecap="round"
            class="wing-veins"
          />

          <!-- Wing patterns -->
          <path
            d="M70 35 Q75 37, 80 42 Q82 45, 80 47 Q75 50, 70 45 Q68 42, 70 35"
            :fill="colors.accent"
            fill-opacity="0.2"
            :stroke="colors.accent"
            stroke-opacity="0.6"
            stroke-width="0.8"
            class="wing-pattern"
          />
        </g>

        <!-- Secondary wings -->
        <path
          d="M44 42 C40 45, 35 55, 38 60 C40 62, 45 60, 48 55 C49 52, 48 47, 44 42"
          :fill="colors.body"
          :stroke="colors.secondary"
          stroke-opacity="0.6"
          stroke-width="0.8"
          class="secondary-wing"
        />
        <path
          d="M56 42 C60 45, 65 55, 62 60 C60 62, 55 60, 52 55 C51 52, 52 47, 56 42"
          :fill="colors.body"
          :stroke="colors.secondary"
          stroke-opacity="0.6"
          stroke-width="0.8"
          class="secondary-wing"
        />

        <!-- Body -->
        <ellipse
          cx="50"
          cy="50"
          rx="6"
          ry="15"
          :fill="colors.body"
          :stroke="colors.primary"
          stroke-width="1.5"
          class="body-main"
        />

        <!-- Body segments -->
        <path
          d="M46 42 L54 42 M46 46 L54 46 M46 50 L54 50 M46 54 L54 54"
          fill="none"
          :stroke="colors.primary"
          stroke-opacity="0.7"
          stroke-width="0.8"
          class="body-segments"
        />

        <!-- Head -->
        <circle
          cx="50"
          cy="35"
          r="5"
          :fill="colors.body"
          :stroke="colors.primary"
          stroke-width="1.5"
          class="head"
        />

        <!-- Eyes -->
        <circle cx="47" cy="33" r="1.5" :fill="colors.accent" class="eye" />
        <circle cx="53" cy="33" r="1.5" :fill="colors.accent" class="eye" />
        <circle
          cx="47"
          cy="33"
          r="0.8"
          fill="white"
          opacity="0.8"
          class="eye-highlight"
        />
        <circle
          cx="53"
          cy="33"
          r="0.8"
          fill="white"
          opacity="0.8"
          class="eye-highlight"
        />

        <!-- Antennae -->
        <path
          d="M47 30 Q43 25, 41 27"
          fill="none"
          :stroke="colors.primary"
          stroke-width="1.2"
          stroke-linecap="round"
          class="antenna"
        />
        <path
          d="M53 30 Q57 25, 59 27"
          fill="none"
          :stroke="colors.primary"
          stroke-width="1.2"
          stroke-linecap="round"
          class="antenna"
        />

        <!-- Legs -->
        <g class="legs">
          <path
            d="M45 45 C40 47, 38 49, 35 52"
            fill="none"
            :stroke="colors.secondary"
            stroke-width="1.0"
            stroke-linecap="round"
          />
          <path
            d="M45 50 C40 52, 38 54, 36 57"
            fill="none"
            :stroke="colors.secondary"
            stroke-width="1.0"
            stroke-linecap="round"
          />
          <path
            d="M45 55 C42 57, 40 59, 38 62"
            fill="none"
            :stroke="colors.secondary"
            stroke-width="1.0"
            stroke-linecap="round"
          />
          <path
            d="M55 45 C60 47, 62 49, 65 52"
            fill="none"
            :stroke="colors.secondary"
            stroke-width="1.0"
            stroke-linecap="round"
          />
          <path
            d="M55 50 C60 52, 62 54, 64 57"
            fill="none"
            :stroke="colors.secondary"
            stroke-width="1.0"
            stroke-linecap="round"
          />
          <path
            d="M55 55 C58 57, 60 59, 62 62"
            fill="none"
            :stroke="colors.secondary"
            stroke-width="1.0"
            stroke-linecap="round"
          />
        </g>
      </svg>
    </div>

    <!-- Floating particles -->
    <div class="particles">
      <div
        v-for="i in 8"
        :key="i"
        class="particle"
        :style="{
          animationDelay: i * 0.2 + 's',
          backgroundColor: colors.accent,
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.cicada-logo {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  width: var(--logo-size);
  height: var(--logo-size);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

/* Instant theme transition when theme is animating */
.cicada-logo.theme-animating {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.cicada-logo:hover {
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 60px rgba(99, 102, 241, 0.2);
}

.cicada-logo.is-animating {
  animation: logoFloat 2s ease-in-out infinite;
}

/* Background Effects */
.logo-glow {
  position: absolute;
  top: -20%;
  left: -20%;
  width: 140%;
  height: 140%;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
  pointer-events: none;
  z-index: 1;
}

.cicada-logo:hover .logo-glow {
  opacity: 0.6;
  animation: glowPulse 2s ease-in-out infinite;
}

.logo-pulse {
  position: absolute;
  top: -10%;
  left: -10%;
  width: 120%;
  height: 120%;
  border: 2px solid transparent;
  border-radius: 50%;
  opacity: 0;
  animation: pulseBorder 3s ease-in-out infinite;
  pointer-events: none;
  z-index: 2;
}

.cicada-logo.is-animating .logo-pulse {
  opacity: 0.8;
}

/* SVG Container */
.svg-container {
  position: relative;
  z-index: 3;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(calc(var(--mouse-x) * 0.1), calc(var(--mouse-y) * 0.1));
  transition: transform 0.3s ease-in-out;
}


/* Instant theme transitions for SVG elements */
.cicada-logo.theme-animating .cicada-svg,
.cicada-logo.theme-animating .wing-main,
.cicada-logo.theme-animating .wing-veins,
.cicada-logo.theme-animating .wing-pattern,
.cicada-logo.theme-animating .secondary-wing,
.cicada-logo.theme-animating .body-main,
.cicada-logo.theme-animating .body-segments,
.cicada-logo.theme-animating .head,
.cicada-logo.theme-animating .eye,
.cicada-logo.theme-animating .antenna,
.cicada-logo.theme-animating .legs path {
  transition: none !important;
}

/* Background Circle */
.bg-circle {
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.cicada-logo:hover .bg-circle {
  opacity: 0.3;
  transform: scale(1);
}

/* Wing Elements */
.wing {
  filter: drop-shadow(0 2px 8px rgba(99, 102, 241, 0.3));
  transition: filter 0.4s ease-in-out;
}

.wing-main {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.wing-veins {
  animation: veinsPulse 4s ease-in-out infinite;
}

.wing-pattern {
  animation: patternShimmer 3s ease-in-out infinite;
}

.cicada-logo:hover .wing {
  filter: drop-shadow(0 4px 16px rgba(139, 92, 246, 0.4));
}

.cicada-logo.is-animating .wing-main {
  animation: wingGlow 1.2s ease-in-out;
}

/* Secondary Wings */
.secondary-wing {
  opacity: 0.6;
  transition: opacity 0.4s ease-in-out;
  animation: secondaryWingFloat 6s ease-in-out infinite;
}

.cicada-logo:hover .secondary-wing {
  opacity: 0.8;
}

/* Body Elements */
.body-main {
  filter: drop-shadow(0 2px 10px rgba(99, 102, 241, 0.2));
  transition: all 0.4s ease;
  animation: bodyPulse 4s ease-in-out infinite;
}

.body-segments {
  animation: segmentGlow 5s ease-in-out infinite;
}

.cicada-logo:hover .body-main {
  filter: drop-shadow(0 4px 20px rgba(99, 102, 241, 0.4));
}

/* Head and Eyes */
.head {
  filter: drop-shadow(0 2px 8px rgba(99, 102, 241, 0.2));
  transition: all 0.4s ease-in-out;
}

.eye {
  animation: eyeGlow 3s ease-in-out infinite;
}

.eye-highlight {
  animation: eyeHighlight 2s ease-in-out infinite;
}

.cicada-logo:hover .head {
  filter: drop-shadow(0 4px 16px rgba(236, 72, 153, 0.4));
}

/* Antennae */
.antenna {
  animation: antennaWave 4s ease-in-out infinite;
  transform-origin: center bottom;
}

.antenna:first-child {
  animation-delay: 0.5s;
}

/* Legs */
.legs path {
  animation: legTwitch 6s ease-in-out infinite;
}

.legs path:nth-child(2n) {
  animation-delay: 1s;
}

.legs path:nth-child(3n) {
  animation-delay: 2s;
}

/* Floating Particles */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 4;
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
}

.cicada-logo:hover .particles {
  opacity: 1;
}

.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  opacity: 0;
  animation: particleFloat 4s ease-in-out infinite;
}

.particle:nth-child(1) {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}
.particle:nth-child(2) {
  top: 30%;
  left: 80%;
  animation-delay: 0.5s;
}
.particle:nth-child(3) {
  top: 60%;
  left: 15%;
  animation-delay: 1s;
}
.particle:nth-child(4) {
  top: 70%;
  left: 75%;
  animation-delay: 1.5s;
}
.particle:nth-child(5) {
  top: 15%;
  left: 60%;
  animation-delay: 2s;
}
.particle:nth-child(6) {
  top: 80%;
  left: 40%;
  animation-delay: 2.5s;
}
.particle:nth-child(7) {
  top: 40%;
  left: 5%;
  animation-delay: 3s;
}
.particle:nth-child(8) {
  top: 50%;
  left: 90%;
  animation-delay: 3.5s;
}

/* Animations */
@keyframes logoFloat {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-4px);
  }
}

@keyframes glowPulse {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

@keyframes pulseBorder {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.7;
  }
}

@keyframes wingGlow {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.3) saturate(1.2);
  }
}

@keyframes veinsPulse {
  0%,
  100% {
    stroke-opacity: 0.8;
  }
  50% {
    stroke-opacity: 1;
  }
}

@keyframes patternShimmer {
  0%,
  100% {
    fill-opacity: 0.2;
  }
  50% {
    fill-opacity: 0.4;
  }
}

@keyframes secondaryWingFloat {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-1px);
  }
}

@keyframes bodyPulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

@keyframes segmentGlow {
  0%,
  100% {
    stroke-opacity: 0.7;
  }
  50% {
    stroke-opacity: 1;
  }
}

@keyframes eyeGlow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes eyeHighlight {
  0%,
  100% {
    opacity: 0.8;
    r: 0.8;
  }
  50% {
    opacity: 1;
    r: 1;
  }
}

@keyframes antennaWave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(2deg);
  }
  75% {
    transform: rotate(-2deg);
  }
}

@keyframes legTwitch {
  0%,
  90%,
  100% {
    transform: translateY(0px);
  }
  95% {
    transform: translateY(-0.5px);
  }
}

@keyframes particleFloat {
  0%,
  100% {
    opacity: 0;
    transform: translateY(0px) scale(0.5);
  }
  50% {
    opacity: 1;
    transform: translateY(-10px) scale(1);
  }
}

/* Size Variations */
.cicada-logo[style*="--logo-size: 40px"] {
  border-width: 0.5px;
}

.cicada-logo[style*="--logo-size: 50px"] {
  border-width: 0.8px;
}

.cicada-logo[style*="--logo-size: 80px"] {
  border-width: 1.5px;
}

.cicada-logo[style*="--logo-size: 100px"] {
  border-width: 2px;
}

/* Dark/Light Theme Adjustments */
[data-theme="dark"] .cicada-logo {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.08);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

[data-theme="light"] .cicada-logo {
  background: rgba(0, 0, 0, 0.02);
  border-color: rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Instant theme change when animating */
[data-theme="dark"] .cicada-logo.theme-animating {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.08);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

[data-theme="light"] .cicada-logo.theme-animating {
  background: rgba(0, 0, 0, 0.02);
  border-color: rgba(0, 0, 0, 0.05);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .cicada-logo:hover {
    transform: scale(1.03) translateY(-1px);
  }

  .particles {
    opacity: 0.6;
  }

  .particle {
    width: 2px;
    height: 2px;
  }
}

@media (max-width: 480px) {
  .cicada-logo {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .cicada-logo:hover {
    transform: scale(1.02);
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .cicada-logo,
  .cicada-logo * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .cicada-logo:hover {
    transform: scale(1.02);
  }
}
</style>
