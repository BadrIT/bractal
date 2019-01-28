import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import 'regenerator-runtime/runtime'; // WORKAROUND : https://github.com/relay-tools/react-relay-network-modern/issues/28

import { navigateToModal } from '~/modules/core/utils/modalHelpers';

import {
  RelayNetworkLayer,
  urlMiddleware,
  loggerMiddleware,
  errorMiddleware,
  perfMiddleware,
  authMiddleware,
  cacheMiddleware,
} from 'react-relay-network-modern';

import RelayContext from '~/modules/core/utils/relayHelpers/RelayContext';
import withAlertMsg from '~/modules/core/utils/alertHelpers/withAlertContainer';
import assert from '~/modules/core/utils/jsHelpers/assert';
import AlertTypes from '~/modules/core/utils/alertHelpers/alertComponent/AlertTypes';
import withUserInfo from '~/modules/core/utils/accessManagementHelpers/withUserInfo';

export const PathRedirectKeysMapper = {
  showSuccess: 'showSuccess',
};

const { Environment, RecordSource, Store } = require('relay-runtime');

const enableLogging = false; // process.env.NODE_ENV;
const defaultPortalEndPoint = process.env.REACT_APP_GRAPHQL_ENDPOINT;

class RelayProvider extends React.Component {
  constructor(props) {
    super(props);
    this.initialization(props);
  }

  // eslint-disable-next-line react/sort-comp
  initialization(props) {
    this.portalEndPoint = props.portalEndPoint || defaultPortalEndPoint;
    this.portalEndPoint = `${this.portalEndPoint}?locale=${props.locale}`;

    assert(
      this.portalEndPoint,
      "Back-end endpoint isn't set correctly, pass it as a prop, or call the npm build (or start), as follows : 'REACT_APP_GRAPHQL_ENDPOINT=https://ayk-test-portal.badrit.com/graphql npm start''",
    );

    const store = new Store(new RecordSource());
    const network = this.createNetwork();

    this.env = new Environment({
      network,
      store,
    });
  }

  createNetwork = () => {
    const cacheSize = 200; // max 200 requests
    const cacheTime = 15 * 60 * 1000; // 15 * oneMinute

    // array of middlewares
    const middlewaresArray = [
      cacheMiddleware({
        size: cacheSize,
        ttl: cacheTime,
      }),
      urlMiddleware({
        url: this.portalEndPoint,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }),
      authMiddleware({
        header: 'token',
        token: (req) => {
          if (this.props.userInfo) {
            req.fetchOpts.headers.token = this.props.userInfo.token;
            req.fetchOpts.headers.client = this.props.userInfo.clientID;
            req.fetchOpts.headers.expiry = this.props.userInfo.expiry;
            req.fetchOpts.headers.uid = this.props.userInfo.email;
            req.fetchOpts.headers['token-type'] = this.props.userInfo.tokenType || 'Bearer';
          }
        },
      }),
      // Middlewares Used For Debugging Purpose
      enableLogging ? loggerMiddleware() : null,
      enableLogging ? errorMiddleware() : null,
      enableLogging ? perfMiddleware() : null,
      next => async (req) => {
        const response = await next(req);
        if (!response.ok) {
          this.props.notifyAlert({
            messageText: `Server Error: ${response.error.message}`,
            type: AlertTypes.error,
          });
        } else {
          const actionName = _.findKey(response.data, 'errors');
          if (
            response.data
            && response.data[actionName]
            && response.data[actionName].errors
            && response.data[actionName].errors.length > 0
          ) {
            const errorsData = response.data[actionName];
            const firstError = errorsData.errors[0];
            const errorCode = firstError.code;

            if (errorCode) {
              const firstErrorMessage = firstError.messages[0];

              // eslint-disable-next-line
              console.error(`Server Response Error: ${errorCode}: ${firstErrorMessage}`);

              if (errorCode === 404) {
                this.props.notifyAlert({
                  messageText: `Server Response Error: ${errorCode}: ${firstErrorMessage}`,
                  type: AlertTypes.error,
                });

                this.props.saveCurrentPath(PathRedirectKeysMapper.showSuccess);
                this.props.invalidateUser();
                navigateToModal(this.props.history, '/accountManagement/login');
              }
            }
          }
        }

        return response;
      },
    ];

    const network = new RelayNetworkLayer(middlewaresArray);

    return network;
  };

  render() {
    return <RelayContext.Provider value={this.env}>{this.props.children}</RelayContext.Provider>;
  }
}

RelayProvider.propTypes = PropTypes.shape({
  children: PropTypes.shape({}),
}).isRequired;

export default withRouter(withAlertMsg(withUserInfo(RelayProvider)));
export { default as withRelayEnvironment } from './withRelayEnvironment';
