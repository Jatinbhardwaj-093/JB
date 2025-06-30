<script setup lang="ts">
import { useThemeStore } from "../../../store/theme";
import { onMounted, ref } from "vue";
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
    <!-- Week 4 Section -->
    <p
      class="font-bold text-xl sm:text-3xl md:text-3xl lg:text-4xl mt-6 mb-4 leading-tight py-2 px-2 rounded-md bg-gray-100/70 dark:bg-gray-800/40 w-full"
    >
      GSoC'25 Week-4
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      This week was quite productive, especially around testing and fixing
      methods.
    </p>

    <!-- Progress Section -->
    <div class="mb-4 sm:mb-6">
      <h2 class="font-bold text-lg sm:text-xl md:text-2xl mb-3">Progress</h2>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        I mainly focused on refining how equality is determined for power
        series. While the work is still in the development phase and hasn't been
        reviewed yet, I made substantial progress.
      </p>
    </div>

    <!-- Challenge Section -->
    <div class="mb-4 sm:mb-6">
      <h2 class="font-bold text-lg sm:text-xl md:text-2xl mb-3">
        The Challenge: Power Series Equality
      </h2>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        Equality for power series is surprisingly tricky.
      </p>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        Unlike polynomials—where we can directly compare coefficients of
        matching exponents—power series involve truncation, which hides terms
        beyond a certain degree. This makes it impossible to be certain about
        what comes after the truncation point.
      </p>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        Example:
        <strong class="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded"
          >s = 1 + x^2 + 4x^3 + 7x^4 + O(x^5)</strong
        >
      </p>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        At a glance, comparing s with a longer or differently truncated series
        might seem like a match, but we cannot guarantee what happens after x^4.
      </p>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        To handle this correctly, I studied how gr_series from
        <strong>python-flint</strong> behaves:
      </p>

      <!-- Code Example 1 -->
      <div
        class="mb-4 sm:mb-6 rounded-lg p-4"
        :class="{
          'bg-gray-100': themeStore.theme === 'light',
          'bg-gray-800': themeStore.theme === 'dark',
        }"
      >
        <pre
          class="text-sm font-mono whitespace-pre-wrap break-words"
          :class="{
            'hljs-github': themeStore.theme === 'light',
            'hljs-github-dark': themeStore.theme === 'dark',
          }"
        ><code 
          class="language-python"
          :class="{
            'hljs-github': themeStore.theme === 'light',
            'hljs-github-dark': themeStore.theme === 'dark',
          }"
        >import flint.types._gr as gr
R = gr.gr_series_ctx.new(gr.gr_fmpq_ctx, 4)
R2 = gr.gr_series_ctx.new(gr.gr_fmpq_ctx, 10)
x, x2 = R('x'), R2('x')

s = 1 + x**2 + x**4
s2 = 1 + x2**2 + x2**4 + x2**10
R2(s) == s2  # returns None</code></pre>
      </div>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        As expected, it returns None, indicating uncertainty due to the
        truncation mismatch.
      </p>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        But if the "extra" terms go beyond the shared precision and do change
        the lower-degree part, equality must return False:
      </p>

      <!-- Code Example 2 -->
      <div
        class="mb-4 sm:mb-6 rounded-lg p-4"
        :class="{
          'bg-gray-100': themeStore.theme === 'light',
          'bg-gray-800': themeStore.theme === 'dark',
        }"
      >
        <pre
          class="text-sm font-mono whitespace-pre-wrap break-words"
          :class="{
            'hljs-github': themeStore.theme === 'light',
            'hljs-github-dark': themeStore.theme === 'dark',
          }"
        ><code 
          class="language-python"
          :class="{
            'hljs-github': themeStore.theme === 'light',
            'hljs-github-dark': themeStore.theme === 'dark',
          }"
        >s2 = 1 + x2**2 + x2**3 + x2**10
