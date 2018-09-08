import React from 'react';
import styled from 'styled-components';

const getJustifyContent = (props) => {
  if (props.spaceAroundJustified) {
    return 'space-around';
  } else if (props.spaceBetweenJustified) {
    return 'space-between';
  } else if (props.stretchJustified) {
    return 'stretch';
  } else if (props.topJustified) {
    return 'flex-start';
  } else if (props.centerJustified) {
    return 'center';
  } else if (props.bottomJustified) {
    return 'flex-end';
  } else if (props.leftJustified) {
    return 'flex-start';
  } else if (props.rightJustified) {
    return 'flex-end';
  }
  return null;
};

const getAlignItems = (props) => {
  if (props.stretchAligned) {
    return 'stretch';
  } else if (props.centerAligned) {
    return 'center';
  } else if (props.topAligned) {
    return 'flex-start';
  } else if (props.bottomAligned) {
    return 'flex-end';
  } else if (props.leftAligned) {
    return 'flex-start';
  } else if (props.rightAligned) {
    return 'flex-end';
  }
  return null;
};


const LinearLayout = styled.div`
  width: ${props => (props.fullWidth ? '100%' : null)};
  height: ${props => (props.fullHeight ? '100%' : null)};
  display: flex;
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  flex-grow: ${props => (props.grow ? 1 : null)};
  justify-content: ${props => getJustifyContent(props) || 'space-around'};
  align-items: ${props => getAlignItems(props) || 'center'};  
`;

export const Column = props => (
  <LinearLayout column {...props} />
);

export const Row = props => (
  <LinearLayout row {...props} />
);

export default LinearLayout;

