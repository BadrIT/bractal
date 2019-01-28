import React from 'react';
import UserInfoContext from './UserInfoContext';

export const getUserInfoFromLoginResponse = (response, rememberMe) => ({
  ref_id: response.ref_id,
  token: response.token,
  clientID: response.client_id,
  expiry: response.expiry,
  email: response.user.email,
  firstName: response.user.first_name,
  lastName: response.user.last_name,
  verified: response.user.verified,
  avatar: response.user.avatar,
  rememberMe,
});

export default function withUserInfo(WrappedComponent) {
  return function render(props) {
    return (
      <UserInfoContext.Consumer>
        {userManagement => (!userManagement ? (
          <WrappedComponent userInfo={{}} {...props} />
        ) : (
          <WrappedComponent
            userInfo={userManagement.userInfo || {}}
            authenticated={userManagement.authenticated}
            updateUserInfo={userManagement.updateUserInfo}
            updateUserInfoTempPartial={userManagement.updateUserInfoTempPartial}
            invalidateUser={userManagement.invalidateUser}
            invalidateUserAndLogout={userManagement.invalidateUserAndLogout}
            saveCurrentPath={userManagement.saveCurrentPath}
            redirectIfPathExists={userManagement.redirectIfPathExists}
            removeSavedPaths={userManagement.removeSavedPaths}
            saveSocialMediaData={userManagement.saveSocialMediaData}
            getSocialMediaData={userManagement.getSocialMediaData}
            clearLocalStorage={userManagement.clearLocalStorage}
            {...props}
          />
        ))
        }
      </UserInfoContext.Consumer>
    );
  };
}
