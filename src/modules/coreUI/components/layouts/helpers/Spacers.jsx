import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const XXSmallSpacer = styled.div`
  width: ${props => props.size || props.theme.paddings.xxSmall}px;
  height: ${props => props.size || props.theme.paddings.xxSmall}px;
`;

export const XSmallSpacer = styled.div`
  width: ${props => props.size || props.theme.paddings.xSmall}px;
  height: ${props => props.size || props.theme.paddings.xSmall}px;
`;

export const SmallSpacer = styled.div`
  width: ${props => props.size || props.theme.paddings.small}px;
  height: ${props => props.size || props.theme.paddings.small}px;
`;

export const MediumSpacer = styled.div`
  width: ${props => props.size || props.theme.paddings.medium}px;
  height: ${props => props.size || props.theme.paddings.medium}px;
`;

export const LargeSpacer = styled.div`
  width: ${props => props.size || props.theme.paddings.large}px;
  height: ${props => props.size || props.theme.paddings.large}px;
`;

export const XLargeSpacer = styled.div`
  width: ${props => props.size || props.theme.paddings.xLarge}px;
  height: ${props => props.size || props.theme.paddings.xLarge}px;
`;

export const XXLargeSpacer = styled.div`
  width: ${props => props.size || props.theme.paddings.xxLarge}px;
  height: ${props => props.size || props.theme.paddings.xxLarge}px;
`;

export const XXXLargeSpacer = styled.div`
  width: ${props => props.size || props.theme.paddings.xxxLarge}px;
  height: ${props => props.size || props.theme.paddings.xxxLarge}px;
`;

export const XXXXLargeSpacer = styled.div`
  width: ${props => props.size || props.theme.paddings.xxxxLarge}px;
  height: ${props => props.size || props.theme.paddings.xxxxLarge}px;
`;

export const XXXXXLargeSpacer = styled.div`
  width: ${props => props.size || props.theme.paddings.xxxxxLarge}px;
  height: ${props => props.size || props.theme.paddings.xxxxxLarge}px;
`;

export const Spacer = ({ spacerSize, customSize }) => {
  const RENDERERS = {
    xSmall: XSmallSpacer,
    small: SmallSpacer,
    medium: MediumSpacer,
    large: LargeSpacer,
    xLarge: XLargeSpacer,
    xxLarge: XXLargeSpacer,
    xxxLarge: XXXLargeSpacer,
    xxxxLarge: XXXXLargeSpacer,
    xxxxxLarge: XXXXXLargeSpacer,
  };

  const Renderer = RENDERERS[spacerSize || 'medium'];

  return <Renderer size={customSize} />;
};

Spacer.propTypes = PropTypes.shape({
  spacerSize: PropTypes.oneOf(['xSmall', 'small', 'medium', 'large', 'xLarge', 'xxLarge', 'xxxLarge', 'xxxxLarge', 'xxxxxLarge']).isRequired,
  customSize: PropTypes.number,
}).isRequired;
