import type { DefineComponent } from 'vue';

// Define a type for the component map
export type ComponentMap = {
  [key: string]: DefineComponent<{}, {}, any>; // Use Vue's DefineComponent type
};
