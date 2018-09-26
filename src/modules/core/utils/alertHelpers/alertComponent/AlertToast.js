import React from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
} from './AlertToastStyle';

const ToastStyle = styled.div`
  .Toastify__toast-container {
    z-index: 9999;
    position: fixed;
    ${Wrapper}
  }
  .Toastify__toast {
    ${Toast}
  }
  .Toastify__toast-body {
    ${ToastBody}
  }
  .Toastify__toast--default {
    ${defaultColor}
  }
  .Toastify__toast--info {
    ${infoColor}
  }
  .Toastify__toast--success {
    ${successColor}
  }
  .Toastify__toast--warning {
    ${warningColor}
  }
  .Toastify__toast--error {
    ${errorColor}
  }
  .Toastify__close-button {
    ${ToastCloseButton}
  }
  .Toastify__slide-enter--bottom-right, .Toastify__slide-exit--top-center {
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
    right: ${props => 2 * props.theme.new.spacer}px;
    bottom: ${props => props.theme.new.spacer}px;
  }
  .Toastify__toast-container--top-center {
    width: 100%;
  }
`;
// TODO Sarah test acceptance of component in props to have alert content
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
        autoClose={!props.buttonAction && 50000}
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
