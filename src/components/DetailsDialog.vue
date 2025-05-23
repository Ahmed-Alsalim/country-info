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
    data: {
      type: Object as PropType<Country>,
      required: true,
    },
  },
  data() {
    return {
      dialogVisible: this.visible,
    };
  },
  methods: {
    closeDialog() {
      this.dialogVisible = false;
      this.$emit('close');
    },
  },
};
</script>

<template>
  <v-dialog v-model="dialogVisible" width="500">
    <v-card>
      <v-card-title>
        <span class="text-h6">Country Details</span>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="Country Code" v-model="dialogData.iso2Code" readonly />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="Country Name" v-model="dialogData.name" readonly />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style></style>
