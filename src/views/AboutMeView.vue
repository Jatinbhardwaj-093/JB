<script setup lang="ts">
import Experience from '../components/Experience.vue';
import Skills from '../components/Skills.vue';
import Education from '../components/Education.vue';
import Hobby from '../components/Hobby.vue';
import { useThemeStore } from '../store/theme';

const themeStore = useThemeStore();
</script>

<template>
    <div class="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-2">
    <!-- First Column (Experience) -->
    <div class="flex  
        lg:border-r-2 lg:pr-6 lg:border-b-0 lg:pb-0
        border-b-2 pb-6 border-r-0 pr-0"
        :class="{'border-purple-900': themeStore.theme==='dark'}">
        <Experience />
        </div>

        <!-- Second Column (Skills, Education, Hobby) -->
        <div class="grid grid-cols-1 gap-4">
            <div class="flex flex-col items-start justify-start border-b-2 border-gray-300  px-4 pb-6" :class="{'border-purple-900': themeStore.theme==='dark'}">
                <Skills />
            </div>
            <div class="flex flex-col items-start justify-start border-b-2 border-gray-300  px-4 pb-8" :class="{'border-purple-900': themeStore.theme==='dark'}">
                <Education />
            </div>
            <div class="flex flex-col items-start justify-start px-4 pb-4">
                <Hobby />
            </div>
        </div>
    </div>
</template>