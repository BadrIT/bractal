/* eslint react/require-default-props: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { LinearLayout } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';

const handleDefault = (input, default_) => input || default_;

const Wraper = styled(LinearLayout)`
  position: relative;

  padding-left: ${props => (props.inputHorizontalPadding || props.theme.inputs.padding.left)}px;
  padding-right: ${props => (props.inputHorizontalPadding || props.theme.inputs.padding.right)}px;
  padding-top: ${props => (props.inputHorizontalPadding || props.theme.inputs.padding.top)}px;
  padding-bottom: ${props => (props.inputHorizontalPadding || props.theme.inputs.padding.bottom)}px;

  border-width: ${props => (props.borderWidth || props.theme.inputs.borderWidth)}px;
  border-style: ${props => props.borderStyle};
  border-radius: ${props => (props.borderRadius || props.theme.inputs.radius)}px;
  border-color: ${props => (props.focused ? handleDefault(props.borderColorActive, props.theme.inputs.borderColorActive) : props.theme.inputs.borderColor)};
  
  box-sizing: border - box;
  box-shadow: ${props => (props.focused && props.borderGlow ? `0 0 8px 0 ${props.borderColorAcitve || props.theme.inputs.borderColorActive}` : 'none')}; 
  
  transition: .1s;
`;

const Input = styled.input`
  width: 100%; /* TO BE COMPATIBLE WITH ANY CONTAINER */

  order: ${props => (props.iconPosition === 'right' ? '1' : '2')};

  border: 0;
  border-radius: ${props => (props.borderRadius || props.theme.inputs.radius)}px;
  outline: none;

  color: ${props => (props.inputColor || props.theme.inputs.color)}; 
  font-size: ${props => (props.inputFontSize || props.theme.inputs.fontSize)}px;
  ::placeholder {
    color: ${props => (props.placeholderColor || props.theme.inputs.placeholderColor)};
    font-size: ${props => (props.placeholderSize || props.theme.inputs.fontSize)}px;
    opacity: 1; /* Firefox */
  }

  &:-webkit-autofill {
    box-shadow: 0 0 0 60px white inset;
  }
`;

const Icon = styled.i`
  order: ${props => (props.iconPosition === 'right' ? '2' : '1')};

  cursor: pointer;
  color: ${props => (props.toggled ? (handleDefault(props.iconColorActive, props.theme.inputs.borderColorActive)) : props.theme.inputs.placeholderColor)};
  
  transition: .1s;
`;

class TextBox extends Component {
  state = {
    focused: false,
    type: this.props.password ? 'password' : 'text',
    toggled: false,
  }
  handleFocus() {
    this.setState({
      focused: true,
    });
  }
  handleBlur() {
    this.setState({
      focused: false,
    });
  }
  toggleType() {
    if (this.props.password) {
      this.setState({
        type: this.state.type === 'text' ? 'password' : 'text',
        toggled: !this.state.toggled,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <ReactTooltip />

        <Wraper
          fullWidth
          row
          centerAligned
          topJustified
          focused={this.state.focused}
          {...this.props}
        >
          <Input
            {...this.props}
            type={this.state.type}
            onFocus={() => this.handleFocus()}
            onBlur={() => this.handleBlur()}
            onInput={e => this.props.onChange(e)}
          />
          {this.props.icon &&
            <Icon
              {...this.props}
              className={this.props.icon}
              aria-hidden="true"
              toggled={this.state.toggled}
              data-tip={this.props.tooltipContent}
              data-type={this.props.tooltipType}
              data-effect={this.props.tooltipEffect}
              data-place={this.props.tooltipLocation}
              data-disable={!this.props.tooltipContent}
              onClick={() => this.toggleType()}
            />
          }

        </Wraper>
      </React.Fragment>
    );
  }
}

TextBox.propTypes = {
  tooltipContent: PropTypes.string,
  tooltipType: PropTypes.oneOf(['success', 'warning', 'error', 'info', 'light']),
  tooltipEffect: PropTypes.oneOf(['float', 'solid']),
  tooltipLocation: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  borderWidth: PropTypes.number,
  borderStyle: PropTypes.string,
  borderColorActive: PropTypes.string,
  borderRadius: PropTypes.number,
  borderGlow: PropTypes.bool,

  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  iconPadding: PropTypes.number,
  iconColorActive: PropTypes.string,

  inputHorizontalPadding: PropTypes.number,
  inputVerticalPadding: PropTypes.number,
  inputColor: PropTypes.number,
  inputFontSize: PropTypes.number,

  placeholder: PropTypes.string,
  placeholderColor: PropTypes.string,
  placeholderSize: PropTypes.number,

  onChange: PropTypes.func.isRequired,

  password: PropTypes.bool,
};

TextBox.defaultProps = {
  tooltipContent: '',
  tooltipType: 'info',
  tooltipEffect: 'float',
  tooltipLocation: 'top',

  borderStyle: 'solid',
  borderGlow: false,

  icon: '',
  iconPosition: 'left',

  password: false,
};

export default TextBox;
