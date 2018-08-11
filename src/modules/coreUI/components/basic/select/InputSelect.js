import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

import { CenterAlignedRow } from '~/modules/coreUI/components/layouts/helpers/Rows';
import { SmallSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';

import SelectButton from './CustomSelectButton';
import SelectList from './SelectList';

const RelativePosition = styled(CenterAlignedRow)`
  width: ${props => props.width || '100%'};

  position:relative;

  box-sizing: border-box;
`;

const Input = styled.input`
  width: ${props => props.width || '100%'};
  outline: none;

  padding-left: 15px;
  padding-right: 15px;
  padding-top: 12px;
  padding-bottom: 12px;

  color: ${props => props.theme.inputs.color};  

  border: 1px solid;
  border-color: rgba(0,0,0,0.22);
  border-radius: 25px;  
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;

  ::placeholder {
    color: ${props => props.theme.inputs.placeholderColor};
  }

  &:focus {
    border: solid ${props => props.theme.inputs.borderWidth}px ${props => props.theme.colors.primary};
  }
`;

class InputSelect extends Component {
  static getDerivedStateFromProps(newProps, prevState) {
    if (
      newProps.value !== prevState.prevOptionsValue
    ) {
      if (newProps.value) {
        const parsedParts = newProps.value.replace(/[ (]/g, '').split(')');
        return {
          prevOptionsValue: newProps.value,
          selectedValue: parsedParts && parsedParts.length > 0 && parsedParts[0],
          inputValue: (parsedParts && parsedParts.length > 1 && parsedParts[1]) || '',
        };
      }
      return {
        prevOptionsValue: newProps.value,
        selectedValue: null,
        inputValue: '',
      };
    }
    return null;
  }
  state = {
    selectedValue: null,
    inputValue: null,
    prevOptionsValue: null, // eslint-disable-line react/no-unused-state
    dropdownShown: false,
  }

  onListItemSelected = (item) => {
    if (item != null) { // It comes as null, when the list
      // want to abort the operation, without any change to the selected item
      this.notifyValueChange(item.value);
    }
    setTimeout( // Giving it a moment, so that focus is taken correctly on the button
      () => this.buttonRef.focus(),
      10,
    );
  }

  // It's important to use keyDown not keyUp, to catch some events like "Tab", before
  // It effect is done, since we're acting on those
  onKeyDown = (e) => {
    const controls = ['ArrowUp', 'ArrowDown', ' ', 'Enter'].includes(e.key);
    const chars = e.key.length === 1 && e.key.search(/[a-zA-Z]/) >= 0;
    if (controls) {
      this.showDropdown();
    } else if (chars) {
      this.showDropdown();
      const { key } = e; // after the timeout the value of
      // e.key, changes, that's why we're saving it
      setTimeout( // give it time to open before setting the filter
        () => this.listRef.setFilter(key),
        100,
      );
    }
  };
  onDropdownShown = () => {
    this.setState({
      dropdownShown: true,
    });
  }
  onDropdownHidden = () => {
    this.setState({
      dropdownShown: false,
    });
  }
  onInputChanged = () => {
    this.notifyValueChange(this.state.selectedValue);
  }
  getEntry = (value) => {
    if (!this.props.options) {
      return null;
    }

    const matches = this.props.options.filter(entry => entry.value === value);
    return (matches && matches.length > 0)
      ? matches[0]
      : null;
  }

  getSelectedItemImage = () => {
    const { selectedValue } = this.state;
    const { getSelectedItemImage } = this.props;
    const selectedEntry = this.getEntry(selectedValue);

    if (!selectedEntry) {
      return null;
    }

    if (getSelectedItemImage) {
      return getSelectedItemImage(selectedEntry);
    }

    return selectedEntry.image;
  }
  getSelectedItemLabel = () => {
    const { selectedValue } = this.state;
    const { getSelectedItemLabel } = this.props;
    const selectedEntry = this.getEntry(selectedValue);

    if (!selectedEntry) {
      return null;
    }

    if (getSelectedItemLabel) {
      return getSelectedItemLabel(selectedEntry);
    }

    return selectedEntry.image;
  }

  notifyValueChange = (selectedValue) => {
    if (this.props.onChange) {
      const inputText = this.props.showInput && this.inputRef.value;
      this.props.onChange(selectedValue, inputText);
    }
  }

  showDropdown = () => {
    this.listRef.show();
  }

  hideDropdown = () => {
    this.listRef.hide();
  }

  toggleDropdown = () => {
    this.listRef.toggle();
  }

  render() {
    const {
      width,
      options,
      showInput,
      placeholder,
      selectButtonRatio,
      theme,
    } = this.props;

    const {
      selectedValue,
      dropdownShown,
      inputValue,
    } = this.state;

    return (
      <React.Fragment>
        <RelativePosition width={width}>
          <SelectButton
            ref={(ref) => { this.buttonRef = ref; }}
            isLoading={this.props.isLoading}
            label={this.getSelectedItemLabel()}
            actAsInFocus={dropdownShown}
            placeholder={showInput ? 'Select' : placeholder}
            image={this.getSelectedItemImage()}
            width={showInput ? `${selectButtonRatio}%` : '100%'}
            rightBorderRadius={showInput ? '0px' : null}
            fontSize={showInput ? theme.fonts.sizes.xSmall : null}
            dropIconDistanceFromRight={showInput ? theme.paddings.medium : null}
            onMouseDown={this.toggleDropdown}
            onKeyDown={this.onKeyDown}
          />
          {showInput &&
            <React.Fragment>
              <SmallSpacer />
              <Input
                type="text"
                value={inputValue}
                placeholder={placeholder}
                innerRef={(ref) => { this.inputRef = ref; }}
                onChange={() => this.onInputChanged()}
                width={`${100 - selectButtonRatio}%`}
              />
            </React.Fragment>
          }
          <SelectList
            ref={(ref) => { this.listRef = ref; }}
            options={options}
            selectedValue={selectedValue}
            onItemSelected={this.onListItemSelected}
            onDropdownShown={this.onDropdownShown}
            onDropdownHidden={this.onDropdownHidden}
          />
        </RelativePosition>
      </React.Fragment>
    );
  }
}

InputSelect.defaultProps = {
  isLoading: false,
  showImageOnButton: true,
  placeholder: 'Select',
  selectButtonRatio: 30,
};

InputSelect.propTypes = PropTypes.shape({
  width: PropTypes.string,
  isLoading: PropTypes.bool,
  showInput: PropTypes.bool.isRequired,
  showImageOnButton: PropTypes.bool,
  getSelectedItemLabel: PropTypes.fun,
  getSelectedItemImage: PropTypes.fun,
  selectButtonRatio: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
}).isRequired;

export default withTheme(InputSelect);
