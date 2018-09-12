import React from 'react';
import styled from 'styled-components';
import injectElementBetweenArrayItems from '~/modules/core/utils/jsHelpers/injectElementBetweenArrayItems';
import { parseFloatProperty } from '~/modules/coreUI/utils/infereStyle';
import Spacer from './Spacer';

const getIntraItemsSpacer = (props) => {
  let sizeProp = null;
  sizeProp = parseFloatProperty(props, 'spaceBetween');
  if (!sizeProp) {
    return null;
  }
  return <Spacer size={sizeProp} />;
};

const getJustifyContent = (props) => {
  if (props.spaceEvenlyJustified) {
    return 'space-evenly';
  } else if (props.spaceAroundJustified) {
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


const StyledLinearLayout = styled.div`
  width: ${props => (props.fullWidth ? '100%' : null)};
  height: ${props => (props.fullHeight ? '100%' : null)};
  display: flex;
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  flex-grow: ${props => (props.grow ? 1 : null)};
  justify-content: ${props => getJustifyContent(props) || 'space-around'};
  align-items: ${props => getAlignItems(props) || 'center'};  
`;

const LinearLayout = props => (
  <StyledLinearLayout {...props}>
    {[
      ...injectElementBetweenArrayItems(
        props.children, // eslint-disable-line react/prop-types
        getIntraItemsSpacer(props),
      ),
    ]}
  </StyledLinearLayout>
);

export const Column = props => (
  <LinearLayout column {...props} />
);

export const Row = props => (
  <LinearLayout row {...props} />
);

export default LinearLayout;
