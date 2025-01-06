<template>
    <div class="flex items-center justify-start gap-x-3 sm:gap-x-4 md:gap-x-6 lg:gap-x-8">
        <a href="https://www.linkedin.com/in/jatin-bhardwaj-b5962921a/">
            <div class="group relative flex items-center justify-center bg-gray-300 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg
                hover:bg-gray-100 hover:transform hover:scale-110 hover:duration-300 hover:transition-ease-in-out hover:shadow-inner hover:shadow-purple-400
                cursor-pointer">
                <i class="bi bi-linkedin text-2xl sm:text-3xl md:text-4xl text-gray-600 group-hover:text-purple-600"></i>
                <span class="absolute opacity-0 group-hover:opacity-100 text-purple-600 text-xs sm:text-sm md:text-base font-semibold mt-1
                    transition-opacity duration-300 top-full">
                    LinkedIn
                </span>
            </div>
        </a>

        <a href="https://github.com/Jatinbhardwaj-093">
            <div class="group relative flex items-center justify-center bg-gray-300 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg
                hover:bg-gray-100 hover:transform hover:scale-110 hover:duration-300 hover:transition-ease-in-out hover:shadow-inner hover:shadow-purple-400
                cursor-pointer">
                <i class="bi bi-github text-2xl sm:text-3xl md:text-4xl text-gray-600 group-hover:text-purple-600"></i>
                <span class="absolute opacity-0 group-hover:opacity-100 text-purple-600 text-xs sm:text-sm md:text-base font-semibold mt-1
                    transition-opacity duration-300 top-full">
                    GitHub
                </span>
            </div>
        </a>
        <a href="https://x.com/Jatin0932">
            <div class="group relative flex items-center justify-center bg-gray-300 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg
                hover:bg-gray-100 hover:transform hover:scale-110 hover:duration-300 hover:transition-ease-in-out hover:shadow-inner hover:shadow-purple-400
                cursor-pointer">
                <i class="bi bi-twitter-x text-2xl sm:text-3xl md:text-4xl text-gray-600 group-hover:text-purple-600"></i>
                <span class="absolute opacity-0 group-hover:opacity-100 text-purple-600 text-xs sm:text-sm md:text-base font-semibold mt-1
                    transition-opacity duration-300 top-full">
                    X
                </span>
            </div>
        </a>
        <a :href="`https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=bhardwajjatin093@gmail.com&su=${encodeURIComponent('Hello')}&body=${encodeURIComponent('I wanted to ask about...')}`" target="_blank" rel="noopener noreferrer">
            <div class="group relative flex items-center justify-center bg-gray-300 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg
                hover:bg-gray-100 hover:transform hover:scale-110 hover:duration-300 hover:transition-ease-in-out hover:shadow-inner hover:shadow-purple-400
                cursor-pointer">
                <svg
                fill="#4b5563"
                viewBox="0 0 24 24"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                class="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 group-hover:fill-purple-600"
                >
                <path
                    d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
                ></path>
                </svg>
                <span class="absolute opacity-0 group-hover:opacity-100 text-purple-600 text-xs sm:text-sm md:text-base font-semibold mt-1
                    transition-opacity duration-300 top-full">
                    G Mail
                </span>
            </div>
        </a>
    </div>
</template>