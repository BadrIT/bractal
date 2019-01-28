import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';


const RoundIcon = styled.div`
  width: 37px;
  height: 37px;
  color: ${props => props.color};
  border: 1px solid ${props => props.color};
  border-radius: 50%;
  font-size: 19px;  
  display: flex;
  justify-content: center;
  align-items:center;
  .icon-heart-1 {
    padding-top: 1px;
    padding-left: 1px;
  }

`;

const RoundIconButton = ({ iconName, color }) => (
  <RoundIcon color={color} >
    <div className={iconName} />
  </RoundIcon>
);

RoundIconButton.propTypes = PropTypes.shape({
  iconName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}).isRequired;

export default RoundIconButton;
