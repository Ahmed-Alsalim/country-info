<script lang="ts">
import type { Country } from '../types';
import type { PropType } from 'vue';

export default {
  name: 'DetailsDialog',
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
  <v-dialog :model-value="visible" @update:model-value="closeDialog" width="600">
    <v-card>
      <v-card-title>
        <span class="text-h6">Country Details</span>
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
              :model-value="countryData.region.value || '-'"
              label="Region"
              variant="underlined"
              dirty
              hide-details
              readonly
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style></style>
