<script setup lang="ts">
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();

</script>

<template>
    <div :data-theme="themeStore.theme">
        <p class="text-3xl font-bold font-ubuntu mb-4 text-black"  :class="{ 'text-white': themeStore.theme === 'dark' }">Hobbies</p>
        <div class="flex items-start justify-start gap-4 flex-wrap">
            <div class="flex justify-start items-center gap-2">
                <div class="w-10 h-10 p-1 rounded-md bg-white dark:gray- shadow-md shadow-black">
                    <img src="../assets/images/Hobbies/Maths.png" alt="Math">
                </div>
                <p class="font-semibold text-xl text-black"  :class="{ 'text-white': themeStore.theme === 'dark' }">Mathematics</p>
            </div>
            <div class="flex justify-start items-center gap-2">
                <div class="w-10 h-10 p-1 rounded-md bg-white dark:gray- shadow-md shadow-black">
                    <img src="../assets/images/Hobbies/Psychology.png" alt="Pschology">
                </div>
                <p class="font-semibold text-xl text-black"  :class="{ 'text-white': themeStore.theme === 'dark' }">Human Pschology</p>
            </div>
            <div class="flex justify-start items-center gap-2">
                <div class="w-10 h-10 p-1 rounded-md bg-white dark:gray- shadow-md shadow-black">
                    <img src="../assets/images/Hobbies/machine-learning.png" alt="machine-learning">
                </div>
                <p class="font-semibold text-xl text-black" :class="{ 'text-white': themeStore.theme === 'dark' }">Machine Learning</p>
            </div>
        </div>
        
    </div>
</template>