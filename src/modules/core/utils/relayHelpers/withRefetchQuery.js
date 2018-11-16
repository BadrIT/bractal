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

  return withRootQuery(
    QueryWrapper,
    query,
    LoaderComponent === WrappedComponent ? QueryWrapper : LoaderComponent,
    variables,
  );
}
