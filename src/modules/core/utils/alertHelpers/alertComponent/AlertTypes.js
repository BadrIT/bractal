import { toast } from 'react-toastify';

const AlertTypes = {
  error: 'error',
  success: 'success',
  warning: 'warning',
  info: 'info',
  default: 'default',
};

export const ToastTypes = {
  [AlertTypes.error]: {
    iconClassName: 'fas fa-exclamation-circle',
    renderMethod: toast.error,
  },
  [AlertTypes.warning]: {
    iconClassName: 'fas fa-exclamation-triangle',
    renderMethod: toast.warning,
  },
  [AlertTypes.success]: {
    iconClassName: 'fas fa-check-circle',
    renderMethod: toast.success,
  },
  [AlertTypes.info]: {
    iconClassName: 'fas fa-info-circle',
    renderMethod: toast.info,
  },
};

export default AlertTypes;
