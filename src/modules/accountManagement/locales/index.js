import i18next from 'i18next';
import Login from './Login';
import SignUp from './SignUp';
import SocialMedia from './SocialMedia';
import Verification from './Verfication';
import RecoverPassword from './RecoverPassword';
import EmailOrSms from './forgetPass_EmailOrSms';
import VerfyCodeEmailSMS from './forgetPass_VerfyCodeEmailAndSMS';
import CreateNewPassword from './forgetPass_CreatenewPassword';

const loadLocales = () => {
  i18next.addResourceBundle('en', 'accountManagement', {
    metadata: {
      name: 'accountManagement',
      displayName: 'Account Management Module',
      description: 'This module is used to handle all common features related to managing users, like signup, signin, manage profile....etc',
    },
    home: {
      menuTitle: 'Account',
    },
    ...Login.En,
    ...SignUp.En,
    ...SocialMedia.En,
    verifyAccount: {
      ...Verification.En,
    },
    recoverPassword: {
      ...RecoverPassword.En,
    },
    forgetPassEmailOrSMS: {
      ...EmailOrSms.En,
    },
    forgetPassVerifyEmailSMS: {
      ...VerfyCodeEmailSMS.En,
    },
    CreateNewPassword: {
      ...CreateNewPassword.En,
    },
  }, true, true);

  i18next.addResourceBundle('ar', 'accountManagement', {
    metadata: {
      name: 'accountManagement',
      displayName: 'Account Management Module',
      description: 'This module is used to handle all common features related to managing users, like signup, signin, manage profile....etc',
    },
    home: {
      menuTitle: 'Account',
    },
    ...Login.Ar,
    ...SignUp.Ar,
    ...SocialMedia.Ar,
    verifyAccount: {
      ...Verification.Ar,
    },
    recoverPassword: {
      ...RecoverPassword.Ar,
    },
    forgetPassEmailOrSMS: {
      ...EmailOrSms.Ar,
    },
    forgetPassVerifyEmailSMS: {
      ...VerfyCodeEmailSMS.Ar,
    },
    CreateNewPassword: {
      ...CreateNewPassword.Ar,
    },
  }, true, true);

  i18next.loadNamespaces('accountManagement');
};

export default loadLocales;
