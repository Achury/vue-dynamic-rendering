<template>
  <div
    id="app"
    class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4"
  >
    <DynamicRenderer />
  </div>
</template>

<script setup>
import DynamicRenderer from './components/dynamicRenderer.vue';
</script>
