import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Country } from '../types';
import mockData from './mockData.json';
import CountriesTable from '../components/CountriesTable.vue';
import { mount } from '@vue/test-utils';

describe('CountriesTable', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('emits changePage event with correct page number', () => {
    const wrapper = mount(CountriesTable);

    wrapper.vm.changePage(2);
    expect(wrapper.emitted('changePage')).toBeTruthy();
    expect(wrapper.emitted('changePage')?.[0]).toEqual([2]);
  });

  it('emits openDialog event with correct country data', () => {
    const wrapper = mount(CountriesTable);

    const countryArray = mockData.tableData[1] as Country[];
    const mockCountry: Country = countryArray[0];

    wrapper.vm.openDialog(mockCountry);
    expect(wrapper.emitted('openDialog')).toBeTruthy();
    expect(wrapper.emitted('openDialog')?.[0]).toEqual([mockCountry]);
  });

  it('handles loading state to show skeleton loader', () => {
    const wrapper = mount(CountriesTable, {
      props: {
        isLoading: true,
      },
    });

    expect(wrapper.find('v-skeleton-loader').exists()).toBe(true);
    expect(wrapper.find('.clickable-row').exists()).toBe(false);
  });

  it('shows correct data in table', () => {
    const wrapper = mount(CountriesTable, {
      props: {
        countries: mockData.tableData[1] as Country[],
        isLoading: false,
        page: 1,
        totalPages: 2,
      },
    });
    const firstIso2CodeCell = wrapper.find('.clickable-row td:nth-child(1)');
    const countryArray = mockData.tableData[1] as Country[];
    const mockCountry: Country = countryArray[0];

    expect(wrapper.find('v-skeleton-loader').exists()).toBe(false);
    expect(wrapper.find('.clickable-row').exists()).toBe(true);
    expect(firstIso2CodeCell.text()).toBe(mockCountry.iso2Code);
  });
});
