/* eslint-disable react/prop-types */
import React from 'react';
import { MediaQueryProvider } from 'react-media-query-hoc-with-context';

import {
  mediaQueryMax,
  mediaQueryMin,
  mediaQueryExact,
} from '~/modules/core/utils/cssHelpers/cssMedia';

const queries = {
  largeDesktop: mediaQueryMin('largeDesktop'),
  maxLargeDesktop: mediaQueryMax('largeDesktop'),

  desktop: mediaQueryExact('desktop'),
  minDesktop: mediaQueryMin('desktop'),
  maxDesktop: mediaQueryMax('desktop'),

  tablet: mediaQueryExact('tablet'),
  minTablet: mediaQueryMin('tablet'),
  maxTablet: mediaQueryMax('tablet'),

  mobile: mediaQueryExact('mobile'),
  minMobile: mediaQueryMin('mobile'),
  maxMobile: mediaQueryMax('mobile'),

  minXsmall: mediaQueryMin('xsmall'),
  xsmall: mediaQueryMax('xsmall'),
};

const MediaProvider = props => (
  <MediaQueryProvider queries={queries}>{props.children}</MediaQueryProvider>
);

export default MediaProvider;
