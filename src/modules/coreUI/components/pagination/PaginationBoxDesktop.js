import React from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import { Row } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import Icon from '~/modules/coreUI/components/basic/Icon';
import { infereFontSize, inferePaddingSize } from '~/modules/coreUI/utils/infereStyle';
import ToggleButton from '~/modules/coreUI/components/basic/ToggleButton';
import paginationArray from './PaginationMiddleButtonsProcessor';
import { defaultLeftClassName, defaultRightClassName, defaultEllipsisIcon } from './PaginationNextAndPrevious';

// TODO Mostafa remove all margins
const SHOWN_LINKS_COUNT = 8;

// TODO fix size
const IconCommonStyle = props => css`
   font-size: ${infereFontSize(props)}px;
`;

const IconLeft = styled(Icon)`
  ${props => IconCommonStyle(props)}
  ${props => props.currentPage === 1 && css`
  pointer-events: none;
  color: ${props.theme.new.colors.labels.normal.hint};
  `}
`;

const IconRight = styled(Icon)`
  ${props => IconCommonStyle(props)}
  ${props => props.currentPage === props.lastPage && css`
  pointer-events: none;
  color: ${props.theme.new.colors.labels.normal.hint};
  `}
`;

const IconEllipsis = styled(Icon)`
  ${props => IconCommonStyle(props)}
  margin: 5px;
`;

const PaginationStyle = styled.div`
  margin: 0 10px;
  color: ${props => props.theme.new.colors.labels.normal.normal};
  cursor: pointer;
`;

const ToggleButtonStyle = styled(ToggleButton)`
  min-width: ${props => 4 * inferePaddingSize(props)}px;
  // height: ${props => 4 * inferePaddingSize(props)}px;
  // margin: 5px;
  color: ${props => props.theme.new.colors.labels.normal.normal};
  ${props => props.selected && css`
    color: ${props.theme.new.colors.labels.inverted.primary};
    border: 0px;
  `}
  &:hover {
    color: ${props => props.theme.new.colors.labels.normal.normal};
    background: ${props => props.theme.new.colors.labels.normal.hint};
    border: 0px;
  }

  &:active {
    color: ${props => props.theme.new.colors.labels.inverted.primary};
    background: ${props => props.theme.new.colors.primaryClicked};
    border: 0px;
  }
`;

const lastPageNumber = (itemsCount, limit) => Math.ceil(itemsCount / limit);

const PaginationBoxDesktop = props => (
  <PaginationStyle {...props}>
    <Row centerJustified spaceBetween="1">
      <IconLeft
        {...props}
        currentPage={props.currentPage}
        className={props.leftIconClassName || defaultLeftClassName}
        onClick={() => props.loadPrevPage()}
      />
      {/* TODO replace '.' with key */}
      {paginationArray(
        props.currentPage,
        lastPageNumber(props.itemsCount, props.limit),
        SHOWN_LINKS_COUNT,
      ).map(item =>
        (item === '.' ? (
          <IconEllipsis {...props} className={props.ellipsisIconClassName || defaultEllipsisIcon} />
        ) : (
          <ToggleButtonStyle
            {...props}
            pxRatio={1.8}
            inverted={props.currentPage !== item}
            fullRound
            selected={props.currentPage === item}
            onClicked={() => props.loadPage(item)}
          >
            <p>{item}</p>
          </ToggleButtonStyle>
          )))}
      <IconRight
        {...props}
        currentPage={props.currentPage}
        lastPage={lastPageNumber(props.itemsCount, props.limit)}
        className={props.rightIconClassName || defaultRightClassName}
        onClick={() => props.loadNextPage()}
      />
    </Row >
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
