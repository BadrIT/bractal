/* eslint-disable import/prefer-default-export */
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { Column } from '~/modules/coreUI/components/layouts/helpers/Columns';
import { MediumLabel } from '~/modules/coreUI/components/basic/Labels';
import assert from '~/modules/core/utils/jsHelpers/assert';

import { getFontSize, getPaddingSize } from '~/modules/coreUI/utils/infereStyle';

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

  return props.s_primary ? props.theme.colors.primary : props.theme.colors.secondary;
};

const getColor = (props) => {
  if (!props.s_inverted) {
    return props.theme.colors.named.white;
  }

  return props.s_primary ? props.theme.colors.primary : props.theme.colors.secondary;
};

const getHoverColor = (props) => {
  if (!props.s_inverted) {
    return props.theme.colors.named.white;
  }

  return props.s_primary ? props.theme.colors.primaryHover : props.theme.colors.secondaryHover;
};

const getClickedColor = (props) => {
  if (!props.s_inverted) {
    return props.theme.colors.named.white;
  }

  return props.s_primary ? props.theme.colors.primaryClicked : props.theme.colors.secondaryClicked;
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

  return props.s_primary ? props.theme.colors.primaryHover : props.theme.colors.secondaryHover;
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

  return props.s_primary ? props.theme.colors.primaryClicked : props.theme.colors.secondaryClicked;
};

const ButtonLabelStyle = css`
  font-size: ${props => getFontSize(props)}px;

  color: ${props => getColor(props)};

  &:hover {
    color: ${props => getHoverColor(props)};
  }

  &:active {
    color: ${props => getClickedColor(props)};
  }
`;

// Must be of relative position for the loading icon to be drawn correctly
const Button = styled(Column)`
  width: '100%';
  position: relative;  

  padding: ${props => getPaddingSize(props)}px;
    
  background-color: ${props => getBackgroundColor(props)};
  
  border: ${props => (props.s_inverted ? props.theme.buttons.border : 0)}px solid;
  border-color: ${props => getColor(props)};
  border-radius: ${props => props.radius || props.theme.buttons.radius}px;
  
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
  width: ${props => props.width || '100%'};
`;

export class BasicButton extends React.Component {
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
      <Button
        {...this.props}
        onClick={e => this.onClick(e)}
        centerAligned
        centerJustify
        width={this.props.width}
      >
        {this.props.loading &&
          <ButtonLoadingIcon icon={faSpinner} spin />
        }
        <MediumLabel {...this.props} customStyle={ButtonLabelStyle}>
          {this.props.children}
        </MediumLabel>
      </Button>
    </ButtonContainer>
  );
}

BasicButton.propTypes = PropTypes.shape({
  iconName: PropTypes.string.isRequired,
  size: PropTypes.number,
}).isRequired;
