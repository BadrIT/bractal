import Color from 'color';
import { css } from '@emotion/core';
import _ from 'lodash';

import assert from '~/modules/core/utils/jsHelpers/assert';

import generateSequenceFromTo from '~/modules/core/utils/jsHelpers/generateSequence';

const SIZE_PROP_NAMES = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl',
  'header',
];

const FONT_COLORS = [
  'primary',
  'secondary',
  'important',
  'normal',
  'emphasized',
  'subtle',
  'hint',
  'error',
];

const themeProp = propName => propName.replace('s_', '');

export const darken = (color, ratio) => (ratio >= 0
  ? Color(color).darken(ratio).string()
  : Color(color).lighten(-1 * ratio).string());

const modesColors = (type, theme, props) => {
  const colors = theme.new.colors.buttons[type];

  return {
    normal: {
      lineColor: colors.line,
      borderColor: props.forceInvertedBorder ? colors.line : colors.background,
      backgroundColor: colors.background,
    },
    inverted: {
      lineColor: colors.lineInverted,
      borderColor: props.forceInvertedBorder ? colors.backgroundinverted : colors.lineInverted,
      backgroundColor: colors.backgroundinverted,
    },
  };
};

export const boxModesColors = (type, theme) => ({
  normal: {
    lineColor: theme.new.colors.named.inverted,
    borderColor: theme.new.colors.named.inverted,
    backgroundColor: theme.new.colors.named[type],
  },
  inverted: {
    lineColor: theme.new.colors.named[type],
    borderColor: theme.new.colors.named[type],
    backgroundColor: theme.new.colors.panels.background,
  },
});

