import React from 'react';
import RelayContext from './RelayContext';
import getDisplayName from '~/modules/core/utils/reactHelpers/getDisplayName';

export default function withRelayEnvironment(WrappedComponent) {
  const WithRelayEnvironment = props => (
    <RelayContext.Consumer>
      {environment => <WrappedComponent environment={environment} {...props} />}
    </RelayContext.Consumer>
  );
  WithRelayEnvironment.displayName = `WithRelayEnvironment(${getDisplayName(WrappedComponent)})`;

  return WithRelayEnvironment;
}
