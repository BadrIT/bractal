/* eslint-disable import/prefer-default-export */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import assert from '~/modules/core/utils/jsHelpers/assert';

import { infereFontSize, inferePaddingSize, infereBorderRadius, colorStyles, disabledColorStyles } from '~/modules/coreUI/utils/infereStyle';
import Icon from '~/modules/coreUI/components/basic/Icon';
import { Row } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';

// Must be of relative position for the loading icon to be drawn correctly
const StyledButton = styled.button`
  width: ${props => (props.block ? '100%' : props.width)};
  position: relative;    

  padding: ${props => inferePaddingSize(props)}px;

  font-size: ${props => infereFontSize(props)}px;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};  
  
  border: ${props => (props.borderLess ? 0 : (props.theme.buttons.border || 1))}px solid;
  border-radius: ${props => infereBorderRadius(props)}px;

  outline-style: none;
  
  cursor: pointer;

  ${props => (props.disabled ? disabledColorStyles : colorStyles)}
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
    <StyledButton
      {...this.props}
      onClick={e => this.onClick(e)}
      centerAligned
      centerJustify
    >
      <Row spaceBetween={0.5}>
        {this.props.loading &&
          <Icon className="fas fa-spinner fa-spin" />
        }
        {this.props.iconName &&
          <Icon className={this.props.iconName} />
        }
        {this.props.children}
      </Row>
    </StyledButton>
  );
}

Button.propTypes = PropTypes.shape({
  iconName: PropTypes.string.isRequired,
}).isRequired;

export default Button;
