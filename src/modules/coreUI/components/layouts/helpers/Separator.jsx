import React from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';
import PropTypes from 'prop-types';

import { responsiveStyle, infereSpaceSize } from '~/modules/coreUI/utils/infereStyle';
import spaceStyles from '~/modules/coreUI/utils/styleSystem';
import withMedia from '~/modules/core/utils/mediaHelpers/withMedia';

import Spacer from './Spacer';
import { LinearLayout } from './LinearLayout';


const lengths = {
  small: '30%',
  normal: '40%',
  large: '70%',
  xLarge: '90%',
  full: '100%',
};

const getLength = (props, size) =>
  lengths[size] ||
  infereSpaceSize(props, size);

const getWeight = (props, size) =>
  (props.theme.borders.size[size] && `${props.theme.borders.size[size]}px`) ||
  infereSpaceSize(props, size);

const getColor = (props) => {
  const color = props.separatorColorTone || 'light';

  return props.theme.borders.color[color];
};

const SeparatorContainer = styled(LinearLayout)`
  align-self: stretch;
  position: relative;
  opacity: ${props => props.opacity || 1};

  ${props => spaceStyles(props)}
`;

const VerticalSeparatorRenderer = props => css`
  ${responsiveStyle(props, 'separatorLength', size => css`
    height: ${getLength(props, size)};
  `, 'normal')};
  ${responsiveStyle(props, 'separatorWeight', size => css`
    width: ${getWeight(props, size)};
  `, 'thin')};
`;

const HorizontalSeparatorRenderer = props => css`
  ${responsiveStyle(props, 'separatorWeight', size => css`
    height: ${getWeight(props, size)};
  `, 'thin')};
  ${responsiveStyle(props, 'separatorLength', size => css`
    width: ${getLength(props, size)};
  `, 'normal')};
`;

const SeparatorRenderer = withMedia(styled.div`
  ${props => (props.vertical
    ? VerticalSeparatorRenderer(props)
    : HorizontalSeparatorRenderer(props)
  )}
  
  background-color: ${props => getColor(props)};
`);

const Separator = props => (
  <SeparatorContainer {...props} row={props.vertical}>
    {/* TODO : Use PropTypes default value instead */}
    <Spacer size={props.spacerSize || 1} />
    <SeparatorRenderer
      separatorWeight={props.separatorWeight}
      separatorLength={props.separatorLength}
      separatorColorTone={props.separatorColorTone}
      vertical={props.vertical}
    />
    <Spacer size={props.spacerSize || 1} />
  </SeparatorContainer>
);

Separator.propTypes = PropTypes.shape({
  separatorWeight: PropTypes.oneOf(['thin', 'normal', 'bold']),
  separatorLength: PropTypes.oneOf(['small', 'normal', 'large', 'xLarge', 'full']),
  separatorColorTone: PropTypes.oneOf(['light', 'normal', 'dark']),
}).isRequired;

export default withMedia(Separator);
