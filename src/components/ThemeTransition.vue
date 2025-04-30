<script setup>
import { useThemeStore } from "../store/theme";
import { watch, ref, onMounted } from "vue";

const themeStore = useThemeStore();
const transitionClass = ref("");
const isVisible = ref(false);

// Watch for theme animation state and trigger effects
watch(
  () => themeStore.isAnimating,
  (isAnimating) => {
    if (isAnimating) {
      isVisible.value = true;
      transitionClass.value = "theme-transition-active";

      // Cleanup after animation completes
      setTimeout(() => {
        transitionClass.value = "theme-transition-done";

        // Wait for fade-out animation to complete before hiding
        setTimeout(() => {
          isVisible.value = false;
          transitionClass.value = "";
        }, 400);
      }, 600);
    }
  }
);

// Track initial animation to prevent it from showing on page load
const initialLoad = ref(true);
onMounted(() => {
  // Wait for any initial animations to complete
  setTimeout(() => {
    initialLoad.value = false;
  }, 300);
});
</script>

<template>
  <div
    v-if="isVisible && !initialLoad"
    class="theme-transition-overlay"
    :class="transitionClass"
  >
    <div class="theme-transition-circle"></div>
  </div>
</template>

<style scoped>
.theme-transition-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.theme-transition-active {
  opacity: 1;
}

.theme-transition-done {
  opacity: 0;
}

.theme-transition-circle {
  width: 0;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.15) 0%,
    rgba(99, 102, 241, 0.1) 25%,
    rgba(149, 148, 248, 0.05) 50%,
    transparent 75%
  );
  transform: scale(0);
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.theme-transition-active .theme-transition-circle {
  width: 300vmax; /* Plenty large to cover the whole screen */
  height: 300vmax;
  transform: scale(1);
}
</style>
