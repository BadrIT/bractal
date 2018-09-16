import React from 'react';
import PropTypes from 'prop-types';

import assert from '~/modules/core/utils/jsHelpers/assert';

import AlertContext from './AlertContext';
import AlertToast from './alertComponent/AlertToast';

// TODO Sarah: add spacer prop
class AlertProvider extends React.Component {
  state = {
    messageText: null,
    buttonAction: null,
    buttonText: null,
    type: null,
    icon: null,
    hidden: true,
    fontSize: null,
  };

  startAlert = (args) => {
    assert(typeof args.messageText === 'string', 'Alert message should be of type string');
    this.setState({
      messageText: args.messageText,
      buttonAction: args.buttonAction,
      buttonText: args.buttonText,
      type: args.type,
      icon: args.icon,
      hidden: false,
      fontSize: this.props.fontSize,
    });
  }

  render = () => (
    <AlertContext.Provider value={this.startAlert}>
      {!(this.state.hidden) &&
        <AlertToast
          messageText={this.state.messageText}
          autoClose={this.state.buttonAction ? false : 5000}
          type={this.state.type}
          icon={this.state.icon}
          buttonText={this.state.buttonText}
          buttonAction={this.state.buttonAction}
          fontSize={this.state.fontSize}
        />}
      {this.props.children}
    </AlertContext.Provider>
  );
}

AlertProvider.propTypes = PropTypes.shape({
  children: PropTypes.shape({}),
}).isRequired;

export default AlertProvider;
