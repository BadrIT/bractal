/* eslint-disable function-paren-newline */
import React from 'react';
import { QueryRenderer } from 'react-relay';
import lodash from 'lodash';
import Loader from '~/modules/coreUI/components/basic/Loader';

import withRelayEnvironment from './withRelayEnvironment';


export default function WithRootQuery(WrappedComponent, RootQuery, LoaderComponent, variables) {
  return withRelayEnvironment(
    // NOTE : Workaround (Extending React.PureComponent) for
    //        the Component being re-rendered due to shallow changes in props
    // eslint-disable-next-line react/no-multi-comp
    class PureWrapper extends React.PureComponent {
      render = () => {
        const externalProps = this.props;
        this.mergedVars = this.mergedVars || (lodash.isFunction(variables)
          ? variables(externalProps)
          : variables
        );

        return (
          <QueryRenderer
            // eslint-disable-next-line react/prop-types
            environment={externalProps.environment}
            query={RootQuery}
            variables={this.mergedVars}
            render={({ error, props }) => {
              const isLoading = !props;
              if (error) {
                return <div>{error.message}</div>;
              } else if (props || (isLoading && LoaderComponent === WrappedComponent)) {
                return (
                  <WrappedComponent
                    key="rootQueryContainer"
                    {...externalProps}
                    queryResult={props}
                    isLoading={isLoading}
                  />
                );
              }

              if (LoaderComponent) {
                return <LoaderComponent {...externalProps} isLoading />;
              }
              return <Loader />;
            }}
          />
        );
      }
    },
  );
}
