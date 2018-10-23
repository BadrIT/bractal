/* eslint-disable indent */
import React from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import withMedia from '~/modules/core/utils/mediaHelpers/withMedia';
import { Row } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import Spacer from '~/modules/coreUI/components/layouts/helpers/Spacer';
import { propsForPrefix, infereControlType, infereNamedFontSize, responsiveStyle, infereBorderRadius, colorStyles, disabledColorStyles } from '~/modules/coreUI/utils/infereStyle';
import Icon from '~/modules/coreUI/components/basic/Icon';
import spaceStyles from '~/modules/coreUI/utils/styleSystem';

import { Label } from './Labels';

const RootContainer = styled(Row)`
  cursor: pointer;
`;

const RealHiddenCheckbox = styled.input`
  opacity: 0;
  position: absolute;
  left: -999px;

  & + div {
    ${props => responsiveStyle(props, 'size', size => css`
      /* Workaround for Flexbox & Grid inconsistencies when using only width/height */
      min-width: ${1.3 * infereNamedFontSize(props, size)}px;
      max-width: ${1.3 * infereNamedFontSize(props, size)}px;
      min-height: ${1.3 * infereNamedFontSize(props, size)}px;
      max-height: ${1.3 * infereNamedFontSize(props, size)}px;
      font-size: ${0.7 * infereNamedFontSize(props, size)}px;
    `)};

    border: 1px solid;
    border-radius: ${props => infereBorderRadius(props)}px; 
    
    ${props => spaceStyles(props)}
    ${props => (props.disabled ? disabledColorStyles(props) : colorStyles(props))}
  }

  &:focus + div {
    border-color: ${props => props.theme.new.inputs.focusBorderColor[infereControlType(props)]};
  }
`;

class Checkbox extends React.Component {
  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.checked !== prevState.previouslyRecievedChecked) {
      return {
        previouslyRecievedChecked: newProps.checked,
        checked: newProps.checked,
      };
    }

    return null;
  }

  state = {
    previouslyRecievedChecked: true, // eslint-disable-line react/no-unused-state
    checked: true,
  }

  onClick = () => {
    if (this.props.disabled) {
      return;
    }
    this.setState({ checked: !this.state.checked });
  }

  isChecked = () => this.state.checked;

  handleInputChange = (event) => {
    if (this.props.onChange) {
      this.props.onChange(event);
    }

    this.setState({
      checked: event.target.checked,
    });
  }

  render = () => (
    <RootContainer
      centerAligned
      onClick={() => this.onClick()}
    >
      <RealHiddenCheckbox
        type="checkbox"
        id={this.props.elemID}
        {...this.props}
        inverted={this.props.inverted || !this.state.checked}
        checked={this.state.checked}
        onChange={this.handleInputChange}
      />
      <Row
        fullWidth
        fullHeight
        centerAligned
        centerJustified
        type="checkbox"
        {...this.props}
      >
        {this.state.checked &&
          <Icon inheritColor inheritSize className="fas fa-check" />
        }
      </Row>
      {this.props.label &&
        <React.Fragment>
          <Spacer />
          <Label
            size={this.props.size}
            bold={this.props.bold}
            {...propsForPrefix(this.props, 'label_')}
          >
            {this.props.label}
          </Label>
        </React.Fragment>
      }
    </RootContainer>
  );
}

Checkbox.propTypes = PropTypes.shape({
  elemID: PropTypes.string.isRequired,
}).isRequired;

export default withMedia(Checkbox);
