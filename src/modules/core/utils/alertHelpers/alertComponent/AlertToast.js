import React from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { css } from 'emotion';
import Icon from '~/modules/coreUI/components/basic/Icon';
import AlertTypes, { ToastTypes } from './AlertTypes';
import ToastMessage from './ToastMessage';
import {
  Wrapper,
  Toast,
  ToastBody,
  ToastCloseButton,
  defaultColor,
  infoColor,
  errorColor,
  warningColor,
  successColor,
  slidein,
  slideout,
  trackProgress,
  bottomRight,
} from './AlertToastStyle';

const ToastStyle = styled.div`
  .Toastify__toast-container {
    z-index: 9999;
    position: fixed;
    ${props => Wrapper(props)}
  }
  .Toastify__toast {
    ${props => Toast(props)}
  }
  .Toastify__toast-body {
    ${props => ToastBody(props)}
  }
  .Toastify__toast--default {
    ${props => defaultColor(props)}
  }
  .Toastify__toast--info {
    ${props => infoColor(props)}
  }
  .Toastify__toast--success {
    ${props => successColor(props)}
  }
  .Toastify__toast--warning {
    ${props => warningColor(props)}
  }
  .Toastify__toast--error {
    ${props => errorColor(props)}
  }
  .Toastify__close-button {
    ${props => ToastCloseButton(props)}
  }
  .Toastify__slide-enter--bottom-right, .Toastify__slide-enter--top-center {
    animation-name: ${slidein};
  }
  .Toastify__slide-exit--bottom-right, .Toastify__slide-exit--top-center {
    animation-name: ${slideout};
  }
  .Toastify__progress-bar {
    position: absolute;
    animation: ${trackProgress} linear 1;
  }
  .Toastify__toast-container--bottom-right {
    ${props => bottomRight(props)}
  }
  .Toastify__toast-container--top-center {
    width: 100%;
  }
  .Toastify__toast:nth-child(n+2) {
    ${props => props.topFullWidth && css`
      position: absolute;
      top: 0;
      width: 100%;
    `}
  }
`;
const AlertToast = (props) => {
  const TargetComponent = props.component || ToastMessage;
  const choosenConfig = ToastTypes[props.type] || { renderMethod: toast };

  choosenConfig.renderMethod(<TargetComponent
    {...props}
    defaultIcon={<Icon className={choosenConfig.iconClassName} />}
  />);

  return (
    <ToastStyle {...props} >
      <ToastContainer
        position={props.topFullWidth ? 'top-center' : 'bottom-right'}
        autoClose={!props.buttonAction && 5000}
        newestOnTop
        closeOnClick={false}
        hideProgressBar
        draggable={false}
        transition={Slide}
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
