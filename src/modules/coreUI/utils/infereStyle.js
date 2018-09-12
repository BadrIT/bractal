const SIZE_PROP_NAMES = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
];

const themeProp = propName => propName.replace('s_', '');

export const findPropValue = (props, propName) => {
  const foundProp = Object.keys(props).find(prop =>
    prop === propName || prop.indexOf(`s_${propName}`) >= 0);
  if (!foundProp) {
    return null;
  }
  return props[foundProp];
};

export const infereFontSize = (props) => {
  const size = SIZE_PROP_NAMES.find(sizeProp => findPropValue(props, sizeProp)) || 'md';
  return props.theme.new.fonts.sizes[themeProp(size)];
};

export const infereBorderRadius = (props) => {
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
