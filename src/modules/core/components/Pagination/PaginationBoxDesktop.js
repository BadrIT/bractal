import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import LinearLayout from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import Icon from '~/modules/coreUI/components/basic/Icon';
import ListItem from './ListItem';

import paginationArray from './PaginationMiddleButtonsProcessor';
import { defaultLeftClassName, defaultRightClassName, defaultEllipsisIcon } from './PaginationNextAndPrevious';

const SHOWN_LINKS_COUNT = 8;

// TODO check style props from theme and add different sizes

const IconLeft = styled(Icon)`
  ${props => props.currentPage === 1 && css`
  pointer-events: none;
  color: ${props.theme.colors.labels.hint};
  `}
`;

const IconRight = styled(Icon)`
  ${props => props.currentPage === props.lastPage && css`
  pointer-events: none;
  color: ${props.theme.colors.labels.hint};
  `}
`;

const IconEllipsis = styled(Icon)`
  font-size: ${props => props.theme.fonts.sizes.medium}px;
`;

const PaginationStyle = styled.div`
  margin: 0 10px;
  color: ${props => props.theme.colors.labels.normal};
  font-size: ${props => props.theme.fonts.sizes.large}px;
  cursor: pointer;
`;

const lastPageNumber = (itemsCount, limit) => Math.ceil(itemsCount / limit);
// TODO discuss with Mostafa toggle buttons mechanism??
// TODO check with Mostafa how to make icons generic?
const PaginationBoxDesktop = ({
  loadPrevPage,
  loadNextPage,
  loadPage,
  currentPage,
  limit,
  itemsCount,
  ellipsisIconClassName,
  leftIconClassName,
  rightIconClassName,
}) => (
  <PaginationStyle>
    <LinearLayout row centerJustified >
      <IconLeft
        currentPage={currentPage}
        className={leftIconClassName || defaultLeftClassName}
        onClick={() => loadPrevPage()}
      />
      {/* TODO replace '.' with something different */}
      {paginationArray(
        currentPage,
        lastPageNumber(itemsCount, limit),
        SHOWN_LINKS_COUNT,
      ).map(item =>
        (item === '.'
          ? <IconEllipsis className={ellipsisIconClassName || defaultEllipsisIcon} />
          : <ListItem
            current={currentPage === item}
            onClicked={() => loadPage(item)}
            content={item}
          />))
      }
      <IconRight
        currentPage={currentPage}
        lastPage={lastPageNumber(itemsCount, limit)}
        className={rightIconClassName || defaultRightClassName}
        onClick={() => loadNextPage()}
      />
    </LinearLayout >
  </PaginationStyle>
);

PaginationBoxDesktop.propTypes = {
  currentPage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  loadNextPage: PropTypes.func.isRequired,
  loadPrevPage: PropTypes.func.isRequired,
  loadPage: PropTypes.func.isRequired,
}.isRequired;

export default PaginationBoxDesktop;
