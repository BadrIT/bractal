import React from 'react';
import RefetchContext from './RefetchContext';

export default function withRelayEnvironment(WrappedComponent) {
  return props => (
    <RefetchContext.Consumer>
      {value => <WrappedComponent {...value} {...props} />}
    </RefetchContext.Consumer>
  );
}
