import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Spacer } from './Spacers';

const lengths = {
  small: '30%',
  normal: '40%',
  large: '70%',
  full: '100%',
};

const getLength = (props) => {
  let length = 'normal';
  if (props.separatorLength) {
    length = props.separatorLength;
  }

  return lengths[length] || '50%';
};

const getWeight = (props) => {
  let weight = 'light';
  if (props.separatorWeight) {
    weight = props.separatorWeight;
  }

  return props.theme.borders.size[weight];
};

const getColor = (props) => {
  let color = 'light';
  if (props.separatorColorTone) {
    color = props.separatorColorTone;
  }

  return props.theme.borders.color[color];
};

const VerticalSeparatorContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  position: relative;  
`;

const SeparatorRenderer = styled.div`
  height: ${props => getLength(props) || '50%'};
  width: ${props => getWeight(props) || 1}px;
  background-color: ${props => getColor(props) || props.theme.borders.color.light};
  opacity: ${props => props.opacity || 0.4};
`;

const VerticalSeparator = props => (
  <VerticalSeparatorContainer {...props}>
    {/* TODO : Use PropTypes default value instead */}
    <Spacer spacerSize={props.spacerWidth || 'medium'} />
    <SeparatorRenderer {...props} />
    <Spacer spacerSize={props.spacerWidth || 'medium'} />
  </VerticalSeparatorContainer>
);

VerticalSeparator.propTypes = PropTypes.shape({
  spacerWidth: PropTypes.oneOf(['small', 'medium', 'large', 'xLarge', 'xxLarge']),
  separatorWeight: PropTypes.oneOf(['light', 'normal', 'bold']),
  separatorLength: PropTypes.oneOf(['short', 'normal', 'long', 'full']),
  separatorColorTone: PropTypes.oneOf(['light', 'normal', 'dark']),
}).isRequired;

export default VerticalSeparator;
