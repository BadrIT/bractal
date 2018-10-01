/* eslint-disable import/prefer-default-export */
import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import assert from '~/modules/core/utils/jsHelpers/assert';

import { propsForPrefix, infereFontSize, inferePaddingSize, infereBorderRadius, colorStyles, disabledColorStyles } from '~/modules/coreUI/utils/infereStyle';
import Icon from '~/modules/coreUI/components/basic/Icon';
import { Row } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';

const ButtonContent = styled(Row)`
  white-space: nowrap;
`;

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

  ${props => (props.disabled ? disabledColorStyles(props) : colorStyles(props))}
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
      <ButtonContent spaceBetween={0.5}>
        {this.props.loading &&
          <Icon className="fas fa-spinner fa-spin" />
        }
        {this.props.iconName &&
          <Icon
            className={this.props.iconName}
            {...propsForPrefix(this.props, 'iconBefore_')}
          />
        }
        {this.props.icon &&
          this.props.icon
        }
        {this.props.children}
        {this.props.iconAfterName &&
          <Icon
            className={this.props.iconAfterName}
            {...propsForPrefix(this.props, 'iconAfter_')}
          />
        }
        {this.props.iconAfter &&
          this.props.iconAfter
        }
      </ButtonContent>
    </StyledButton>
  );
}

Button.propTypes = PropTypes.shape({
  iconName: PropTypes.string.isRequired,
}).isRequired;

export default Button;
