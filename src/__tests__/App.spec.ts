import type { WorldBankResponse } from '../types';
import mockData from './mockData.json';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';

import App from '../App.vue';

describe('App', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  // Helper function to test methods after component is mounted
  async function mountedWrapper() {
    const mockResponseData = mockData.tableData as WorldBankResponse;
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponseData),
    });

    const wrapper = mount(App);
    await flushPromises();
    vi.clearAllMocks();

    return wrapper;
  }

  it('initializes and calls fetchTableData on mount', async () => {
    const mockResponse = mockData.tableData as WorldBankResponse;

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    });

    const wrapper = mount(App);

    expect(global.fetch, 'Fetch called with correct URL').toHaveBeenCalledWith(
      'https://api.worldbank.org/v2/country/?format=json&page=1',
    );
    expect(wrapper.vm.isTableDataLoading, 'Table data is still loading').toBe(true);

    await flushPromises();

    expect(wrapper.vm.isTableDataLoading, 'Table data finished loading').toBe(false);
    expect(wrapper.vm.countries, 'Countries are loaded').toEqual(mockResponse[1]);
    expect(wrapper.vm.totalPages, 'Total pages are loaded').toBe(mockResponse[0].pages);
    expect(wrapper.vm.totalRecords, 'Total records are loaded').toBe(mockResponse[0].total);
  });

  it('validates the search input', () => {
    const wrapper = mount(App);

    wrapper.vm.searchText = 'United Kingdom';
    wrapper.vm.search();

    expect(wrapper.vm.error.visible, 'Error is visible').toBe(true);
    expect(wrapper.vm.error.message, 'Error message is correct').toBe('Country ISO code must be 2-3 characters');
  });

  it('performs a valid search and displays the correct data', async () => {
    const mockSearchResponse = mockData.searchData as WorldBankResponse;
    const wrapper = await mountedWrapper();

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      json: () => Promise.resolve(mockSearchResponse),
    });

    await wrapper.setData({ searchText: 'GB' });
    await wrapper.vm.search();

    expect(global.fetch, 'Fetch called with correct URL').toHaveBeenCalledWith(
      'https://api.worldbank.org/v2/country/GB?format=json',
    );
    expect(wrapper.vm.isSearchLoading, 'Search is loading').toBe(true);

    await flushPromises();

    expect(wrapper.vm.isSearchLoading, 'Search finished loading').toBe(false);
    expect(wrapper.vm.dialogData, 'Dialog data is loaded').toEqual(mockSearchResponse[1]?.[0]);
    expect(wrapper.vm.error.visible, 'Error is not visible').toBe(false);

    expect(wrapper.find('v-dialog').exists(), 'Vuetify dialog is rendered in the DOM').toBe(true);

    const detailsDialog = wrapper.findComponent({ name: 'DetailsDialog' });
    expect(detailsDialog.exists(), 'DetailsDialog component exists').toBe(true);
    expect(detailsDialog.props('visible'), 'Dialog visibility prop is true').toBe(true);
    expect(detailsDialog.props('countryData'), 'Country data is passed correctly to dialog').toEqual(
      mockSearchResponse[1]?.[0],
    );
  });

  it('handles invalid ISO code', async () => {
    const wrapper = await mountedWrapper();

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      json: () => Promise.resolve([{}]),
    });

    await wrapper.setData({ searchText: 'XX' });
    await wrapper.vm.search();

    expect(global.fetch, 'Fetch called with correct URL').toHaveBeenCalledWith(
      'https://api.worldbank.org/v2/country/XX?format=json',
    );

    await flushPromises();

    expect(wrapper.vm.error.visible, 'Error is visible').toBe(true);
    expect(wrapper.vm.error.message, 'Error message is correct').toBe('ISO code invalid, no data found');
  });

  it('handles changing page', async () => {
    const wrapper = await mountedWrapper();

    wrapper.vm.changePage(2);

    expect(global.fetch, 'Fetch called with correct URL').toHaveBeenCalledWith(
      'https://api.worldbank.org/v2/country/?format=json&page=2',
    );
  });

  it('prevents changing page when loading', async () => {
    const wrapper = await mountedWrapper();

    wrapper.vm.isTableDataLoading = true;
    wrapper.vm.changePage(2);
    expect(wrapper.vm.page, 'Page is not changed').toBe(1);
    expect(global.fetch, 'Fetch is not called').not.toHaveBeenCalled();
  });
});
