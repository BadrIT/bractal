import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';


const StyledTooltip = styled.div`
  visibility: ${props => (props.hidden && !props.visible ? 'hidden' : 'visible')};
  position: absolute;
  z-index: 3;  
  text-align: center;

  top: 200%;
  left: 50%;
  transform: translateX(-50%);
  padding: ${props => props.theme.paddings.medium}px;

  font-size: ${props => props.theme.fonts.sizes.small}px;

  opacity: ${props => (props.hidden && !props.visible ? 0 : 1)};  
  color: ${props => props.theme.colors.named.white};
  background: ${props => (props.color ? props.color : props.theme.colors.labels.normal)};
    
  border-radius: 6px;
  
  transition: opacity 0.3s;

  ::after {    
    position: absolute;
    
    top: -10px;
    left: 50%;
    margin-left: -5px;

    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent ${props => (props.color ? props.color : props.theme.colors.labels.normal)} transparent;
    
    z-index: 3;

    content: "";
  }
`;

const Tooltip = props => (
  <StyledTooltip className="tooltip" {...props}>
    {props.children}
  </StyledTooltip>
);

Tooltip.propTypes = PropTypes.shape({
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}).isRequired;

export default Tooltip;
