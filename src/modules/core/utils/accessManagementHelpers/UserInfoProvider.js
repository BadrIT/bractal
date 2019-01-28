/* eslint-disable react/sort-comp */
import React from 'react';
import PropTypes from 'prop-types';
import withDirection from '~/modules/core/utils/mediaHelpers/withDirection';

import withRelayEnvironment from '~/modules/core/utils/relayHelpers/withRelayEnvironment';

import UserInfoContext from './UserInfoContext';
import { retrieveUserInfoFromStorage, validateUserInfoObject } from './userInfoUtils';

class UserInfoProvider extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      userManagement: {
        updateUserInfo: this.updateUserInfo,
        updateUserInfoTempPartial: this.updateUserInfoTempPartial,
        invalidateUser: this.invalidateUser,
        invalidateUserAndLogout: this.invalidateUserAndLogout,
        authenticated: false,
        userInfo: null,
        settings: {},
        saveCurrentPath: this.saveCurrentPath,
        redirectIfPathExists: this.redirectIfPathExists,
        removeSavedPaths: this.removeSavedPaths,
        saveSocialMediaData: this.saveSocialMediaData,
        getSocialMediaData: this.getSocialMediaData,
        clearLocalStorage: this.clearLocalStorage,
      },
    };

    this.state = {
      ...this.initialState,
    };
  }

  componentDidMount = () => {
    let userInfo = retrieveUserInfoFromStorage();

    userInfo = {
      ...userInfo,
    };

    if (userInfo.hasValidSession) {
      this.updateUserInfo(userInfo);
    } else {
      this.invalidateUser(userInfo?.rememberMe, userInfo?.email);
    }
  };

  getCleanInitialState = (rememberMe, email) => {
    const { userInfo } = this.state.userManagement;

    return {
      ...this.initialState,
      userManagement: {
        ...this.initialState.userManagement,
        userInfo: {
          email: email || (userInfo && userInfo.email),
          rememberMe: rememberMe || (userInfo && userInfo.rememberMe),
        },
      },
    };
  }

  updateUserInfoTempPartial = (newUserInfo) => {
    const currentInfo = (this.state.userManagement && this.state.userManagement.userInfo) || {};

    this.setState(prevState => ({
      userManagement: {
        ...prevState.userManagement,
        userInfo: {
          ...currentInfo,
          ...newUserInfo,
        },
      },
    }), () => {
      localStorage.setItem('userInfo', JSON.stringify(this.state.userManagement?.userInfo));
      this.persist('userInfo');
    });
  };

  updateUserInfo = (userInfo) => {
    const cleanState = this.getCleanInitialState(userInfo.rememberMe, null);

    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    this.persist('userInfo');

    this.setState({
      userManagement: {
        ...cleanState.userManagement,
        authenticated: validateUserInfoObject(userInfo),
        userInfo: {
          // Accomodate for null userInfo
          ...userInfo,
        },
      },
    });
  };

  invalidateUser = (rememberMe, email, callback) => {
    localStorage.setItem('userInfo', null);
    this.persist('userInfo');

    this.setState(
      this.getCleanInitialState(rememberMe, email),
      callback,
    );
  }

  invalidateUserAndLogout = () => {
    this.invalidateUser(
      null,
      null,
      () => window.location.replace('/'),
    );
  };

  persist = (dataKey) => {
    // Workaround to force the browser to persist !!!
    // https://stackoverflow.com/questions/13292744/why-isnt-localstorage-persisting-in-chrome
    localStorage.getItem(dataKey);
  };

  // Path Related Functions
  getCurrentExistingRedirectPaths = () => {
    let currentPaths = sessionStorage.getItem('pathsInfo');

    if (currentPaths) {
      currentPaths = JSON.parse(currentPaths);
    }

    return currentPaths;
  };

  saveCurrentPath = (
    pathRedirectKey,
    modalPathName = false,
    passedLocation = false,
    shouldRefresh = false,
  ) => {
    const currentPathName = {
      isModal: modalPathName,
      shouldRefresh,
      name: modalPathName
      || passedLocation
      || window.location.pathname,
    };

    const currentExistingPaths = this.getCurrentExistingRedirectPaths();

    if (currentExistingPaths) {
      const pathRedirectKeyValue = currentExistingPaths[pathRedirectKey];

      if (!pathRedirectKeyValue) {
        currentExistingPaths[pathRedirectKey] = [];
      }
      const currentPathNameDoesNotExist = currentExistingPaths[pathRedirectKey].every(
        property => Object.prototype.hasOwnProperty.call(currentPathName.name, property.name),
      );

      if (currentPathNameDoesNotExist) {
        currentExistingPaths[pathRedirectKey].push(currentPathName);
      }

      sessionStorage.setItem('pathsInfo', JSON.stringify(currentExistingPaths));
    } else {
      sessionStorage.setItem('pathsInfo', JSON.stringify({ [pathRedirectKey]: [currentPathName] }));
    }

    this.persist('pathsInfo');
  };

  redirectIfPathExists = (pathRedirectKey) => {
    let pathsInfo = sessionStorage.getItem('pathsInfo');

    let pathName;

    if (pathsInfo) {
      pathsInfo = JSON.parse(pathsInfo);

      const requiredPath = pathsInfo[pathRedirectKey];

      pathName = Array.isArray(requiredPath) && requiredPath.length ? requiredPath.pop() : null;

      if (requiredPath.length === 0) {
        delete pathsInfo[pathRedirectKey];
      }

      if (Object.keys(pathsInfo).length === 0) {
        sessionStorage.removeItem('pathsInfo');
      } else {
        sessionStorage.setItem('pathsInfo', JSON.stringify(pathsInfo));
      }
    }

    this.persist('pathsInfo');

    return pathName;
  };

  removeSavedPaths = () => {
    sessionStorage.removeItem('pathsInfo');

    this.persist('pathsInfo');
  };

  // Social Media Data Related Functions
  saveSocialMediaData = (SMData) => {
    sessionStorage.setItem('SMData', JSON.stringify(SMData));
    this.persist('SMData');
  };

  getSocialMediaData = (remove = false) => {
    let SMData = sessionStorage.getItem('SMData');

    if (SMData) {
      SMData = JSON.parse(SMData);

      if (remove) {
        sessionStorage.removeItem('SMData');
      }
    }

    return SMData;
  };

  clearLocalStorage = () => {
    localStorage.clear();
  };

  render = () => (
    <UserInfoContext.Provider value={this.state.userManagement}>
      {this.props.children}
    </UserInfoContext.Provider>
  );
}

UserInfoProvider.propTypes = PropTypes.shape({
  children: PropTypes.shape({}),
}).isRequired;

export default withRelayEnvironment(withDirection(UserInfoProvider));
