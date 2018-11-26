import { scrollToContainerTop } from '~/modules/core/utils/jsHelpers/ScrollToTop';
import keys from '~/modules/ecommerceCoreUI/components/listViewLayout/SubscribeKeys';

class PaginationWrapper {
  constructor(updatePaginationVariables, subscribe, limit) {
    this.updatePaginationVariables = updatePaginationVariables;
    subscribe(this);
    this.key = keys.pagination;
    this.reset = () => ({
      path: '^.input.page',
      update: { offset: 0, limit },
    });
  }

  loadNext = (pageNumber, limit, lastPageNumber) => {
    if (!(pageNumber === lastPageNumber - 1)) {
      this.refetch(pageNumber + 1, limit);
    }
  }
  loadPrev = (pageNumber, limit) => {
    if (!(pageNumber === 0)) {
      this.refetch(pageNumber - 1, limit);
    }
  }

  refetch = (pageNumber, limit) => {
    this.updatePaginationVariables(
      '^.input.page',
      { offset: (pageNumber) * limit, limit },
      this.key,
    );
    scrollToContainerTop('ProductsListContainer');
  }
}

export default PaginationWrapper;
