import React from 'react';
import { toast } from 'react-toastify';
import Icon from '~/modules/coreUI/components/basic/Icon';
import AlertTypes from './AlertTypes';
import ToastMessage from './ToastMessage';

export default function createToast(alertData) {
  const ToastTypes = {
    [AlertTypes.error]: {
      iconClassName: 'fas fa-exclamation-circle',
      renderMethod: toast.error,
    },
    [AlertTypes.warning]: {
      iconClassName: 'fas fa-exclamation-triangle',
      renderMethod: toast.warning,
    },
    [AlertTypes.success]: {
      iconClassName: 'far fa-check-circle',
      renderMethod: toast.success,
    },
    [AlertTypes.info]: {
      iconClassName: 'fas fa-info-circle',
      renderMethod: toast.info,
    },
  };

  const choosenConfig = ToastTypes[alertData.type] || { renderMethod: toast };

  return choosenConfig.renderMethod(<ToastMessage
    icon={<Icon className={choosenConfig.iconClassName} />}
    alertData={alertData}
  />);
}
