<template>
  <div class="min-h-screen flex items-center justify-center px-4 bg-gruv-bg text-gruv-fg">
    <div
      class="max-w-md w-full text-center rounded-xl p-8 border bg-gruv-card border-gruv-border"
    >
      <div class="mb-6 flex justify-center">
        <img
          src="../assets/images/lost/zoro_lost.webp"
          alt="Zoro Lost"
          class="h-44 w-auto rounded-lg shadow-sm border border-gruv-border filter dark:opacity-90"
        />
      </div>

      <h1 class="text-5xl font-mono font-bold mb-2 text-gruv-red">404</h1>

      <h2 class="text-xl font-light mb-4 text-gruv-fg">Page Not Found</h2>

      <p class="text-xs text-gruv-muted mb-8 font-light leading-relaxed">
        Like Zoro, this page seems to have wandered off. The path you are looking for doesn't exist in our routing system.
      </p>

      <router-link
        to="/"
        class="inline-block border border-gruv-accent text-gruv-accent hover:bg-gruv-accent/10 font-mono text-xs py-2.5 px-6 rounded transition-colors"
      >
        [go_back_home]
      </router-link>
    </div>
  </div>
</template>

<script setup>

</script>
