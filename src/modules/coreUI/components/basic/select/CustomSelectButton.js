// eslint-disable-next-line
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { CenterAlignedRow } from '~/modules/coreUI/components/layouts/helpers/Rows';
import { CenterAlignedColumn } from '~/modules/coreUI/components/layouts/helpers/Columns';

import { XSmallSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';
import Icon from '~/modules/coreUI/atoms/Icon';

const getBorderColor = (props, forceFocusMode) => {
  if (forceFocusMode || props.actAsInFocus) {
    return props.theme.colors.primary;
  }

  return props.theme.inputs.borderColor;
};

const DropdownIconContainer = styled(CenterAlignedColumn)`
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: ${props => props.dropIconDistanceFromRight || props.theme.paddings.xLarge}px;  

  justify-content: center;
  
  cursor: pointer;

  i {
    line-height: 1;
    font-size: 8px;

    color: ${props => getBorderColor(props)};
  }
`;

const Button = styled.button`
  display: flex;
  position: relative;  
  overflow: hidden;
  width: 100%;
  height: ${props => props.theme.paddings.xxxxxLarge + 4}px;

  align-items: center;

  font-size: ${props => props.fontSize || props.theme.inputs.fontSize}px;

  color: ${props => (props.label ? props.theme.inputs.color : props.theme.inputs.placeholderColor)};
  background-color: white;

  padding-left: ${props => props.theme.paddings.large}px;
  padding-right: ${props => props.theme.paddings.large}px;
  white-space: nowrap;

  text-align: left;
  text-overflow: ellipsis; 

  outline: none;
  border: solid ${props => props.theme.inputs.borderWidth}px ${props => getBorderColor(props)};
  border-radius:${props => props.theme.inputs.radius}px;
  border-top-right-radius:${props => props.rightBorderRadius || props.theme.inputs.radius};
  border-bottom-right-radius:${props => props.rightBorderRadius || props.theme.inputs.radius};
  
  cursor: pointer;   

  img {
    width: 20px;
    height: 20px;

    margin-top: 1px;
    margin-left: -2px;
    margin-right: 2px;

    border-radius: 50%;    
  }

  &:focus {
    border: solid ${props => props.theme.inputs.borderWidth}px ${props => getBorderColor(props, true)};
  }

  &:focus i {
    color: ${props => getBorderColor(props, true)};
  }
`;

const ButtonLoadingIcon = styled(CenterAlignedRow)`
  height: 100%;
  position: absolute;

  right: ${props => 2.5 * (props.dropIconDistanceFromRight || props.theme.paddings.xLarge)}px;
`;

const ButtonContainer = styled(CenterAlignedRow)`
  position: relative;  
  width:${props => (props.width ? props.width : '100%')};  

  align-items: stretch;
`;

// eslint-disable-next-line
class CustomButton extends React.Component {
  focus = () => {
    this.buttonRef.focus();
  }
  render = () => {
    const {
      width,
      onMouseDown,
      rightBorderRadius,
      image,
      label,
      placeholder,
      dropIconDistanceFromRight,
      fontSize,
      actAsInFocus,
      onKeyDown,
      onFocus,
      visible,
      isLoading,
    } = this.props;

    return (
      <ButtonContainer
        width={width}
        onMouseDown={e => (isLoading ? null : onMouseDown(e))}
        onKeyDown={onKeyDown}
        visible={visible}
      >
        <Button
          onFocus={onFocus}
          innerRef={(ref) => { this.buttonRef = ref; }}
          fontSize={fontSize}
          rightBorderRadius={rightBorderRadius}
          label={label}
          actAsInFocus={actAsInFocus}
        >
          {this.props.isLoading &&
            <ButtonLoadingIcon dropIconDistanceFromRight={dropIconDistanceFromRight} >
              <FontAwesomeIcon icon={faSpinner} spin />
            </ButtonLoadingIcon>
          }
          {image}
          <XSmallSpacer />
          {label || placeholder}
          <DropdownIconContainer
            dropIconDistanceFromRight={dropIconDistanceFromRight}
            actAsInFocus={actAsInFocus}
          >
            <Icon className="icon-down-open" />
          </DropdownIconContainer>
        </Button>
      </ButtonContainer>
    );
  };
}

CustomButton.defaultProps = {
  image: null,
  label: null,
  placeholder: 'Select',
  width: '100%',
  dropIconDistanceFromRight: null,
  rightBorderRadius: null,
  fontSize: null,
  actAsInFocus: false,
  onFocus: null,
  visible: false,
  isLoading: false,
};
CustomButton.propTypes = {
  image: PropTypes.element,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  width: PropTypes.string,
  onMouseDown: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  rightBorderRadius: PropTypes.string,
  dropIconDistanceFromRight: PropTypes.number,
  fontSize: PropTypes.number,
  actAsInFocus: PropTypes.bool,
  onFocus: PropTypes.func,
  visible: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default CustomButton;
