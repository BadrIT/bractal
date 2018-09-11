/* eslint-disable import/prefer-default-export */
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { Column } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import { MediumLabel } from '~/modules/coreUI/components/basic/Labels';
import assert from '~/modules/core/utils/jsHelpers/assert';

import { infereFontSize, inferePaddingSize, infereBorderRadius } from '~/modules/coreUI/utils/infereStyle';
import Icon from '~/modules/coreUI/components/basic/Icon';
import Spacer from '~/modules/coreUI/components/layouts/helpers/Spacer';

const getBackgroundColor = (props) => {
  if (props.s_disabled) {
    if (props.s_inverted) {
      return props.theme.buttons.disabled.backgroundColor.inverted;
    }
    return props.theme.buttons.disabled.backgroundColor.normal;
  }

  if (props.s_inverted) {
    return props.theme.colors.named.white;
  }

  return props.s_secondary ? props.theme.colors.secondary : props.theme.colors.primary;
};

const getColor = (props) => {
  if (!props.s_inverted) {
    return props.theme.colors.named.white;
  }

  return props.s_secondary ? props.theme.colors.secondary : props.theme.colors.primary;
};

const getHoverColor = (props) => {
  if (!props.s_inverted) {
    return props.theme.colors.named.white;
  }

  return props.s_secondary ? props.theme.colors.secondaryHover : props.theme.colors.primaryHover;
};

const getClickedColor = (props) => {
  if (!props.s_inverted) {
    return props.theme.colors.named.white;
  }

  return props.s_secondary
    ? props.theme.colors.secondaryClicked
    : props.theme.colors.primaryClicked;
};

const getHoverBackgroundColor = (props) => {
  if (props.s_disabled) {
    if (props.s_inverted) {
      return props.theme.buttons.disabled.backgroundColor.inverted;
    }
    return props.theme.buttons.disabled.backgroundColor.normal;
  }

  if (props.s_inverted) {
    return props.theme.colors.named.white;
  }

  return props.s_secondary ? props.theme.colors.secondaryHover : props.theme.colors.primaryHover;
};

const getClickedBackgorundColor = (props) => {
  if (props.s_disabled) {
    if (props.s_inverted) {
      return props.theme.buttons.disabled.backgroundColor.inverted;
    }
    return props.theme.buttons.disabled.backgroundColor.normal;
  }

  if (props.s_inverted) {
    return props.theme.colors.named.white;
  }

  return props.s_secondary
    ? props.theme.colors.secondaryClicked
    : props.theme.colors.primaryClicked;
};

const getBorderRadius = (props) => {
  if (props.s_fullRound) {
    return 1000;
  }

  return props.s_radius ? props.s_radius : infereBorderRadius(props);
};


const ButtonLabelStyle = css`
  font-size: ${props => infereFontSize(props)}px;
  font-weight: ${props => (props.s_bold ? 'bold' : 'normal')};

  color: ${props => getColor(props)};

  &:hover {
    color: ${props => getHoverColor(props)};
  }

  &:active {
    color: ${props => getClickedColor(props)};
  }
`;

// Must be of relative position for the loading icon to be drawn correctly
const StyledButton = styled(Column)`
  width: 100%;
  position: relative;  

  padding: ${props => inferePaddingSize(props)}px;
    
  background-color: ${props => getBackgroundColor(props)};
  
  border: ${props => (props.s_borderLess ? 0 : (props.theme.buttons.border || 1))}px solid;
  border-color: ${props => getColor(props)};
  border-radius: ${props => getBorderRadius(props)}px;
  
  cursor: pointer;
  
  &:hover {
    color: ${props => getHoverColor(props)};
    background-color: ${props => getHoverBackgroundColor(props)};  
    border-color: ${props => getHoverColor(props)};  
  }  

  &:active {
    color: ${props => getClickedColor(props)};
    background-color: ${props => getClickedBackgorundColor(props)};
    border-color: ${props => getClickedColor(props)};
  }
`;

const HiddenActualButton = styled.button`
  opacity: 0;
  position: absolute;

  &:focus + div {
    color: ${props => getHoverColor(props)};
    background: ${props => getHoverBackgroundColor(props)};
    border-color: ${props => getHoverColor(props)};

    span {
      color: ${props => getHoverColor(props)};
    }
  }
`;

const ButtonLoadingIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: ${props => props.theme.buttons.padding}px;
  height: 100%;
`;

const ButtonContainer = styled.div`
  width: ${props => (props.block ? '100%' : props.width)};
`;

export class Button extends React.Component {
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
      <HiddenActualButton {...this.props} />
      <StyledButton
        {...this.props}
        onClick={e => this.onClick(e)}
        centerAligned
        centerJustify
        width={this.props.width}
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
        <MediumLabel {...this.props} customStyle={ButtonLabelStyle}>
          {this.props.children}
        </MediumLabel>
      </StyledButton>
    </ButtonContainer>
  );
}

Button.propTypes = PropTypes.shape({
  s_iconName: PropTypes.string.isRequired,
}).isRequired;

export default Button;
