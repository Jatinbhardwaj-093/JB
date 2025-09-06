<script setup lang="ts">
import { ref, computed } from "vue";

const WEB3FORMS_ACCESS_KEY = "f19ff89a-d669-4a51-8d08-47e392f4a85f";

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
  // Enhanced email validation
  if (!email.value.trim()) return false;

  // Basic format check with regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) return false;

  // Additional validation checks
  const parts = email.value.split("@");
  const domain = parts[1];

  // Check domain has valid TLD (at least 2 characters after last dot)
  const tld = domain.split(".").pop();
  if (!tld || tld.length < 2) return false;

  // Check for common disposable email domains
  const disposableDomains = [
    "tempmail.com",
    "throwawaymail.com",
    "mailinator.com",
    "fakeinbox.com",
    "yopmail.com",
  ];
  if (disposableDomains.includes(domain.toLowerCase())) return false;

  // Check for common typos in popular domains
  const typos = {
    "gmial.com": "gmail.com",
    "gmal.com": "gmail.com",
    "gamil.com": "gmail.com",
    "gnail.com": "gmail.com",
    "hotmial.com": "hotmail.com",
    "hotmal.com": "hotmail.com",
    "yaho.com": "yahoo.com",
    "yhaoo.com": "yahoo.com",
    "outloo.com": "outlook.com",
  };

  if (typos[domain.toLowerCase()]) {
    return false;
  }

  return true;
});

// Get suggested email correction if there's a typo
const emailSuggestion = computed(() => {
  if (!email.value.trim()) return "";

  const parts = email.value.split("@");
  if (parts.length !== 2) return "";

  const domain = parts[1].toLowerCase();
  const typos = {
    "gmial.com": "gmail.com",
    "gmal.com": "gmail.com",
    "gamil.com": "gmail.com",
    "gnail.com": "gmail.com",
    "hotmial.com": "hotmail.com",
    "hotmal.com": "hotmail.com",
    "yaho.com": "yahoo.com",
    "yhaoo.com": "yahoo.com",
    "outloo.com": "outlook.com",
  };

  if (typos[domain]) {
    return `${parts[0]}@${typos[domain]}`;
  }

  return "";
});

