import React from 'react';
import styled from 'react-emotion';
import injectElementBetweenChildElements from '~/modules/core/utils/jsHelpers/injectElementBetweenChildElements';
import { boxColorsStyles } from '~/modules/coreUI/utils/infereStyle';
import spaceStyles from '~/modules/coreUI/utils/styleSystem';
import withMedia from '~/modules/core/utils/mediaHelpers/withMedia';

import Spacer from './Spacer';

const getIntraItemsSpacer = (props) => {
  let sizeProp = null;
  // eslint-disable-next-line react/prop-types
  sizeProp = props.spaceBetween ? parseFloat(props.spaceBetween) : null;
  if (!sizeProp) {
    return null;
  }
  return <Spacer size={sizeProp} />;
};

const getBorderColor = (props) => {
  let color = 'light';
  if (props.borderColor) {
    color = props.borderColor;
  }

  return props.theme.borders.color[color] || props.borderColor;
};

const getBorderWeight = (props) => {
  let weight = 'thin';
  if (props.borderWeight) {
    weight = props.borderWeight;
  }

  return props.theme.borders.size[weight];
};

const getBorderRadius = (props) => {
  let radius = 'normal';
  if (props.borderRadius) {
    radius = props.borderRadius;
  }

  return props.theme.borders.radius[radius] || radius;
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

const StyledLinearLayout = withMedia(styled.div`
  width: ${props => (props.fullWidth ? '100%' : props.width)};
  height: ${props => (props.fullHeight ? '100%' : props.height)};
  box-sizing: border-box;

  display: flex;
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  flex-grow: ${props => (props.grow ? 1 : null)};
  justify-content: ${props => getJustifyContent(props) || 'flex-start'};
  align-items: ${props => getAlignItems(props) || 'center'};

  border: ${props => props.bordered && `solid ${getBorderWeight(props)}px ${getBorderColor(props)}`};
  border-radius: ${props => getBorderRadius(props)}px;
  border-top: ${props => props.topBordered && `solid ${getBorderWeight(props)}px ${getBorderColor(props)}`};
  border-left: ${props => props.leftBordered && `solid ${getBorderWeight(props)}px ${getBorderColor(props)}`};
  border-bottom: ${props => props.bottomBordered && `solid ${getBorderWeight(props)}px ${getBorderColor(props)}`};
  border-right: ${props => props.rightBordered && `solid ${getBorderWeight(props)}px ${getBorderColor(props)}`};

  padding: ${props => props.padding * props.theme.new.spacer}px;
  padding-left: ${props => props.paddingLeft * props.theme.new.spacer}px;
  padding-right: ${props => props.paddingRight * props.theme.new.spacer}px;
  padding-top: ${props => props.paddingTop * props.theme.new.spacer}px;
  padding-bottom: ${props => props.paddingBottom * props.theme.new.spacer}px;

  ${props => spaceStyles(props)}
  ${props => boxColorsStyles(props)}
  ${props => props.customStyles && props.customStyles(props)}
`);

export const LinearLayout = props => (
  <StyledLinearLayout {...props}>
    {injectElementBetweenChildElements(
      props.children, // eslint-disable-line react/prop-types
      getIntraItemsSpacer(props),
      true,
    )}
  </StyledLinearLayout>
);

export const Column = props => (
  <LinearLayout column {...props} />
);

export const Row = props => (
  <LinearLayout row {...props} />
);

export const Box = props => (
  <LinearLayout {...props} />
);
