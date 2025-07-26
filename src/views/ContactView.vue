<script setup lang="ts">
import ContactMail from "../components/ContactMail.vue";
import { ref } from "vue";
import { useThemeStore } from "../store/theme";

const themeStore = useThemeStore();
const formSubmitted = ref(false);
const isLoading = ref(false);

const formData = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const submitForm = () => {
  isLoading.value = true;

  // Simulate form submission
  setTimeout(() => {
    formSubmitted.value = true;
    isLoading.value = false;
  }, 1500);
};
</script>

<template>
  <div class="contact-view">
    <!-- Desktop Version -->
    <div class="hidden md:block">
      <ContactMail />
    </div>

    <!-- Mobile Version - Custom Design -->
    <div
      class="block md:hidden min-h-screen"
      :class="{
        'bg-gray-50': themeStore.theme === 'light',
        'bg-black': themeStore.theme === 'dark',
      }"
    >
      <!-- Header -->
      <!-- Header with wavy background -->
      <div class="relative overflow-hidden bg-gray-700 dark:bg-gray-800">
        <div class="absolute inset-0 opacity-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            class="absolute bottom-0 left-0 w-full"
          >
            <path
              fill="#ffffff"
              fill-opacity="1"
              d="M0,128L48,144C96,160,192,192,288,192C384,192,480,160,576,154.7C672,149,768,171,864,170.7C960,171,1056,149,1152,154.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div class="relative z-10 px-4 py-12 text-center">
          <h1 class="text-3xl font-bold text-white mb-2">Get in Touch</h1>
          <div class="h-1 w-16 bg-white/70 mx-auto rounded-full mb-4"></div>
          <p class="text-white/90 max-w-md mx-auto text-sm">
            Have a question or want to work together? I'd love to hear from you!
          </p>
        </div>
      </div>

      <!-- Contact Options -->
      <div class="py-6">
        <div class="grid grid-cols-2 gap-2 mb-6 px-2">
          <!-- Email Option -->
          <a
            href="mailto:bhardwajjatin093@gmail.com"
            class="group flex flex-col items-center p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl text-center transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
          >
            <div
              class="w-14 h-14 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-700 dark:via-gray-800 dark:to-gray-600 rounded-full flex items-center justify-center mb-3 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 border-2 border-gray-300/50 dark:border-gray-600/50 group-hover:border-gray-400 dark:group-hover:border-gray-500"
              style="
                box-shadow: 0 6px 12px rgba(156, 163, 175, 0.15),
                  inset 0 2px 0 rgba(255, 255, 255, 0.3),
                  inset 0 -2px 0 rgba(0, 0, 0, 0.1);
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-gray-600 dark:text-gray-400 transform transition-all duration-300 group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style="filter: drop-shadow(0 2px 4px rgba(156, 163, 175, 0.3))"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3
              class="text-sm font-medium text-gray-900"
              :class="{
                'text-white': themeStore.theme === 'dark',
              }"
            >
              Email
            </h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Send a message
            </p>
          </a>

          <!-- LinkedIn Option -->
          <a
            href="https://www.linkedin.com/in/jatin-bhardwaj-b5962921a/"
            target="_blank"
            class="group flex flex-col items-center p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl text-center transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
          >
            <div
              class="w-14 h-14 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-700 dark:via-gray-800 dark:to-gray-600 rounded-full flex items-center justify-center mb-3 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 border-2 border-gray-300/50 dark:border-gray-600/50 group-hover:border-gray-400 dark:group-hover:border-gray-500"
              style="
                box-shadow: 0 6px 12px rgba(156, 163, 175, 0.15),
                  inset 0 2px 0 rgba(255, 255, 255, 0.3),
                  inset 0 -2px 0 rgba(0, 0, 0, 0.1);
              "
            >
              <svg
                class="h-7 w-7 text-gray-600 dark:text-gray-400 transform transition-all duration-300 group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
                style="filter: drop-shadow(0 2px 4px rgba(156, 163, 175, 0.3))"
              >
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </div>
            <h3
              class="text-sm font-medium text-gray-900"
              :class="{
                'text-white': themeStore.theme === 'dark',
              }"
            >
              LinkedIn
            </h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Connect with me
            </p>
          </a>
        </div>

        <!-- Contact Form -->
        <div
          v-if="!formSubmitted"
          class="bg-white dark:bg-gray-900 shadow-md p-5"
        >
          <h2
            class="text-xl font-bold mb-4"
            :class="{
              'text-white': themeStore.theme === 'dark',
              'text-black': themeStore.theme === 'light',
            }"
          >
            Send a Message
          </h2>

          <form @submit.prevent="submitForm" class="space-y-4">
            <!-- Name Input -->
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Name</label
              >
              <input
                type="text"
                id="name"
                v-model="formData.name"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-800 dark:text-white"
                placeholder="Your name"
              />
            </div>

            <!-- Email Input -->
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Email</label
              >
              <input
                type="email"
                id="email"
                v-model="formData.email"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-800 dark:text-white"
                placeholder="your.email@example.com"
              />
            </div>

            <!-- Subject Input -->
            <div>
              <label
                for="subject"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Subject</label
              >
              <input
                type="text"
                id="subject"
                v-model="formData.subject"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-800 dark:text-white"
                placeholder="What is this about?"
              />
            </div>

            <!-- Message Input -->
            <div>
              <label
                for="message"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Message</label
              >
              <textarea
                id="message"
                v-model="formData.message"
                rows="4"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-800 dark:text-white"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full bg-gray-700 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
              :disabled="isLoading"
            >
              <svg
                v-if="isLoading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ isLoading ? "Sending..." : "Send Message" }}
            </button>
          </form>
        </div>

        <!-- Success Message -->
        <div
          v-else
          class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 text-center"
        >
          <div
            class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto flex items-center justify-center mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-gray-600 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Message Sent!
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Thank you for reaching out. I'll get back to you as soon as
            possible.
          </p>
          <button
            @click="formSubmitted = false"
            class="mt-6 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Send Another Message
          </button>
        </div>

        <!-- Alternate Contact Info -->
        <div class="mt-8 text-center pb-12">
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            Prefer to reach out directly? Email me at
            <a
              href="mailto:bhardwajjatin093@gmail.com"
              class="text-gray-600 dark:text-gray-400"
              >bhardwajjatin093@gmail.com</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure form fields have proper focus states */
input:focus,
textarea:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(156, 163, 175, 0.2);
}

/* Improve touch targets for mobile */
button,
input,
textarea,
a {
  touch-action: manipulation;
}

/* Subtle hover effects */
a:active,
button:active {
  transform: scale(0.98);
}

/* Ensure smooth transitions */
button,
a {
  transition: all 0.2s ease;
}

/* Placeholder text color adjustments */
::-webkit-input-placeholder {
  color: #9ca3af; /* gray-400 */
}

.dark ::-webkit-input-placeholder {
  color: #6b7280; /* gray-500 */
}

/* Spinner animation for form submission */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
