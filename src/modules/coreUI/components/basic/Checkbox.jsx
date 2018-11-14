/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '~/modules/coreUI/components/basic/Icon';
import CheckInput from './CheckInput';

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
    <CheckInput
      {...this.props}
      type="checkbox"
      checked={this.state.checked}
      onClick={() => this.onClick()}
      onChange={this.handleInputChange}
      renderIcon={() => <Icon className="fas fa-check" />}
    />
  );
}

Checkbox.propTypes = PropTypes.shape({
  elemID: PropTypes.string.isRequired,
}).isRequired;

export default Checkbox;
