<script lang="ts">
import type { Country, WorldBankResponse } from './types';
import CountriesTable from './components/CountriesTable.vue';
import DetailsDialog from './components/DetailsDialog.vue';

export default {
  name: 'App',
  components: {
    CountriesTable,
    DetailsDialog,
  },
  data() {
    return {
      countries: [] as Country[],
      loading: false,
      error: null,
      page: 1,
      totalPages: 0,
      totalRecords: 0,
      dialogVisible: false,
      dialogData: null as Country | null,
    };
  },
  mounted() {
    this.fetchTableData();
  },
  methods: {
    async fetchData(countryCode: string = '') {
      let url = `https://api.worldbank.org/v2/country/${countryCode}?format=json`;
      if (!countryCode) url += `&page=${this.page}`;

      return fetch(url).then((res) => res.json());
    },
    async fetchTableData() {
      this.loading = true;
      this.fetchData()
        .then((response: WorldBankResponse) => {
          this.countries = response[1];
          this.totalPages = response[0].pages;
          this.totalRecords = response[0].total;
        })
        .catch((error) => {
          this.error = error;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    changePage(page: number) {
      if (this.loading) return;

      this.page = page;
      this.fetchData();
    },
    openDialog(country: Country) {
      this.dialogVisible = true;
      this.dialogData = country;
    },
  },
};
</script>

<template>
  <v-app>
    <v-app-bar title="countries" />

    <v-main>
      <v-container>
        <CountriesTable
          :countries="countries"
          :page="page"
          :totalPages="totalPages"
          @changePage="changePage"
          @openDialog="openDialog"
        />
      </v-container>
    </v-main>
    <DetailsDialog :visible="dialogVisible" :country-data="dialogData" @close="dialogVisible = false" />
  </v-app>
</template>


