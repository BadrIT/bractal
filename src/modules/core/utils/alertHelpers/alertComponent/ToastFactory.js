import React from 'react';
import { toast } from 'react-toastify';
import Icon from '~/modules/coreUI/components/basic/Icon';
import AlertTypes from './AlertTypes';

export default function createToast(alertData, TargetComponent) {
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

  return choosenConfig.renderMethod(<TargetComponent
    icon={<Icon className={choosenConfig.iconClassName} />}
    alertData={alertData}
  />);
}
