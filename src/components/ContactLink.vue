<template>
    <div class="flex items-center justify-start gap-x-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-10">
        <a v-for="(link, index) in socialLinks" 
           :key="index"
           :href="link.url"
           :target="link.target"
           :rel="link.rel"
           class="social-link">
            <div class="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18
                bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl
                transform transition-all duration-300 ease-in-out
                hover:from-purple-50 hover:to-purple-100 hover:scale-110
                hover:shadow-lg hover:shadow-purple-200/50
                dark:from-gray-800 dark:to-gray-900 
                dark:hover:from-purple-700 dark:hover:to-purple-300
                dark:hover:shadow-black">
                
                <svg v-if="link.icon === 'gmail'"
                    viewBox="0 0 24 24"
                    class="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 
                    fill-gray-600 group-hover:fill-purple-600 transition-colors duration-300
                    dark:fill-gray-300 dark:group-hover:fill-purple-200">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
                
                <i v-else :class="link.icon" 
                    class="text-2xl sm:text-3xl md:text-4xl text-gray-600 
                    group-hover:text-purple-600 transition-colors duration-300
                    dark:text-gray-300 dark:group-hover:text-purple-200"></i>

                <span class="absolute -bottom-8 opacity-0 group-hover:opacity-100 
                    text-purple-600 font-medium text-sm sm:text-base
                    transform transition-all duration-300 group-hover:-translate-y-1
                    dark:text-purple-200">
                    {{ link.label }}
                </span>
            </div>
        </a>
    </div>
</template>

<script setup>
const socialLinks = [
    {
        url: 'https://www.linkedin.com/in/jatin-bhardwaj-b5962921a/',
        icon: 'bi bi-linkedin',
        label: 'LinkedIn'
    },
    {
        url: 'https://github.com/Jatinbhardwaj-093',
        icon: 'bi bi-github',
        label: 'GitHub'
    },
    {
        url: 'https://x.com/Jatin0932',
        icon: 'bi bi-twitter-x',
        label: 'X'
    },
    {
        url: `https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=bhardwajjatin093@gmail.com&su=${encodeURIComponent('Hello')}&body=${encodeURIComponent('I wanted to ask about...')}`,
        icon: 'gmail',
        label: 'G Mail',
        target: '_blank',
        rel: 'noopener noreferrer'
    }
]
</script>

<style scoped>
.social-link {
    perspective: 1000px;
}

.social-link:hover div {
    transform: scale(1.1) rotateY(10deg);
}
</style>