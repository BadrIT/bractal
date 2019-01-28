/* eslint-disable react/no-unused-state */
import React from 'react';
import { graphql } from 'relay-runtime';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import withRootQuery from '~/modules/core/utils/relayHelpers/withRootQuery';
import objectsDeepNotEqualComparison from '~/modules/core/utils/jsHelpers/objectsDeepComparison';

import withUserInfo from './withUserInfo';

class UserSettingsLoader extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    if (!nextProps.queryResult) {
      return null;
    }

    const currentSettings = nextProps.userInfo && nextProps.userInfo.settings;

    const newSettings = nextProps.queryResult
      && nextProps.queryResult.system_configuration_settings;

    const newSettingsReceived = objectsDeepNotEqualComparison(currentSettings, newSettings);

    if (newSettingsReceived) {
      nextProps.updateUserInfoTempPartial({
        settings: newSettings,
      });
    }

    return null;
  }

  state = {
    currentSettings: this.state,
  };

  render = () => (
    <React.Fragment>
      {' '}
      {this.props.children}
      {' '}
    </React.Fragment>
  );
}

UserSettingsLoader.propTypes = {
  children: PropTypes.element.isRequired,
};

// NOTE : withRouter here is mandatory. Since without it, the updates on
//        URL changes will be blocked all the way down
export default withRouter(
  withUserInfo(
    withRootQuery(
      UserSettingsLoader,
      graphql`
        query UserSettingsLoaderQuery {
          system_configuration_settings {
            current_location_country_code
            currency
            language
            supported_currencies
            supported_languages
            current_location_country {
              name
              ref_id
              phone_code
            }
          }
        }
      `,
      UserSettingsLoader,
    ),
  ),
);
