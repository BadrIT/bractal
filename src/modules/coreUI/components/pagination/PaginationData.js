import React from 'react';
import { graphql } from 'react-relay';

import withRefetchConsumer from '~/modules/core/utils/relayHelpers/withRefetchConsumer';
import withFragmentContainer from '~/modules/core/utils/relayHelpers/withFragmentContainer';

export default (WrappedComponent) => {
  const PagniationTextInfoWrapper = withFragmentContainer(
    WrappedComponent,
    graphql`
      fragment PaginationData_pageInfo on PageInfo {
        current_page
        items_count
        limit
      }
    `,
  );

  return withRefetchConsumer(({ refetchData, refetchMethod, refetchSubscribeToPreflight }) => (
    <PagniationTextInfoWrapper
      pageInfo={refetchData && refetchData.pageInfo}
      refetchData={refetchData}
      refetchMethod={refetchMethod}
      refetchSubscribeToPreflight={refetchSubscribeToPreflight}
    />
  ));
};
