/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LinearLayout from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import { LargeSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';
import AlertTypes from './AlertTypes';
import Button from '~/modules/coreUI/components/basic/Button';

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
  font-size: ${props => 1.2 * (props.size || props.theme.new.fonts.sizes.md)}px;
`;

const ToastMessage = ({ icon, alertData, closeToast }) => (
  <LinearLayout row centerJustified>
    <IconStyle size={alertData.fontSize} >{alertData.icon || icon}</IconStyle>
    <LargeSpacer />
    {alertData.messageText}
    <LargeSpacer />
    {alertData.buttonAction &&
      <ButtonStyled inverted sm
        color={alertData.color}
        onClicked={() => { alertData.buttonAction(); closeToast(); }}
        type={alertData.type}
      >
        {alertData.buttonText || 'Click me!!'}
      </ButtonStyled>
    }
  </LinearLayout>
);

ToastMessage.propTypes = {
  icon: PropTypes.func.isRequired,
  buttonText: PropTypes.func.isRequired,
}.isRequired;

export default ToastMessage;
