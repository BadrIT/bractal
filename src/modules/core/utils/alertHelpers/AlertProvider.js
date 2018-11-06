import React from 'react';
import PropTypes from 'prop-types';

import assert from '~/modules/core/utils/jsHelpers/assert';

import AlertContext from './AlertContext';
import AlertToast from './alertComponent/AlertToast';

class AlertProvider extends React.Component {
  state = {
    messageText: null,
    buttonAction: null,
    buttonText: null,
    type: null,
    icon: null,
    hidden: true,
    topFullWidth: false,
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
      topFullWidth: args.topFullWidth,
      color: args.color,
      backgroundColor: args.backgroundColor,
    });
  }

  render = () => (
    <AlertContext.Provider value={this.startAlert}>
      {!(this.state.hidden) &&
        <AlertToast
          {...this.props}
          messageText={this.state.messageText}
          autoClose={this.state.buttonAction ? false : 5000}
          type={this.state.type}
          icon={this.state.icon}
          buttonText={this.state.buttonText}
          buttonAction={this.state.buttonAction}
          topFullWidth={this.state.topFullWidth}
          color={this.state.color || this.props.color}
          backgroundColor={this.state.backgroundColor || this.props.backgroundColor}
          opacity={this.props.opacity}
        />}
      {this.props.children}
    </AlertContext.Provider>
  );
}

AlertProvider.propTypes = PropTypes.shape({
  children: PropTypes.shape({}),
}).isRequired;

export default AlertProvider;
