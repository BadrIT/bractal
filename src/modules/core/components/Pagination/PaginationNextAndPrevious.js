
export const loadPrev = (paginator, pageInfo) => paginator.loadPrev(
  pageInfo.current_page - 1,
  pageInfo.limit,
);

export const loadNext = (paginator, pageInfo) => paginator.loadNext(
  pageInfo.current_page - 1,
  pageInfo.limit,
  Math.ceil(pageInfo.items_count / pageInfo.limit),
);

export const leftClassName = 'fas fa-chevron-left';

export const rightClassName = 'fas fa-chevron-right';
