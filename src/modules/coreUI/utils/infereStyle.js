import Color from 'color';

const SIZE_PROP_NAMES = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
];

const themeProp = propName => propName.replace('s_', '');

const Colors = {
  primary: {
    normal: '#33a8ff',
    inverted: '#FFFFFF',
  },
  secondary: {
    normal: '#fb9410',
    inverted: '#FFFFFF',
  },
  disabled: {
    normal: '#aaaaaa',
    inverted: '#FFFFFF',
  },
};

const modesColors = type => ({
  normal: {
    lineColor: Colors[type].inverted,
    backgroundColor: Colors[type].normal,
  },
  inverted: {
    lineColor: Colors[type].normal,
    backgroundColor: Colors[type].inverted,
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

  return modesColors(type)[mode];
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

export const findPropValue = (props, propName) => {
  const foundProp = Object.keys(props).find(prop =>
    prop === propName || prop.indexOf(`s_${propName}`) >= 0);
  if (!foundProp) {
    return null;
  }
  return props[foundProp];
};

export const infereFontSize = (props, defaultSize) => {
  let size = SIZE_PROP_NAMES.find(sizeProp => findPropValue(props, sizeProp));
  size = size || defaultSize || 'md';

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

export const parseFloatProperty = (props, propName) => {
  const value = findPropValue(props, propName);
  return parseFloat(value);
};
