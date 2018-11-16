import React from 'react';
import RelayContext from './RelayContext';

export default function withRelayEnvironment(WrappedComponent) {
  return props => (
    <RelayContext.Consumer>
      {environment => <WrappedComponent environment={environment} {...props} />}
    </RelayContext.Consumer>
  );
}
