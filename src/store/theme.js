import { defineStore } from "pinia";
export const useThemeStore = defineStore("theme", {
    state: () => ({
        // Only check localStorage, ignore system preferences
        theme: localStorage.getItem("theme") || "light", // Default to light if no preference saved
        isAnimating: false, // Track animation state
    }),
    actions: {
        toggleTheme() {
            // Set animating state to trigger transition effects
            this.isAnimating = true;
            // Add a slight delay to allow animation to begin before theme actually changes
            setTimeout(() => {
                this.theme = this.theme === "light" ? "dark" : "light";
                this.applyTheme();
                // Reset animation state after transition completes
                setTimeout(() => {
                    this.isAnimating = false;
                }, 600); // Match this with the CSS transition duration
            }, 50);
        },
        applyTheme() {
            // Apply class for Tailwind
            document.documentElement.classList.toggle("dark", this.theme === "dark");
            // Apply data-theme attribute
            document.documentElement.setAttribute("data-theme", this.theme);
            // Save preference
            localStorage.setItem("theme", this.theme);
        },
        initializeTheme() {
            // Only use saved preference, or default to light
            const savedTheme = localStorage.getItem("theme");
            this.theme = savedTheme || "light";
            this.applyTheme();
        },
    },
});
