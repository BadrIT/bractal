/* eslint-disable import/prefer-default-export, react/prop-types */
import React from 'react';
import styled from 'styled-components';

import { infereFontSize, infereFontColor, infereFontWeight } from '~/modules/coreUI/utils/infereStyle';

export const Label = styled.span`
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
  
  color: ${props => infereFontColor(props)};

  font-weight: ${props => infereFontWeight(props)};
  font-size: ${props => infereFontSize(props)}px;

  text-align: ${props => props.align || 'left'};

  a {
    color: ${props => props.theme.colors.link};
  }

  ${props => props.customStyle}
`;

export const XLargeLabel = props =>
  <Label {...props} xl>{props.children}</Label>;

export const LargeLabel = props =>
  <Label {...props} lg>{props.children}</Label>;

export const MediumLabel = props =>
  <Label {...props}>{props.children}</Label>;

export const SmallLabel = props =>
  <Label {...props} sm>{props.children}</Label>;

export const XSmallLabel = props =>
  <Label {...props} xs>{props.children}</Label>;

export const Header = styled(Label)`
  padding-top: ${props => 2 * props.theme.new.spacer}px;
  padding-bottom: ${props => 2 * props.theme.new.spacer}px;
  color: ${props => props.theme.colors.labels.important};
  font-size: ${props => props.theme.new.fonts.sizes.header}px;
  font-weight: bold;
`;
