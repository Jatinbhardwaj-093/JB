import { defineStore } from "pinia";
export const useThemeStore = defineStore("theme", {
    state: () => ({
        // Always use dark theme
        theme: "dark",
        isAnimating: false, // Keep for backward compatibility, but won't be used
    }),
    actions: {
        toggleTheme() {
            // No-op: Theme is always dark now
            console.warn("Theme toggling is disabled. Dark theme is permanently enabled.");
        },
        applyTheme() {
            // Always apply dark theme
            document.documentElement.classList.add("dark");
            document.documentElement.setAttribute("data-theme", "dark");
            // Clear any light theme preference from localStorage
            localStorage.removeItem("theme");
        },
        initializeTheme() {
            // Always initialize to dark theme
            this.theme = "dark";
            this.applyTheme();
        },
    },
});
