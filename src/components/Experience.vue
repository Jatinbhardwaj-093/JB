<script setup lang="ts">
import { useThemeStore } from '../store/theme';

const themeStore = useThemeStore();
</script>
<template>
    <div :data-theme="themeStore.theme">
        <p class="text-4xl font-bold font-ubuntu ml-4 text-black" :class="{ 'text-white': themeStore.theme === 'dark' }">Experience</p>

<div class="py-3 pl-4 pr-2 mx-4 mt-6 rounded-md border-1 border-purple-500 shadow-inner shadow-black" :class="{ 'bg-[#323232]': themeStore.theme === 'dark', 'bg-purple-50': themeStore.theme==='light' }">
    <p class="text-xl font-bold text-purple-600 mb-2">Influencer-Sponsor Engagement Platform</p>

    <div class="flex items-center space-y-2 flex-col">
        <p class="font-semibold text-black" :class="{ 'text-white': themeStore.theme === 'dark' }">
            <i class="bi bi-arrow-return-right font-extrabold text-black" :class="{ 'text-white': themeStore.theme === 'dark' }"></i> This project was developed as part of my
            MAD-1 course. I created a fully functional application to facilitate collaboration and deals between
            sponsors and influencers.
        </p>
        <p class="font-semibold text-black" :class="{ 'text-white': themeStore.theme === 'dark' }">
            <i class="bi bi-arrow-return-right font-extrabold text-black" :class="{ 'text-white': themeStore.theme === 'dark' }"></i> Few applications offer reliable services for
            sponsorship management. Despite being my first project, I focused on adding scalable features to the
            application.
        </p>
        <p class="font-semibold text-black" :class="{ 'text-white': themeStore.theme === 'dark' }">
            <i class="bi bi-arrow-return-right font-extrabold text-black" :class="{ 'text-white': themeStore.theme === 'dark' }"></i> I engaged with local influencers to
            understand their needs for a quick and easy sponsorship platform. Based on their feedback, I kept
            the UI simple and added a statistics feature.
        </p>
    </div>
</div>

<div class="py-3 pl-4 pr-2 mx-4 mt-8 rounded-md border-1 border-purple-500 shadow-inner shadow-black" :class="{ 'bg-[#323232]': themeStore.theme === 'dark', 'bg-purple-50': themeStore.theme==='light' }">
    <p class="text-xl font-bold text-purple-600 mb-2">HouseHold Services Platform</p>
    <div class="flex items-center space-y-2 flex-col">
        <p class="font-semibold text-black" :class="{ 'text-white': themeStore.theme === 'dark' }">
            <i class="bi bi-arrow-return-right font-extrabold text-black" :class="{ 'text-white': themeStore.theme === 'dark' }"></i> This project was developed as part of my
            MAD-2 course. This time, I used more advanced frameworks as part of the learning process.
        </p>
        <p class="font-semibold text-black" :class="{ 'text-white': themeStore.theme === 'dark' }">
            <i class="bi bi-arrow-return-right font-extrabold text-black" :class="{ 'text-white': themeStore.theme === 'dark' }"></i> One of the major issues addressed in this
            project is the difficulty in pricing between service providers and customers. I aimed to solve this
            issue within the application.
        </p>
        <p class="font-semibold text-black" :class="{ 'text-white': themeStore.theme === 'dark' }">
            <i class="bi bi-arrow-return-right font-extrabold text-black" :class="{ 'text-white': themeStore.theme === 'dark' }"></i> I eliminated the complexities of fluctuating
            prices and overpricing by allowing the service details to be managed by the admin, ensuring better
            control over pricing and services.
        </p>
    </div>
</div>
    </div>
</template>
