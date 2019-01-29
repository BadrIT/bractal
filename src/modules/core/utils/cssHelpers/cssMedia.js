// these sizes are arbitrary and you can set them to whatever you wish
import { css } from '@emotion/core';

const QueryMode = {
  MIN: 0,
  MAX: 1,
};

const supportedSizes = [
  'largeDesktop',
  'desktop',
  'tablet',
  'mobile',
  'xsmall',
];

export const mediaSizesMax = {
  largeDesktop: 10240,
  desktop: 1600,
  tablet: 1100,
  mobile: 800,
  xsmall: 500,
};

export const mediaSizesMin = {
  largeDesktop: 1600,
  desktop: 1100,
  tablet: 800,
  mobile: 500,
  xsmall: 250,
};


const emSizeString = (mediaName, isMax) => (isMax ? (
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  `${mediaSizesMax[mediaName] / 16}em`
) : (
  `${mediaSizesMin[mediaName] / 16}em`
));

const cssMedia = mode => supportedSizes.reduce((accumulator, label) => {
  const emSize = emSizeString(label, mode === QueryMode.MAX);
  const queryMode = mode === QueryMode.MAX ? 'max-width' : 'min-width';

  return {
    ...accumulator,
    [label]: (...args) => css`
      @media (${queryMode}: ${emSize}) {
        ${css(...args)}
      }
    `,
  };
}, {});

// iterate through the sizes and create a media template
export const cssMediaMax = cssMedia(QueryMode.MAX);
export const cssMediaMin = cssMedia(QueryMode.MIN);
export const cssMediaRange = cssMedia(QueryMode.RANGE);

export const mediaQueryMax = mediaName => `(max-width: ${emSizeString(mediaName, true)})`;
export const mediaQueryMin = mediaName => `(min-width: ${emSizeString(mediaName, false)})`;
export const mediaQueryExact = mediaName => `(min-width: ${emSizeString(mediaName, false)}) and (max-width: ${emSizeString(mediaName, true)})`;
