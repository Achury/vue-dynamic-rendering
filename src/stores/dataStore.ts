import { defineStore } from 'pinia';
import { shallowRef } from 'vue';
import axios from 'axios';

export const useDataStore = defineStore('data', {
  state: () => ({
    posts: shallowRef<any[]>([]), // Explicitly type as shallowRef<any[]>
    loading: false,
    error: null as string | null,
    lastFetched: null as number | null,
  }),
  actions: {
    async fetchData() {
      if (this.lastFetched && Date.now() - this.lastFetched < 5 * 60 * 1000) {
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts'
        );
        if (!response.data) {
          throw new Error('No data received from the server.');
        }
        this.posts = response.data; // Update the value of shallowRef
        this.lastFetched = Date.now();
      } catch (err) {
        this.error = 'An unknown error occurred. Please try again.';
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    splitData: (state) => {
      const chunkSize = Math.ceil(state.posts.length / 3); // Access the value of shallowRef
      return {
        ComponentA: state.posts.slice(0, chunkSize),
        ComponentB: state.posts.slice(chunkSize, chunkSize * 2),
        ComponentC: state.posts.slice(chunkSize * 2),
      };
    },
  },
});
