import React from 'react';
import PropTypes from 'prop-types';
import RelayContext from '~/modules/core/utils/relayHelpers/RelayContext';
import withAlertMsg from '~/modules/core/utils/alertHelpers/withAlertMsg';
import assert from '~/modules/core/utils/jsHelpers/assert';
import AlertTypes from '~/modules/core/utils/alertHelpers/alertComponent/AlertTypes';

let env;
const portalEndPoint = process.env.REACT_APP_GRAPHQL_ENDPOINT;
assert(portalEndPoint, "Backend endpoint isn't set correctly, call the npm build (or start), as follows : 'REACT_APP_GRAPHQL_ENDPOINT=http://portal.ayk-dev.badrit.com/graphql npm start''");

const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime');

class RelayProvider extends React.Component {
  constructor(props) {
    super(props);
    this.initialization();
  }

  initialization() {
    // 2
    const store = new Store(new RecordSource());
    // 3
    // eslint-disable-next-line
    const network = this.createNetwork();
    // 5
    env = new Environment({
      network,
      store,
    });
  }

  createNetwork = () => (
    Network.create((operation, variables) => fetch(portalEndPoint, {
      method: 'POST',
      headers: {
        // ...additionalHeaders,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }).then(response => response.json()).catch((error) => {
      this.props.notifyAlert({ messageText: error.message, type: AlertTypes.error });
    }))
  );

  render() {
    return (
      <RelayContext.Provider value={env}>
        {this.props.children}
      </RelayContext.Provider>
    );
  }
}

RelayProvider.propTypes = PropTypes.shape({
  children: PropTypes.shape({}),
}).isRequired;

// 6
export default withAlertMsg(RelayProvider);
export { default as withRelayEnvironment } from './withRelayEnvironment';
