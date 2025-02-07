import { defineStore } from 'pinia';
import axios from 'axios';

export const useDataStore = defineStore('data', {
  state: () => ({
    posts: [] as any[], // Store fetched data
    loading: false, // Loading state
    error: null as string | null, // Error state
    lastFetched: null as number | null, // Timestamp of the last fetch
  }),
  actions: {
    // Fetch data from the API
    async fetchData() {
      // Return cached data if it was fetched recently (e.g., within the last 5 minutes)
      if (this.lastFetched && Date.now() - this.lastFetched < 5 * 60 * 1000) {
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts'
        );
        this.posts = response.data; // Store fetched data
        this.lastFetched = Date.now(); // Update the last fetched timestamp
      } catch (err) {
        this.error =
          err instanceof Error ? err.message : 'An unknown error occurred';
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    // Split data into chunks for each component
    splitData: (state) => {
      const chunkSize = Math.ceil(state.posts.length / 3); // Split data into 3 equal parts
      return {
        ComponentA: state.posts.slice(0, chunkSize),
        ComponentB: state.posts.slice(chunkSize, chunkSize * 2),
        ComponentC: state.posts.slice(chunkSize * 2),
      };
    },
  },
});
