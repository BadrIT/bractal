import React from 'react';
import PropTypes from 'prop-types';

const ExternalLink = props => (
  <a href={props.url} target={props.target} {...props}>
    {props.children}
  </a>
);

export default ExternalLink;

ExternalLink.defaultProps = {
  target: '',
};


ExternalLink.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  target: PropTypes.string,
};
