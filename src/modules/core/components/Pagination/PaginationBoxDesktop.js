import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { LinearLayout } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import Icon from '~/modules/coreUI/components/basic/Icon';
import ListItem from '~/modules/coreUI/components/pagination/ListItem';

import paginationArray from './PaginationMiddleButtonsProcessor';
import { loadPrev, loadNext, leftClassName, rightClassName } from './PaginationNextAndPrevious';

const SHOWN_LINKS_COUNT = 8;

const PaginationLayout = styled.div`
.fas:before { 
  margin: 0 10px;
  color: ${props => props.theme.colors.labels.normal};
  font-size: ${props => props.theme.fonts.sizes.large}px;
  cursor: pointer;
}
.fa-ellipsis-h:before {
  font-size: ${props => props.theme.fonts.sizes.medium}px;
}
.fa-chevron-right:before {
  ${props => props.currentPage === props.lastPage && css`
    pointer-events: none;
    color: ${props.theme.colors.labels.hint};
  `}
}
.fa-chevron-left:before {
  ${props => props.currentPage === 1 && css`
    pointer-events: none;
    color: ${props.theme.colors.labels.hint};
  `}
}
`;
const ellipsis = (
  <Icon className="fas fa-ellipsis-h" />
);

const lastPageNumber = pageInfo => Math.ceil(pageInfo.items_count / pageInfo.limit);

const PaginationBoxDesktop = ({ paginator, pageInfo }) => (
  <PaginationLayout
    currentPage={pageInfo.current_page}
    lastPage={lastPageNumber(pageInfo)}
  >
    <LinearLayout row centerJustified >
      <Icon
        className={leftClassName}
        onClick={() => loadPrev(paginator, pageInfo)}
      />
      {/* TODO replace '.' with something different */}
      {paginationArray(
        pageInfo.current_page,
        lastPageNumber(pageInfo),
        SHOWN_LINKS_COUNT,
      ).map(item =>
        (item === '.'
          ? ellipsis
          : <ListItem
            current={pageInfo.current_page === item}
            onClicked={() => paginator.refetch(item - 1, pageInfo.limit)}
            content={item}
          />))
      }
      <Icon
        className={rightClassName}
        onClick={() => loadNext(paginator, pageInfo)}
      />
    </LinearLayout >
  </PaginationLayout>
);
//TODO sarah define shapes
PaginationBoxDesktop.propTypes = {
  pageInfo: PropTypes.shape({}).isRequired,
  paginator: PropTypes.shape({}.isRequired),
}.isRequired;

export default PaginationBoxDesktop;
