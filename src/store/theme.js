import { defineStore } from 'pinia';
export const useThemeStore = defineStore('theme', {
    state: () => ({
        // Only check localStorage, ignore system preferences
        theme: localStorage.getItem('theme') || 'light' // Default to light if no preference saved
    }),
    actions: {
        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            this.applyTheme();
            console.log('Theme toggled to:', this.theme);
        },
        applyTheme() {
            // Apply class for Tailwind
            document.documentElement.classList.toggle('dark', this.theme === 'dark');
            // Apply data-theme attribute
            document.documentElement.setAttribute('data-theme', this.theme);
            // Save preference
            localStorage.setItem('theme', this.theme);
            console.log('Applied theme:', this.theme);
        },
        initializeTheme() {
            // Only use saved preference, or default to light
            const savedTheme = localStorage.getItem('theme');
            this.theme = savedTheme || 'light';
            this.applyTheme();
        }
    }
});
