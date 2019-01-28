import React from 'react';
import { withMedia } from 'react-media-query-hoc-with-context';
import _ from 'lodash';
import ForceMediaContext from './ForceMediaContext';

const patchTargets = {
  xsmall: ['minXsamll', 'xsmall', 'maxMobile', 'maxTablet', 'maxDesktop', 'maxLargeDesktop'],
  mobile: [
    'minXsmall',
    'minMobile',
    'mobile',
    'maxMobile',
    'maxTablet',
    'maxDesktop',
    'maxLargeDesktop',
  ],
  tablet: [
    'minXsmall',
    'minMobile',
    'minTablet',
    'tablet',
    'maxTablet',
    'maxDesktop',
    'maxLargeDesktop',
  ],
  desktop: [
    'minXsmall',
    'minMobile',
    'minTablet',
    'minDesktop',
    'desktop',
    'maxDesktop',
    'maxLargeDesktop',
  ],
  largeDesktop: [
    'minXsmall',
    'minMobile',
    'minTablet',
    'minDesktop',
    'largeDesktop',
    'maxLargeDesktop',
  ],
};

export default WrappedComponent => withMedia(props => (
  <ForceMediaContext.Consumer>
    {(forceMediaQuery) => {
      let patchedMedia = props.media;

      if (forceMediaQuery) {
        patchedMedia = _.mapValues(props.media, (mediaQueryMatched, mediaQueryName) => patchTargets[forceMediaQuery].includes(mediaQueryName));
      }
      return (
        <WrappedComponent {...props} media={patchedMedia} forceMediaQuery={forceMediaQuery}>
          {props.children}
        </WrappedComponent>
      );
    }}
  </ForceMediaContext.Consumer>
));
