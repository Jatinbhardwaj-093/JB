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
    <!-- Week 5 Section -->
    <p
      class="font-bold text-xl sm:text-3xl md:text-3xl lg:text-4xl mt-6 mb-4 leading-tight py-2 px-2 rounded-md bg-gray-100/70 dark:bg-gray-900/40 w-full"
    >
      GSoC'25 Week-5
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      This week was highly productive. The focus was on implementing efficient
      algorithms for series manipulation, particularly for operations that were
      previously missing or handled suboptimally in the
      <span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
        >dense*</span
      >
      modules of SymPy.
    </p>

    <!-- Implemented Operations Section -->
    <div class="mb-4 sm:mb-6">
      <h2 class="font-bold text-lg sm:text-xl md:text-2xl mb-3">
        Implemented Operations
      </h2>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        We added optimized arithmetic methods for:
      </p>

      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li
          class="text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7"
        >
          <strong>Multiplication</strong>: Uses the basic Cauchy product for
          small series (<span
            class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
            >n &lt; 100</span
          >), and Karatsuba multiplication with adaptive truncation for larger
          series.
        </li>
        <li
          class="text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7"
        >
          <strong>Power</strong>: Uses recursive exponentiation-by-squaring,
          with truncation at each recursive step.
        </li>
        <li
          class="text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7"
        >
          <strong>Multiplicative Inverse</strong>: Already available via
          <span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
            >dup_revert</span
          >
          in
          <span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
            >densetools.py</span
          >.
        </li>
      </ul>
    </div>

    <!-- Composition Section -->
    <div class="mb-4 sm:mb-6">
      <h2 class="font-bold text-lg sm:text-xl md:text-2xl mb-3">Composition</h2>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        To compute series composition, the existing Horner's method (<span
          class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
          >dup_compose</span
        >) was not sufficient for performance. We introduced a faster approach
        in
        <span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
          >dup_series_compose</span
        >, using a divide-and-conquer strategy with truncation enabled. While
        its optimality is still under evaluation, it performs reasonably well
        for general-purpose use.
      </p>
    </div>

    <!-- Compositional Inverse Section -->
    <div class="mb-4 sm:mb-6">
      <h2 class="font-bold text-lg sm:text-xl md:text-2xl mb-3">
        Compositional Inverse (Series Reversion)
      </h2>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        We implemented the <strong>Fast Lagrange Inversion algorithm</strong>,
        proposed by Fredrik Johansson in his paper
        <a
          href="https://fredrikj.net/math/reversion.pdf"
          class="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          >A Fast Algorithm for Reversion of Power Series</a
        >. This algorithm avoids Newton iteration by precomputing powers of
        <span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
          >h, h², h³, ..., hᵐ</span
        >, allowing efficient coefficient extraction using Lagrange's formula.
      </p>
    </div>

    <!-- Why Fast Lagrange Inversion Section -->
    <div class="mb-4 sm:mb-6">
      <h2 class="font-bold text-lg sm:text-xl md:text-2xl mb-3">
        Why Fast Lagrange Inversion?
      </h2>

      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li
          class="text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7"
        >
          Avoids redundancy by directly using the Lagrange inversion formula
        </li>
        <li
          class="text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7"
        >
          Reduces overhead compared to Newton iteration, particularly for large
          series
        </li>
        <li
          class="text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7"
        >
          Achieves speedup factors of <strong>1.2× to 1.5×</strong> over
          classical methods
        </li>
        <li
          class="text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7"
        >
          Works well with coefficient rings like ℤ and ℚ
        </li>
      </ul>

      <div
        class="mb-4 sm:mb-6 rounded-lg p-4 border-l-4 border-blue-500"
        :class="{
          'bg-blue-50': themeStore.theme === 'light',
          'bg-blue-900/20': themeStore.theme === 'dark',
        }"
      >
        <p class="text-sm sm:text-base italic">
          As Johansson writes in his paper:<br />
          <em
            >"Our algorithm can be viewed as a baby-step giant-step version of
            the Lagrange inversion formula, avoiding Newton iteration entirely
            (apart from a single O(M(n)) reciprocal computation)."</em
          >
        </p>
      </div>
    </div>

    <!-- Benchmarks Section -->
    <div class="mb-4 sm:mb-6">
      <h2 class="font-bold text-lg sm:text-xl md:text-2xl mb-3">
        Benchmarks from the Paper
      </h2>

      <h3 class="font-semibold text-base sm:text-lg mb-3">
        Timing Comparison Over ℤ/pℤ
      </h3>

      <div class="overflow-x-auto mb-4">
        <table
          class="min-w-full border-collapse border border-gray-300 dark:border-gray-600"
        >
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-900">
              <th
                class="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left"
              >
                n
              </th>
              <th
                class="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left"
              >
                Lagrange Inversion
              </th>
              <th
                class="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left"
              >
                Newton + BK 2.1
              </th>
              <th
                class="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left"
              >
                Fast Lagrange Inversion
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono"
              >
                10²
              </td>
              <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">
                2.8 ms
              </td>
              <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">
                0.92 ms
              </td>
              <td
                class="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold text-green-600 dark:text-green-400"
              >
                0.54 ms
              </td>
            </tr>
            <tr class="bg-gray-50 dark:bg-gray-900/50">
              <td
                class="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono"
              >
                10³
              </td>
              <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">
                690 ms
              </td>
              <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">
                66 ms
              </td>
              <td
                class="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold text-green-600 dark:text-green-400"
              >
                45 ms
              </td>
            </tr>
            <tr>
              <td
                class="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono"
              >
                10⁴
              </td>
              <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">
                110 s
              </td>
              <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">
                3300 ms
              </td>
              <td
                class="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold text-green-600 dark:text-green-400"
              >
                2100 ms
              </td>
            </tr>
            <tr class="bg-gray-50 dark:bg-gray-900/50">
              <td
                class="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono"
              >
                10⁵
              </td>
              <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">
                12100 s
              </td>
              <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">
                144000 ms
              </td>
              <td
                class="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold text-green-600 dark:text-green-400"
              >
                85000 ms
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        The Fast Lagrange algorithm consistently outperformed naive Lagrange
        inversion and Newton iteration with BK 2.1, making it a strong default
        candidate for series reversion.
      </p>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        Additionally, a helper function was implemented for small precision
        reversion (<span
          class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
          >n ≥ 4</span
        >). This delivers up to <strong>60× speedup</strong> compared to general
        algorithms. While currently limited to
        <span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
          >n = 4</span
        >, we plan to extend support to
        <span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
          >n = 5, 6, ...</span
        >
        in the future.
      </p>
    </div>

    <!-- Convenience Utilities Section -->
    <div class="mb-4 sm:mb-6">
      <h2 class="font-bold text-lg sm:text-xl md:text-2xl mb-3">
        Convenience Utilities
      </h2>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        Three helper functions were added to
        <span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
          >densbasic.py</span
        >:
      </p>

      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li
          class="text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7"
        >
          <span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
            >dup_truncate</span
          >: Efficiently truncate series to a given length
        </li>
        <li
          class="text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7"
        >
          <span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
            >dup_from_list</span
          >: Construct a series from a coefficient list
        </li>
        <li
          class="text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7"
        >
          <span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
            >dup_print</span
          >: A prototype function for formatted series output (to be improved
          later)
        </li>
      </ul>
    </div>

    <!-- Final Note Week 5 -->
    <div class="mb-8 sm:mb-10">
      <h2 class="font-bold text-lg sm:text-xl md:text-2xl mb-3">Final Note</h2>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        All of the above was merged in
        <a
          href="https://github.com/sympy/sympy/pull/28208"
          class="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          >gh-28208</a
        >, building a robust foundation for further development of symbolic
        series arithmetic.
      </p>
    </div>

    <!-- Week 6 Section -->
    <p
      class="font-bold text-xl sm:text-3xl md:text-3xl lg:text-4xl mt-8 mb-4 leading-tight py-2 px-2 rounded-md bg-gray-100/70 dark:bg-gray-900/40 w-full"
    >
      GSoC'25 Week-6
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      This week was a bit slower due to a scheduled quiz. Still, I was able to
      contribute meaningful changes to the Series Ring PR.
    </p>

    <!-- Progress Week 6 Section -->
    <div class="mb-4 sm:mb-6">
      <h2 class="font-bold text-lg sm:text-xl md:text-2xl mb-3">Progress</h2>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        Following the merge of
        <a
          href="https://github.com/sympy/sympy/pull/28208"
          class="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          >gh-28208</a
        >, we introduced support for:
      </p>

      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li
          class="text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7"
        >
          <strong>Composition</strong>
        </li>
        <li
          class="text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7"
        >
          <strong>Inverse</strong>
        </li>
        <li
          class="text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7"
        >
          <strong>Reversion</strong>
        </li>
      </ul>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        Each of these methods relies on new
        <span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
          >dup_series_*</span
        >
        routines that are integrated with the Series Ring class logic.
      </p>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        Additionally, a PR related to <strong>type annotations</strong> for the
        polynomial domain structure was merged:
        <a
          href="https://github.com/sympy/sympy/pull/28177"
          class="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          >gh-28177</a
        >. This improves type safety for series operations, as we use the
        <span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
          >DUP</span
        >
        representation — a list of ground domain coefficients. For example:
      </p>

      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li
          class="text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7"
        >
          <span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
            >DUP[MPZ]</span
          >
          for integers (ℤ)
        </li>
        <li
          class="text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7"
        >
          <span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
            >DUP[MPQ]</span
          >
          for rationals (ℚ)
        </li>
      </ul>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        This allows solid and specific type checking, moving away from loosely
        typed
        <span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
          >Any</span
        >
        or generic
        <span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
          >TypeVar</span
        >.
      </p>
    </div>

    <!-- Testing Updates Section -->
    <div class="mb-4 sm:mb-6">
      <h2 class="font-bold text-lg sm:text-xl md:text-2xl mb-3">
        Testing Updates
      </h2>

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        A new structure was proposed for test files. Instead of using
        <span class="font-mono bg-gray-100 dark:bg-gray-900 px-1 rounded"
          >pytest.mark.parametrize</span
        >, we now leverage <strong>pytest fixtures</strong> for greater
        modularity and clarity.
      </p>
    </div>

    <!-- Final Note Week 6 -->
    <div class="mb-6 sm:mb-8">
      <hr class="border-gray-300 dark:border-gray-600 my-6" />

      <p
        class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
      >
        I'm hoping to wrap up minor cleanups next week and get the Series Ring
        PR finalized and merged. After that, I plan to focus on expanding
        support for transcendental functions.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Custom styles for better readability */
.font-feature-settings-kern {
  font-feature-settings: "kern";
}

.font-feature-settings-liga {
  font-feature-settings: "liga";
}

.font-feature-settings-calt {
  font-feature-settings: "calt";
}

/* Table responsive styles */
@media (max-width: 640px) {
  table {
    font-size: 0.875rem;
  }

  th,
  td {
    padding: 0.5rem;
  }
}
</style>
