import React from 'react';
import PropTypes from 'prop-types';
import ForceMediaContext from './ForceMediaContext';

const ForceMediaProvider = props => (
  <ForceMediaContext.Provider value={props.forceMediaQuery}>
    {props.children}
  </ForceMediaContext.Provider>
);

ForceMediaProvider.propTypes = PropTypes.shape({
  children: PropTypes.shape({}),
}).isRequired;

export default ForceMediaProvider;
