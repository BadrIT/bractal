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
 } from './AlertToastStyle';

const ToastStyle = styled.div`
  .Toastify__toast-container {
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
  .Toastify__slide-enter--top-center {
    animation-name: ${slidein};
  }
  .Toastify__slide-exit--top-center {
    animation-name: ${slideout};
  }
`;
// TODO Sarah test acceptance of component in props to have alert content
const AlertToast = (props) => {
  const alertData = {
    messageText: props.messageText,
    type: props.type,
    icon: props.icon,
    buttonText: props.buttonText,
    buttonAction: props.buttonAction,
    color: props.color,
    fontSize: props.fontSize,
  };

  const TargetComponent = props.component || ToastMessage;
  const choosenConfig = ToastTypes[alertData.type] || { renderMethod: toast };

  choosenConfig.renderMethod(<TargetComponent
    icon={<Icon className={choosenConfig.iconClassName} />}
    alertData={alertData}
  />);

  return (
    <ToastStyle
      topFullWidth={props.topFullWidth}
      color={props.color}
      fontSize={props.fontSize}
      opacity={props.opacity}
    >
      <ToastContainer
        position="top-center"
        autoClose={props.autoClose}
        newestOnTop={false}
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
