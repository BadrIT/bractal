/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '~/modules/coreUI/components/basic/Icon';
import CheckInput from './CheckInput';

const isFunction = f => typeof f === 'function';

const RadioButtonContext = React.createContext({});

function RadioButton(props) {
  const { value, disabled } = props;
  return (
    <RadioButtonContext.Consumer>
      {({ value: selectedValue, setValue }) => {
        const checked = value === selectedValue;
        return (
          <CheckInput
            {...props}
            type="radio"
            checked={checked}
            onClick={() => !disabled && setValue(value)}
            onChange={() => setValue(value)}
            renderIcon={() => <Icon className="fas fa-circle" />}
          />
        );
      }}
    </RadioButtonContext.Consumer>
  );
}

RadioButton.Group = class Group extends React.Component {
  static defaultProps = {
    defaultValue: '',
    onChange: () => {},
  }
  state = {
    value: this.props.defaultValue,
  }
  // if this component is controlled then we need to use value from props
  // insted of our Component state
  getValue() {
    return (this.isControlled() ? this.props : this.state).value;
  }
  setValue = (value) => {
    if (this.isControlled()) {
      this.props.onChange(value);
    } else {
      this.setState(
        { value },
        () => this.props.onChange(value),
      );
    }
  }
  getHelpers() {
    return {
      value: this.getValue(),
      setValue: this.setValue,
    };
  }
  // to know if component is controlled by using value props
  isControlled() {
    return this.props.value !== undefined;
  }
  render() {
    const { children } = this.props;
    return (
      <RadioButtonContext.Provider value={this.getHelpers()}>
        {isFunction(children) ? children(this.getHelpers()) : children}
      </RadioButtonContext.Provider>
    );
  }
};

RadioButton.propTypes = PropTypes.shape({
  elemID: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
}).isRequired;

RadioButton.Group.propTypes = PropTypes.shape({
  defaultValue: PropTypes.any,
}).isRequired;

export default RadioButton;
