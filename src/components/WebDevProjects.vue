<script setup lang="ts">
import { useThemeStore } from "../store/theme";

const thmeeStore = useThemeStore();
</script>

<template>
    <div :data-theme="thmeeStore.theme">
    <div class="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 mx-auto w-11/12 p-4 pt-0">
        <div class="hidden lg:block p-2 rounded-xl shadow-inner shadow-black" :class="{ 'bg-white':thmeeStore.theme === 'light', 'bg-[#323232]': thmeeStore.theme === 'dark' }">
            <p class="text-3xl text-purple-400 font-bold font-ubuntu ml-4">Influencer-Sponsor Engagement Platform</p>
            <div class="w-9/12 h-[440px] rounded-lg mx-auto overflow-hidden">
                <img src="../assets/images/WebDevProjects/ISEP.png" 
                    alt="ISEP image" 
                    class="w-full h-full object-fit">
            </div>
            <p class="text-xl text-black font-semibold my-2 ml-4" :class="{ 'text-white': thmeeStore.theme === 'dark' }">This collaboration platform connects influencers with sponsors and sponsorship opportunities.</p>
            <div class="flex justify-center items-center flex-wrap gap-4 p-2">
                <div class="relative group shadow-inner shadow-black rounded-full p-3 w-14 h-14">
                    <img src="../assets/images/HTML5.png" alt="HTML5">
                    <div class="absolute bottom-[-26px] left-1/2 transform -translate-x-1/2 text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity" :class="{ 'text-white': thmeeStore.theme === 'dark' }">
                        HTML5
                    </div>
                </div>
                <div class="relative group shadow-inner shadow-black rounded-full p-3 w-14 h-14">
                    <img src="../assets/images/CSS3.png" alt="CSS3">
                    <div class="absolute bottom-[-26px] left-1/2 transform -translate-x-1/2 text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity" :class="{ 'text-white': thmeeStore.theme === 'dark' }">
                        CSS3
                    </div>
                </div>
                <div class="relative group shadow-inner shadow-black rounded-full p-3 w-14 h-14" >
                    <img src="../assets/images/JavaScript.png" alt="JavaScript">
                    <div class="absolute bottom-[-26px] left-1/2 transform -translate-x-1/2 text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity" :class="{'text-white': thmeeStore.theme === 'dark'}">
                        JavaScript
                    </div>
                </div>
                <div class="relative group shadow-inner shadow-black rounded-full p-1 w-14 h-14" >
                    <img src="../assets/images/Flask.png" alt="Flask">
                    <div class="absolute bottom-[-26px] left-1/2 transform -translate-x-1/2 text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity" :class="{'text-white': thmeeStore.theme === 'dark'}">
                        Flask
                    </div>
                </div>
                <div class="relative group shadow-inner shadow-black rounded-full p-3 w-14 h-14" >
                    <img src="../assets/images/SQLite.png" alt="Sqlite">
                    <div class="absolute bottom-[-26px] left-1/2 transform -translate-x-1/2 text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity" :class="{'text-white': thmeeStore.theme === 'dark'}">
                        Sqlite
                    </div>
                </div>
                <div class="relative group shadow-inner shadow-black rounded-full p-3 w-14 h-14" >
                    <img src="../assets/images/Git.png" alt="Git">
                    <div class="absolute bottom-[-26px] left-1/2 transform -translate-x-1/2 text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity" :class="{'text-white': thmeeStore.theme === 'dark'}">
                        Git
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-start mt-6 ml-4 ">
                <p class="text-lg text-red-500 font-semibold font-ubuntu">Find My Work: </p>
                <a href="https://github.com/Jatinbhardwaj-093/Infulencer-Sponsor-Engagement-Platform" class="border-r-2 border-gray-400 px-3 group relative dark:border-purple-500" >
                    <i class="bi bi-github text-black hover:text-purple-500 text-2xl" :class="{'text-white': thmeeStore.theme === 'dark'}"></i>
                    <div class="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                    :class="{'text-white': thmeeStore.theme === 'dark'}">
                        GitHub
                    </div>
                </a>
                <a href="https://drive.google.com/drive/folders/1SLRgwuTLKnKVfdY9br0idI0x_NHyb0Qn?usp=drive_link" class=" px-3 group relative">
                    <svg
                    fill="currentColor"
                    viewBox="0 -1.5 27 27"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 hover:fill-purple-500"
                    :class="{'fill-white': thmeeStore.theme === 'dark'}"
                    >
                    <path
                        d="m9.375 0h8.678l8.735 15.165h-8.628zm1.446 16.393h16.607l-4.339 7.607h-16.607zm-2.571-14.519 4.446 7.607-8.357 14.519-4.339-7.608z"
                    ></path>
                    </svg>
                    <div class="absolute top-[-22px] left-1/2 transform -translate-x-1/2 text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity" :class="{'text-white': thmeeStore.theme === 'dark'}">
                        GDrive
                    </div>
                </a>
            </div>
        </div>
        <div class="block lg:hidden p-2 rounded-xl shadow-inner shadow-black" :class="{ 'bg-white':thmeeStore.theme === 'light', 'bg-[#323232]': thmeeStore.theme === 'dark' }">
            <p class="text-lg text-purple-400 font-bold font-ubuntu ml-4">Influencer-Sponsor Engagement Platform</p>
            <p class="text-sm text-black font-semibold my-2 ml-4" :class="{ 'text-white': thmeeStore.theme === 'dark' }">This collaboration platform connects influencers with sponsors and sponsorship opportunities.</p>
            <div class="flex items-center justify-start mt-6 ml-4 ">
                <p class="text-md text-red-500 font-semibold font-ubuntu">Find My Work: </p>
                <a href="https://github.com/Jatinbhardwaj-093/Infulencer-Sponsor-Engagement-Platform" class="border-r-2 border-gray-400 px-3 group relative dark:border-purple-500" >
                    <i class="bi bi-github text-black hover:text-purple-500 text-xl" :class="{'text-white': thmeeStore.theme === 'dark'}"></i>
                    <div class="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                    :class="{'text-white': thmeeStore.theme === 'dark'}">
                        GitHub
                    </div>
                </a>
                <a href="https://drive.google.com/drive/folders/1SLRgwuTLKnKVfdY9br0idI0x_NHyb0Qn?usp=drive_link" class=" px-3 group relative">
                    <svg
                    fill="currentColor"
                    viewBox="0 -1.5 27 27"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 hover:fill-purple-500"
                    :class="{'fill-white': thmeeStore.theme === 'dark'}"
                    >
                    <path
                        d="m9.375 0h8.678l8.735 15.165h-8.628zm1.446 16.393h16.607l-4.339 7.607h-16.607zm-2.571-14.519 4.446 7.607-8.357 14.519-4.339-7.608z"
                    ></path>
                    </svg>
                    <div class="absolute top-[-22px] left-1/2 transform -translate-x-1/2 text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity" :class="{'text-white': thmeeStore.theme === 'dark'}">
                        GDrive
                    </div>
                </a>
            </div>
        </div>

        <div class="hidden lg:block p-2 rounded-xl shadow-inner shadow-black" :class="{ 'bg-white':thmeeStore.theme === 'light', 'bg-[#323232]': thmeeStore.theme === 'dark' }">
            <p class="text-3xl text-purple-400 font-bold font-ubuntu ml-4">HouseHold Service Platform</p>
            <div class="w-9/12 h-[440px] rounded-lg mx-auto overflow-hidden">
                <img src="../assets/images/WebDevProjects/HSP.png" 
                    alt="HSP image" 
                    class="w-full h-full object-fit">
            </div>
            <p class="text-xl text-black font-semibold my-2 ml-4" :class="{'text-white': thmeeStore.theme === 'dark'}">This booking service platform helps users find household services.</p>
            <div class="flex justify-center items-center flex-wrap gap-4 p-2">
                <div class="relative group shadow-inner shadow-black rounded-full p-3 w-14 h-14" >
                    <img src="../assets/images/Vue.js.png" alt="Vue">
                    <div class="absolute bottom-[-26px] left-1/2 transform -translate-x-1/2 text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity" :class="{'text-white': thmeeStore.theme === 'dark'}">
                        Vue
                    </div>
                </div>
                <div class="relative group shadow-inner shadow-black rounded-full p-1 w-14 h-14" >
                    <img src="../assets/images/Flask.png" alt="Flask">
                    <div class="absolute bottom-[-26px] left-1/2 transform -translate-x-1/2 text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity" :class="{'text-white': thmeeStore.theme === 'dark'}">
                        Flask
                    </div>
                </div>
                <div class="relative group shadow-inner shadow-black rounded-full p-3 w-14 h-14" >
                    <img src="../assets/images/SQLite.png" alt="Sqlite">
                    <div class="absolute bottom-[-26px] left-1/2 transform -translate-x-1/2 text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity" :class="{'text-white': thmeeStore.theme === 'dark'}">
                        Sqlite
                    </div>
                </div>
                <div class="relative group shadow-inner shadow-black rounded-full p-3 w-14 h-14" >
                    <img src="../assets/images/Redis.png" alt="Redis">
                    <div class="absolute bottom-[-26px] left-1/2 transform -translate-x-1/2 text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity" :class="{'text-white': thmeeStore.theme === 'dark'}">
                        Redis
                    </div>
                </div>
                <div class="relative group shadow-inner shadow-black rounded-full p-3 w-14 h-14" >
                    <img src="../assets/images/Celery.png" alt="Celery">
                    <div class="absolute bottom-[-26px] left-1/2 transform -translate-x-1/2 text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity" :class="{'text-white': thmeeStore.theme === 'dark'}">
                        Celery
                    </div>
                </div>
                <div class="relative group shadow-inner shadow-black rounded-full p-3 w-14 h-14" >
                    <img src="../assets/images/Git.png" alt="Git">
                    <div class="absolute bottom-[-26px] left-1/2 transform -translate-x-1/2 text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity" :class="{'text-white': thmeeStore.theme === 'dark'}">
                        Git
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-start mt-6 ml-4">
                <p class="text-lg text-red-500 font-semibold font-ubuntu dark:text-red-400">Find My Work: </p>
                <a href="https://github.com/Jatinbhardwaj-093/HouseHold-Service-Platform" class="border-r-2 border-gray-400 px-3 group relative dark:border-purple-500" >
                    <i class="bi bi-github text-black hover:text-purple-500 text-2xl " :class="{'text-white': thmeeStore.theme === 'dark'}"></i>
                    <div class="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity" :class="{'text-white': thmeeStore.theme === 'dark'}">
                        GitHub
                    </div>
                </a>
                <a href="https://drive.google.com/drive/folders/1YR5UsPf4jtXYstgQJDPUFEjy33uew83I?usp=drive_link" class="border-r-2 border-gray-400 px-3 group relative dark:border-purple-500">
                    <svg
                    fill="currentColor"
                    viewBox="0 -1.5 27 27"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 hover:fill-purple-500"
                    :class="{'fill-white': thmeeStore.theme === 'dark'}"
                    >
                    <path
                        d="m9.375 0h8.678l8.735 15.165h-8.628zm1.446 16.393h16.607l-4.339 7.607h-16.607zm-2.571-14.519 4.446 7.607-8.357 14.519-4.339-7.608z"
                    ></path>
                    </svg>
                    <div class="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity
                    dark:text-white"
                    :class="{'text-white': thmeeStore.theme === 'dark'}">
                        GDrive
                    </div>
                </a>
                <a href="https://www.figma.com/design/a5MomTlXdFQ1qz7lAzog7E/Househod-Service-MAD-1?node-id=0-1&t=Xo1ho1DEgCnSpn03-1" class="px-3 group relative">
                    <svg
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-7 h-7 fill-white hover:stroke-purple-500"
                    :class="{'stroke-white': thmeeStore.theme === 'dark', 'stroke-black': thmeeStore.theme === 'light'}"
                    >
                    <circle
                        cx="512"
                        cy="512"
                        r="512"
                        class=" hover:fill-purple-500"
                        :class="{'fill-black':thmeeStore.theme === 'light', 'fill-white': thmeeStore.theme === 'dark'}"
                    ></circle>
                    <path
                        d="M512 512c0-47.1 38.2-85.3 85.3-85.3s85.3 38.2 85.3 85.3-38.2 85.3-85.3 85.3S512 559.1 512 512zM341.3 682.7c0-47.1 38.2-85.3 85.3-85.3H512v85.3c0 47.1-38.2 85.3-85.3 85.3s-85.4-38.2-85.4-85.3zM512 256v170.7h85.3c47.1 0 85.3-38.2 85.3-85.3S644.5 256 597.3 256H512zm-170.7 85.3c0 47.1 38.2 85.3 85.3 85.3H512V256h-85.3c-47.2 0-85.4 38.2-85.4 85.3zm0 170.7c0 47.1 38.2 85.3 85.3 85.3H512V426.7h-85.3c-47.2 0-85.4 38.2-85.4 85.3z"
                        :class="{'fill-black': thmeeStore.theme === 'dark', 'fill-white': thmeeStore.theme === 'light'}"
                    ></path>
                    </svg>

                    <div class="absolute top-[-22px] left-1/2 transform -translate-x-1/2  text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity
                    dark:text-white"
                    :class="{'text-black': thmeeStore.theme === 'light', 'text-white': thmeeStore.theme === 'dark'}">
                        Figma
                    </div>
                </a>
            </div>
        </div>
        <div class="block lg:hidden p-2 rounded-xl shadow-inner shadow-black" :class="{ 'bg-white':thmeeStore.theme === 'light', 'bg-[#323232]': thmeeStore.theme === 'dark' }">
            <p class="text-xl text-purple-400 font-bold font-ubuntu ml-4">HouseHold Service Platform</p>
            <p class="text-sm text-black font-semibold my-2 ml-4" :class="{'text-white': thmeeStore.theme === 'dark'}">This booking service platform helps users find household services.</p>
            <div class="flex items-center justify-start mt-6 ml-4">
                <p class="text-md text-red-500 font-semibold font-ubuntu dark:text-red-400">Find My Work: </p>
                <a href="https://github.com/Jatinbhardwaj-093/HouseHold-Service-Platform" class="border-r-2 border-gray-400 px-3 group relative dark:border-purple-500" >
                    <i class="bi bi-github text-black hover:text-purple-500 text-xl " :class="{'text-white': thmeeStore.theme === 'dark'}"></i>
                    <div class="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity" :class="{'text-white': thmeeStore.theme === 'dark'}">
                        GitHub
                    </div>
                </a>
                <a href="https://drive.google.com/drive/folders/1YR5UsPf4jtXYstgQJDPUFEjy33uew83I?usp=drive_link" class="border-r-2 border-gray-400 px-3 group relative dark:border-purple-500">
                    <svg
                    fill="currentColor"
                    viewBox="0 -1.5 27 27"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 hover:fill-purple-500"
                    :class="{'fill-white': thmeeStore.theme === 'dark'}"
                    >
                    <path
                        d="m9.375 0h8.678l8.735 15.165h-8.628zm1.446 16.393h16.607l-4.339 7.607h-16.607zm-2.571-14.519 4.446 7.607-8.357 14.519-4.339-7.608z"
                    ></path>
                    </svg>
                    <div class="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity
                    dark:text-white"
                    :class="{'text-white': thmeeStore.theme === 'dark'}">
                        GDrive
                    </div>
                </a>
                <a href="https://www.figma.com/design/a5MomTlXdFQ1qz7lAzog7E/Househod-Service-MAD-1?node-id=0-1&t=Xo1ho1DEgCnSpn03-1" class="px-3 group relative">
                    <svg
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 fill-white hover:stroke-purple-500"
                    :class="{'stroke-white': thmeeStore.theme === 'dark', 'stroke-black': thmeeStore.theme === 'light'}"
                    >
                    <circle
                        cx="512"
                        cy="512"
                        r="512"
                        class=" hover:fill-purple-500"
                        :class="{'fill-black':thmeeStore.theme === 'light', 'fill-white': thmeeStore.theme === 'dark'}"
                    ></circle>
                    <path
                        d="M512 512c0-47.1 38.2-85.3 85.3-85.3s85.3 38.2 85.3 85.3-38.2 85.3-85.3 85.3S512 559.1 512 512zM341.3 682.7c0-47.1 38.2-85.3 85.3-85.3H512v85.3c0 47.1-38.2 85.3-85.3 85.3s-85.4-38.2-85.4-85.3zM512 256v170.7h85.3c47.1 0 85.3-38.2 85.3-85.3S644.5 256 597.3 256H512zm-170.7 85.3c0 47.1 38.2 85.3 85.3 85.3H512V256h-85.3c-47.2 0-85.4 38.2-85.4 85.3zm0 170.7c0 47.1 38.2 85.3 85.3 85.3H512V426.7h-85.3c-47.2 0-85.4 38.2-85.4 85.3z"
                        :class="{'fill-black': thmeeStore.theme === 'dark', 'fill-white': thmeeStore.theme === 'light'}"
                    ></path>
                    </svg>

                    <div class="absolute top-[-22px] left-1/2 transform -translate-x-1/2  text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity
                    dark:text-white"
                    :class="{'text-black': thmeeStore.theme === 'light', 'text-white': thmeeStore.theme === 'dark'}">
                        Figma
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>
</template>