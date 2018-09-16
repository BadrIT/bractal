import React from 'react';
import AlertContext from './AlertContext';

export default function withAlertMsg(WrappedComponent) {
  return function render(props) {
    return (
      <AlertContext.Consumer>
        {value => (
          <WrappedComponent notifyAlert={value} {...props} />
        )}
      </AlertContext.Consumer>
    );
  };
}
