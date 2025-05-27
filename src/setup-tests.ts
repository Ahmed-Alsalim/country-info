import { afterEach, vi } from 'vitest';
import ResizeObserver from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserver;

if (!global.fetch) {
  global.fetch = vi.fn();
}

vi.mock('@vue-leaflet/vue-leaflet', () => ({
  LMap: {
    name: 'LMap',
    template: '<div data-testid="l-map"><slot /></div>',
    props: ['zoom', 'center', 'useGlobalLeaflet'],
  },
  LTileLayer: {
    name: 'LTileLayer',
    template: '<div data-testid="l-tile-layer"></div>',
    props: ['url', 'layerType', 'name'],
  },
}));

afterEach(() => {
  vi.clearAllMocks();
});
