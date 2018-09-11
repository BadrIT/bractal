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

  text-align: ${props => props.align || 'left'};

  a {
    color: ${props => props.theme.colors.link};
  }

  ${props => props.customStyle}
`;

export const XLargeLabel = styled(Label)`
  font-size: ${props => props.theme.new.fonts.sizes.xLarge}px;
  ${props => props.customStyle}
`;

export const LargeLabel = styled(Label)`
  font-size: ${props => props.theme.new.fonts.sizes.large}px;
  ${props => props.customStyle}
`;

export const MediumLabel = styled(Label)`
  font-size: ${props => props.theme.new.fonts.sizes.medium}px;
  ${props => props.customStyle}
`;

export const SmallLabel = styled(Label)`
  font-size: ${props => props.theme.new.fonts.sizes.small}px;
  ${props => props.customStyle}
`;

export const XSmallLabel = styled(Label)`
  font-size: ${props => props.theme.new.fonts.sizes.xSmall}px;
  ${props => props.customStyle}
`;

export const ErrorLabel = styled.div`
  font-size: ${props => props.theme.new.fonts.sizes.xSmall}px;
  color: ${props => props.theme.colors.error};
  ${props => props.customStyle}
`;

export const Header = styled(Label)`
  padding-top: ${props => props.theme.new.paddings.large}px;
  padding-bottom: ${props => props.theme.new.paddings.large}px;
  color: ${props => props.theme.colors.labels.important};
  font-size: ${props => props.theme.new.fonts.sizes.header}px;
  font-weight: bold;
`;
