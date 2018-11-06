/* eslint-disable react/sort-comp */
import React from 'react';
import PropTypes from 'prop-types';

import withRelayEnvironment from '~/modules/core/utils/relayHelpers/withRelayEnvironment';

import UserInfoContext from './UserInfoContext';
import loadUserSettings from './loadUserSettings';

class UserInfoProvider extends React.Component {
  validateUserInfoObject = (userInfo) => {
    const requiredProperties = ['token', 'clientID', 'expiry', 'email', 'firstName', 'lastName', 'rememberMe'];
    return requiredProperties.every(property =>
      Object.prototype.hasOwnProperty.call(userInfo, property));
  };

  componentDidMount = () => {
    let userInfo = localStorage.getItem('userInfo');

    if (!userInfo || userInfo === 'null') {
      userInfo = sessionStorage.getItem('userInfo');
    }

    userInfo = JSON.parse(userInfo);

    if (!userInfo) {
      this.reloadUserSettings();
      return;
    }

    const allValuesExist = this.validateUserInfoObject(userInfo);

    if (allValuesExist) {
      if (new Date(parseInt(userInfo.expiry, 10) * 1000) > new Date()) {
        this.updateUserInfo(userInfo);
      }
    } else if (userInfo) {
      this.invalidateUser(userInfo.rememberMe, userInfo.email);
    } else {
      this.invalidateUser();
    }

    this.reloadUserSettings();
  }

  reloadUserSettings = () => {
    loadUserSettings(this.props.environment, (newSettings) => {
      this.updateUserInfoTempPartial({
        settings: newSettings,
      });
    });
  }

  updateUserInfoTempPartial = (newUserInfo) => {
    const currentInfo = (this.state.userManagement && this.state.userManagement.userInfo) || {};
    this.setState({
      userManagement: {
        ...this.state.userManagement,
        userInfo: {
          ...currentInfo,
          ...newUserInfo,
        },
      },
    });
  }

  updateUserInfo = (userInfo) => {
    this.invalidateUser(userInfo.rememberMe);
    const allValuesExist = this.validateUserInfoObject(userInfo);

    if (!allValuesExist) {
      throw new Error('Error in calling updateUserInfo, missing info');
    }
    if (userInfo.rememberMe) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

    this.persist();

    this.setState({
      userManagement: {
        ...this.state.userManagement,
        authenticated: true,
        userInfo,
      },
    });
  }
  invalidateUser = (rememberMe, email) => {
    const { userInfo } = this.state.userManagement;
    const shouldRemember = rememberMe || (userInfo && userInfo.rememberMe);
    let newUserInfo = null;

    if (shouldRemember) {
      newUserInfo = {
        email: email || (userInfo && userInfo.email),
        rememberMe: true,
      };

      localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
    } else {
      localStorage.setItem('userInfo', null);
    }

    sessionStorage.setItem('userInfo', null);

    this.persist();

    this.setState({
      ...this.initialState,
      userManagement: {
        ...this.initialState.userManagement,
        userInfo: newUserInfo,
      },
    });
  }
  invalidateUserAndLogout = () => {
    this.invalidateUser();
    window.location.reload();
  }
  persist = () => {
    // Workaround to force the browser to persist !!!
    // https://stackoverflow.com/questions/13292744/why-isnt-localstorage-persisting-in-chrome
    localStorage.getItem('userInfo');
    sessionStorage.getItem('userInfo');
  }

  initialState = {
    userManagement: {
      updateUserInfo: this.updateUserInfo,
      updateUserInfoTempPartial: this.updateUserInfoTempPartial,
      invalidateUser: this.invalidateUser,
      invalidateUserAndLogout: this.invalidateUserAndLogout,
      authenticated: false,
      userInfo: null,
      settings: {},
    },
  }

  state = Object.assign({}, this.initialState);

  render = () => (
    <UserInfoContext.Provider value={this.state.userManagement}>
      {this.props.children}
    </UserInfoContext.Provider>
  )
}

UserInfoProvider.propTypes = PropTypes.shape({
  children: PropTypes.shape({}),
}).isRequired;

export default withRelayEnvironment(UserInfoProvider);