const validateForm = () => {
  errors.value = { name: "", email: "", subject: "", message: "" };

  if (!name.value.trim()) errors.value.name = "Name is required";

  if (!email.value.trim()) {
    errors.value.email = "Email is required";
  } else if (!isValidEmail.value) {
    if (emailSuggestion.value) {
      errors.value.email = `Invalid email. Did you mean ${emailSuggestion.value}?`;
    } else {
      errors.value.email = "Please enter a valid email address";
    }
  }

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
  <section class="py-10 md:py-18 bg-gray-900 text-white">
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-12">
          <h1 class="text-3xl md:text-4xl font-bold mb-2 text-white">
            Get in Touch
          </h1>
          <div class="h-1 w-24 bg-gray-600 mx-auto rounded-full mb-4"></div>
          <p class="text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach
            out and let's discuss how we can work together.
          </p>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Left Side: Contact Form -->
          <div
            class="w-full lg:w-7/12 bg-gray-900 rounded-xl shadow-xl p-6 md:p-8 border border-gray-800"
          >
            <!-- Error Message -->
            <div
              v-if="errorMessage"
              class="mb-6 p-4 rounded-lg bg-gray-800 border-l-4 border-gray-600"
            >
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p class="text-gray-300 font-medium">
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
                    class="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Name <span class="text-gray-400">*</span>
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
                      class="pl-10 w-full px-4 py-2 border rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-300"
                      :class="{
                        'border-gray-600': errors.name,
                        'border-gray-700': !errors.name,
                      }"
                      placeholder="John Doe"
                    />
                  </div>
                  <p
                    v-if="errors.name"
                    id="name-error"
                    class="mt-1 text-sm text-gray-400"
                  >
                    {{ errors.name }}
                  </p>
                </div>

                <!-- Email Field -->
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email
                    <span class="text-gray-400">*</span>
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
                      class="pl-10 w-full px-4 py-2 border rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-300"
                      :class="{
                        'border-gray-600': errors.email,
                        'border-gray-700': !errors.email,
                      }"
                      placeholder="john@example.com"
                    />
                  </div>
                  <p
                    v-if="errors.email"
                    id="email-error"
                    class="mt-1 text-sm text-gray-400"
                  >
                    {{ errors.email }}
                  </p>
                </div>
              </div>

              <!-- Subject Field -->
              <div class="mb-6">
                <label
                  for="subject"
                  class="block text-sm font-medium text-gray-300 mb-1"
                >
                  Subject
                  <span class="text-gray-400">*</span>
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
                    class="pl-10 w-full px-4 py-2 border rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-300"
                    :class="{
                      'border-gray-600': errors.subject,
                      'border-gray-700': !errors.subject,
                    }"
                    placeholder="Project Inquiry"
                  />
                </div>
                <p
                  v-if="errors.subject"
                  id="subject-error"
                  class="mt-1 text-sm text-gray-400"
                >
                  {{ errors.subject }}
                </p>
              </div>

              <!-- Message Field -->
              <div class="mb-6">
                <label
                  for="message"
                  class="block text-sm font-medium text-gray-300 mb-1"
                >
                  Message
                  <span class="text-gray-400">*</span>
                </label>
                <div class="relative">
                  <textarea
                    id="message"
                    rows="5"
                    v-model="message"
                    class="w-full px-4 py-2 border rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-300"
                    :class="{
                      'border-gray-600': errors.message,
                      'border-gray-700': !errors.message,
                    }"
                    placeholder="I'd like to discuss a project idea..."
                  ></textarea>
                </div>
                <p
                  v-if="errors.message"
                  id="message-error"
                  class="mt-1 text-sm text-gray-400"
                >
                  {{ errors.message }}
                </p>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                class="w-full px-6 py-3 bg-gray-700 text-white font-medium rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center disabled:opacity-70"
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
            <div class="bg-gray-700 text-white rounded-xl shadow-xl p-6 md:p-8">
              <h3 class="text-xl font-bold mb-6">Contact Information</h3>

              <div class="space-y-6">
                <div
                  v-for="(item, index) in contactInfo"
                  :key="index"
                  class="group flex items-center hover:transform hover:translate-x-3 transition-all duration-300 cursor-pointer"
                >
                  <div
                    class="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg group-hover:shadow-xl border-2 border-gray-500/30 group-hover:border-gray-300/50"
                    style="
                      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1),
                        inset 0 2px 0 rgba(255, 255, 255, 0.2),
                        inset 0 -2px 0 rgba(0, 0, 0, 0.2);
                    "
                  >
                    <i
                      :class="[
                        item.icon,
                        'text-lg text-white group-hover:text-gray-100 transform transition-all duration-300 group-hover:scale-110',
                      ]"
                      style="filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))"
                    ></i>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-200">
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

              <div class="mt-10 pt-5 border-t border-gray-600">
                <p class="text-gray-200 text-sm">
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
        class="bg-gray-900 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all animate-scaleIn border border-gray-800"
      >
        <div class="text-center">
          <div
            class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-800 mb-4"
          >
            <svg
              class="h-10 w-10 text-gray-400"
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
          <h3 class="text-2xl font-bold text-white mb-2">Message Sent!</h3>
          <p class="text-gray-300 mb-6">
            Thank you for reaching out! I'll get back to you as soon as
            possible.
          </p>
          <button
            @click="closePopup"
            class="w-full px-6 py-3 bg-gray-700 text-white font-medium rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-300"
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

.bg-gray-700 {
  background-image: linear-gradient(135deg, #374151 0%, #1f2937 100%);
}
</style>
