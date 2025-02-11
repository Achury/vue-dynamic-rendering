<template>
  <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
    <h2 class="text-2xl font-semibold mb-4">Component A</h2>
    <ul class="space-y-4">
      <li v-for="post in posts" :key="post.id">
        <h3 class="text-xl font-semibold">{{ post.title }}</h3>
        <p class="text-gray-300">{{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue'; // Use type-only import for PropType

interface Post {
  id: number;
  title: string;
  body: string;
}

export default defineComponent({
  props: {
    posts: {
      type: Array as PropType<Post[]>,
      required: true,
    },
  },
});
</script>
