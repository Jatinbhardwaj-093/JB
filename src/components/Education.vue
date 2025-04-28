<script setup lang="ts">
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();
</script>

<template>
  <div :data-theme="themeStore.theme">
    <p
      class="text-3xl font-bold font-ubuntu mb-4 text-black"
      :class="{ 'text-white': themeStore.theme === 'dark' }"
    >
      Education
    </p>

    <div class="mb-2">
      <div class="flex items-center justify-start gap-2">
        <a href="https://www.cbse.gov.in/cbsenew/cbse.html">
          <div
            class="w-12 h-12 p-2 rounded-full bg-gray-100 shadow-sm shadow-black"
          >
            <img src="../assets/images/Education/cbse.png" alt="cbse" />
          </div>
        </a>
        <p
          class="font-bold text-lg text-black"
          :class="{ 'text-white': themeStore.theme === 'dark' }"
        >
          Senior Secondary(12th):
        </p>
        <p
          class="text-black"
          :class="{ 'text-white': themeStore.theme === 'dark' }"
        >
          Completed 12th Class with 9.4 CGPA
        </p>
      </div>
    </div>

    <div>
      <div class="flex items-center justify-start gap-2">
        <a href="https://study.iitm.ac.in/ds/">
          <div
            class="w-12 h-12 p-1 rounded-full bg-gray-100 shadow-sm shadow-black"
            :class="{
              'dark:bg-[#323232] dark:shadow-md dark:shadow-black':
                themeStore.theme === 'dark',
            }"
          >
            <img src="../assets/images/Education/IITM.png" alt="IITM" />
          </div>
        </a>
        <div>
          <div class="flex gap-2 items-center justify-center">
            <p
              class="font-bold text-lg text-black"
              :class="{ 'text-white': themeStore.theme === 'dark' }"
            >
              IITM Data Science DEGREE:
            </p>
            <p
              class="text-black"
              :class="{ 'text-white': themeStore.theme === 'dark' }"
            >
              Completed Foundation Last year.
            </p>
          </div>
          <p
            class="font-bold text-red-700"
            :class="{ 'text-red-500': themeStore.theme === 'dark' }"
          >
            Currently at Diploma Level
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
