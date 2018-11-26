import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import { mediaQueryMax } from '~/modules/core/utils/cssHelpers/cssMedia';
import PaginationWrapper from './PaginationWrapper';
import PaginationBoxMobile from './PaginationBoxMobile';
import PaginationBoxDesktop from './PaginationBoxDesktop';
import { loadPrev, loadNext } from './PaginationNextAndPrevious';
import withPaginationData from './PaginationData';

const PaginationBox = ({ refetchMethod, refetchSubscribeToPreflight, pageInfo }) => {
  const limit = pageInfo ? pageInfo.limit : 12;
  const paginator = new PaginationWrapper(refetchMethod, refetchSubscribeToPreflight, limit);
  return (
    <React.Fragment>
      {pageInfo
        && pageInfo.items_count > pageInfo.limit &&
        <Media query={mediaQueryMax('mobile')}>
          {matches => (
            matches ? (
              <PaginationBoxMobile
                loadNextPage={() => loadNext(paginator, pageInfo)}
                loadPrevPage={() => loadPrev(paginator, pageInfo)}
              />
            ) : (
              <PaginationBoxDesktop
                loadNextPage={() => loadNext(paginator, pageInfo)}
                loadPrevPage={() => loadPrev(paginator, pageInfo)}
                loadPage={item => paginator.refetch(item - 1, pageInfo.limit)}
                currentPage={pageInfo.current_page}
                limit={pageInfo.limit}
                itemsCount={pageInfo.items_count}
              />
            ))}
        </Media>
      }
    </React.Fragment>
  );
};

PaginationBox.propTypes = {
  pageInfo: PropTypes.shape({}).isRequired,
  refetchMethod: PropTypes.func.isRequired,
}.isRequired;

export default withPaginationData(PaginationBox);
