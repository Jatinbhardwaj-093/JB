import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/styles/tailwind.css";
import "./assets/styles/global.css";
import "./assets/styles/responsive.css"; // Added responsive utilities
import "bootstrap-icons/font/bootstrap-icons.css";
import { createPinia } from "pinia";
import { useThemeStore } from "./store/theme";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
const themeStore = useThemeStore();
themeStore.initializeTheme();

// Handle GitHub Pages SPA routing
// Check if we came from a 404 redirect with hash
if (window.location.hash && window.location.hash.startsWith('#/')) {
  const redirectPath = window.location.hash.slice(1);
  // Use router push after it's ready
  router.isReady().then(() => {
    router.push(redirectPath);
  });
}

app.use(router);
app.mount("#app");
