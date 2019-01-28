/* eslint-disable import/prefer-default-export, react/prop-types */
import React from 'react';
import styled from '@emotion/styled';
import { css } from 'emotion';
import _ from 'lodash';
import { withTheme } from 'emotion-theming';
import withMedia from '~/modules/core/utils/mediaHelpers/withMedia';
import withDirection from '~/modules/core/utils/mediaHelpers/withDirection';

import {
  responsiveStyle,
  infereFontSize,
  responsiveFontSizeStyle,
  infereFontColor,
  infereFontWeight,
} from '~/modules/coreUI/utils/infereStyle';

const InnerLabel = withDirection(styled.span`
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};

  color: ${props => infereFontColor(props, 'normal')};

  font-weight: ${props => infereFontWeight(props)};

  line-height: 1.1em;

  text-align: ${props => props.align || (props.direction === 'rtl' ? 'right' : 'left')};

  a {
    color: ${props => props.theme.colors.link};
  }

  ${props => !props.inheritSize && responsiveFontSizeStyle(props)} ${props => props.nowrap
    && css`
      white-space: nowrap;
    `};

  ${props => props.customStyle && props.customStyle(props)};
`);

export const Label = withMedia(
  withTheme(props => (
    <InnerLabel
      {..._.omit(props, ['forceMediaQuery'])}
      title={
        process.isStyleguidistActive
        /* For debugging purposes, show the current size as a tool tip */
        && responsiveStyle(props, 'size', size => infereFontSize(props, size))
      }
    />
  )),
);

export const XXLargeLabel = props => (
  <Label {...props} xxl>
    {props.children}
  </Label>
);

export const XLargeLabel = props => (
  <Label {...props} xl>
    {props.children}
  </Label>
);

export const LargeLabel = props => (
  <Label {...props} lg>
    {props.children}
  </Label>
);

export const MediumLabel = props => (
  <Label {...props} md>
    {props.children}
  </Label>
);

export const SmallLabel = props => (
  <Label {...props} sm>
    {props.children}
  </Label>
);

export const XSmallLabel = props => (
  <Label {...props} xs>
    {props.children}
  </Label>
);

export const ErrorLabel = props => (
  <Label {...props} error>
    {props.children}
  </Label>
);

export const Header = styled(Label)`
  line-height: 1.3em;

  color: ${props => props.theme.colors.labels.important};
  font-size: ${props => props.theme.new.fonts.sizes.header}px;
  font-weight: ${props => props.theme.fonts.weights.semiBold};

  ${props => props.customStyle && props.customStyle(props)};
`;
