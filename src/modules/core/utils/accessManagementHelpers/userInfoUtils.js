export const validateUserInfoObject = (userInfo) => {
  const requiredProperties = [
    'token',
    'clientID',
    'expiry',
    'email',
    'firstName',
    'lastName',
    'rememberMe',
  ];

  return userInfo && requiredProperties.every(
    property => Object.prototype.hasOwnProperty.call(userInfo, property),
  );
};

export const retrieveUserInfoFromStorage = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (!userInfo) {
    return null;
  }

  const allValuesExist = validateUserInfoObject(userInfo);
  if (allValuesExist && new Date(parseInt(userInfo.expiry, 10) * 1000) > new Date()) {
    return {
      ...userInfo,
      hasValidSession: true,
    };
  }

  return {
    rememberMe: userInfo.rememberMe,
    email: userInfo.email,
  };
};

export const isAuthenticated = () => {
  const userInfo = retrieveUserInfoFromStorage();
  return userInfo?.hasValidSession;
};
