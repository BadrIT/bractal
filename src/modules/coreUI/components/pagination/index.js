/* eslint-disable import/prefer-default-export */
export const ITEMS_LIST_VIEW_PAGINATION_KEY = 'items_list_view_pagination';

export const buildPaginationQueryInput = (offset, limit) => ({
  path: '^.input',
  update: {
    page: {
      offset,
      limit,
    },
  },
});
