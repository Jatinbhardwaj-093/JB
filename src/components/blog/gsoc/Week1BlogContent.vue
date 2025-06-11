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
    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      The first week of my GSoC internship has concluded. During this time, I
      had two meetings with my mentors. After discussions with them, several
      significant changes have been made to the original proposal's
      implementation plan.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      Before explaining the current design choices, I want to highlight why
      these changes were necessary instead of strictly following the original
      proposal. The core goal of this project is to provide a better
      representation for the Power Series Ring.
    </p>

    <p
      class="font-bold text-xl sm:text-3xl md:text-3xl lg:text-4xl mt-6 mb-2 leading-tight py-2 px-2 rounded-md bg-gray-100/70 dark:bg-gray-800/40 w-full"
    >
      Project Goals
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      There are two main reasons for building this class:
    </p>

    <ul
      class="py-1 sm:py-2 px-3 sm:px-4 md:px-6 my-1 sm:my-2 mb-4 sm:mb-6 mx-1 sm:mx-2 md:mx-4 rounded-lg bg-indigo-50/30 dark:bg-indigo-900/5 w-full sm:w-[95%] list-outside"
    >
      <li
        class="relative leading-6 sm:leading-6 ml-3 sm:ml-4 pb-1 sm:pb-2 pl-1 list-disc"
      >
        <p
          class="mb-1 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 tracking-[0.01em] sm:tracking-[0.015em] inline-block align-top"
        >
          To provide a more usable and user-friendly API
        </p>
      </li>
      <li
        class="relative leading-6 sm:leading-6 ml-3 sm:ml-4 pb-1 sm:pb-2 pl-1 list-disc"
      >
        <p
          class="mb-1 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 tracking-[0.01em] sm:tracking-[0.015em] inline-block align-top"
        >
          To support faster computation
        </p>
      </li>
    </ul>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      The second point is particularly important because, eventually, we want to
      use python-flint's types—specifically
      <strong class="font-bold text-indigo-700 dark:text-indigo-300"
        >fmpq_series and fmpz_series</strong
      >. This means the Python implementation should be as close as possible in
      structure and behavior so that when flint is installed, we can seamlessly
      switch to using the classes backed by fmp_series.
    </p>

    <p
      class="font-bold text-xl sm:text-3xl md:text-3xl lg:text-4xl mt-6 mb-2 leading-tight py-2 px-2 rounded-md bg-gray-100/70 dark:bg-gray-800/40 w-full"
    >
      Current Understanding and Decisions Made
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      Let me explain what was decided and what my current understanding is.
      First, here's a simple example of how flint's fmp_series type works:
    </p>

    <div
      class="p-4 rounded-lg border border-gray-200 dark:border-gray-700 my-4"
      :class="{
        'bg-gray-50': themeStore.theme === 'light',
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
      >from flint import fmpz_series, ctx

# This is the global context for Flint types. It contains many useful attributes. 
# One of them is `cap`, which sets the truncation cap for the power series.
ctx.cap = 20

x = fmpz_series([0, 1])  # Precision (prec) isn't defined here, so Flint uses the global context cap for truncation
print(x)  # x + O(x^20)

