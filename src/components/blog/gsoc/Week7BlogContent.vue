<script setup lang="ts">
import { useThemeStore } from "../../../store/theme";
import { onMounted } from "vue";
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/github.css";
import "highlight.js/styles/github-dark.css";

const themeStore = useThemeStore();

// Register Python language for syntax highlighting
hljs.registerLanguage("python", python);

onMounted(() => {
  // Apply syntax highlighting to all code blocks
  hljs.highlightAll();
});
</script>

<template>
  <div
    class="leading-6 sm:leading-7 relative isolate max-w-full sm:max-w-3xl md:max-w-[800px] mx-auto px-3 sm:px-4 w-full text-slate-700 dark:text-gray-50 font-[ubuntu] font-feature-settings-kern font-feature-settings-liga font-feature-settings-calt"
  >
    <!-- Week 7 Header -->
    <p
      class="font-bold text-xl sm:text-3xl md:text-3xl lg:text-4xl mt-6 mb-4 leading-tight py-2 px-2 rounded-md bg-gray-100/70 dark:bg-gray-900/40 w-full"
    >
      GSoC'25 Week-7 Update
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      This week focused heavily on <strong>code cleanup</strong>, particularly
      refining <strong>type annotations</strong> and ensuring
      <strong>method consistency</strong>. While progress was slower than
      anticipated due to my programming exam, I've made significant strides
      towards completing my current Pull Request.
    </p>

    <p
      class="mb-4 sm:mb-6 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      A key development this week was the merge of
      <a
        href="https://github.com/sympy/sympy/pull/28236"
        target="_blank"
        class="text-blue-600 dark:text-blue-400 hover:underline font-medium"
      >
        gh-28236
      </a>
      by <strong>Oscar</strong>. This PR introduces enhanced type annotation
      functionality for
      <span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
        >dup</span
      >
      elements, providing a
      <strong
        ><span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
          >dup</span
        >
        type alias</strong
      >. I'm currently evaluating how extensively to integrate this new alias,
      replacing generic list types for improved clarity and type checker
      compatibility.
    </p>

    <hr class="my-6 border-gray-300 dark:border-gray-600" />

    <!-- Series Division Implementation Section -->
    <div class="mb-6 sm:mb-8">
      <h2 class="font-bold text-lg sm:text-xl md:text-2xl mb-4">
        Series Division Implementation
      </h2>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        The major new feature implemented this week is the
        <strong>division operation for series</strong>. This proved to be a
        particularly tricky challenge. Typically, series division is performed
        by inverting the divisor and then multiplying. For example, to find
        <span class="italic">s₁ / s₂</span>:
      </p>

      <div
        class="rounded-lg p-4 mb-4 border-l-4 border-blue-500"
        :class="{
          'bg-gray-50': themeStore.theme === 'light',
          'bg-gray-900': themeStore.theme === 'dark',
        }"
      >
        <ol class="list-decimal list-inside space-y-2 text-sm sm:text-base">
          <li>
            Calculate the inverse of <span class="italic">s₂</span>:
            <span class="italic">H = 1/s₂</span>.
          </li>
          <li>
            Multiply <span class="italic">s₁</span> by
            <span class="italic">H</span>: <span class="italic">s₁ × H</span>.
          </li>
        </ol>
      </div>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        The primary hurdle arose when the divisor (<span class="italic">s₂</span
        >) lacked an invertible constant term, as is common with series like
        <span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
          >x</span
        >
        or
        <span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
          >x + x² + x³ + ...</span
        >. I initially overcomplicated this, focusing on the absence of a
        constant term and potential series shifts.
      </p>

      <div
        class="rounded-lg p-4 mb-4 border-l-4 border-green-500"
        :class="{
          'bg-green-50': themeStore.theme === 'light',
          'bg-green-900/20': themeStore.theme === 'dark',
        }"
      >
        <p
          class="font-semibold mb-2 text-md"
          :class="{
            'text-green-800': themeStore.theme === 'light',
            'text-green-300': themeStore.theme === 'dark',
          }"
        >
          Solution Found
        </p>
        <p
          class="text-xs sm:text-sm"
          :class="{
            'text-green-700': themeStore.theme === 'light',
            'text-green-200': themeStore.theme === 'dark',
          }"
        >
          However, the solution was simpler: the key is to
          <strong>synchronize the shift of s₁ with s₂</strong> to ensure
          mathematical correctness in the operation. This adjustment allows for
          accurate division even in cases where the constant term is missing.
        </p>
      </div>

      <p
        class="text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        With a few remaining checks and minor adjustments, I'm optimistic about
        getting this PR merged today or tomorrow.
      </p>
    </div>

    <!-- Footer note -->
    <div class="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
      <p
        class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 italic text-center"
      >
        Week 7 of Google Summer of Code 2025 with SymPy
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Custom styles for mathematical expressions */
.italic {
  font-style: italic;
  font-family: "Times New Roman", serif;
}

/* Ensure code blocks have proper spacing */
code {
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
