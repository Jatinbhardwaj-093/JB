<script setup lang="ts">
import { ref } from 'vue';

interface Blog {
    heading: string;
    content: string;
    link: string;
}

const BlogList = ref<Blog[]>([
    {
        heading: 'Sympy 3D Geometry Extension',
        content: 'A 3D geometry extension for Sympy',
        link: 'https://jatinbhardwaj-093.github.io/JB-blog/'
    },
]);
</script>

<template>
    <div>
        <div class="mx-auto w-[70vw] mt-24">
            <div class="flex flex-col items-center gap-7">
                <!-- Blogs List -->
                <div v-for="(blog, index) in BlogList" :key="index" class="mb-6">
                    <a :href="blog.link">
                        <div
                            class="w-[60vw] h-60 mx-auto p-4 flex flex-col items-center justify-center bg-purple-500 rounded-lg hover:bg-purple-600 transition ease-in-out duration-300 transform hover:scale-105 cursor-pointer">
                            <p class="lg:text-3xl font-bold text-white md:text-xl sm:text-lg">
                                {{ blog.heading }}
                            </p>
                            <p class="lg:text-lg text-white mt-4 md:text-md sm:text-sm">
                                {{ blog.content }} ---->
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
