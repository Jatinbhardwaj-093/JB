<script setup lang="ts">
import { ref, computed } from "vue";
import { useThemeStore } from "../store/theme";

const WEB3FORMS_ACCESS_KEY = "f19ff89a-d669-4a51-8d08-47e392f4a85f";
const themeStore = useThemeStore();

// Reactive form data
const name = ref("");
const email = ref("");
const subject = ref("");
const message = ref("");
const showSuccessPopup = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

// Form validation
const errors = ref({ name: "", email: "", subject: "", message: "" });

const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.value);
});

const validateForm = () => {
  errors.value = { name: "", email: "", subject: "", message: "" };

  if (!name.value.trim()) errors.value.name = "Name is required";
  if (!email.value.trim()) errors.value.email = "Email is required";
  else if (!isValidEmail.value)
    errors.value.email = "Please enter a valid email";
  if (!subject.value.trim()) errors.value.subject = "Subject is required";
  if (!message.value.trim()) errors.value.message = "Message is required";

  return !Object.values(errors.value).some((error) => error);
};

// Submit form method
const submitForm = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value,
      }),
    });

    const result = await response.json();

    if (result.success) {
      showSuccessPopup.value = true;
      name.value = "";
      email.value = "";
      subject.value = "";
      message.value = "";
    } else {
      errorMessage.value = "Failed to send message. Please try again.";
    }
  } catch (error) {
    errorMessage.value = "An error occurred. Please try again later.";
  } finally {
    isLoading.value = false;
  }
};

const closePopup = () => {
  showSuccessPopup.value = false;
};

const contactInfo = [
  {
    icon: "bi-envelope-fill",
    label: "Email",
    value: "bhardwajjatin093@gmail.com",
    link: "mailto:bhardwajjatin093@gmail.com",
  },
  {
    icon: "bi-linkedin",
    label: "LinkedIn",
    value: "Jatin Bhardwaj",
    link: "https://www.linkedin.com/in/jatin-bhardwaj-b5962921a/",
  },
  {
    icon: "bi-github",
    label: "GitHub",
    value: "Jatinbhardwaj-093",
    link: "https://github.com/Jatinbhardwaj-093",
  },
  {
    icon: "bi-twitter-x",
    label: "Twitter",
    value: "@Jatin0932",
    link: "https://x.com/Jatin0932",
  },
];
</script>

