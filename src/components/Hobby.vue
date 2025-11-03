<script setup lang="ts">
const mathsImg =  new URL("../assets/images/light/Maths.png", import.meta.url).href;
const psychologyImg =  new URL("../assets/images/light/psychology.png", import.meta.url).href;
const mlImg =  new URL("../assets/images/light/ML.png", import.meta.url).href;
</script>

<template>
  <div>
    <div class="flex flex-col items-start justify-start gap-4">
      <div class="flex justify-start items-center gap-2">
        <div
          class="w-10 h-10 p-1 rounded-md shadow-md bg-gray-900 shadow-white/10"
        >
          <img :src="mathsImg" alt="Math" />
        </div>
        <p class="font-semibold text-xl text-white">Mathematics</p>
      </div>
      <div class="flex justify-start items-center gap-2">
        <div
          class="w-10 h-10 p-1 rounded-md shadow-md bg-gray-900 shadow-white/10"
        >
          <img :src="psychologyImg" alt="Psychology" />
        </div>
        <p class="font-semibold text-xl text-white">Human Psychology</p>
      </div>
      <div class="flex justify-start items-center gap-2">
        <div
          class="w-10 h-10 p-1 rounded-md shadow-md bg-gray-900 shadow-white/10"
        >
          <img :src="mlImg" alt="Machine Learning" />
        </div>
        <p class="font-semibold text-xl text-white">Machine Learning</p>
      </div>
    </div>
  </div>
</template>
