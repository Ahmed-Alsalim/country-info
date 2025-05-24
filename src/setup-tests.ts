import { afterEach, vi } from 'vitest';
import ResizeObserver from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserver;

if (!global.fetch) {
  global.fetch = vi.fn();
}

afterEach(() => {
  vi.clearAllMocks();
});
