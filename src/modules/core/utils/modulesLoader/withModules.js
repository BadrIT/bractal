import React from 'react';
import ModulesLoader from './';

export default function withModules(WrappedComponent) {
  return function render(props) {
    // ... and renders the wrapped component with the fresh data!
    // Notice that we pass through any additional props
    return (
      <ModulesLoader.Context.Consumer>
        {modules => (
          <WrappedComponent modules={modules} {...props} />
        )}
      </ModulesLoader.Context.Consumer>
    );
  };
}
