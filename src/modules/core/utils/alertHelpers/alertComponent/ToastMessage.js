import React from 'react';
import PropTypes from 'prop-types';
import LinearLayout from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import { LargeSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';

const ToastMessage = ({ icon, alertData }) => (
  <LinearLayout row centerJustified>
    {alertData.icon ? alertData.icon : icon}
    {alertData.spacerSize ? alertData.spacerSize : <LargeSpacer />}
    {alertData.messageText}
    {alertData.spacerSize ? alertData.spacerSize : <LargeSpacer />}
    {alertData.buttonAction &&
      <button onClick={alertData.buttonAction}>
        {alertData.buttonText || 'Click me!!'}
      </button>
    }
  </LinearLayout>
);

ToastMessage.propTypes = {
  icon: PropTypes.func.isRequired,
  buttonText: PropTypes.func.isRequired,
}.isRequired;

export default ToastMessage;
