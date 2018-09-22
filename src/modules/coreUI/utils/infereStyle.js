import Color from 'color';
import { css } from 'styled-components';

const SIZE_PROP_NAMES = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
];

const themeProp = propName => propName.replace('s_', '');

const modesColors = (type, theme) => ({
  normal: {
    lineColor: theme.new.colors[type].inverted,
    backgroundColor: theme.new.colors[type].normal,
  },
  inverted: {
    lineColor: theme.new.colors[type].normal,
    backgroundColor: theme.new.colors[type].inverted,
  },
});

export const infereControlType = (props) => {
  if (props.disabled) {
    return 'disabled';
  } else if (props.secondary) {
    return 'secondary';
  }
  return 'primary';
};

export const infereControlMode = (props) => {
  if (props.inverted) {
    return 'inverted';
  }
  return 'normal';
};

export const infereColors = (props) => {
  const type = infereControlType(props);
  const mode = infereControlMode(props);

  return modesColors(type, props.theme)[mode];
};

export const infereDarkerColors = (props, darkenRatio) => {
  const color = infereColors(props);

  if (props.disabled) {
    return color;
  }

  return {
    lineColor: Color(color.lineColor).darken(darkenRatio).string(),
    backgroundColor: Color(color.backgroundColor).darken(darkenRatio).string(),
  };
};


export const colorStyles = css`
  color: ${props => infereColors(props).lineColor};
  background-color: ${props => infereColors(props).backgroundColor};
  border-color: ${props => infereColors(props).lineColor};

  &:hover {
    color: ${props => infereDarkerColors(props, 0.05).lineColor};
    background-color: ${props => infereDarkerColors(props, 0.05).backgroundColor};
    border-color: ${props => infereDarkerColors(props, 0.05).lineColor};    
  }  

  &:active {
    color: ${props => infereDarkerColors(props, 0.1).lineColor};
    background-color: ${props => infereDarkerColors(props, 0.1).backgroundColor};
    border-color: ${props => infereDarkerColors(props, 0.1).lineColor};
  }

  &:focus {
    border-color: ${props => props.theme.new.inputs.focusBorderColor[infereControlType(props)]};
  }
`;

export const infereSize = props =>
  SIZE_PROP_NAMES.find(sizeProp => props[sizeProp]) || 'md';

export const infereFontSize = (props) => {
  const size = infereSize(props);
  return props.theme.new.fonts.sizes[themeProp(size)];
};

export const infereBorderRadius = (props) => {
  if (props.fullRound) {
    return 1000;
  } else if (props.radius) {
    return props.radius;
  }

  const size = infereFontSize(props);
  return size / 2.5;
};

export const inferePaddingSize = (props) => {
  const size = infereFontSize(props);
  return size * 0.60;
};
