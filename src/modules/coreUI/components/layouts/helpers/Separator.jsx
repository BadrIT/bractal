import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Spacer } from './Spacers';

const lengths = {
  small: '30%',
  normal: '40%',
  large: '70%',
  xLarge: '90%',
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

const SeparatorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  position: relative;  
`;

const getGenericHeight = (props) => {
  if (props.vertical) {
    return getLength(props) || '50%';
  }
  return `${getWeight(props) || 1}px`;
};

const getGenericWidth = (props) => {
  if (props.vertical) {
    return `${getWeight(props) || 1}px`;
  }
  return getLength(props) || '50%';
};

const SeparatorRenderer = styled.div`
  height: ${props => getGenericHeight(props)};
  width: ${props => getGenericWidth(props)};

  margin-top: ${props => (props.vertical ? props.offset : null)};
  margin-left: ${props => (!props.vertical ? props.offset : null)};
  
  background-color: ${props => getColor(props) || props.theme.borders.color.light};
  opacity: ${props => props.opacity || 0.4};
`;

const Separator = props => (
  <SeparatorContainer {...props}>
    {/* TODO : Use PropTypes default value instead */}
    <Spacer spacerSize={props.spacerSize || 'medium'} />
    <SeparatorRenderer {...props} />
    <Spacer spacerSize={props.spacerSize || 'medium'} />
  </SeparatorContainer>
);

Separator.propTypes = PropTypes.shape({
  spacerSize: PropTypes.oneOf(['small', 'medium', 'large', 'xLarge', 'xxLarge']),
  separatorWeight: PropTypes.oneOf(['light', 'normal', 'bold']),
  separatorLength: PropTypes.oneOf(['short', 'normal', 'long', 'full']),
  separatorColorTone: PropTypes.oneOf(['light', 'normal', 'dark']),
}).isRequired;

export default Separator;
