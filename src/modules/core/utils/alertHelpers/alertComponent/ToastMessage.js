import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LinearLayout from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import { LargeSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';
import Button from '~/modules/coreUI/components/basic/Button';
import { infereFontSize } from '~/modules/coreUI/utils/infereStyle';
import AlertTypes from './AlertTypes';

const getColor = (props) => {
  if (props.type === AlertTypes.error) {
    return props.theme.new.alertTypes.colors.error;
  } else if (props.type === AlertTypes.info) {
    return props.theme.new.alertTypes.colors.info;
  } else if (props.type === AlertTypes.warning) {
    return props.theme.new.alertTypes.colors.warning;
  } else if (props.type === AlertTypes.success) {
    return props.theme.new.alertTypes.colors.success;
  }
  return props.theme.new.alertTypes.colors.default;
};

const ButtonStyled = styled(Button)`
  color: ${props => props.color || getColor(props)};
  border-style: none;
`;
const IconStyle = styled.div`
  font-size: ${props => infereFontSize(props)}px;
`;

const ToastMessage = props => (
  <LinearLayout row centerJustified>
    <IconStyle {...props} >{props.icon || props.defaultIcon}</IconStyle>
    <LargeSpacer />
    {props.messageText}
    <LargeSpacer />
    {props.buttonAction &&
      <ButtonStyled
        {...props}
        inverted
        onClicked={() => {
            props.buttonAction();
            // eslint-disable-next-line
            typeof props.closeToast === 'function' && props.closeToast();
          }}
        type={props.type}
      >
        {props.buttonText || 'Click me!!'}
      </ButtonStyled>
    }
  </LinearLayout>
);

ToastMessage.propTypes = {
  icon: PropTypes.func.isRequired,
  buttonText: PropTypes.func.isRequired,
}.isRequired;

export default ToastMessage;
