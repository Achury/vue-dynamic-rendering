import { setActivePinia, createPinia } from 'pinia';
import { useDataStore } from '../../src/stores/dataStore';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';

// Mock axios
vi.mock('axios');

describe('useDataStore', () => {
  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    setActivePinia(createPinia());
    vi.clearAllMocks(); // Clear all mocks between tests
  });

  it('fetches data successfully', async () => {
    const mockData = [
      { id: 1, title: 'Test Post', body: 'This is a test post.' },
    ];
    vi.mocked(axios.get).mockResolvedValue({ data: mockData });

    const store = useDataStore();
    await store.fetchData();

    expect(store.posts).toEqual(mockData);
    expect(store.loading).toBe(false);
    expect(store.error).toBe(null);
  });

  it('handles fetch errors', async () => {
    const mockError = new Error('An unknown error occurred. Please try again.');
    vi.mocked(axios.get).mockRejectedValue(mockError);

    const store = useDataStore();
    await store.fetchData();

    expect(store.posts).toEqual([]);
    expect(store.loading).toBe(false);
    expect(store.error).toBe('An unknown error occurred. Please try again.');
  });

  it('uses cached data if fetched recently', async () => {
    const mockData = [
      { id: 1, title: 'Test Post', body: 'This is a test post.' },
    ];
    vi.mocked(axios.get).mockResolvedValue({ data: mockData });

    const store = useDataStore();
    store.lastFetched = Date.now(); // Simulate recent fetch
    await store.fetchData();

    expect(axios.get).not.toHaveBeenCalled(); // Ensure no network request is made
    expect(store.posts).toEqual([]); // Cached data is not updated
  });
});
