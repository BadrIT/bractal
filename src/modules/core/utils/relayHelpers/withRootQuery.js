import React from 'react';
import { QueryRenderer } from 'react-relay';
import lodash from 'lodash';
import Loader from '~/modules/coreUI/components/basic/Loader';
import withRelayEnvironment from './withRelayEnvironment';

export default function WithRootQuery(WrappedComponent, RootQuery, LoaderComponent, variables) {
  return withRelayEnvironment(class PureWrapper extends React.PureComponent {
    render = () => {
      const externalProps = this.props;
      const mergedVars = lodash.isFunction(variables)
        ? variables(externalProps)
        : variables;
      return (
        <QueryRenderer
          // eslint-disable-next-line react/prop-types
          environment={externalProps.environment}
          query={RootQuery}
          variables={mergedVars}
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
      );
    }
  });
}
