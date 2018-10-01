import Color from 'color';
import { css } from 'emotion';
import _ from 'lodash';

const SIZE_PROP_NAMES = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
];

const FONT_COLORS = [
  'important',
  'normal',
  'emphasized',
  'subtle',
  'hint',
  'error',
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

export const darken = (color, ratio) => (ratio >= 0
  ? Color(color).darken(ratio).string()
  : Color(color).lighten(-1 * ratio).string());

const colors = (props, darkRatio) => css`
  color: ${darken(infereColors(props).lineColor, darkRatio)};
  background-color: ${darken(infereColors(props).backgroundColor, darkRatio)};
  border-color: ${darken(infereColors(props).lineColor, darkRatio)};
`;

export const colorStyles = props => css`
  ${colors(props, 0)}

  &:hover { ${colors(props, 0.05)} }  
  &:active { ${colors(props, 0.1)} }
  &:focus { 
    border-color: ${darken(infereColors(props).lineColor, 0.3)};
  }
`;

export const disabledColorStyles = props => css`
  ${colors(props, 0)}
`;

export const infereSize = props =>
  SIZE_PROP_NAMES.find(sizeProp => props[sizeProp]) || 'md';

export const infereFontColor = (props) => {
  if (props.color) {
    return props.color;
  }
  const color = FONT_COLORS.find(fontColor => props[fontColor]) || 'normal';
  const mode = infereControlMode(props);

  return props.theme.new.colors.labels[mode][color];
};

export const infereFontSize = (props) => {
  const size = infereSize(props);
  return props.theme.new.fonts.sizes[themeProp(size)];
};

export const infereFontWeight = (props) => {
  if (props.bold) {
    return props.theme.new.fonts.weights.bold;
  } else if (props.semiBold) {
    return props.theme.new.fonts.weights.semiBold;
  }
  return null; // Normal
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

export const propsForPrefix = (props, prefix) =>
  _.mapKeys(
    _.pickBy(props, (propValue, propName) => propName.indexOf(prefix) === 0),
    (triggerPropValue, triggerPropKey) => triggerPropKey.replace(prefix, ''),
  );
