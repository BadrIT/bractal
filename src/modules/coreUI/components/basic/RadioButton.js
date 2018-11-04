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

const RealHiddenRadio = styled.input`
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

// helper function to copy static method from component to another comopnent
// withMedia HOC used bellow don't copy static method
// this function do so
// a better solution will be to use this https://github.com/mridgway/hoist-non-react-statics
// but for this simple case i will use this function
function setStaticMethodToComponent(targetComponent, sourceComponent) {
  /* eslint-disable no-param-reassign */
  // note this function is not pure function
  // it contain a side effect targetComponent reference will change its property
  return Object
    .entries(sourceComponent)
    .reduce((newTargetComponent, [key, value]) => {
      if (!newTargetComponent[key]) {
        newTargetComponent[key] = value;
      }
      return newTargetComponent;
    }, targetComponent);
}

const isFunction = f => typeof f === 'function';

const RadioButtonContext = React.createContext({});

// i hate classes :)
function RadioButton(props) {
  const { value, disabled } = props;
  return (
    <RadioButtonContext.Consumer>
      {({ value: selectedValue, setValue }) => {
        const checked = value === selectedValue;
        return (
          <RootContainer
            centerAligned
            onClick={() => !disabled && setValue(value)}
          >
            {/* i think onChange will never be called but i see it on orignal example */}
            <RealHiddenRadio
              type="radio"
              id={props.elemID}
              {...props}
              inverted={props.inverted || !checked}
              checked={checked}
              onChange={() => setValue(value)}
            />
            <Row
              fullWidth
              fullHeight
              centerAligned
              centerJustified
              type="radio"
              {...props}
            >
              {checked &&
                <Icon inheritColor inheritSize className="fas fa-circle" />
              }
            </Row>
            {props.label &&
              <React.Fragment>
                <Spacer />
                <Label
                  size={props.size}
                  bold={props.bold}
                  {...propsForPrefix(props, 'label_')}
                >
                  {props.label}
                </Label>
              </React.Fragment>
            }
          </RootContainer>
        );
      }}
    </RadioButtonContext.Consumer>
  );
}

// i hate classes :(
// i'm exciting about new react hooks ^_^
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
  getState() {
    return {
      value: (this.isControlled() ? this.props : this.state).value,
    };
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
      ...this.getState(),
      setValue: this.setValue,
    };
  }
  // to know if component is controlled by using value props
  // like react input controlled component
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

export default setStaticMethodToComponent(withMedia(RadioButton), RadioButton);
