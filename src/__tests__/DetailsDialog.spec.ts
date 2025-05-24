import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Country } from '../types';
import mockData from './mockData.json';
import DetailsDialog from '../components/DetailsDialog.vue';
import { mount } from '@vue/test-utils';

describe('DetailsDialog', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });
  const countryArray = mockData.tableData[1] as Country[];
  const mockCountry: Country = countryArray[0];

  it('emits close event when dialog is closed', () => {
    const wrapper = mount(DetailsDialog, {
      props: {
        visible: true,
        countryData: mockCountry,
      },
    });

    wrapper.vm.closeDialog();
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('shows correct data in dialog', () => {
    const wrapper = mount(DetailsDialog, {
      props: {
        visible: true,
        countryData: mockCountry,
      },
    });

    expect(wrapper.find('v-dialog').exists()).toBe(true);

    const iso2CodeField = wrapper.find('v-text-field[label="ISO Code"]');
    expect(iso2CodeField.exists()).toBe(true);
    expect(iso2CodeField.attributes('model-value')).toBe(mockCountry.iso2Code);
  });
});
