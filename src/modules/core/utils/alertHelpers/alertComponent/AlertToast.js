import React from 'react';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import createToast from './ToastFactory';
import AlertTypes from './AlertTypes';

const AlertToast = (props) => {
  const alertData = {
    messageText: props.messageText,
    type: props.type,
    icon: props.icon,
    buttonText: props.buttonText,
    buttonAction: props.buttonAction,
    fontSize: props.fontSize,
    spacerSize: props.spacerSize,
  };
  createToast(alertData);

  return (
    <ToastContainer
      position="top-right"
      autoClose={props.autoClose}
      newestOnTop={props.newestOnTop}
      closeOnClick={false}
      hideProgressBar
    />
  );
};

AlertToast.propTypes = PropTypes.shape({
  messageText: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(AlertTypes)),
  autoClose: PropTypes.oneOfType([Number, Boolean]),
  icon: PropTypes.shape,
  buttonText: PropTypes.string,
  buttonAction: PropTypes.func,
}).isRequired;

export default AlertToast;