x = fmpz_series([0, 1], 30)  # Since prec is provided, it creates a new fmpz_series with the given precision instead of using the global one
print(x)  # x + O(x^30)</code></pre>
    </div>

    <h2
      class="pt-2 font-bold text-xl sm:text-2xl md:text-2xl lg:text-3xl mt-6 mb-3 leading-snug text-gray-800 dark:text-gray-200 inline-block"
    >
      <span
        class="sm:border-solid sm:border-b-4 sm:border-blue-500 sm:dark:border-blue-400 sm:rounded-b-lg sm:pb-1"
      >
        Adapting the Design in SymPy
      </span>
    </h2>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      The SymPy implementation should aim to behave similarly to the above.
    </p>

    <p
      class="font-bold text-md sm:text-lg md:text-lg lg:text-xl mt-6 mb-3 leading-snug text-gray-800 dark:text-gray-200 w-full flex items-center"
    >
      <span
        class="text-blue-500 dark:text-blue-400 mr-2 text-lg sm:text-xl md:text-xl lg:text-2xl"
        >></span
      >
      Representor for the series [List of Coeff]
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      For storing the series coefficients, we'll use the Dense Univariate
      Polynomial (DUP) representation, which essentially means using a list of
      elements from the ground domain.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty font-semibold"
      :class="{
        'text-indigo-700': themeStore.theme === 'light',
        'text-indigo-300': themeStore.theme === 'dark',
      }"
    >
      Why this?
    </p>

    <ul
      class="py-1 sm:py-2 px-3 sm:px-4 md:px-6 my-1 sm:my-2 mb-4 sm:mb-6 mx-1 sm:mx-2 md:mx-4 rounded-lg bg-indigo-50/30 dark:bg-indigo-900/5 w-full sm:w-[95%] list-outside"
    >
      <li
        class="relative leading-6 sm:leading-6 ml-3 sm:ml-4 pb-1 sm:pb-2 pl-1 list-disc"
      >
        <p
          class="mb-1 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 tracking-[0.01em] sm:tracking-[0.015em] inline-block align-top"
        >
          We're only dealing with univariate formal power series (FPS), so
          there's no need for a sparse representation. The list-based form is
          sufficient.
        </p>
      </li>
      <li
        class="relative leading-6 sm:leading-6 ml-3 sm:ml-4 pb-1 sm:pb-2 pl-1 list-disc"
      >
        <p
          class="mb-1 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 tracking-[0.01em] sm:tracking-[0.015em] inline-block align-top"
        >
          The list will always be at level 0 (i.e., no nesting), avoiding the
          complexity of multivariate polynomial cases.
        </p>
      </li>
      <li
        class="relative leading-6 sm:leading-6 ml-3 sm:ml-4 pb-1 sm:pb-2 pl-1 list-disc"
      >
        <p
          class="mb-1 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 tracking-[0.01em] sm:tracking-[0.015em] inline-block align-top"
        >
          Since power series are infinite, many operations—such as exp, log,
          inverse, and trigonometric series expansions—will involve expanding
          terms up to the specified precision. In most cases, these expansions
          are dense or have regular gaps (like order 2), so there won't be
          performance issues from a list filled with too many zeros.
        </p>
      </li>
    </ul>

    <p
      class="font-bold text-md sm:text-lg md:text-lg lg:text-xl mt-6 mb-3 leading-snug text-gray-800 dark:text-gray-200 w-full flex items-center"
    >
      <span
        class="text-blue-500 dark:text-blue-400 mr-2 text-lg sm:text-xl md:text-xl lg:text-2xl"
        >></span
      >
      Classes for the fast fps ring series
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      There will be three classes. These interfaces aren't final yet—I need to
      confirm them with my mentor. But here's my current understanding.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      The Ring class will act as the global class for the series. It should
      behave similarly to how Flint's global context cap works. This class will
      hold the precision for the ring. This precision will serve as the default
      (or global) for all series created using this ring. However, when creating
      a new generator (gen) or series over this ring, there should always be an
      option to specify a custom precision, which must be less than or equal to
      the global ring precision.
    </p>

    <div
      class="p-4 rounded-lg border border-gray-200 dark:border-gray-700 my-4"
      :class="{
        'bg-gray-50': themeStore.theme === 'light',
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
      >from sympy.polys.domains.fpsring import PowerSeriesRing as fpsR, PythonSeriesContext as context
from sympy import ZZ

R = fpsR([0, 1], ZZ, 20)

x = context(R)  # Creates a new generator `x` with the ring's default precision
print(x)  # x + O(x**20)

y = context(R, 10)  # Creates a generator `y` with a custom precision
print(y)  # y + O(y**10)</code></pre>
    </div>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      So yeah, this is what I currently have in mind for the Ring and Context
      classes.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      There will also be a
      <strong class="font-bold text-indigo-700 dark:text-indigo-300"
        >FlintSeriesContext</strong
      >
      class that provides operations like sin, cos, antiderivative, multiply,
      and more—similar to what PythonSeriesContext provides. Once flint is
      installed, there should be a mechanism to automatically decide whether to
      create elements using the Flint-backed series types.
    </p>

    <blockquote
      class="relative p-4 sm:p-5 md:p-7 my-6 sm:my-8 mx-auto rounded-lg sm:rounded-xl md:rounded-2xl w-full sm:w-[95%] max-w-full shadow-md sm:shadow-lg overflow-hidden z-10 border border-gray-200/40 dark:border-indigo-800/30 transform transition-transform duration-200 ease-in-out hover:-translate-y-0.5 bg-white/20 dark:bg-gray-900/65 backdrop-blur-lg hover:shadow-xl"
    >
      <p
        class="mb-0 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty"
      >
        <strong class="text-indigo-700 dark:text-indigo-300 font-bold"
          >Next Steps</strong
        >: This week was primarily focused on understanding the requirements and
        aligning the implementation with Flint's design patterns. The coming
        weeks will involve implementing these classes and testing their
        integration with the existing SymPy ecosystem.
      </p>
      <div
        class="absolute inset-0 -z-10 bg-gradient-radial from-indigo-200/30 dark:from-indigo-800/40 to-transparent opacity-50 sm:opacity-60"
      ></div>
    </blockquote>
  </div>
</template>

<style scoped>
/* Override highlight.js themes for better integration */
pre code.hljs {
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
  color: #032f62 !important;
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
  color: #9ecbff !important;
}

.hljs-github-dark .hljs-comment,
.hljs-github-dark .hljs-quote {
  color: #6a737d !important;
  font-style: italic;
}

.hljs-github-dark .hljs-number,
.hljs-github-dark .hljs-literal {
  color: #79b8ff !important;
}

.hljs-github-dark .hljs-built_in {
  color: #ffab70 !important;
}
</style>
