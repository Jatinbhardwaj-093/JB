<script setup lang="ts">
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
    <!-- Mobile Version - Custom Design -->
    <div class="block md:hidden min-h-screen bg-white dark:bg-gray-950 px-4 py-12">
      <!-- Header -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-3">Get in Touch</h1>
        <p class="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Have a question or want to work together? Let's connect.
        </p>
      </div>

      <!-- Contact Options -->
      <div class="mb-10">
        <div class="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <!-- Email Option -->
          <a
            href="mailto:bhardwajjatin093@gmail.com"
            class="group flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-gray-600 transition-all duration-200"
          >
            <div
              class="w-12 h-12 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-white dark:text-gray-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Email</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Send a message</p>
          </a>

          <!-- LinkedIn Option -->
          <a
            href="https://www.linkedin.com/in/jatin-bhardwaj-b5962921a/"
            target="_blank"
            class="group flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-gray-600 transition-all duration-200"
          >
            <div
              class="w-12 h-12 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200"
            >
              <svg
                class="h-5 w-5 text-white dark:text-gray-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">LinkedIn</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Connect</p>
          </a>
        </div>
      </div>

      <!-- Contact Form -->
      <div v-if="!formSubmitted" class="max-w-md mx-auto">
        <h2 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Send a Message</h2>

        <form @submit.prevent="submitForm" class="space-y-5">
          <!-- Name Input -->
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >Name</label
            >
            <input
              type="text"
              id="name"
              v-model="formData.name"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all"
              placeholder="Your name"
            />
          </div>

          <!-- Email Input -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >Email</label
            >
            <input
              type="email"
              id="email"
              v-model="formData.email"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all"
              placeholder="your.email@example.com"
            />
          </div>

          <!-- Subject Input -->
          <div>
            <label
              for="subject"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >Subject</label
            >
            <input
              type="text"
              id="subject"
              v-model="formData.subject"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all"
              placeholder="What is this about?"
            />
          </div>

          <!-- Message Input -->
          <div>
            <label
              for="message"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >Message</label
            >
            <textarea
              id="message"
              v-model="formData.message"
              rows="5"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all resize-none"
              placeholder="Your message here..."
            ></textarea>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center justify-center disabled:opacity-50"
            :disabled="isLoading"
          >
            <svg
              v-if="isLoading"
              class="animate-spin -ml-1 mr-3 h-5 w-5"
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
      <div v-else class="max-w-md mx-auto text-center">
        <div
          class="w-16 h-16 bg-gray-900 dark:bg-white rounded-full mx-auto flex items-center justify-center mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-white dark:text-gray-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Message Sent!</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Thank you for reaching out. I'll get back to you soon.
        </p>
        <button
          @click="formSubmitted = false"
          class="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
        >
          Send Another Message
        </button>
      </div>

      <!-- Footer Info -->
      <div class="mt-16 text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Or email me directly at
          <a href="mailto:bhardwajjatin093@gmail.com" class="text-gray-900 dark:text-white hover:underline font-medium"
            >bhardwajjatin093@gmail.com</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions */
button,
a,
input,
textarea {
  transition: all 0.2s ease;
}

/* Touch targets for mobile */
button,
input,
textarea,
a {
  touch-action: manipulation;
}

/* Active feedback */
button:active {
  transform: scale(0.98);
}

/* Spinner animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
