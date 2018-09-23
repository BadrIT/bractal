import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '~/modules/coreUI/components/basic/Icon';
import AlertTypes, { ToastTypes } from './AlertTypes';
import ToastMessage from './ToastMessage';
import { Wrapper, Toast, ToastBody, ToastCloseButton } from './AlertToastStyle';

const Container = styled.div`
  ${Wrapper}
`;
const ToastWrapper = styled.div`
  ${Toast}
`;
const Body = styled.div`
  ${ToastBody}
`;
const CloseButton = styled.button`
  ${ToastCloseButton}
`;
const AlertToastExample = (props) => {
  const alertData = {
    messageText: props.messageText,
    type: props.type,
    icon: props.icon,
    buttonText: props.buttonText,
    buttonAction: props.buttonAction,
    color: props.color,
    fontSize: props.fontSize,
  };

  return (
    <Container
      topFullWidth={props.topFullWidth}
      color={props.color}
      fontSize={props.fontSize}
      opacity={props.opacity}
    >
      <ToastWrapper
        topFullWidth={props.topFullWidth}
        className={alertData.type || 'default'}
      >
        <Body>
          <CloseButton>✖</CloseButton>
          <ToastMessage
            icon={ToastTypes[alertData.type] &&
              <Icon className={ToastTypes[alertData.type].iconClassName} />
            }
            alertData={alertData}
          />
        </Body>
      </ToastWrapper>
    </Container>
  );
};

AlertToastExample.propTypes = PropTypes.shape({
  messageText: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(AlertTypes)),
  autoClose: PropTypes.oneOfType([Number, Boolean]),
  icon: PropTypes.shape,
  buttonText: PropTypes.string,
  buttonAction: PropTypes.func,
}).isRequired;

export default AlertToastExample;