export const infereControlType = (props) => {
  if (props.disabled) {
    return 'disabled';
  } else if (props.passive) {
    return 'passive';
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

const infereBoxColors = (props) => {
  if (props.colors) {
    return props.colors;
  }
  if (!props.boxType || !props.theme.new.colors.named[props.boxType]) {
    return {};
  }
  const type = props.boxType;
  const mode = infereControlMode(props);

  return boxModesColors(type, props.theme)[mode];
};

export const boxColorsStyles = props => css`
  color: ${infereBoxColors(props).lineColor};
  border-color: ${infereBoxColors(props).borderColor};
  background-color: ${infereBoxColors(props).backgroundColor};
`;

export const infereButtonColors = (props) => {
  const type = infereControlType(props);
  const mode = infereControlMode(props);

  return props.colors || modesColors(type, props.theme, props)[mode];
};

const colors = (props, darkRatio) => css`
  color: ${darken(props.color || infereButtonColors(props).lineColor, darkRatio)};
  background-color: ${darken(props.backgroundColor || infereButtonColors(props).backgroundColor, darkRatio)};
  border-color: ${darken(props.borderColor || infereButtonColors(props).borderColor, darkRatio)};
`;

export const colorStyles = props => css`
  ${colors(props, 0)}

  &:hover { ${colors(props, 0.05)} }  
  &:active { ${colors(props, 0.1)} }
  &:focus { 
    border-color: ${darken(infereButtonColors(props).borderColor, 0.3)};
  }
`;

export const disabledColorStyles = props => css`
  ${colors(props, 0)}
`;

export const getNamedFontSize = size =>
  SIZE_PROP_NAMES.find(sizeProp => size === sizeProp);

export const infereSize = props =>
  getNamedFontSize(props.size) ||
  SIZE_PROP_NAMES.find(sizeProp => props[sizeProp]);

export const infereSpaceSize = (props, size) => {
  if (_.isNumber(size)) {
    return `${size * props.theme.new.spacer}px`;
  } else if (size && parseFloat(size.toString()) === size) {
    return `${parseFloat(size.toString()) * props.theme.new.spacer}px`;
  }
  return size;
};

export const infereFontColor = (props, defaultColor) => {
  let color = null;
  if (props.color) {
    color = FONT_COLORS.find(fontColor => fontColor === props.color);
    if (!color) {
      return props.color;
    }
  }
  color =
    color ||
    FONT_COLORS.find(fontColor => props[fontColor]) ||
    defaultColor;

  const mode = infereControlMode(props);

  return props.theme.new.colors.labels[mode][color];
};

export const infereFontSize = (props, size) => {
  let inferedSize = infereSize(props);
  const receivedSize = size || props.size;

  if (!receivedSize && !inferedSize) {
    inferedSize = 'md';
  }

  if (_.isNumber(receivedSize)) {
    return `${receivedSize * props.theme.new.spacer}px`;
  } else if (receivedSize && parseFloat(receivedSize.toString()) === receivedSize) {
    return `${parseFloat(receivedSize).toString() * props.theme.new.spacer}px`;
  } else if (getNamedFontSize(receivedSize)) {
    return `${props.theme.new.fonts.sizes[themeProp(receivedSize)]}px`;
  } else if (inferedSize) {
    return `${props.theme.new.fonts.sizes[themeProp(inferedSize)]}px`;
  }

  return receivedSize;
};

export const infereNamedFontSize = (props, size) => {
  const inferedSize = size || infereSize(props) || 'md';
  return props.theme.new.fonts.sizes[themeProp(inferedSize)] || inferedSize;
};

export const infereFontWeight = (props) => {
  if (props.extraBold) {
    return props.theme.new.fonts.weights.extraBold;
  } else if (props.bold) {
    return props.theme.new.fonts.weights.bold;
  } else if (props.semiBold) {
    return props.theme.new.fonts.weights.semiBold;
  }
  return null; // Normal
};

export const infereBorderRadius = (props, size) => {
  if (props.fullRound) {
    return 1000;
  } else if (props.radius) {
    return props.radius;
  }

  const inferedSize = infereNamedFontSize(props, size);
  return inferedSize / 2.5;
};

export const inferePaddingSize = (props, size) => {
  const inferedSize = 0.53 * infereNamedFontSize(props, size);
  return props.tight ? inferedSize / 2 : inferedSize;
};

export const infereIntraSpacingSize = (props, size) => {
  const inferedSize = 0.53 * infereNamedFontSize(props, size);
  return props.tight ? inferedSize / 2 : inferedSize;
};

export const propsForPrefix = (props, prefix) =>
  _.mapKeys(
    _.pickBy(props, (propValue, propName) => propName.indexOf(prefix) === 0),
    (triggerPropValue, triggerPropKey) => triggerPropKey.replace(prefix, ''),
  );

const responsiveJSQueries = media => [
  media.xsmall,
  media.minMobile,
  media.minTablet,
  media.minDesktop,
  media.largeDesktop,
];

export const responsiveStyle = (props, targetProp, callBack, defaultValue) => {
  let propValue = null;
  if (targetProp === 'size') {
    if (props.size) {
      propValue = props.size;
    } else {
      propValue = infereSize(props) || 'md';
    }
  } else {
    propValue = props[targetProp];
  }

  if (!propValue) {
    if (defaultValue) {
      return callBack(defaultValue);
    }
    return null;
  }

  if (_.isArray(propValue) && propValue.length >= 2) {
    assert(props.media, "Media isn't found. Make sure to surround with withMedia");
    const currentSizeIndex = generateSequenceFromTo(4, -1)
      .find(i => responsiveJSQueries(props.media)[i] && i < propValue.length);
    if (!currentSizeIndex && currentSizeIndex !== 0) {
      return '';
    }
    return callBack(propValue[currentSizeIndex]);
  }
  return _.isArray(propValue) && propValue.length === 1
    ? callBack(propValue[0])
    : callBack(propValue);
};

export const responsiveFontSizeStyle = props =>
  responsiveStyle(props, 'size', size => css`
    font-size: ${infereFontSize(props, size)};
  `);
