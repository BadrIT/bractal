/*eslint-disable*/
import React from 'react';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import createToast from './ToastFactory';
import AlertTypes from './AlertTypes';

const slidein = keyframes`
  from {
    transform: translate3d(0, -110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, 0, 0);
  }
`;
const slideout = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, -110%, 0);
    visibility: visible;
  }
`;
const ToastStyle = styled.div`
.Toastify__toast-container {
  z-index: 9999;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  color: #fff;
  animation-duration: 1s;
  animation-name: ${slidein};
}
.Toastify__toast.exit {
  animation-duration: 1s;
  animation-name: ${slideout};
}

.Toastify__toast {
  position: relative;
  min-height: 64px;
  box-sizing: border-box;
  margin-bottom: 1rem;
  padding: 8px;
  border-radius: 1px;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 15px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  max-height: 800px;
  overflow: hidden;
  font-family: sans-serif;
  cursor: pointer;
  direction: ltr;
}

.Toastify__toast-body {
  margin: auto 0;
  flex: 1;
}
.Toastify__close-button {
  display: flex;
  position: relative;
  align-self: flex-start;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  background: transparent;
  outline: none;
  border: none;
  padding: 0;
  cursor: pointer;
  opacity: 0.7;
  transition: 0.3s ease;
}
.Toastify__close-button--default {
  color: #000;
  opacity: 0.3;
}
.Toastify__close-button:hover, .Toastify__close-button:focus {
  opacity: 1;
}

.Toastify__toast--default {
  background: #fff;
  color: #aaa;
  height: 40px;
}
.Toastify__toast--info {
  background: #3498db;
  height: 40px;
}
.Toastify__toast--success {
  background: #07bc0c;
  height: 40px;
}
.Toastify__toast--warning {
  background: #f1c40f;
  height: 40px;
}
.Toastify__toast--error {
  background: #e74c3c;
  height: 40px;
}
`;

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
    <ToastStyle>
      <ToastContainer
        position="top-center"
        autoClose={props.autoClose}
        newestOnTop={false}
        closeOnClick={false}
        hideProgressBar
        draggable={false}
      />
    </ToastStyle>
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
