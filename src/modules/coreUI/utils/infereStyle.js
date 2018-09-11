const SIZE_PROP_NAMES = [
  's_xs',
  's_sm',
  's_md',
  's_lg',
  's_xl',
];

const themeProp = propName => propName.replace('s_', '');

export const infereFontSize = (props) => {
  const size = SIZE_PROP_NAMES.find(sizeProp => props[sizeProp]) || 'md';
  return props.theme.new.fonts.sizes[themeProp(size)];
};

export const infereBorderRadius = (props) => {
  const size = infereFontSize(props);
  return size / 2.5;
};

export const inferePaddingSize = (props) => {
  const size = infereFontSize(props);
  return size * 0.7;
};

export const parsePropertyValue = (props, propInitialName) => {
  const foundProp = Object.keys(props).find(prop => prop.indexOf(propInitialName) >= 0);
  if (!foundProp) {
    return null;
  }
  return parseFloat(foundProp.replace(`${propInitialName}_`, ''));
};
