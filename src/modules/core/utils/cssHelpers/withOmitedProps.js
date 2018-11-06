import React from 'react';
import _ from 'lodash';

export default (WrappedComponent, omitedProps) => props => (
  <WrappedComponent
    {..._.omit(props, omitedProps)}
  >
    {/* eslint-disable react/prop-types */}
    {props.children}
    {/* eslint-enable react/prop-types */}
  </WrappedComponent>
);