<template>
  <section
    class="py-12 md:py-20"
    :class="{
      'bg-gray-50': themeStore.theme === 'light',
      'bg-gray-900': themeStore.theme === 'dark',
    }"
  >
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-12">
          <h1
            class="text-3xl md:text-4xl font-bold mb-2 text-black"
            :class="{ 'text-white': themeStore.theme === 'dark' }"
          >
            Get in Touch
          </h1>
          <div class="h-1 w-24 bg-indigo-600 mx-auto rounded-full mb-4"></div>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach
            out and let's discuss how we can work together.
          </p>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Left Side: Contact Form -->
          <div
            class="w-full lg:w-7/12 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8"
          >
            <!-- Error Message -->
            <div
              v-if="errorMessage"
              class="mb-6 p-4 rounded-lg bg-red-50 border-l-4 border-red-500 dark:bg-red-900/20 dark:border-red-500"
            >
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-red-500 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p class="text-red-700 dark:text-red-400 font-medium">
                  {{ errorMessage }}
                </p>
              </div>
            </div>

            <!-- Form -->
            <form @submit.prevent="submitForm" novalidate>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <!-- Name Field -->
                <div>
                  <label
                    for="name"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Name <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <i class="bi bi-person text-gray-400"></i>
                    </div>
                    <input
                      id="name"
                      type="text"
                      v-model="name"
                      class="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                      :class="{
                        'border-red-500': errors.name,
                        'border-gray-300 dark:border-gray-600': !errors.name,
                        'bg-white dark:bg-gray-700': true,
                        'text-gray-900 dark:text-white': true,
                      }"
                      placeholder="John Doe"
                    />
                  </div>
                  <p
                    v-if="errors.name"
                    id="name-error"
                    class="mt-1 text-sm text-red-500"
                  >
                    {{ errors.name }}
                  </p>
                </div>

                <!-- Email Field -->
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <i class="bi bi-envelope text-gray-400"></i>
                    </div>
                    <input
                      id="email"
                      type="email"
                      v-model="email"
                      class="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                      :class="{
                        'border-red-500': errors.email,
                        'border-gray-300 dark:border-gray-600': !errors.email,
                        'bg-white dark:bg-gray-700': true,
                        'text-gray-900 dark:text-white': true,
                      }"
                      placeholder="john@example.com"
                    />
                  </div>
                  <p
                    v-if="errors.email"
                    id="email-error"
                    class="mt-1 text-sm text-red-500"
                  >
                    {{ errors.email }}
                  </p>
                </div>
              </div>

              <!-- Subject Field -->
              <div class="mb-6">
                <label
                  for="subject"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Subject <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <i class="bi bi-chat-left-text text-gray-400"></i>
                  </div>
                  <input
                    id="subject"
                    type="text"
                    v-model="subject"
                    class="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    :class="{
                      'border-red-500': errors.subject,
                      'border-gray-300 dark:border-gray-600': !errors.subject,
                      'bg-white dark:bg-gray-700': true,
                      'text-gray-900 dark:text-white': true,
                    }"
                    placeholder="Project Inquiry"
                  />
                </div>
                <p
                  v-if="errors.subject"
                  id="subject-error"
                  class="mt-1 text-sm text-red-500"
                >
                  {{ errors.subject }}
                </p>
              </div>

              <!-- Message Field -->
              <div class="mb-6">
                <label
                  for="message"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Message <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <textarea
                    id="message"
                    rows="5"
                    v-model="message"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    :class="{
                      'border-red-500': errors.message,
                      'border-gray-300 dark:border-gray-600': !errors.message,
                      'bg-white dark:bg-gray-700': true,
                      'text-gray-900 dark:text-white': true,
                    }"
                    placeholder="I'd like to discuss a project idea..."
                  ></textarea>
                </div>
                <p
                  v-if="errors.message"
                  id="message-error"
                  class="mt-1 text-sm text-red-500"
                >
                  {{ errors.message }}
                </p>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                class="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center disabled:opacity-70"
                :disabled="isLoading"
              >
                <svg
                  v-if="isLoading"
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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

          <!-- Right Side: Contact Info -->
          <div class="w-full lg:w-5/12">
            <!-- Contact Info Box -->
            <div
              class="bg-indigo-700 text-white rounded-xl shadow-xl p-6 md:p-8"
            >
              <h3 class="text-xl font-bold mb-6">Contact Information</h3>

              <div class="space-y-6">
                <div
                  v-for="(item, index) in contactInfo"
                  :key="index"
                  class="flex items-center hover:transform hover:translate-x-2 transition-transform duration-300"
                >
                  <div
                    class="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-800/50 flex items-center justify-center"
                  >
                    <i :class="[item.icon, 'text-lg']"></i>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-indigo-200">
                      {{ item.label }}
                    </p>
                    <a
                      :href="item.link"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-white hover:underline"
                    >
                      {{ item.value }}
                    </a>
                  </div>
                </div>
              </div>

              <div class="mt-10 pt-5 border-t border-indigo-600">
                <p class="text-indigo-200 text-sm">
                  Available for freelance projects
                </p>
                <p class="font-medium">
                  Let's work together on your next project
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessPopup"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn backdrop-blur-sm"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all animate-scaleIn"
      >
        <div class="text-center">
          <div
            class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 mb-4"
          >
            <svg
              class="h-10 w-10 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Message Sent!
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            Thank you for reaching out! I'll get back to you as soon as
            possible.
          </p>
          <button
            @click="closePopup"
            class="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-scaleIn {
  animation: scaleIn 0.3s ease-out;
}

.bg-indigo-700 {
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
