import { scrollHtmltoTop } from '~/modules/core/utils/jsHelpers/ScrollToTop';
import { ITEMS_LIST_VIEW_PAGINATION_KEY, buildPaginationQueryInput } from './index';

class PaginationWrapper {
  constructor(refetchMethod, refetchSubscribeToPreflight, limit) {
    this.refetchMethod = refetchMethod;
    refetchSubscribeToPreflight(ITEMS_LIST_VIEW_PAGINATION_KEY, {
      reset: () => buildPaginationQueryInput(0, limit),
    });
  }

  loadNext = (pageNumber, limit, lastPageNumber) => {
    if (!(pageNumber === lastPageNumber - 1)) {
      this.refetch(pageNumber + 1, limit);
    }
  };

  loadPrev = (pageNumber, limit) => {
    if (!(pageNumber === 0)) {
      this.refetch(pageNumber - 1, limit);
    }
  };

  refetch = (pageNumber, limit) => {
    this.refetchMethod(ITEMS_LIST_VIEW_PAGINATION_KEY, [
      buildPaginationQueryInput(pageNumber * limit, limit),
    ]);
    scrollHtmltoTop();
  };
}

export default PaginationWrapper;
