<template>
  <div class="text-center">
    <h1 class="text-3xl font-bold mb-8">Dynamic Component Rendering</h1>
    <div
      class="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 justify-center mb-8"
    >
      <button
        @click="setComponent('ComponentA')"
        class="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition-colors"
      >
        Show Component A
      </button>
      <button
        @click="setComponent('ComponentB')"
        class="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition-colors"
      >
        Show Component B
      </button>
      <button
        @click="setComponent('ComponentC')"
        class="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition-colors"
      >
        Show Component C
      </button>
    </div>
    <div class="mt-8 w-full max-w-2xl px-4">
      <component :is="selectedComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ComponentA from './ComponentA.vue';
import ComponentB from './ComponentB.vue';
import ComponentC from './ComponentC.vue';

const components = {
  ComponentA,
  ComponentB,
  ComponentC,
};

const selectedComponent = ref(null);

function setComponent(componentName) {
  selectedComponent.value = components[componentName];
}
</script>
