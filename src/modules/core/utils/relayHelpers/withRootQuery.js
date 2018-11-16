/* eslint-disable function-paren-newline, react/no-redundant-should-component-update */
import React from 'react';
import { QueryRenderer } from 'react-relay';
import lodash from 'lodash';

import Loader from '~/modules/coreUI/components/basic/Loader';

import withAlertMsg from '~/modules/core/utils/alertHelpers/withAlertContainer';
import AlertTypes from '~/modules/core/utils/alertHelpers/alertComponent/AlertTypes';

import withRelayEnvironment from './withRelayEnvironment';

export default function WithRootQuery(WrappedComponent, RootQuery, LoaderComponent, variables) {
  return withRelayEnvironment(
    withAlertMsg(
      // eslint-disable-next-line react/prefer-stateless-function
      class InnerRootQuery extends React.Component {
        render = () => {
          const externalProps = this.props;
          const mergedVars = lodash.isFunction(variables) ? variables(externalProps) : variables;

          return process.isStyleguidistActive ? (
            <WrappedComponent {...externalProps} />
          ) : (
            <QueryRenderer
              // eslint-disable-next-line react/prop-types
              environment={externalProps.environment}
              query={RootQuery}
              variables={mergedVars}
              render={({ error, props }) => {
                const isLoading = !props;
                if (error) {
                  // eslint-disable-next-line react/prop-types
                  this.props.notifyAlert({ messageText: error.message, type: AlertTypes.error });

                  return (
                    // TODO: Handle Errors in components or in general component
                    <div>
                      {`
                      Internal Server Error:
                        ${error.code ? error.code : ''}
                        ${error.message ? error.message : ''}
                        ${error.stack ? error.stack : ''}
                      `}
                    </div>
                  );
                }
                if (props || (isLoading && LoaderComponent === WrappedComponent)) {
                  return (
                    <WrappedComponent
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
        };
      },
    ),
  );
}
