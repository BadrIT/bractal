import React from 'react';
import styled from '@emotion/styled';

import PropTypes from 'prop-types';

const ImageElm = styled.img`
  width: ${props => (props.width ? props.width : '100%')};
  height: ${props => (props.height ? props.height : '100%')};
`;

const Image = props => (
  <ImageElm src={props.src} alt={props.alt} {...props} />
);

Image.propTypes = PropTypes.shape({
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
}).isRequired;

export default Image;
