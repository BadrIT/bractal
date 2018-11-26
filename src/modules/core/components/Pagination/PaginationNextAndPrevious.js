
export const loadPrev = (paginator, pageInfo) => paginator.loadPrev(
  pageInfo.current_page - 1,
  pageInfo.limit,
);

export const loadNext = (paginator, pageInfo) => paginator.loadNext(
  pageInfo.current_page - 1,
  pageInfo.limit,
  Math.ceil(pageInfo.items_count / pageInfo.limit),
);

export const defaultLeftClassName = 'fas fa-chevron-left';

export const defaultRightClassName = 'fas fa-chevron-right';

export const defaultEllipsisIcon = 'fas fa-ellipsis-h';
