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

const getCategoryBadgeClass = (category) => {
  const c = category.toLowerCase();
  if (c === 'gsoc') return 'border-gruv-blue/20 bg-gruv-blue/10 text-gruv-blue';
  return 'border-gruv-accent/20 bg-gruv-accent/10 text-gruv-accent';
};

const getCategoryLabel = (category) => {
  if (category.toLowerCase() === 'gsoc') return 'GSoC';
  return category.toUpperCase();
};
</script>

<template>
  <div 
    class="border border-gruv-border rounded-xl p-6 bg-gruv-card flex flex-col justify-between transition-all group h-full hover:border-gruv-accent/40 hover:shadow-sm hover:shadow-gruv-accent/5"
  >
    <div class="space-y-4">
      <div class="flex justify-between items-center text-xs text-gruv-muted font-mono">
        <span>{{ formatDate(post.date) }}</span>
        <div class="flex items-center gap-2">
          <span class="px-1.5 py-0.5 rounded border text-[8px] font-semibold tracking-wider select-none" :class="getCategoryBadgeClass(post.category)">
            {{ getCategoryLabel(post.category) }}
          </span>
          <span class="px-1.5 py-0.5 rounded bg-gruv-card dark:bg-gruv-card text-gruv-muted text-[10px]">
            {{ post.minutesToRead }} min read
          </span>
        </div>
      </div>

      <router-link :to="`/blog/${post.slug}`" class="block">
        <h4 class="text-base font-medium tracking-tight text-gruv-fg group-hover:text-gruv-fg dark:group-hover:text-gruv-fg transition-colors leading-snug">
          {{ post.title }}
        </h4>
      </router-link>

      <p class="text-xs text-gruv-muted font-light leading-relaxed line-clamp-3">
        {{ post.summary }}
      </p>
    </div>

    <div class="flex justify-end mt-6 border-t border-gruv-border dark:border-gruv-border/60 pt-3">
      <router-link
        :to="`/blog/${post.slug}`"
        class="text-[11px] font-mono text-gruv-muted transition-colors hover:text-gruv-accent hover:underline"
      >
        [read_more]
      </router-link>
    </div>
  </div>
</template>
