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
    <!-- Week 2 Section -->
    <p
      class="font-bold text-xl sm:text-3xl md:text-3xl lg:text-4xl mt-6 mb-4 leading-tight py-2 px-2 rounded-md bg-gray-100/70 dark:bg-gray-900/40 w-full"
    >
      GSoC'25 Week-2
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      Unfortunately, I wasn't able to write a blog post this week about my
      progress. That said, there hasn't been a lot of tangible output this week
      due to ongoing design discussions and some confusion.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      Following our Week-1 meeting, I created a rough sketch of the design and
      asked for feedback. However, <strong class="font-bold">Oscar</strong> had
      a different approach in mind—specifically, he suggested we completely
      avoid introducing an Element class for now. This isn't necessarily
      contradictory to my initial proposal, since our primary goal is to treat
      the ring as a context (ctx) for constructing and manipulating elements.
      Hence, a dedicated element class might be unnecessary at this stage.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      As I began working, <strong class="font-bold">Oscar</strong> shared a very
      interesting and elegant behavior from Flint's gr_series implementation.
      When a gr_series element is constructed using a DUP (dense univariate
      polynomial) list, and the list length is smaller than the ring's
      precision, <strong class="font-bold">Flint</strong> automatically treats
      it as a regular polynomial instead of a truncated series. This is
      mathematically more accurate, as there's no truncation happening and all
      coefficients are fully defined.
    </p>

    <!-- Code Example -->
    <div
      class="mb-4 sm:mb-6 rounded-lg p-4"
      :class="{
        'bg-gray-50': themeStore.theme === 'light',
        'bg-gray-900': themeStore.theme === 'dark',
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

# Create a series ring with rational coefficients and precision 2
R = gr.gr_series_ctx.new(gr.gr_fmpq_ctx, 2)

# Create another series ring with rational coefficients and precision 4
R2 = gr.gr_series_ctx.new(gr.gr_fmpq_ctx, 4)

# Create a series: x + x^3 in ring R
a = R('x') + R('x')**3
print(a)  # Output: x + O(x^2)

# Convert series 'a' to ring R2 - notice it keeps original precision
converted_a = R2(a)
print(converted_a)  # Output: x + O(x^2)

# Multiply the converted series by x in R2
result1 = R2(a) * R2('x')
print(result1)  # Output: 0 + O(x^2)

# Create x in R2
x_in_R2 = R2('x')
print(x_in_R2)  # Output: x

