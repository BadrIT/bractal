import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'react-emotion';
import { css } from 'emotion';
import withMedia from '~/modules/core/utils/mediaHelpers/withMedia';

import { infereControlMode, darken, inferePaddingSize } from '~/modules/coreUI/utils/infereStyle';

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

const deSelectedColorStyles = props => css`
  ${colors(props, 0)}

  &:hover { ${colors(props, 0.05)} }
  &:active { ${colors(props, 0.1)} }
  &:focus {
    border-color: ${darken(borderColor(props), 0.2)};
  }
`;

const disabledColorStyles = props => css`
  ${colors(props, 0)}  
  
  &:hover { ${colors(props, 0)} }  
  &:active { ${colors(props, 0)} }
  &:focus { ${colors(props, 0)} }

  opacity: 0.4;
`;

const StyledButton = styled(Button)`
  /*${props => !props.selected && deSelectedColorStyles(props)};*/
  ${props => (props.disabled || props.disabledColors) && disabledColorStyles(props)}

  ${props => props.styles && props.styles(props)}

  ${props => props.media.xsmall && css`
    padding-top: ${0.5 * inferePaddingSize(props)}px;
    padding-bottom: ${0.5 * inferePaddingSize(props)}px;
  `}
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

  render = () => {
    let passedProps = this.props;
    if (passedProps.clickable && passedProps.disabled) {
      passedProps = _.omit(passedProps, 'disabled');
      passedProps.disabledColors = true;
    }

    const selected = this.props.forceSelected || this.state.selected;

    return (
      <StyledButton
        {...passedProps}
        selected={selected}
        passive={!selected}
        styles={this.props.styles}
        onClicked={(event) => {
          this.setState({ selected: !this.state.selected });
          if (this.props.onClicked) {
            this.props.onClicked(event);
          }
        }}
      >
        {this.props.label || this.props.children}
      </StyledButton>
    );
  };
}

ToggleButton.defaultProps = {
  styles: null,
  // forceSelected: false,portals => 2,
  forceSelected: false,
  label: null,
  onClicked: null,
  children: null,
};

ToggleButton.propTypes = {
  forceSelected: PropTypes.bool,
  onClicked: PropTypes.func,
  children: PropTypes.string,
  styles: PropTypes.shape({}),
  label: PropTypes.string,
};

export default withMedia(ToggleButton);
