<script setup lang="ts">
import { useThemeStore } from "../../../store/theme";

const themeStore = useThemeStore();
</script>

<template>
  <div>
    <p
      :class="{
        'text-gray-700': themeStore.theme === 'light',
        'text-gray-300': themeStore.theme === 'dark',
      }"
    >
      A few days ago, my GSoC project was wrapped up and completed. I am very
      happy that I was able to finish within my original timeline. Now I'm just
      waiting for the final evaluation - the whole journey has been amazing!
    </p>

    <p
      :class="{
        'text-gray-700': themeStore.theme === 'light',
        'text-gray-300': themeStore.theme === 'dark',
      }"
    >
      There are many things accomplished in this project, and everything is
      explained on the SymPy official wiki page, including future progress plans
      for this module. I'll link the important resources below for anyone
      interested.
    </p>

    <p
      :class="{
        'text-gray-700': themeStore.theme === 'light',
        'text-gray-300': themeStore.theme === 'dark',
      }"
    >
      I hope to write a separate blog post explaining how this system works, how
      it can be used, and the decision tree of what was done and why it was
      implemented this way.
    </p>

    <p class="mt-4"
      :class="{
        'text-gray-700': themeStore.theme === 'light',
        'text-gray-300': themeStore.theme === 'dark',
      }"
    >
      <span
        :class="{
          'text-gray-900': themeStore.theme === 'light',
          'text-white': themeStore.theme === 'dark',
        }"
        >Final Report:</span
      >
      <a
        href="https://github.com/sympy/sympy/wiki/GSoC-2025-Report-Jatin-Bhardwaj:-%22A-New-Power-Series-Ring-Module-for-SymPy%22"
        target="_blank"
        rel="noopener noreferrer"
        :class="{
          'text-blue-600 hover:text-blue-800': themeStore.theme === 'light',
          'text-blue-400 hover:text-blue-300': themeStore.theme === 'dark',
        }"
        > SymPy Wiki</a
      >
    </p>

    <p
      :class="{
        'text-gray-700': themeStore.theme === 'light',
        'text-gray-300': themeStore.theme === 'dark',
      }"
    >
      <span
        :class="{
          'text-gray-900': themeStore.theme === 'light',
          'text-white': themeStore.theme === 'dark',
        }"
        >Original Proposal:</span
      >
      <a
        href="https://docs.google.com/document/d/1mOomP8yPW6bUd1ncP3YIrSez14z3nsqWLQMsY4ZRzc0/edit?tab=t.0#heading=h.qrhwwnh6ot7g"
        target="_blank"
        rel="noopener noreferrer"
        :class="{
          'text-blue-600 hover:text-blue-800': themeStore.theme === 'light',
          'text-blue-400 hover:text-blue-300': themeStore.theme === 'dark',
        }"
        > Google Docs</a
      >
    </p>

    <p
      :class="{
        'text-gray-700': themeStore.theme === 'light',
        'text-gray-300': themeStore.theme === 'dark',
      }"
    >
      <span
        :class="{
          'text-gray-900': themeStore.theme === 'light',
          'text-white': themeStore.theme === 'dark',
        }"
        >Related Pull Requests:</span
      >
      <a
        href="https://github.com/sympy/sympy/pulls?q=is%3Apr+author%3AJatinbhardwaj-093+is%3Amerged+created%3A2025-06-01..2025-08-31"
        target="_blank"
        rel="noopener noreferrer"
        :class="{
          'text-blue-600 hover:text-blue-800': themeStore.theme === 'light',
          'text-blue-400 hover:text-blue-300': themeStore.theme === 'dark',
        }"
        > GitHub</a
      >
    </p>
  </div>
</template>
