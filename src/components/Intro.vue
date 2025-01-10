<script setup lang="ts">
import { ref, Ref, onMounted } from "vue";
import ContactLink from "./ContactLink.vue";

interface MyData {
  firstName: string;
  lastName: string;
}

const myData: Ref<MyData> = ref({
  firstName: "Jatin",
  lastName: "Bhardwaj",
});

const showText = ref(false);

onMounted(() => {
  setTimeout(() => {
    showText.value = true;
  }, 500);
});
</script>

<template>
  <div>
    <!-- Mobile version -->
    <div class="lg:hidden flex flex-col items-center ">
    <!-- profileImage -->
      <img src="../assets/images/profileImage/myimage2.png" class="rounded-full object-cover object-center h-48 w-48 text-center" alt="img">
      <div class="mt-4">
        <span
          class="text-3xl sm:text-3xl text-black font-bold dark:text-white"
        >
          {{ myData.firstName }}
        </span>
        <span
          class="text-2xl sm:text-3xl text-purple-600 font-bold ml-1 dark:text-purple-500"
        >
          {{ myData.lastName }}
        </span>
      </div>
      <div class="text-lg sm:text-xl text-red-600 dark:text-red-400">
        Web Development |  Data Science | ML 
      </div>
      <div
        class="flex flex-row items-center justify-start space-x-6"
      >
        <div
          class="bg-purple-600 text-white px-6 py-2 rounded-xl mt-8 w-auto shadow-lg shadow-black flex items-center justify-center hover:transform hover:transform-ease-in-out hover:scale-105 cursor-pointer"
          @click="$router.push('/about')"
        >
          <i class="bi bi-person-lines-fill text-md mr-2"></i>
          <span class="font-bold text-sm sm:text-base text-white">
          About
          </span>
        </div>
        <div
          class="bg-purple-600 text-white px-6 py-2 rounded-xl mt-8 w-auto shadow-lg shadow-black flex items-center justify-center hover:transform hover:transform-ease-in-out hover:scale-105 cursor-pointer"
          @click="$router.push('/contact')"
        >
          <i class="bi bi-envelope-at-fill text-md mr-2"></i>
          <span class="font-bold text-sm sm:text-base text-white">
          Contact
          </span>
        </div>
      </div>
      <div class="mt-8 sm:mt-16 w-min ">
        <ContactLink />
      </div>
    </div>

    <!-- Desktop version with all its content -->
    <div class="hidden lg:block">
      <!-- Rotating name on left -->
      <div class="absolute top-1/4 left-[-20px] transform rotate-90 text-3xl text-purple-500 font-bold font-ubuntu">
        <span class="typewriter">Jatin Bhardwaj</span>
      </div>

      <!-- Profile image -->
      <img
        src="../assets/images/profileImage/myimage.png"
        alt=""
        class="absolute top-1/2 left-1/2 transform -translate-x-[45%] -translate-y-1/3 z-10 h-[600px]"
      />

      <!-- Purple circle background -->
      <div
        class="rounded-full bg-purple-600 shadow-lg shadow-black h-[500px] w-[500px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
      >
        <!-- Orbit rings -->
        <div class="orbit-ring ring-1">
          <img src="../assets/images/C.png" alt="C Logo" class="tech-icon" />
          <img src="../assets/images/C++.png" alt="C++ Logo" class="tech-icon" />
          <img
            src="../assets/images/Python.png"
            alt="Python Logo"
            class="tech-icon"
          />
          <img
            src="../assets/images/JavaScript.png"
            alt="JavaScript Logo"
            class="tech-icon"
          />
          <img
            src="../assets/images/HTML5.png"
            alt="HTML5 Logo"
            class="tech-icon"
          />
          <img
            src="../assets/images/CSS3.png"
            alt="CSS3 Logo"
            class="tech-icon"
          />
        </div>

        <div class="orbit-ring ring-2">
          <img
            src="../assets/images/Vue.js.png"
            alt="Vue Logo"
            class="tech-icon"
          />
          <img
            src="../assets/images/Flask.png"
            alt="Flask Logo"
            class="tech-icon"
          />
          <img
            src="../assets/images/SQLite.png"
            alt="SQLite Logo"
            class="tech-icon"
          />
          <img
            src="../assets/images/PyTorch.png"
            alt="PyTorch Logo"
            class="tech-icon"
          />
          <img
            src="../assets/images/TensorFlow.png"
            alt="TensorFlow Logo"
            class="tech-icon"
          />
          <img
            src="../assets/images/NumPy.png"
            alt="NumPy Logo"
            class="tech-icon"
          />
          <img
            src="../assets/images/Django.png"
            alt="Django Logo"
            class="tech-icon"
          />
          <img
            src="../assets/images/Docker.png"
            alt="Docker Logo"
            class="tech-icon"
          />
        </div>

        <div class="orbit-ring ring-3">
          <img
            src="../assets/images/Pandas.png"
            alt="Pandas Logo"
            class="tech-icon"
          />
          <img
            src="../assets/images/Redis.png"
            alt="Redis Logo"
            class="tech-icon"
          />
          <img
            src="../assets/images/Celery.png"
            alt="Celery Logo"
            class="tech-icon"
          />
          <img src="../assets/images/Git.png" alt="Git Logo" class="tech-icon" />
          <img
            src="../assets/images/GitHub.png"
            alt="GitHub Logo"
            class="tech-icon"
          />
          <img
            src="../assets/images/Postman.png"
            alt="Postman Logo"
            class="tech-icon"
          />
          <img
            src="../assets/images/Kubernetes.png"
            alt="Kubernetes Logo"
            class="tech-icon"
          />
          <img
            src="../assets/images/GraphQL.png"
            alt="Graphql Logo"
            class="tech-icon"
          />
          <img
            src="../assets/images/TypeScript.png"
            alt="TypeScript Logo"
            class="tech-icon"
          />
          <img
            src="../assets/images/MongoDB.png"
            alt="MongoDB Logo"
            class="tech-icon"
          />
        </div>
      </div>

      <!-- Social links -->
      <div
        class="absolute bottom-0 right-0 flex flex-col items-center gap-y-4 p-4"
      >
        <div class="social-links">
          <a
            href="https://www.linkedin.com/in/jatin-bhardwaj-b5962921a/"
            class="social-link linkedin"
          >
            <svg
              fill="#4b5563"
              viewBox="0 0 24 24"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
            >
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/Jatinbhardwaj-093"
            class="social-link github"
          >
            <svg
              fill="#4b5563"
              viewBox="0 0 24 24"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
            >
              <path
                d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
              />
            </svg>
            <span>GitHub</span>
          </a>
          <a href="https://x.com/Jatin0932" class="social-link twitter">
            <svg
              fill="#4b5563"
              viewBox="0 0 24 24"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
            >
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </svg>
            <span>Twitter</span>
          </a>
          <a
            :href="`https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=bhardwajjatin093@gmail.com&su=${encodeURIComponent(
              'Hello'
            )}&body=${encodeURIComponent('I wanted to ask about...')}`"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link gmail"
          >
            <svg
              fill="#4b5563"
              viewBox="0 0 24 24"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
            >
              <path
                d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
              ></path>
            </svg>
            <span>Gmail</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.orbit-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: none !important;
}

.tech-icon {
  position: absolute;
  width: 32px;
  height: 32px;
  transform-origin: center;
  transition: transform 1s;
  z-index: 2;
}

/* Adjust container to prevent scrolling */
.hidden.lg\:block {
  position: relative;
  width: 100%;
  height: 88vh;
  overflow: hidden;
}

.ring-1 {
  width: 440px;
  height: 440px;
  animation: spin 170s linear infinite;
}

.ring-2 {
  width: 560px;
  height: 560px;
  animation: spin 270s linear infinite;
}

.ring-3 {
  width: 680px;
  height: 680px;
  animation: spin 370s linear infinite;
}

/* Position icons in first ring */
.ring-1 .tech-icon:nth-child(1) {
  transform: translate(-50%, -50%) rotate(0deg) translateY(-320px) rotate(0deg);
}

.ring-1 .tech-icon:nth-child(2) {
  transform: translate(-50%, -50%) rotate(60deg) translateY(-320px)
    rotate(-60deg);
}

.ring-1 .tech-icon:nth-child(3) {
  transform: translate(-50%, -50%) rotate(120deg) translateY(-320px)
    rotate(-120deg);
}

.ring-1 .tech-icon:nth-child(4) {
  transform: translate(-50%, -50%) rotate(180deg) translateY(-320px)
    rotate(-180deg);
}

.ring-1 .tech-icon:nth-child(5) {
  transform: translate(-50%, -50%) rotate(240deg) translateY(-320px)
    rotate(-240deg);
}

.ring-1 .tech-icon:nth-child(6) {
  transform: translate(-50%, -50%) rotate(300deg) translateY(-320px)
    rotate(-300deg);
}

/* Position icons in second ring */
.ring-2 .tech-icon:nth-child(1) {
  transform: translate(-50%, -50%) rotate(0deg) translateY(-380px) rotate(0deg);
}

.ring-2 .tech-icon:nth-child(2) {
  transform: translate(-50%, -50%) rotate(45deg) translateY(-380px)
    rotate(-45deg);
}

.ring-2 .tech-icon:nth-child(3) {
  transform: translate(-50%, -50%) rotate(90deg) translateY(-380px)
    rotate(-90deg);
}

.ring-2 .tech-icon:nth-child(4) {
  transform: translate(-50%, -50%) rotate(135deg) translateY(-380px)
    rotate(-135deg);
}

.ring-2 .tech-icon:nth-child(5) {
  transform: translate(-50%, -50%) rotate(180deg) translateY(-380px)
    rotate(-180deg);
}

.ring-2 .tech-icon:nth-child(6) {
  transform: translate(-50%, -50%) rotate(225deg) translateY(-380px)
    rotate(-225deg);
}

.ring-2 .tech-icon:nth-child(7) {
  transform: translate(-50%, -50%) rotate(270deg) translateY(-380px)
    rotate(-270deg);
}

.ring-2 .tech-icon:nth-child(8) {
  transform: translate(-50%, -50%) rotate(315deg) translateY(-380px)
    rotate(-315deg);
}

/* Position icons in third ring */
.ring-3 .tech-icon:nth-child(1) {
  transform: translate(-50%, -50%) rotate(0deg) translateY(-480px) rotate(0deg);
}

.ring-3 .tech-icon:nth-child(2) {
  transform: translate(-50%, -50%) rotate(36deg) translateY(-480px)
    rotate(-36deg);
}

.ring-3 .tech-icon:nth-child(3) {
  transform: translate(-50%, -50%) rotate(72deg) translateY(-480px)
    rotate(-72deg);
}

.ring-3 .tech-icon:nth-child(4) {
  transform: translate(-50%, -50%) rotate(108deg) translateY(-480px)
    rotate(-108deg);
}

.ring-3 .tech-icon:nth-child(5) {
  transform: translate(-50%, -50%) rotate(144deg) translateY(-480px)
    rotate(-144deg);
}

.ring-3 .tech-icon:nth-child(6) {
  transform: translate(-50%, -50%) rotate(180deg) translateY(-480px)
    rotate(-180deg);
}

.ring-3 .tech-icon:nth-child(7) {
  transform: translate(-50%, -50%) rotate(216deg) translateY(-480px)
    rotate(-216deg);
}

.ring-3 .tech-icon:nth-child(8) {
  transform: translate(-50%, -50%) rotate(252deg) translateY(-480px)
    rotate(-252deg);
}

.ring-3 .tech-icon:nth-child(9) {
  transform: translate(-50%, -50%) rotate(288deg) translateY(-480px)
    rotate(-288deg);
}

.ring-3 .tech-icon:nth-child(10) {
  transform: translate(-50%, -50%) rotate(324deg) translateY(-480px)
    rotate(-324deg);
}

/* Keyframe for orbit rotation */
@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.hidden {
  visibility: hidden;
}

@media (min-width: 1024px) {
  .hidden {
    visibility: visible;
  }
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: fixed;
  right: 2rem;
  bottom: 0.5rem;
  z-index: 50;
}

.social-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  color: #4b5563;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  transition: all 0.8s ease;
}

.social-link svg {
  width: 20px;
  height: 20px;
  transition: all 0.8s ease;
  fill: #4b5563;
}

.social-link span {
  position: absolute;
  right: calc(100% + 10px);
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.8s ease;
  color: #4b5563;
  font-weight: 500;
  font-size: 14px;
  background: inherit;
  padding: 6px 12px;
  border-radius: 15px;
  pointer-events: none;
}

.social-link:hover svg {
  transform: rotate(360deg);
}

.social-link:hover span {
  opacity: 1;
  visibility: visible;
}

.social-link.github:hover {
  background: #171515;
}
.social-link.github:hover svg {
  fill: #fff;
}
.social-link.github:hover span {
  background: #171515;
  color: #fff;
}

.social-link.linkedin:hover {
  background: #0077b5;
}
.social-link.linkedin:hover svg {
  fill: #fff;
}
.social-link.linkedin:hover span {
  background: #0077b5;
  color: #fff;
}

.social-link.gmail:hover {
  background: #ea4335;
}
.social-link.gmail:hover svg {
  fill: #fff;
}
.social-link.gmail:hover span {
  background: #ea4335;
  color: #fff;
}

.social-link.twitter:hover {
  background: #1da1f2;
}
.social-link.twitter:hover svg {
  fill: #fff;
}
.social-link.twitter:hover span {
  background: #1da1f2;
  color: #fff;
}

@media (max-width: 768px) {
  .social-links {
    right: 1rem;
    bottom: 1rem;
  }

  .social-link {
    height: 35px;
    width: 35px;
  }

  .social-link span {
    font-size: 12px;
  }
}

.typewriter {
  display: inline-block;       
  white-space: nowrap;         
  overflow: hidden;            
  border-right: 2px solid purple; 
  animation: typing 3s steps(30, end), blink 0.6s step-end infinite;
}

/* Typewriter effect */
@keyframes typing {
  from {
    width: 0; 
  }
  to {
    width: 100%; 
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
</style>
