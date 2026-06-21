<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

// Format date to be more readable
const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<template>
  <div class="border border-stone-200 dark:border-stone-900 rounded-xl p-6 bg-stone-100/20 dark:bg-stone-900/10 flex flex-col justify-between hover:border-stone-300 dark:hover:border-stone-800 transition-all group h-full">
    <div class="space-y-4">
      <div class="flex justify-between items-center text-xs text-stone-400 dark:text-stone-500 font-mono">
        <span>{{ formatDate(post.date) }}</span>
        <span class="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-900 text-stone-400 dark:text-stone-500 text-[10px]">
          {{ post.minutesToRead }} min read
        </span>
      </div>

      <router-link :to="`/blog/${post.slug}`" class="block">
        <h4 class="text-base font-medium tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-stone-950 dark:group-hover:text-stone-50 transition-colors leading-snug">
          {{ post.title }}
        </h4>
      </router-link>

      <p class="text-xs text-stone-600 dark:text-stone-400 font-light leading-relaxed line-clamp-3">
        {{ post.summary }}
      </p>
    </div>

    <div class="flex justify-end mt-6 border-t border-stone-100 dark:border-stone-900/60 pt-3">
      <router-link
        :to="`/blog/${post.slug}`"
        class="text-[11px] font-mono text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
      >
        [read_more]
      </router-link>
    </div>
  </div>
</template>
