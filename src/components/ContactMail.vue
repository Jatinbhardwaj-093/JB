<script setup lang="ts">
import { ref } from "vue";
import { useThemeStore } from "../store/theme";
import ContactLink from "./ContactLink.vue";
const WEB3FORMS_ACCESS_KEY = "f19ff89a-d669-4a51-8d08-47e392f4a85f";

const themeStore = useThemeStore();

// Reactive form data
const name = ref("");
const email = ref("");
const message = ref("");
const showSuccessPopup = ref(false); // Flag to show success popup

// Submit form method
const submitForm = async () => {
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
            showSuccessPopup.value = true; // Show success popup
            // Reset form fields after success
            name.value = "";
            email.value = "";
            message.value = "";
        } else {
            console.error("Error submitting form:", result);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
};

// Close the success popup
const closePopup = () => {
    showSuccessPopup.value = false;
};
</script>
<template>
    <div :data-theme="themeStore.theme">
    <div class="flex flex-col md:flex-row justify-center items-center p-4 space-y-8 md:space-y-0">
        <!-- Left Side: Image -->
        <div class="w-min hidden lg:block mx-auto rounded-3xl">
            <img 
            v-if="themeStore.theme==='light' " 
            src="../assets/images/ContactPage/morningSloth.jpg" 
            alt="Sloth Image" 
            class="max-w-min h-auto object-contain rounded-3xl" 
            />
            <img 
            v-else 
            src="../assets/images/ContactPage/nightSloth.jpg" 
            alt="Sloth Image" 
            class="max-w-min h-auto object-contain rounded-3xl" 
            />
        </div>

        <!-- Right Side: Form -->
        <div class="w-full md:w-1/2 lg:w-1/2 mt-8 lg:mt-0 px-4">
            <p class="text-4xl font-bold font-ubuntu text-purple-600">Get in touch</p>
            <div class="w-1/5 h-2 rounded-lg bg-purple-600 mt-1"></div>

            <!-- Form -->
    <form @submit.prevent="submitForm" class="flex flex-col mt-6 space-y-4">
        <label for="name" class="text-xl font-bold text-black"
            :class="{ 'text-white': themeStore.theme === 'dark' }">
            Name
        </label>
        <input type="text" id="name" v-model="name"
            class="shadow-inner shadow-black rounded-lg h-10 w-full px-3 outline-none text-base font-semibold font-ubuntu focus:outline-purple-500"
            :class="{ 'text-white bg-[#2c2c2c]': themeStore.theme === 'dark', 'bg-white text-black':themeStore.theme==='light' }" />

        <label for="mail" class="text-xl font-bold text-black"
            :class="{ 'text-white': themeStore.theme === 'dark' }">
            Mail id
        </label>
        <input type="email" id="mail" v-model="email"
            class="shadow-inner shadow-black rounded-lg h-10 w-full px-3 outline-none text-base font-semibold font-ubuntu focus:outline-purple-500"
            :class="{ 'text-white bg-[#2c2c2c]': themeStore.theme === 'dark', 'bg-white text-black':themeStore.theme==='light' }" />

        <label for="message" class="text-xl font-bold text-black"
            :class="{ 'text-white': themeStore.theme === 'dark' }">
            Message
        </label>
        <textarea id="message" v-model="message" rows="5"
            class="shadow-inner shadow-black rounded-lg w-full px-3 outline-none pt-2 text-base font-semibold font-ubuntu resize-none focus:outline-purple-500"
            :class="{ 'text-white bg-[#2c2c2c]': themeStore.theme === 'dark', 'bg-white text-black':themeStore.theme==='light' }"></textarea>

        <button type="submit"
            class="mt-6 bg-purple-600 text-white font-bold py-2 px-4 w-full rounded-lg shadow hover:bg-purple-700 transition-colors">
            Submit
        </button>
    </form>

    <!-- Success Popup -->
    <div v-if="showSuccessPopup"
        class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div class="p-8 rounded-xl shadow-xl text-center bg-white"
            :class="{ 'bg-[#3B1C32] text-white': themeStore.theme === 'dark' }">
            <p class="text-xl font-semibold text-green-500">
                Mail sent successfully!
            </p>
            <button @click="closePopup" class="mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg">
                Close
            </button>
        </div>
    </div>
            <!-- Social Links -->
            <div class="mt-14 w-min mx-auto">
                <ContactLink />
            </div>
        </div>
    </div>
</div>
</template>
