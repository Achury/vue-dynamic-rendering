import type { DefineComponent } from 'vue';

// Define a type for the component map
export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface ComponentMap {
  [key: string]: DefineComponent<{ posts: Post[] }, {}, any>;
}
