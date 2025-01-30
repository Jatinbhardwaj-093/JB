<script setup lang="ts">
import { ref, computed } from "vue";
import { useThemeStore } from "../store/theme";
import ContactLink from "./ContactLink.vue";

const WEB3FORMS_ACCESS_KEY = "f19ff89a-d669-4a51-8d08-47e392f4a85f";
const themeStore = useThemeStore();

// Reactive form data
const name = ref("");
const email = ref("");
const message = ref("");
const showSuccessPopup = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

// Form validation
const errors = ref({ name: "", email: "", message: "" });

const isValidEmail = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.value);
});

const validateForm = () => {
    errors.value = { name: "", email: "", message: "" };

    if (!name.value.trim()) errors.value.name = "Name is required";
    if (!email.value.trim()) errors.value.email = "Email is required";
    else if (!isValidEmail.value) errors.value.email = "Please enter a valid email";
    if (!message.value.trim()) errors.value.message = "Message is required";

    return !Object.values(errors.value).some(error => error);
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
                message: message.value,
            }),
        });

        const result = await response.json();

        if (result.success) {
            showSuccessPopup.value = true;
            name.value = "";
            email.value = "";
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
</script>

<template>
    <div :data-theme="themeStore.theme">
        <div class="flex flex-col md:flex-row justify-center items-center p-4 pt-1">
            <!-- Left Side: Image -->
            <div class="w-min hidden lg:block mx-auto rounded-3xl">
                <img v-if="themeStore.theme === 'light'" src="../assets/images/ContactPage/morningSloth.jpg"
                    alt="Sloth Image" class="max-w-min h-auto object-contain rounded-3xl" />
                <img v-else src="../assets/images/ContactPage/nightSloth.jpg" alt="Sloth Image"
                    class="max-w-min h-auto object-contain rounded-3xl" />
            </div>

            <!-- Right Side: Form -->
            <div class="w-full md:w-1/2 lg:w-1/2 px-4">
                <p class="text-4xl font-bold font-ubuntu text-purple-600">
                    Get in touch
                </p>
                <div class="w-1/5 h-2 rounded-lg bg-purple-600 mt-1 mb-4"></div>

                <!-- Error Message -->
                <div v-if="errorMessage" class="mb-4 p-3 rounded bg-red-100 text-red-700">
                    {{ errorMessage }}
                </div>

                <!-- Form -->
                <form @submit.prevent="submitForm" novalidate>
                    <div class="mb-4">
                        <label for="name" class="text-xl font-bold"
                            :class="{ 'text-white': themeStore.theme === 'dark' }">
                            Name <span class="text-red-500">*</span>
                        </label>
                        <input type="text" id="name" v-model="name" required :aria-invalid="!!errors.name"
                            :aria-describedby="errors.name ? 'name-error' : undefined"
                            class="shadow-inner shadow-black rounded-lg h-10 w-full px-3 outline-none text-base font-semibold font-ubuntu focus:outline-purple-500 transition-all duration-300"
                            :class="{
                                'text-white bg-[#2c2c2c]': themeStore.theme === 'dark',
                                'bg-white text-black': themeStore.theme === 'light',
                                'border-red-500': errors.name
                            }" />
                        <p v-if="errors.name" id="name-error" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
                    </div>

                    <div class="mb-4">
                        <label for="mail" class="text-xl font-bold"
                            :class="{ 'text-white': themeStore.theme === 'dark' }">
                            Email <span class="text-red-500">*</span>
                        </label>
                        <input type="email" id="mail" v-model="email" required :aria-invalid="!!errors.email"
                            :aria-describedby="errors.email ? 'email-error' : undefined"
                            class="shadow-inner shadow-black rounded-lg h-10 w-full px-3 outline-none text-base font-semibold font-ubuntu focus:outline-purple-500 transition-all duration-300"
                            :class="{
                                'text-white bg-[#2c2c2c]': themeStore.theme === 'dark',
                                'bg-white text-black': themeStore.theme === 'light',
                                'border-red-500': errors.email
                            }" />
                        <p v-if="errors.email" id="email-error" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
                    </div>

                    <div class="mb-4">
                        <label for="message" class="text-xl font-bold"
                            :class="{ 'text-white': themeStore.theme === 'dark' }">
                            Message <span class="text-red-500">*</span>
                        </label>
                        <textarea id="message" v-model="message" rows="5" required :aria-invalid="!!errors.message"
                            :aria-describedby="errors.message ? 'message-error' : undefined"
                            class="shadow-inner shadow-black rounded-lg w-full px-3 outline-none pt-2 text-base font-semibold font-ubuntu resize-none focus:outline-purple-500 transition-all duration-300"
                            :class="{
                                'text-white bg-[#2c2c2c]': themeStore.theme === 'dark',
                                'bg-white text-black': themeStore.theme === 'light',
                                'border-red-500': errors.message
                            }"></textarea>
                        <p v-if="errors.message" id="message-error" class="text-red-500 text-sm mt-1">{{ errors.message
                            }}</p>
                    </div>

                    <button type="submit" :disabled="isLoading"
                        class="mt-6 bg-purple-600 text-white font-bold py-2 px-4 w-full rounded-lg shadow hover:bg-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        <span v-if="isLoading">Sending...</span>
                        <span v-else>Submit</span>
                    </button>
                </form>

                <!-- Success Popup -->
                <div v-if="showSuccessPopup"
                    class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
                    <div class="p-8 rounded-xl shadow-xl text-center transform transition-all duration-300 animate-scaleIn"
                        :class="{ 'bg-[#3B1C32] text-white': themeStore.theme === 'dark', 'bg-white': themeStore.theme === 'light' }">
                        <p class="text-xl font-semibold text-green-500">
                            Mail sent successfully!
                        </p>
                        <button @click="closePopup"
                            class="mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                            Close
                        </button>
                    </div>
                </div>

                <!-- Social Links -->
                <div class="mt-8 lg:mt-14 w-min mx-auto">
                    <ContactLink />
                </div>
            </div>
        </div>
    </div>
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
</style>
