/* eslint-disable import/prefer-default-export */
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
  } else if (props.endJustified) {
    return 'flex-end';
  } else if (props.centerJustified) {
    return 'center';
  }

  return null;
};

const getAlignItems = (props) => {
  if (props.centerAligned) {
    return 'center';
  } else if (props.stretchAligned) {
    return 'stretch';
  } else if (props.leftAligned) {
    return 'flex-start';
  }

  return null;
};

const getWidth = (props) => {
  if (props.width) {
    return props.width;
  }
  return props.fullWidth ? '100%' : null;
};

export const Column = styled.div`
  width: ${props => getWidth(props)};
  display: flex;
  flex-direction: column;
  align-items: ${props => getAlignItems(props) || 'center'};  
  justify-content: ${props => getJustifyContent(props) || 'space-around'};  
  flex-grow: ${props => (props.grow ? 1 : 0)};
`;
export const LeftAlignedColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding-top: ${props => props.paddingTop || 0}px;
`;

export const CenterAlignedColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
export const RightAlignedColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
