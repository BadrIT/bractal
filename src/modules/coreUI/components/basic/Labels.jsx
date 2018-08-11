/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

const getColor = (props) => {
  if (props.color) {
    if (props.theme.colors.labels[props.color]) {
      return props.theme.colors.labels[props.color];
    }
    return props.color;
  }
  return props.theme.colors.labels.normal;
};

const getSize = (props) => {
  if (props.size) {
    if (props.theme.fonts.sizes[props.size]) {
      return props.theme.fonts.sizes[props.size];
    }
    return props.size;
  }
  return props.theme.fonts.sizes.small;
};

export const Label = styled.span`
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
  color: ${props => getColor(props)};
  font-size: ${props => getSize(props)}px;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  line-height: ${props => (props.paragraph ? 1.3 : 1)};

  ${props => props.customStyle}

  text-align: ${props => props.align || 'left'};

  a {
    color: ${props => props.theme.colors.link};
  }
`;
export const XXXLargeLabel = styled(Label)`
  font-size: ${props => props.theme.fonts.sizes.xxxLarge}px;
`;

export const XXLargeLabel = styled(Label)`
  font-size: ${props => props.theme.fonts.sizes.xxLarge}px;
`;

export const XLargeLabel = styled(Label)`
  font-size: ${props => props.theme.fonts.sizes.xLarge}px;
`;

export const LargeLabel = styled(Label)`
  font-size: ${props => props.theme.fonts.sizes.large}px;
`;

export const MediumLabel = styled(Label)`
  font-size: ${props => props.theme.fonts.sizes.medium}px;
`;

export const SmallLabel = styled(Label)`
  font-size: ${props => props.theme.fonts.sizes.small}px;
`;

export const XSmallLabel = styled(Label)`
  font-size: ${props => props.theme.fonts.sizes.xSmall}px;
`;

export const XXSmallLabel = styled(Label)`
  font-size: ${props => props.theme.fonts.sizes.xxSmall}px;
`;
export const XXXSmallLabel = styled(Label)`
  font-size: ${props => props.theme.fonts.sizes.xxxSmall}px;
`;

export const ErrorLabel = styled.div`
  font-size: ${props => props.theme.fonts.sizes.xxSmall}px;
  color: ${props => props.theme.colors.error};
`;