# Multiply x by itself in R2
x_squared = R2('x') * R2('x')
print(x_squared)  # Output: x^2</code></pre>
    </div>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      This design is really clean and sets a good precedent, so I started
      working toward a similar behavior in our implementation.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      However, on the last day of the week,
      <strong class="font-bold">Oscar</strong> shared a new design sketch that
      involved building our series ring directly on top of gr_series from
      <strong class="font-bold">Flint</strong>. This introduced some confusion
      for me, primarily because:
    </p>

    <ul
      class="mb-4 sm:mb-6 ml-6 space-y-2 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7"
    >
      <li class="list-disc">
        gr_series currently lacks support for series expansions of
        <strong class="font-bold">Transcendental functions</strong>.
      </li>
      <li class="list-disc">
        It is also somewhat unstable at the moment in
        <strong class="font-bold">python-Flint</strong>.
      </li>
    </ul>

    <p
      class="mb-6 sm:mb-8 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      While this direction is promising, I'm still unsure if it aligns with our
      current goals, especially given those limitations.
    </p>

    <!-- Week 3 Section -->
    <p
      class="font-bold text-xl sm:text-3xl md:text-3xl lg:text-4xl mt-8 mb-4 leading-tight py-2 px-2 rounded-md bg-gray-100/70 dark:bg-gray-900/40 w-full"
    >
      GSoC'25 Week 3
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      This week marked significant progress after the slow momentum in Week 2. I
      continued from where I left off and worked through key design questions
      that were previously unresolved.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      There were two main agenda items this week:
    </p>

    <ol
      class="mb-4 sm:mb-6 ml-6 space-y-2 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7"
    >
      <li class="list-decimal">
        Finalizing which series type to use from
        <strong class="font-bold">Flint</strong>.
      </li>
      <li class="list-decimal">Clarifying how precision should be handled.</li>
    </ol>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      As discussed earlier, gr_series is currently not well-supported in
      <strong class="font-bold">python-Flint</strong> and lacks APIs for
      <strong class="font-bold">Transcendental functions</strong>. Hence, we
      agreed to use fmpz_series and fmpq_series for now. In the future, once
      <strong class="font-bold">python-flint</strong> improves support for
      generic rings (gr_series), we can internally switch to it without
      affecting the public interface. This decouples implementation from usage,
      which is ideal.
    </p>

    <!-- Precision Design Section -->
    <p
      class="font-bold text-lg sm:text-2xl md:text-2xl lg:text-3xl mt-6 mb-3 leading-tight"
    >
      Precision Design
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      The design around precision had some ambiguity. Here's the structure we
      eventually settled on:
    </p>

    <ul
      class="mb-4 sm:mb-6 ml-6 space-y-2 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7"
    >
      <li class="list-disc">
        Each series can optionally have its own precision.
      </li>
      <li class="list-disc">If a series has precision, we use it.</li>
      <li class="list-disc">
        If none of the operands specify precision, we fall back to the ring's
        default precision.
      </li>
    </ul>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      However, the tricky part arises when multiple series are involved in an
      operation. The natural instinct might be to return the result with the
      minimum precision among the inputs (i.e., min(p1, p2, ...)). But this
      doesn't always align with mathematical correctness.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      Consider:
    </p>

    <!-- Mathematical Example -->
    <div
      class="mb-4 sm:mb-6 rounded-lg p-4 border-l-4 border-indigo-500"
      :class="{
        'bg-indigo-50': themeStore.theme === 'light',
        'bg-indigo-900/20': themeStore.theme === 'dark',
      }"
    >
      <div class="font-mono text-base leading-relaxed">
        <div class="mb-2">
          <span class="text-indigo-600 dark:text-indigo-400 font-medium"
            >s₁ =</span
          >
          <span class="ml-2">1 + x + O(x²)</span>
        </div>
        <div class="mb-3">
          <span class="text-indigo-600 dark:text-indigo-400 font-medium"
            >s₂ =</span
          >
          <span class="ml-2">x + O(x³)</span>
        </div>
        <div class="pt-2 border-t border-indigo-200 dark:border-indigo-700">
          <span class="text-indigo-600 dark:text-indigo-400 font-medium"
            >mul(s₁, s₂) =</span
          >
          <span class="ml-2">?</span>
        </div>
      </div>
    </div>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      If we use min(2, 3), the result is x + O(x²). But mathematically, we can
      compute up to x², so the correct result is:
    </p>

    <!-- Mathematical Result -->
    <div
      class="mb-4 sm:mb-6 rounded-lg p-4 border-l-4 border-green-500"
      :class="{
        'bg-green-50': themeStore.theme === 'light',
        'bg-green-900/20': themeStore.theme === 'dark',
      }"
    >
      <div class="font-mono text-base leading-relaxed">
        <span class="text-green-600 dark:text-green-400 font-medium"
          >Result:</span
        >
        <span class="ml-2 text-lg">x + x² + O(x³)</span>
      </div>
    </div>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      While this richer result is desirable, implementing it is challenging.
      Doing so requires finding the first non-zero exponent of one series and
      combining it with the other's precision, which isn't straightforward,
      especially when series are sparse or symbolic.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      Ultimately, we decided to follow Flint's behavior, which truncates to the
      minimum precision. While not always the most informative, it's consistent,
      simple, and mathematically valid (since truncation is deliberate and
      explicit).
    </p>

    <!-- Domain Separation Section -->
    <p
      class="font-bold text-lg sm:text-2xl md:text-2xl lg:text-3xl mt-6 mb-3 leading-tight"
    >
      Domain Separation
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      Another major improvement this week was the decision to separate rings
      based on ground domains (e.g., ℤ and ℚ). This avoids runtime errors when
      attempting unsupported operations like transcendental expansions over ℤ.
    </p>

    <p
      class="mb-3 sm:mb-4 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      Instead of allowing these errors to propagate, the ring itself will not
      expose operations that are unsupported on its domain. This design is both
      safer and more user-friendly. Currently, ZZ and QQ domains are supported,
      and more will be added as
      <strong class="font-bold">python-flint</strong> evolves.
    </p>

    <!-- Code Structure Section -->
    <p
      class="font-bold text-lg sm:text-2xl md:text-2xl lg:text-3xl mt-6 mb-3 leading-tight"
    >
      Code Structure
    </p>

    <p
      class="mb-6 sm:mb-8 text-sm sm:text-base md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-7 tracking-[0.01em] sm:tracking-[0.015em] text-wrap-pretty max-w-full sm:max-w-[95%] md:max-w-[90%]"
    >
      As the codebase grows, the series implementation will now live under a
      proper submodule (polys.series) instead of being a loose file in polys.
      This keeps things organized and aligns with SymPy's module structure.
    </p>
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
  color: #032f62 !important;
}

.hljs-github .hljs-comment,
.hljs-github .hljs-quote {
  color: #6a737d !important;
  font-style: italic;
}

.hljs-github .hljs-number,
.hljs-github .hljs-literal {
  color: #032f62 !important;
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
  color: #2d76ca !important;
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

/* Adjust heading spacing */
.font-bold {
  font-weight: 700;
}

/* List styling */
ul,
ol {
  padding-left: 1.5rem;
}

ul li::marker {
  color: #6366f1;
}

ol li::marker {
  color: #6366f1;
  font-weight: 600;
}
</style>
