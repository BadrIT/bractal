import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Icon from '~/modules/coreUI/components/basic/Icon';
import AlertTypes, { ToastTypes } from './AlertTypes';
import ToastMessage from './ToastMessage';
import { Wrapper, Toast, ToastBody, ToastCloseButton } from './AlertToastStyle';

const Container = styled.div`
  ${Wrapper}
  ${props => !props.topFullWidth && css`
    align-self: flex-end;
    margin-right: 20px;
  `}
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
const AlertToastExample = props => (
  <Container {...props} >
    <ToastWrapper
      {...props}
      className={props.type || 'default'}
    >
      <Body {...props} >
        {props.component ||
          <ToastMessage
            {...props}
            defaultIcon={ToastTypes[props.type] &&
              <Icon className={ToastTypes[props.type].iconClassName} />
            }
          />
        }
      </Body>
      <CloseButton {...props} >✖</CloseButton>
    </ToastWrapper>
  </Container>
);

AlertToastExample.propTypes = PropTypes.shape({
  messageText: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(AlertTypes)),
  autoClose: PropTypes.oneOfType([Number, Boolean]),
  icon: PropTypes.shape,
  buttonText: PropTypes.string,
  buttonAction: PropTypes.func,
}).isRequired;

export default AlertToastExample;
