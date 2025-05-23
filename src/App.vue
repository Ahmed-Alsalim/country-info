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
      isTableDataLoading: false,
      isSearchLoading: false,
      error: {
        visible: false,
        message: '',
      },
      page: 1,
      totalPages: 0,
      totalRecords: 0,
      dialogVisible: false,
      dialogData: null as Country | null,
      searchText: '',
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
      this.isTableDataLoading = true;
      this.fetchData()
        .then((response: WorldBankResponse) => {
          this.countries = response[1];
          this.totalPages = response[0].pages;
          this.totalRecords = response[0].total;
        })
        .catch(() => {
          this.error.visible = true;
          this.error.message = 'Error fetching data';
        })
        .finally(() => {
          this.isTableDataLoading = false;
        });
    },
    changePage(page: number) {
      if (this.isTableDataLoading) return;

      this.page = page;
      this.fetchTableData();
    },
    openDialog(country: Country) {
      this.dialogVisible = true;
      this.dialogData = country;
    },
    search() {
      if (!this.searchText) return;
      if (this.searchText.length < 2 || this.searchText.length > 3) {
        this.error.visible = true;
        this.error.message = 'Country ISO code must be 2-3 characters';

        return;
      }

        this.isSearchLoading = true;
      this.fetchData(this.searchText)
        .then((response: WorldBankResponse) => {
          if (response[1]?.length > 0) {
            this.error.visible = false;
            this.dialogData = response[1][0];
            this.dialogVisible = true;
          } else {
            this.error.visible = true;
            this.error.message = 'ISO code invalid, no data found';
          }
        })
        .finally(() => {
          this.isSearchLoading = false;
          this.searchText = '';
        });
    },
  },
};
</script>

<template>
  <v-app>
    <v-toolbar>
      <v-row align="center" class="px-4">
        <v-col cols="4">
          <v-app-bar-title>Countries</v-app-bar-title>
        </v-col>

        <v-col cols="8" sm="4">
          <v-text-field
            v-model="searchText"
            :loading="isSearchLoading"
            placeholder="ISO code"
            rounded="lg"
            variant="solo"
            append-inner-icon="mdi-magnify"
            density="compact"
            single-line
            hide-details="auto"
            @keydown.enter="search"
            @click:append-inner="search"
          />
        </v-col>
        <v-spacer />
      </v-row>
    </v-toolbar>

    <v-main>
      <v-container>
        <CountriesTable
          :countries="countries"
          :page="page"
          :totalPages="totalPages"
          :isLoading="isTableDataLoading"
          @changePage="changePage"
          @openDialog="openDialog"
        />
      </v-container>
    </v-main>

    <DetailsDialog :visible="dialogVisible" :country-data="dialogData" @close="dialogVisible = false" />
    
    <v-snackbar v-model="error.visible" color="error" :timeout="3000" :text="error.message" />
  </v-app>
</template>
