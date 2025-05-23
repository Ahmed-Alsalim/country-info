<script lang="ts">
import type { Country, WorldBankResponse } from './types';

export default {
  name: 'App',
  data() {
    return {
      countries: [] as Country[],
      loading: false,
      error: null,
      page: 1,
      totalPages: 0,
      totalRecords: 0,
    };
  },
  async mounted() {
    await this.fetchData();
  },
  methods: {
    async fetchData(countryCode: string = '') {
      this.loading = true;
      fetch(`https://api.worldbank.org/v2/country/${countryCode}?format=json&page=${this.page}`)
        .then((res) => res.json())
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
  },
};
</script>

<template>
  <v-app>
    <v-app-bar title="countries" />

    <v-main>
      <v-container>
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
            <tr v-for="country in countries" :key="country.iso2Code">
              <td>{{ country.iso2Code }}</td>
              <td>{{ country.name }}</td>
              <td>{{ country.capitalCity }}</td>
              <td>{{ country.region.value }}</td>
            </tr>
          </tbody>

          <tfoot>
            <tr class="table-footer">
              <td colspan="100%">
                <v-btn density="comfortable" icon :disabled="page === 1" @click="changePage(page - 1)"> {{ '<' }} </v-btn>
                <span class="mx-2">Page {{ page }} of {{ totalPages }}</span>
                <v-btn density="comfortable" icon :disabled="page === totalPages" @click="changePage(page + 1)"> {{ '>' }} </v-btn>
              </td>
            </tr>
          </tfoot>
        </v-table>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.table {
  height: calc(100vh - 96px);
}

.table-footer {
  background-color: white;
  text-align: center;
}
</style>
