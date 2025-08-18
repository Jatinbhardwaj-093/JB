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
    <p
      class="font-bold text-xl sm:text-3xl md:text-3xl lg:text-4xl mt-6 mb-4 leading-tight py-2 px-2 rounded-md bg-gray-100/70 dark:bg-gray-900/40 w-full"
    >
      GSoC'25: Week 11
    </p>
    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      As week 11 is ending, I started working on the final PR of the project.
    </p>
    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      The PR
      <a
        href="https://github.com/sympy/sympy/pull/28325"
        class="text-blue-600 dark:text-blue-400 underline font-bold"
        >gh-28325</a
      >
      implements three classes:
    </p>

    <div class="mb-6">
      <div class="mb-4">
        <h3 class="font-bold text-base sm:text-lg md:text-xl mb-2">
          <strong>Ring</strong> (<code
            class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
            >PowerSeriesRing</code
          >)
        </h3>
        <p
          class="mb-2 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%] ml-4"
        >
          The
          <code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded"
            >PowerSeriesRing</code
          >
          class maintains a base ring (<code
            class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded"
            >self.ring</code
          >) that represents a lower-level ring defined by the domain and ground
          type (e.g., Python, Flint). The base ring supplies the core logic for
          operations such as addition, inversion, logarithm, and exponentiation.
        </p>
        <p
          class="mb-2 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%] ml-4"
        >
          Additionally, this class extends functionality with methods for
          converting or constructing ring elements from various types (e.g.,
          expressions, lists, integers).
        </p>
      </div>

      <div class="mb-4">
        <h3 class="font-bold text-base sm:text-lg md:text-xl mb-2">
          <strong>Element</strong> (<code
            class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
            >PowerSeriesElement</code
          >)
        </h3>
        <p
          class="mb-2 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%] ml-4"
        >
          The
          <code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded"
            >PowerSeriesElement</code
          >
          class provides a structured representation of ring elements,
          supporting standard arithmetic operations (<code
            class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded"
            >+</code
          >,
          <code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">-</code
          >,
          <code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">/</code
          >, etc.). This implementation also supports an explicit Order term. If
          the external order term exceeds the precision of the ring, it is
          truncated to the ring's precision.
        </p>
      </div>

      <div class="mb-4">
        <h3 class="font-bold text-base sm:text-lg md:text-xl mb-2">
          <strong>Domain</strong> (<code
            class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
            >Series</code
          >)
        </h3>
        <p
          class="mb-2 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%] ml-4"
        >
          The
          <code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded"
            >Series</code
          >
          domain class includes the associated ring (<code
            class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded"
            >self.ring</code
          >) as metadata, which can be extracted for ring-specific operations.
          It provides methods for converting elements from other domains into
          its own data type.
        </p>
      </div>
    </div>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      This functionality or design is similar to the
      <strong>Multivariate Polynomial Ring</strong> of SymPy.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      There is also a change for the
      <code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded"
        >power_series_ring</code
      >
      function. Now instead of returning the lower ring, it returns the
      <code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded"
        >PowerSeriesRing</code
      >
      instance with the ring generator. This works something like this now:
    </p>

    <pre class="mb-6"><code class="language-python">>>> from sympy import QQ
>>> from sympy.polys.series import power_series_ring
>>> R, y = power_series_ring("y", QQ, 10)
>>> R.inverse(1 + y)
1 - y + y**2 - y**3 + y**4 - y**5 + y**6 - y**7 + y**8 - y**9 + O(y**10)
</code></pre>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      As week 12 is starting tomorrow, this is going to be the last stretch of
      the project. This class needs some more methods and proper type
      annotations, then it will be ready to merge into master, finishing my
      project.
    </p>
  </div>
</template>
