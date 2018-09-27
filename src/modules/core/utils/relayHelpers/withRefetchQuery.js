import React from 'react';

import { createRefetchContainer } from 'react-relay';
import RefetchContainer from '~/modules/core/utils/relayHelpers/RefetchContainer';

import withRootQuery from './withRootQuery';


export default function withRefetchQuery(
  WrappedComponent,
  query,
  fragment,
  LoaderComponent,
  variables,
  refetchDependencies,
  dataHooks,
  autoRefetch = true,
  onRefetch = null,
) {
  const QueryWrapper = createRefetchContainer(
    externalProps => (
      <RefetchContainer
        {...externalProps}
        WrappedComponent={WrappedComponent}
        refetchDependencies={refetchDependencies}
        dataHooks={dataHooks}
        variables={variables}
        autoRefetch={autoRefetch}
        onRefetch={onRefetch}
        externalProps={externalProps}
      />
    ),
    fragment,
    query,
  );
  // eslint-disable-next-line react/prefer-stateless-function
  class InnerComponent extends React.PureComponent {
    render = () => <QueryWrapper {...this.props} />;
  }

  return withRootQuery(
    InnerComponent,
    query,
    LoaderComponent === WrappedComponent ? InnerComponent : LoaderComponent,
    variables,
  );
}
