import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

export const StyledSpacer = styled.div`
  width: ${props => props.size * props.theme.new.spacer}px;
  height: ${props => props.size * props.theme.new.spacer}px;
`;

const Spacer = props => <StyledSpacer {...props} />;

Spacer.defaultProps = {
  size: 1,
};

Spacer.propTypes = PropTypes.shape({
  size: PropTypes.number,
}).isRequired;

export default Spacer;
