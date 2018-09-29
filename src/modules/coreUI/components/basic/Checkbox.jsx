import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { Row } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import Spacer from '~/modules/coreUI/components/layouts/helpers/Spacer';
import { infereControlType, infereFontSize, infereBorderRadius, colorStyles, disabledColorStyles } from '~/modules/coreUI/utils/infereStyle';
import Icon from '~/modules/coreUI/components/basic/Icon';

import { SmallLabel } from './Labels';

const RootContainer = styled(Row)`
  cursor: pointer;
`;

const RealHiddenCheckbox = styled.input`
  opacity: 0;
  position: absolute;
  left: -999px;

  & + div {
    width: ${props => 1.3 * infereFontSize(props)}px;
    height: ${props => 1.3 * infereFontSize(props)}px;
    font-size: ${props => 0.7 * infereFontSize(props)}px;

    border: 1px solid;
    border-radius: ${props => infereBorderRadius(props)}px; 
    
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
        checked={this.state.checked}
        onChange={this.handleInputChange}
      />
      <Row
        type="checkbox"
        {...this.props}
      >
        {this.state.checked &&
          <Icon className="fas fa-check" />
        }
      </Row>
      {this.props.label &&
        <React.Fragment>
          <Spacer />
          <SmallLabel bold={this.props.bold} customStyle={this.props.customStyle}>
            {this.props.label}
          </SmallLabel>
        </React.Fragment>
      }
    </RootContainer>
  );
}

Checkbox.propTypes = PropTypes.shape({
  elemID: PropTypes.string.isRequired,
}).isRequired;

export default Checkbox;
