import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { infereControlMode, darken } from '~/modules/coreUI/utils/infereStyle';

import Button from './Button';

const modesColors = {
  normal: {
    lineColor: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: '#e5e5e5',
    borderColor: '#e5e5e5',
  },
  inverted: {
    lineColor: '#bbbbbb',
    backgroundColor: 'white',
    borderColor: '#bbbbbb',
  },
};

const lineColor = props =>
  modesColors[infereControlMode(props)].lineColor;

const backgroundColor = props =>
  modesColors[infereControlMode(props)].backgroundColor;

const borderColor = props =>
  modesColors[infereControlMode(props)].borderColor;

const colors = (props, darkRatio) => css`
  color: ${darken(lineColor(props), darkRatio)};
  background-color: ${darken(backgroundColor(props), darkRatio)};
  border-color: ${darken(borderColor(props), darkRatio)};
`;

const deSelectedColorStyles = css`
  ${props => colors(props, 0)}

  &:hover { ${props => colors(props, 0.05)} }  
  &:active { ${props => colors(props, 0.1)} }
  &:focus {
    border-color: ${props => darken(borderColor(props), 0.2)};
  }
`;

const disabledColorStyles = css`
  ${props => colors(props, 0)}  
  
  &:hover { ${props => colors(props, 0)} }  
  &:active { ${props => colors(props, 0)} }
  &:focus { ${props => colors(props, 0)} }

  opacity: 0.3;
`;

const StyledButton = styled(Button)`
  ${props => !props.selected && deSelectedColorStyles};
  ${props => props.disabled && disabledColorStyles}
`;

class ToggleButton extends React.Component {
  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.selected !== prevState.previouseSelectedPropReceived) {
      return {
        previouseSelectedPropReceived: newProps.selected,
        selected: newProps.selected,
      };
    }

    return null;
  }

  state = {
    previouseSelectedPropReceived: true, // eslint-disable-line react/no-unused-state
    selected: true,
  }

  render = () => (
    <StyledButton
      {...this.props}
      selected={this.state.selected}
      onClicked={() => {
        this.props.onClicked();
        this.setState({ selected: !this.state.selected });
      }}
    >
      {this.props.children}
    </StyledButton>
  )
}

ToggleButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClicked: PropTypes.func.isRequired,
};

export default ToggleButton;