R2(s) == s2  # returns False</code></pre>
      </div>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        This confirms the rule: if two series differ within the shared
        precision, they are unequal. If they match, but one has unknown values
        beyond that range, we return None (indeterminate).
      </p>
    </div>

    <!-- Implementation Section -->
    <div class="mb-4 sm:mb-6">
      <h2 class="font-bold text-lg sm:text-xl md:text-2xl mb-3">
        My Implementation
      </h2>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        Although the current implementation may not be pretty, it does reflect
        this behavior accurately:
      </p>

      <!-- Implementation Code -->
      <div
        class="mb-4 sm:mb-6 rounded-lg p-4"
        :class="{
          'bg-gray-100': themeStore.theme === 'light',
          'bg-gray-800': themeStore.theme === 'dark',
        }"
      >
        <pre
          class="text-sm font-mono whitespace-pre-wrap break-words"
          :class="{
            'hljs-github': themeStore.theme === 'light',
            'hljs-github-dark': themeStore.theme === 'dark',
          }"
        ><code 
          class="language-python"
          :class="{
            'hljs-github': themeStore.theme === 'light',
            'hljs-github-dark': themeStore.theme === 'dark',
          }"
        >def _useries_equality(s1: USeries[T], s2: USeries[T], dom: Domain) -> bool | None:
    """Check if two power series are equal."""
    coeffs1, prec1 = s1
    coeffs2, prec2 = s2

    # if elif handling the exact polynomial case here
    if prec1 is None and prec2 is None:
        return s1 == s2
    elif prec1 is None or prec2 is None:
        return False
    else:
        min_prec = min(prec1, prec2)

    # checking for minprec from both series truncation
    coeffs1 = dup_slice(coeffs1, 0, min_prec, dom)
    coeffs2 = dup_slice(coeffs2, 0, min_prec, dom)
    if coeffs1 != coeffs2:
        return False
    return None</code></pre>
      </div>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        It checks for equality up to the shared truncation precision, returns
        False if a conflict is found, and None if values match but further terms
        are unknown.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Ensure proper styling for code blocks */
pre {
  font-family: "Fira Code", "Monaco", "Menlo", "Ubuntu Mono", monospace;
  line-height: 1.4;
  background: transparent !important;
  padding: 0 !important;
}

code {
  font-family: "Fira Code", "Monaco", "Menlo", "Ubuntu Mono", monospace;
  background: transparent !important;
  padding: 0 !important;
}

/* Ensure proper theme application */
.hljs-github {
  background: transparent !important;
}

.hljs-github-dark {
  background: transparent !important;
}

/* Light theme syntax highlighting */
.hljs-github pre code,
.hljs-github code {
  color: #24292e !important;
  background: transparent !important;
}

.hljs-github pre {
  color: #24292e !important;
  background: transparent !important;
}

.hljs-github .hljs-keyword,
.hljs-github .hljs-selector-tag,
.hljs-github .hljs-title,
.hljs-github .hljs-section,
.hljs-github .hljs-doctag,
.hljs-github .hljs-name,
.hljs-github .hljs-strong {
  color: #d73a49 !important;
  font-weight: bold;
}

.hljs-github .hljs-string,
.hljs-github .hljs-title.class_,
.hljs-github .hljs-title.class_.inherited__,
.hljs-github .hljs-title.function_,
.hljs-github .hljs-params {
  color: #005cc5 !important;
}

.hljs-github .hljs-comment,
.hljs-github .hljs-quote {
  color: #6a737d !important;
  font-style: italic;
}

.hljs-github .hljs-number,
.hljs-github .hljs-literal {
  color: #005cc5 !important;
}

.hljs-github .hljs-built_in {
  color: #e36209 !important;
}

/* Dark theme syntax highlighting */
.hljs-github-dark pre code,
.hljs-github-dark code {
  color: #e1e4e8 !important;
  background: transparent !important;
}

.hljs-github-dark pre {
  color: #e1e4e8 !important;
  background: transparent !important;
}

.hljs-github-dark .hljs-keyword,
.hljs-github-dark .hljs-selector-tag,
.hljs-github-dark .hljs-title,
.hljs-github-dark .hljs-section,
.hljs-github-dark .hljs-doctag,
.hljs-github-dark .hljs-name,
.hljs-github-dark .hljs-strong {
  color: #f97583 !important;
  font-weight: bold;
}

.hljs-github-dark .hljs-string,
.hljs-github-dark .hljs-title.class_,
.hljs-github-dark .hljs-title.class_.inherited__,
.hljs-github-dark .hljs-title.function_,
.hljs-github-dark .hljs-params {
  color: #79c0ff !important;
}

.hljs-github-dark .hljs-comment,
.hljs-github-dark .hljs-quote {
  color: #8b949e !important;
  font-style: italic;
}

.hljs-github-dark .hljs-number,
.hljs-github-dark .hljs-literal {
  color: #79c0ff !important;
}

.hljs-github-dark .hljs-built_in {
  color: #ffab70 !important;
}

/* Adjust heading spacing */
.font-bold {
  font-weight: 700;
}
</style>
