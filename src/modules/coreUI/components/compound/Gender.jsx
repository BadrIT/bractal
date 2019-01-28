import React from 'react';

import styled from '@emotion/styled';

import PropTypes from 'prop-types';

const RadioElm = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-right:10px;
  }
  label {
    margin-right:10px;
    cursor:pointer;
    input{
      display:none;
    }
  }
`;
const Input = styled.input`
  &&:checked+i{
   color: ${props => props.theme.colors.primary};
   opacity:1;
  }
  &&:focus + i {
    color: ${props => props.theme.colors.primaryClicked};
  }
`;
// Should take same height as text inputs
// TODO : Use the 'Icon' component instead
const Icon = styled.i`
  color: ${props => props.theme.inputs.borderColor};
  font-size: ${props => ((2 * props.theme.inputs.padding.top) + props.theme.inputs.fontSize + 4)}px;
  opacity: 0.7;
  cursor: pointer;
`;

const handleOptionChange = (event, onChange) => {
  onChange(event.target.value);
};

const Radio = ({ onChange }) => (
  <RadioElm>
    <span>Gender :</span>
    <label htmlFor="male">
      <Input
        type="radio"
        name="gender"
        value="male"
        id="male"
        onChange={event => handleOptionChange(event, onChange)}
      />
      <Icon className="icon-male" />
    </label>
    <label htmlFor="female">
      <Input
        type="radio"
        name="gender"
        value="female"
        id="female"
        onChange={event => handleOptionChange(event, onChange)}
      />
      <Icon className="icon-female" />
    </label>
  </RadioElm>
);

Radio.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Radio;
