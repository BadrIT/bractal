import React from 'react';
import PropTypes from 'prop-types';
import ForceDirectionContext from './ForceDirectionContext';

const ForceMediaProvider = props => (
  <ForceDirectionContext.Provider value={props.forceDirection}>
    {props.forceDirection ? (
      <div dir={props.forceDirection} style={{ width: '100%' }}>
        {props.children}
      </div>
    ) : (
      props.children
    )}
  </ForceDirectionContext.Provider>
);

ForceMediaProvider.propTypes = PropTypes.shape({
  children: PropTypes.shape({}),
}).isRequired;

export default ForceMediaProvider;
