import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const PaginationLayout = styled.div`
  button {
    outline: none;
    display: block;
    width: 29px;
    height: 29px;
    line-height: 20px;
    text-align: center;
    margin: 10px;
    color: ${props => props.theme.colors.labels.normal};
    background: ${props => props.theme.colors.named.white};
    font-weight: bold;
    font-size: ${props => props.theme.fonts.sizes.xxSmall}px;
    border: ${props => props.theme.borders.size.thin}px solid;
    border-color: ${props => props.theme.borders.color.light};
    border-radius: 50%;
    transition: all 0.3s linear;
    cursor: pointer;

    ${props => props.current && css`
      color: ${props.theme.colors.named.white};
      background: ${props.theme.colors.primary}; 
      border-color: ${props.theme.colors.primary};
    `}

    &:hover {
      color: ${props => props.theme.colors.labels.normal};
      background: ${props => props.theme.colors.labels.hint};
      border: 0px;
    }

    &:active {
      color: ${props => props.theme.colors.named.white};
      background: ${props => props.theme.colors.primaryClicked};
      border: 0px;
    }
  }
`;

const Pagination = props => (
  <PaginationLayout current={props.current}>
    <button onClick={() => props.onClicked()}>
      {props.content}
    </button>
  </PaginationLayout>
);

Pagination.propTypes = PropTypes.shape.isRequired;

export default Pagination;

