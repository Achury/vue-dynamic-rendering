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
      <component :is="selectedComponentInstance" :posts="currentPosts" />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-gray-400">Loading...</div>

    <!-- Error State -->
    <div v-if="error" class="mt-8 text-red-500">
      <p class="mb-4">Error: {{ error }}</p>
      <button
        @click="retryFetch"
        class="px-6 py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
      >
        Retry
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDynamicStore } from '../stores/dynamicStore';
import { useDataStore } from '../stores/dataStore';
import { storeToRefs } from 'pinia';
import { computed, onMounted, defineAsyncComponent } from 'vue';

const dynamicStore = useDynamicStore();
const dataStore = useDataStore();
const { selectedComponent } = storeToRefs(dynamicStore);
const { loading, error, splitData } = storeToRefs(dataStore);

// Lazy load components
const ComponentA = defineAsyncComponent(() => import('./componentA.vue'));
const ComponentB = defineAsyncComponent(() => import('./componentB.vue'));
const ComponentC = defineAsyncComponent(() => import('./componentC.vue'));

const components = {
  ComponentA,
  ComponentB,
  ComponentC,
};

// Fetch data when the component is mounted
onMounted(() => {
  dataStore.fetchData();
});

// Get the current posts based on the selected component
const currentPosts = computed(() => {
  if (selectedComponent.value) {
    return splitData.value[selectedComponent.value];
  }
  return [];
});

// Get the selected component
const selectedComponentInstance = computed(() => {
  if (selectedComponent.value) {
    return components[selectedComponent.value];
  }
  return null;
});

function setComponent(
  componentName: 'ComponentA' | 'ComponentB' | 'ComponentC'
) {
  dynamicStore.setComponent(componentName);
}

function retryFetch() {
  dataStore.fetchData();
}
</script>
