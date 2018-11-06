import React from 'react';
import PropTypes from 'prop-types';
import MediaTestingContext from './MediaTestingContext';

const MediaTestingProvider = props => (
  <MediaTestingContext.Provider value={props.forceMediaQuery}>
    {props.children}
  </MediaTestingContext.Provider>
);

MediaTestingProvider.propTypes = PropTypes.shape({
  children: PropTypes.shape({}),
}).isRequired;

export default MediaTestingProvider;
