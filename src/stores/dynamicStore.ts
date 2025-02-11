import { defineStore } from 'pinia';
import { markRaw, defineAsyncComponent } from 'vue';
import type { ComponentMap } from '../types/components';

// Define the type for the component names
type ComponentName = 'ComponentA' | 'ComponentB' | 'ComponentC';

export const useDynamicStore = defineStore('dynamic', {
  state: () => ({
    selectedComponent: null as ComponentName | null,
    componentCache: {} as ComponentMap, // Cache for loaded components
  }),
  actions: {
    // Set the selected component
    setComponent(componentName: ComponentName) {
      this.selectedComponent = componentName;
      this.loadComponent(componentName); // Load the component if not already cached
    },
    // Load a component dynamically and cache it
    loadComponent(componentName: ComponentName) {
      if (!this.componentCache[componentName]) {
        let component;
        switch (componentName) {
          case 'ComponentA':
            component = markRaw(
              defineAsyncComponent(() => import('../components/componentA.vue'))
            ); // Dynamically import
            break;
          case 'ComponentB':
            component = markRaw(
              defineAsyncComponent(() => import('../components/componentB.vue'))
            );
            break;
          case 'ComponentC':
            component = markRaw(
              defineAsyncComponent(() => import('../components/componentC.vue'))
            );
            break;
          default:
            throw new Error(`Unknown component: ${componentName}`);
        }
        this.componentCache[componentName] = component; // Cache the component
      }
    },
  },
  getters: {
    // Get the currently selected component from the cache
    getSelectedComponent: (state) => {
      if (state.selectedComponent) {
        return state.componentCache[state.selectedComponent];
      }
      return null;
    },
  },
});
