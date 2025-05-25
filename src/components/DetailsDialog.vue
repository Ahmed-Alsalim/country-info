<script lang="ts">
import type { Country } from '../types';
import type { PropType } from 'vue';
import MapWrapper from './MapWrapper.vue';
export default {
  name: 'DetailsDialog',
  components: { MapWrapper },
  emits: ['close'],
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    countryData: {
      type: Object as PropType<Country>,
      required: true,
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    },
  },
};
</script>

<template>
  <v-dialog :model-value="visible" width="600" scrollable @update:model-value="closeDialog">
    <v-card>
      <v-card-title>
        Country Details
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="3">
            <v-text-field
              :model-value="countryData.iso2Code || '-'"
              label="ISO Code"
              variant="underlined"
              dirty
              hide-details
              readonly
            />
          </v-col>
          <v-col cols="12" sm="9">
            <v-text-field
              :model-value="countryData.name || '-'"
              label="Name"
              variant="underlined"
              dirty
              hide-details
              readonly
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :model-value="countryData.capitalCity || '-'"
              label="Capital City"
              variant="underlined"
              dirty
              hide-details
              readonly
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :model-value="countryData.region?.value || '-'"
              label="Region"
              variant="underlined"
              dirty
              hide-details
              readonly
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :model-value="countryData.longitude || '-'"
              label="Longitude"
              variant="underlined"
              dirty
              hide-details
              readonly
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :model-value="countryData.latitude || '-'"
              label="Latitude"
              variant="underlined"
              dirty
              hide-details
              readonly
            />
          </v-col>
          <v-col v-if="countryData.latitude && countryData.longitude" cols="12">
            <MapWrapper :latitude="countryData.latitude" :longitude="countryData.longitude" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="px-6">
        <v-btn variant="tonal" block @click="closeDialog"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
