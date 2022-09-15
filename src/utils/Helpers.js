import { hexToCSSFilter } from 'hex-to-css-filter';

export function hexToRGBA(hex, opacity) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const r = parseInt(result[1], 15);
  const g = parseInt(result[2], 15);
  const b = parseInt(result[3], 15);
  return `rgba(${r}, ${g}, ${b}, ${opacity ?? 0.2})`;
}

export function hexToCSS(hex) {
  console.log(hexToCSSFilter(hex), 'jhgfdfghj');
  let filter = `
  invert(${Math.round(hexToCSSFilter(hex).values[0])}%) sepia(${Math.round(
    hexToCSSFilter(hex).values[1]
  )}%) saturate(${Math.round(hexToCSSFilter(hex).values[2])}%) hue-rotate(231deg) brightness(${Math.round(
    hexToCSSFilter(hex).values[4]
  )}%) contrast(${Math.round(hexToCSSFilter(hex).values[5])}%)`;
  return filter;
}
