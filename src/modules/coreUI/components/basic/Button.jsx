/* eslint-disable import/prefer-default-export */
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import assert from '~/modules/core/utils/jsHelpers/assert';

import { infereFontSize, inferePaddingSize, infereBorderRadius, infereColors, infereDarkerColors } from '~/modules/coreUI/utils/infereStyle';
import Icon from '~/modules/coreUI/components/basic/Icon';
import Spacer from '~/modules/coreUI/components/layouts/helpers/Spacer';

const colorStyles = css`
  color: ${props => infereColors(props).lineColor};
  background-color: ${props => infereColors(props).backgroundColor};
  border-color: ${props => infereColors(props).lineColor};

  &:hover {
    color: ${props => infereDarkerColors(props, 0.1).lineColor};
    background-color: ${props => infereDarkerColors(props, 0.1).backgroundColor};
    border-color: ${props => infereDarkerColors(props, 0.1).lineColor};    
  }  

  &:active {
    color: ${props => infereDarkerColors(props, 0.2).lineColor};
    background-color: ${props => infereDarkerColors(props, 0.2).backgroundColor};
    border-color: ${props => infereDarkerColors(props, 0.2).lineColor};
  }
`;

// Must be of relative position for the loading icon to be drawn correctly
const StyledButton = styled.button`
  width: 100%;
  position: relative;    

  padding: ${props => inferePaddingSize(props)}px;

  font-size: ${props => infereFontSize(props)}px;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};  
  
  border: ${props => (props.borderLess ? 0 : (props.theme.buttons.border || 1))}px solid;
  border-radius: ${props => infereBorderRadius(props)}px;

  outline-style: none;
  
  cursor: pointer;

  ${colorStyles}
`;

const ButtonLoadingIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: ${props => props.theme.buttons.padding}px;
  height: 100%;
`;

const ButtonContainer = styled.div`
  width: ${props => (props.block ? '100%' : props.width)};
`;

class Button extends React.Component {
  componentDidMount = () => {
    // FIXME : The reason for the following work around, is that onClick would be called on the
    //         External component first, and thus causes the onClick being called twice
    assert(!this.props.onClick, "onClick shouldn't be used on BasicButton, use onClicked instead");
  }

  onClick = (e) => {
    if (this.props.onClicked) {
      this.props.onClicked(e);
    }
  };

  render = () => (
    <ButtonContainer {...this.props}>
      <StyledButton
        {...this.props}
        onClick={e => this.onClick(e)}
        centerAligned
        centerJustify
      >
        {this.props.loading &&
          <ButtonLoadingIcon icon={faSpinner} spin />
        }
        {this.props.iconName &&
          <React.Fragment>
            <Icon className={this.props.iconName} />
            <Spacer />
          </React.Fragment>
        }
        {this.props.children}
      </StyledButton>
    </ButtonContainer>
  );
}

Button.propTypes = PropTypes.shape({
  iconName: PropTypes.string.isRequired,
}).isRequired;

export default Button;
