import { mount, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useDynamicStore } from '../../src/stores/dynamicStore';
import { useDataStore } from '../../src/stores/dataStore';
import DynamicRenderer from '../../src/components/DynamicRenderer.vue';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('DynamicRenderer', () => {
  let pinia: ReturnType<typeof createPinia>;

  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    pinia = createPinia();
    setActivePinia(pinia);

    // Mock the fetchData method in the dataStore
    const dataStore = useDataStore();
    dataStore.fetchData = vi.fn(); // Mock fetchData to avoid HTTP requests
  });

  it('renders the selected component', async () => {
    const dynamicStore = useDynamicStore();
    dynamicStore.selectedComponent = 'ComponentA'; // Simulate selecting ComponentA

    const wrapper = mount(DynamicRenderer, {
      global: {
        plugins: [pinia], // Ensure Pinia is properly initialized
      },
    });
    await flushPromises(); // Wait for async components to resolve

    expect(wrapper.findComponent({ name: 'ComponentA' }).exists()).toBe(true);
  });

  it('displays loading state while fetching data', async () => {
    const dataStore = useDataStore();
    dataStore.loading = true; // Simulate loading state

    const wrapper = mount(DynamicRenderer, {
      global: {
        plugins: [pinia], // Ensure Pinia is properly initialized
      },
    });
    expect(wrapper.find('.text-gray-400').text()).toBe('Loading...');
  });

  it('displays error state if data fetching fails', async () => {
    const dataStore = useDataStore();
    dataStore.error = 'Failed to fetch data'; // Simulate error state

    const wrapper = mount(DynamicRenderer, {
      global: {
        plugins: [pinia], // Ensure Pinia is properly initialized
      },
    });
    expect(wrapper.find('.text-red-500').text()).toContain(
      'Failed to fetch data'
    );
  });
});
