import React from 'react';
import RefetchContext from './RefetchContext';


export default function withRelayEnvironment(WrappedComponent) {
  return class PureWrapper extends React.PureComponent {
    render = () => (
      <RefetchContext.Consumer>
        {value => (
          <WrappedComponent
            {...value}
            {...this.props}
          />
        )}
      </RefetchContext.Consumer>
    );
  };
}
