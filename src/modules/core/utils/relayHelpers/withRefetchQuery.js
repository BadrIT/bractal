import React from 'react';
import { createRefetchContainer } from 'react-relay';
import withRootQuery from './withRootQuery';

export default function withRefetchQuery(
  WrappedComponent,
  RefetchWrapper,
  query,
  fragment,
  LoaderComponent,
  variables,
) {
  const QueryWrapper = createRefetchContainer(
    externalProps => (
      <RefetchWrapper
        WrappedComponent={WrappedComponent}
        {...externalProps}
        variables={variables}
      />
    ),
    fragment,
    query,
  );

  return withRootQuery(
    externalProps => <QueryWrapper {...externalProps} />,
    query,
    LoaderComponent,
    variables,
  );
}
