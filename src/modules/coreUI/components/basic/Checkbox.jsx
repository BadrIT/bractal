import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CenterAlignedRow } from '~/modules/coreUI/components/layouts/helpers/Rows';
import { SmallLabel } from './Labels';

const StylableCheckbox = styled.input`
  position: absolute;
  left: -999em;  

  &:checked + label::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 4px;
    background: rgba(0,0,0,0);
    bottom: 7px;
    left: 3px;
    border: 2px solid ${props => props.theme.colors.secondary};
    border-top: none;
    border-right: none;
    transform: rotate(-45deg);
  }    

  & + label::before {
    cursor: pointer;
    content: "";
    height: 16px;
    width: 16px;
    background-color: white;
    border: 1px solid;
    border-color: ${props => props.theme.inputs.borderColor};
    border-radius: 3px;
    margin-right: 6px;
  }

  &:focus + label::before {
    border-color: ${props => props.theme.inputs.borderColorActive};
  }

  & + label {
    margin-left: 2px;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    color: ${props => props.theme.colors.labels.normal};
  }
`;

const Checkbox = props => (
  <CenterAlignedRow>
    <StylableCheckbox type="checkbox" id={props.elemID} {...props} />
    <label htmlFor={props.elemID}>
      <SmallLabel bold={props.bold}>
        {props.label}
      </SmallLabel>
    </label>
  </CenterAlignedRow>
);

Checkbox.propTypes = PropTypes.shape({
  elemID: PropTypes.string.isRequired,
}).isRequired;

export default Checkbox;
