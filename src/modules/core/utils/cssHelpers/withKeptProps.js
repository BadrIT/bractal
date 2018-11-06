import React from 'react';
import _ from 'lodash';

export default (WrappedComponent, propsToKeep) => props => (
  <WrappedComponent
    {..._.pick(props, propsToKeep)}
  >
    {/* eslint-disable react/prop-types */}
    {props.children}
    {/* eslint-enable react/prop-types */}
  </WrappedComponent>
);
