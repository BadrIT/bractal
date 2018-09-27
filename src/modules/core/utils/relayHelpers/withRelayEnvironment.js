import React from 'react';
import RelayContext from './RelayContext';


export default function withRelayEnvironment(WrappedComponent) {
  return class PureWrapper extends React.PureComponent {
    render = () => (
      <RelayContext.Consumer>
        {environment => (
          <WrappedComponent environment={environment} {...this.props} />
        )}
      </RelayContext.Consumer>
    );
  };
}
