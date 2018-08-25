/* eslint-disable jsx-a11y/no-noninteractive-element-interactions,
 jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

const Icon = props => (
  <i className={props.className} {...props} onClick={props.onClick} />
);

Icon.propTypes = PropTypes.shape({
  className: PropTypes.string.isRequired,
}).isRequired;

export default Icon;
