<script lang="ts">
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';

export default {
  name: 'MapWrapper',
  components: {
    LMap,
    LTileLayer,
  },
  props: {
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      zoom: 10,
    };
  },
};
</script>

<template>
  <div style="height: 40vh; width: 100%">
    <l-map ref="map" v-model:zoom="zoom" :center="[latitude, longitude]" :useGlobalLeaflet="false">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
    </l-map>
  </div>
</template>
