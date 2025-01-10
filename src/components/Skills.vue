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
      Skills
    </p>

    <div class="sm:block hidden">
      <div class="flex items-center justify-start flex-wrap gap-5 mt-3">
        <!-- Programming Language -->
        <div
          class="p-4 rounded-xl shadow-inner shadow-black"
          :class="{
            'bg-[#323232]': themeStore.theme === 'dark',
            'bg-gray-50': themeStore.theme === 'light',
          }"
        >
          <p
            class="text-xl font-bold mb-2 text-black"
            :class="{ 'text-white': themeStore.theme === 'dark' }"
          >
            Programming Language
          </p>
          <div class="flex items-center justify-center gap-2 flext-wrap">
            <!-- Python -->
            <a
              href="https://www.python.org/about/gettingstarted/"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center flex-col gap-1 hover:scale-110 transform transition-transform duration-300"
            >
              <div
                class="flex items-center p-1 w-14 h-14 rounded-full shadow-md shadow-black group-hover:shadow-inner group-hover:shadow-black"
              >
                <img
                  src="../assets/images/Python.png"
                  alt="Python Logo"
                  class="w-full h-full"
                />
              </div>
              <p
                class="font-semibold text-black group-hover:text-blue-700"
                :class="{ 'text-white': themeStore.theme === 'dark' }"
              >
                Python
              </p>
            </a>
            <!-- JavaScript -->
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center flex-col gap-1 hover:scale-110 transform transition-transform duration-300"
            >
              <div
                class="flex items-center p-3 w-14 h-14 rounded-full shadow-md shadow-black group-hover:shadow-inner group-hover:shadow-black"
              >
                <img
                  src="../assets/images/JavaScript.png"
                  alt="JavaScript Logo"
                  class="w-full h-full"
                />
              </div>
              <p
                class="font-semibold text-black group-hover:text-yellow-400"
                :class="{ 'text-white': themeStore.theme === 'dark' }"
              >
                JS
              </p>
            </a>
            <!-- C -->
            <a
              href="https://www.geeksforgeeks.org/c-language-introduction/"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center flex-col gap-1 hover:scale-110 transform transition-transform duration-300"
            >
              <div
                class="flex items-center p-2 w-14 h-14 rounded-full shadow-md shadow-black group-hover:shadow-inner group-hover:shadow-black"
              >
                <img
                  src="../assets/images/C.png"
                  alt="C Logo"
                  class="w-full h-full"
                />
              </div>
              <p
                class="font-semibold text-black group-hover:text-blue-400"
                :class="{ 'text-white': themeStore.theme === 'dark' }"
              >
                C
              </p>
            </a>
            <!-- C++ -->
            <a
              href="https://www.geeksforgeeks.org/introduction-to-c-programming-language/"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center flex-col gap-1 hover:scale-110 transform transition-transform duration-300"
            >
              <div
                class="flex items-center p-2 w-14 h-14 rounded-full shadow-md shadow-black group-hover:shadow-inner group-hover:shadow-black"
              >
                <img
                  src="../assets/images/C++.png"
                  alt="C++ Logo"
                  class="w-full h-full"
                />
              </div>
              <p
                class="font-semibold text-black group-hover:text-blue-400"
                :class="{ 'text-white': themeStore.theme === 'dark' }"
              >
                C++
              </p>
            </a>
          </div>
        </div>
        <!-- VCS -->
        <div
          class="p-4 rounded-xl shadow-inner shadow-black dark:bg"
          :class="{
            'bg-[#323232]': themeStore.theme === 'dark',
            'bg-gray-50': themeStore.theme === 'light',
          }"
        >
          <p
            class="text-xl font-bold mb-2 text-black"
            :class="{ 'text-white': themeStore.theme === 'dark' }"
          >
            VCS
          </p>
          <div class="flex items-center justify-center gap-2 flext-wrap">
            <!-- Git -->
            <a
              href="https://git-scm.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center flex-col gap-1 hover:scale-110 transform transition-transform duration-300"
            >
              <div
                class="flex items-center p-3 w-14 h-14 rounded-full shadow-md shadow-black group-hover:shadow-inner group-hover:shadow-black"
              >
                <img
                  src="../assets/images/Git.png"
                  alt="Git Logo"
                  class="w-full h-full"
                />
              </div>
              <p
                class="font-semibold text-black group-hover:text-orange-500"
                :class="{ 'text-white': themeStore.theme === 'dark' }"
              >
                Git
              </p>
            </a>
            <!-- GitHub -->
            <a
              href="https://docs.github.com/en/get-started/start-your-journey/hello-world"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center flex-col gap-1 hover:scale-110 transform transition-transform duration-300"
            >
              <div
                class="flex items-center p-3 w-14 h-14 rounded-full shadow-md shadow-black group-hover:shadow-inner group-hover:shadow-black"
              >
                <img
                  src="../assets/images/GitHub.png"
                  alt="GitHub Logo"
                  class="w-full h-full"
                />
              </div>
              <p
                class="font-semibold text-black group-hover:text-black"
                :class="{ 'text-white': themeStore.theme === 'dark' }"
              >
                GitHub
              </p>
            </a>
          </div>
        </div>

        <!-- DevOps -->
        <div
          class="p-4 rounded-xl shadow-inner shadow-black"
          :class="{
            'bg-[#323232]': themeStore.theme === 'dark',
            'bg-gray-50': themeStore.theme === 'light',
          }"
        >
          <p
            class="text-xl font-bold mb-2 text-black"
            :class="{ 'text-white': themeStore.theme === 'dark' }"
          >
            DevOps
          </p>
          <div class="flex items-center justify-center gap-2 flext-wrap">
            <!-- Docker -->
            <a
              href="https://docs.docker.com/get-started/introduction/"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center flex-col gap-1 hover:scale-110 transform transition-transform duration-300"
            >
              <div
                class="flex items-center p-1 w-14 h-14 rounded-full shadow-md shadow-black group-hover:shadow-inner group-hover:shadow-black"
              >
                <img
                  src="../assets/images/Docker.png"
                  alt="Docker Logo"
                  class="w-full h-full"
                />
              </div>
              <p
                class="font-semibold text-black group-hover:text-blue-500"
                :class="{ 'text-white': themeStore.theme === 'dark' }"
              >
                Docker
              </p>
            </a>
            <!-- Kubernetes -->
            <a
              href="https://kubernetes.io/docs/tutorials/kubernetes-basics/"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center flex-col gap-1 hover:scale-110 transform transition-transform duration-300"
            >
              <div
                class="flex items-center p-2 w-14 h-14 rounded-full shadow-md shadow-black group-hover:shadow-inner group-hover:shadow-black"
              >
                <img
                  src="../assets/images/Kubernetes.png"
                  alt="Kubernetes Logo"
                  class="w-full h-full"
                />
              </div>
              <p
                class="font-semibold text-black group-hover:text-blue-500"
                :class="{ 'text-white': themeStore.theme === 'dark' }"
              >
                Kubernetes
              </p>
            </a>
          </div>
        </div>

        <!-- Backend -->
        <div
          class="p-4 rounded-xl shadow-inner shadow-black"
          :class="{
            'bg-[#323232]': themeStore.theme === 'dark',
            'bg-gray-50': themeStore.theme === 'light',
          }"
        >
          <p
            class="text-xl font-bold mb-2 text-black"
            :class="{ 'text-white': themeStore.theme === 'dark' }"
          >
            Backend
          </p>
          <div class="flex items-center justify-center gap-2 flext-wrap">
            <!-- flask -->
            <a
              href="https://flask.palletsprojects.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center flex-col gap-1 hover:scale-110 transform transition-transform duration-300"
            >
              <div
                class="flex items-center p-1 w-14 h-14 rounded-full shadow-md shadow-black group-hover:shadow-inner group-hover:shadow-black"
              >
                <img
                  src="../assets/images/Flask.png"
                  alt="Flask Logo"
                  class="w-full h-full"
                />
              </div>
              <p
                class="font-semibold text-black"
                :class="{ 'text-white': themeStore.theme === 'dark' }"
              >
                Flask
              </p>
            </a>
            <!-- Django -->
            <a
              href="https://www.djangoproject.com/start/"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center flex-col gap-1 hover:scale-110 transform transition-transform duration-300"
            >
              <div
                class="flex items-center p-3 w-14 h-14 rounded-full shadow-md shadow-black group-hover:shadow-inner group-hover:shadow-black"
              >
                <img
                  src="../assets/images/Django.png"
                  alt="Django Logo"
                  class="w-full h-full"
                />
              </div>
              <p
                class="font-semibold text-black group-hover:text-green-900"
                :class="{ 'text-white': themeStore.theme === 'dark' }"
              >
                Django
              </p>
            </a>
          </div>
        </div>

        <!-- Frontend -->
        <div
          class="hidden md:block lg:block p-4 rounded-xl shadow-inner shadow-black"
          :class="{
            'bg-[#323232]': themeStore.theme === 'dark',
            'bg-gray-50': themeStore.theme === 'light',
          }"
        >
          <p
            class="text-xl font-bold mb-2 text-black"
            :class="{ 'text-white': themeStore.theme === 'dark' }"
          >
            Frontend
          </p>
          <div class="flex items-center justify-center gap-2 flext-wrap">
            <!-- Vue -->
            <a
              href="https://vuejs.org/guide/introduction.html"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center flex-col gap-1 hover:scale-110 transform transition-transform duration-300"
            >
              <div
                class="flex items-center p-3 w-14 h-14 rounded-full shadow-md shadow-black group-hover:shadow-inner group-hover:shadow-black"
              >
                <img
                  src="../assets/images/Vue.js.png"
                  alt="Vue Logo"
                  class="w-full h-full"
                />
              </div>
              <p
                class="font-semibold text-black group-hover:text-green-700"
                :class="{ 'text-white': themeStore.theme === 'dark' }"
              >
                Vue
              </p>
            </a>
            <!-- Tailwind -->
            <a
              href="https://tailwindcss.com/docs/installation"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center flex-col gap-1 hover:scale-110 transform transition-transform duration-300"
            >
              <div
                class="flex items-center p-2 w-14 h-14 rounded-full shadow-md shadow-black group-hover:shadow-inner group-hover:shadow-black"
              >
                <img
                  src="../assets/images/Tailwind.png"
                  alt="Tailwind Logo"
                  class="w-full h-full"
                />
              </div>
              <p
                class="font-semibold text-black group-hover:text-blue-400"
                :class="{ 'text-white': themeStore.theme === 'dark' }"
              >
                Tailwind
              </p>
            </a>
          </div>
        </div>

        <!-- Database -->
        <div
          class="p-4 rounded-xl shadow-inner shadow-black"
          :class="{
            'bg-[#323232]': themeStore.theme === 'dark',
            'bg-gray-50': themeStore.theme === 'light',
          }"
        >
          <p
            class="text-xl font-bold mb-2 text-black"
            :class="{ 'text-white': themeStore.theme === 'dark' }"
          >
            Database
          </p>
          <div class="flex items-center justify-center gap-2 flext-wrap">
            <!-- SQL -->
            <a
              href="https://www.geeksforgeeks.org/sql-tutorial/"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center flex-col gap-1 hover:scale-110 transform transition-transform duration-300"
            >
              <div
                class="flex items-center p-3 w-14 h-14 rounded-full shadow-md shadow-black group-hover:shadow-inner group-hover:shadow-black"
              >
                <img
                  src="../assets/images/SQLDb.png"
                  alt="SQLDb Logo"
                  class="w-full h-full"
                />
              </div>
              <p
                class="font-semibold text-black group-hover:text-gray-600"
                :class="{ 'text-white': themeStore.theme === 'dark' }"
              >
                SQL
              </p>
            </a>

            <!-- MongDB -->
            <a
              href="https://www.mongodb.com/docs/manual/introduction/"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center flex-col gap-1 hover:scale-110 transform transition-transform duration-300"
            >
              <div
                class="flex items-center p-2 w-14 h-14 rounded-full shadow-md shadow-black group-hover:shadow-inner group-hover:shadow-black"
              >
                <img
                  src="../assets/images/MongoDB.png"
                  alt="MongoDB Logo"
                  class="w-full h-full"
                />
              </div>
              <p
                class="font-semibold text-black group-hover:text-green-600"
                :class="{ 'text-white': themeStore.theme === 'dark' }"
              >
                MongoDB
              </p>
            </a>
            <!-- Redis -->
            <a
              href="https://redis.io/learn/develop/node/nodecrashcourse/whatisredis"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center flex-col gap-1 hover:scale-110 transform transition-transform duration-300"
            >
              <div
                class="flex items-center p-2 w-14 h-14 rounded-full shadow-md shadow-black group-hover:shadow-inner group-hover:shadow-black"
              >
                <img
                  src="../assets/images/Redis.png"
                  alt="Redis Logo"
                  class="w-full h-full"
                />
              </div>
              <p
                class="font-semibold text-black group-hover:text-red-600"
                :class="{ 'text-white': themeStore.theme === 'dark' }"
              >
                Redis
              </p>
            </a>
            <!-- GraphQL -->
            <a
              href="https://redis.io/learn/develop/node/nodecrashcourse/whatisredis"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center flex-col gap-1 hover:scale-110 transform transition-transform duration-300"
            >
              <div
                class="flex items-center p-2 w-14 h-14 rounded-full shadow-md shadow-black group-hover:shadow-inner group-hover:shadow-black"
              >
                <img
                  src="../assets/images/GraphQL.png"
                  alt="GraphQL Logo"
                  class="w-full h-full"
                />
              </div>
              <p
                class="font-semibold text-black group-hover:text-pink-400"
                :class="{ 'text-white': themeStore.theme === 'dark' }"
              >
                GraphQL
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
      <!-- Mobile version -->
    <div class="sm:hidden block">
      <div
          class="p-4 rounded-xl shadow-inner shadow-black"
          :class="{
            'bg-[#323232]': themeStore.theme === 'dark',
            'bg-gray-50': themeStore.theme === 'light',
          }"
        >
        <div class="flex items-center justify-start gap-2 mb-1">
          <p class="text-md font-bold text-purple-500"
          :class="{'text-purple-600': themeStore.theme==='dark'}">Languages:</p>
          <p class="text-sm text-black"
          :class="{ 'text-white': themeStore.theme === 'dark' }">Python | JavaScript | C | C++</p>
        </div>
        <div class="flex items-center justify-start gap-2 mb-1">
          <p class="text-md font-bold text-purple-500"
          :class="{'text-purple-600': themeStore.theme==='dark'}">Frontend:</p>
          <p class="text-sm text-black"
          :class="{ 'text-white': themeStore.theme === 'dark' }">Vue | jQuery | Tailwind | Bootstrap</p>
        </div>
        <div class="flex items-center justify-start gap-2 mb-1">
          <p class="text-md font-bold text-purple-500"
          :class="{'text-purple-600': themeStore.theme==='dark'}">Backend:</p>
          <p class="text-sm text-black"
          :class="{ 'text-white': themeStore.theme === 'dark' }">Flask | Django</p>
        </div>
        <div class="flex items-center justify-start gap-2 mb-1">
          <p class="text-md font-bold text-purple-500"
          :class="{'text-purple-600': themeStore.theme==='dark'}">Databases:</p>
          <p class="text-sm text-black"
          :class="{ 'text-white': themeStore.theme === 'dark' }">MongoDB | Redis | SQL| GraphQL</p>
        </div>
        <div class="flex items-center justify-start gap-2 mb-1">
          <p class="text-md font-bold text-purple-500"
          :class="{'text-purple-600': themeStore.theme==='dark'}">VCS:</p>
          <p class="text-sm text-black"
          :class="{ 'text-white': themeStore.theme === 'dark' }">Git | GitHub</p>
        </div>
        <div class="flex items-center justify-start gap-2 mb-1">
          <p class="text-md font-bold text-purple-500"
          :class="{'text-purple-600': themeStore.theme==='dark'}">DevOps:</p>
          <p class="text-sm text-black"
          :class="{ 'text-white': themeStore.theme === 'dark' }">Docker | Kubernetes</p>
        </div>
      </div>
    </div>
  </div>
</template>
