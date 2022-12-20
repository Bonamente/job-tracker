// eslint-disable-next-line import/no-extraneous-dependencies
import { Locator } from '@playwright/test';

const getColor = async (el: Locator) => {
  const color = await el.evaluate((e: SVGElement | HTMLElement) =>
    window.getComputedStyle(e).getPropertyValue('color')
  );

  return color;
};

export default getColor;
