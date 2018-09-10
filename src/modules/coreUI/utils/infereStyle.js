const SIZES_SHORT_NAMES = {
  s_xs: 'xSmall',
  s_sm: 'small',
  s_md: 'medium',
  s_lg: 'large',
  s_xl: 'xLarge',
};

export const getFontSize = (props) => {
  const size = SIZES_SHORT_NAMES.find(prop => props[prop]);
  return props.theme.new.fonts.sizes[size];
};

export const getPaddingSize = (props) => {
  const size = SIZES_SHORT_NAMES.find(prop => props[prop]);
  return props.theme.new.paddings[size];
};
