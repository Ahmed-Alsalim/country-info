<script lang="ts">
import type { Country } from '../types';
import type { PropType } from 'vue';

export default {
  name: 'CountriesTable',
  emits: ['changePage', 'openDialog'],
  props: {
    countries: {
      type: Array as PropType<Country[]>,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage(page: number) {
      this.$emit('changePage', page);
    },
    openDialog(country: Country) {
      this.$emit('openDialog', country);
    },
  },
};
</script>

<template>
  <v-table class="table" fixed-header fixed-footer>
    <thead>
      <tr>
        <th>iso Code</th>
        <th>name</th>
        <th>capitalCity</th>
        <th>region</th>
      </tr>
    </thead>

    <tbody>
      <tr v-if="isLoading">
        <td colspan="100%">
          <v-skeleton-loader type="table-row@10" height="80vh" />
        </td>
      </tr> 
      <tr v-else v-for="country in countries" :key="country.iso2Code" class="clickable-row" @click="openDialog(country)">
        <td>{{ country.iso2Code }}</td>
        <td>{{ country.name }}</td>
        <td>{{ country.capitalCity }}</td>
        <td>{{ country.region.value }}</td>
      </tr>
    </tbody>

    <tfoot>
      <tr class="table-footer">
        <td colspan="100%">
          <v-btn density="comfortable" icon :disabled="page === 1" @click="changePage(page - 1)">
            {{ '<' }}
          </v-btn>
          <span class="mx-2">Page {{ page }} of {{ totalPages }}</span>
          <v-btn density="comfortable" icon :disabled="page === totalPages" @click="changePage(page + 1)">
            {{ '>' }}
          </v-btn>
        </td>
      </tr>
    </tfoot>
  </v-table>
</template>

<style lang="scss" scoped>
.table {
  height: calc(100vh - 96px);
}

.table-footer {
  background-color: white;
  text-align: center;
}

.clickable-row {
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
}
</style>