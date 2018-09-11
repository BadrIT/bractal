import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const StyledSpacer = styled.div`
  width: ${props => props.s_size * props.theme.new.spacer}px;
  height: ${props => props.s_size * props.theme.new.spacer}px;
`;

const Spacer = props => <StyledSpacer {...props} />;

Spacer.defaultProps = {
  s_size: 1,
};

Spacer.propTypes = PropTypes.shape({
  s_size: PropTypes.number,
}).isRequired;

export default Spacer;
