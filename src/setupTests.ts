/* eslint-disable import/no-extraneous-dependencies */
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

import * as ResizeObserverModule from 'resize-observer-polyfill';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).ResizeObserver = ResizeObserverModule.default;

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
