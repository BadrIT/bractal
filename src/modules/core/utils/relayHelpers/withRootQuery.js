import React from 'react';
import {
  QueryRenderer,
} from 'react-relay';

import Loader from '~/modules/coreUI/components/basic/Loader';
import withRelayEnvironment from './withRelayEnvironment';

export default function WithQueryQuery(WrappedComponent, RootQuery, LoaderComponent) {
  return withRelayEnvironment(externalProps => (
    <QueryRenderer
      // eslint-disable-next-line react/prop-types
      environment={externalProps.environment}
      query={RootQuery}
      render={({ error, props }) => {
        if (error) {
          return <div>{error.message}</div>;
        } else if (props) {
          return <WrappedComponent {...externalProps} queryResult={props} />;
        }

        if (LoaderComponent) {
          return <LoaderComponent {...externalProps} isLoading />;
        }
        return <Loader />;
      }}
    />
  ));
}
