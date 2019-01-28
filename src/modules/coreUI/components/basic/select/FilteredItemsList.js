import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { XSmallLabel } from '~/modules/coreUI/components/basic/Labels';

import { isOnInternetExplorerEdge } from '~/modules/core/utils/jsHelpers/userAgentDetector';

const ItemName = styled(XSmallLabel)`
  text-align:left;
  flex-grow: 1;
  padding-left: ${props => props.theme.paddings.medium}px;
`;

const Option = styled.li`  
  background: ${props => (props.isFocusOption ? props.theme.colors.cellHoverColorAlt : props.theme.colors.named.white)};
  padding: 5px 15px 5px 15px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background 0.2s ease;
  position: relative;
  font-size: 13px;
  border-bottom: 1px solid #f5f5f5;
  min-height: 40px;
  display:flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.colors.labels.normal};

  &&:hover{
    background: ${props => props.theme.colors.cellHoverColor};
    transition: background 0.2s ease;
  }

  img{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    top: 0px;
  }
`;

export default class FilteredItemsList extends React.Component {
  static getDerivedStateFromProps(newProps, prevState) {
    let newStateChanges = {};

    if (
      newProps.selectedValue !== prevState.currentFocusValue &&
      newProps.selectedValue !== prevState.prevSelectedValueProp
    ) {
      newStateChanges = {
        ...newStateChanges,
        prevSelectedValueProp: newProps.selectedValue,
        currentFocusValue: newProps.selectedValue,
      };
    }

    if (newProps.options !== prevState.lastConfiguredOptions
        || newProps.filter !== prevState.lastConfiguredFilter
    ) {
      newStateChanges = {
        ...newStateChanges,
        ...FilteredItemsList.getNewFilteredListState(
          newProps.options,
          newProps.filter,
          newProps.currentFocusValue,
        ),
      };
    }

    return newStateChanges;
  }

  static getElementsArroundEntry = (list, focus) => {
    const result = {
      current: null,
      previous: null,
      next: null,
    };

    let prev = null;
    for (let i = 0; i < list.length; i += 1) {
      if (focus === list[i].value) {
        result.previous = prev;
        result.current = list[i];
      } else if (prev && focus === prev.value) {
        result.next = list[i];
        break;
      }
      prev = list[i];
    }

    return result;
  }

  static getNewFilteredListState = (options, filter, currentFocusValue) => {
    const newFilteredList = options.filter(entry =>
      !filter || entry.label.toLowerCase().indexOf(filter.toLowerCase()) === 0);

    const { current } =
      FilteredItemsList.getElementsArroundEntry(newFilteredList, currentFocusValue);

    // check if the current focus, is still shown, and filter not changed
    const newFocus =
    (
      current
      && current.value
    ) || (
        newFilteredList[0]
        && newFilteredList[0].value
      );

    return {
      filteredList: newFilteredList,
      lastConfiguredFilter: filter,
      lastConfiguredOptions: options,
      currentFocusValue: newFocus,
    };
  }

  state = {
    prevSelectedValueProp: null, // eslint-disable-line react/no-unused-state
    currentFocusValue: null,
    lastConfiguredOptions: null, // eslint-disable-line react/no-unused-state
    lastConfiguredFilter: null, // eslint-disable-line react/no-unused-state
    filteredList: [],
  }

  getOptionRefAt = entry => this[`option_${entry.value}_ref`];
  setOptionRefAt = (entry, ref) => {
    this[`option_${entry.value}_ref`] = ref;
  }

  getElementsArroundCurrentFocus = () => {
    const focus = this.state.currentFocusValue;
    const list = this.state.filteredList;

    return FilteredItemsList.getElementsArroundEntry(list, focus, this.state.currentFocusValue);
  }

  scrollToEntry = (entry) => {
    const optionRef = this.getOptionRefAt(entry);
    if (optionRef) {
      this.setState({
        currentFocusValue: entry.value,
      });

      // FIXME : Find an acceptable alternative on IE Edge
      if (!isOnInternetExplorerEdge()) {
        setTimeout(
          () => optionRef.scrollIntoViewIfNeeded(), // delay a little bit, since it's
          // an expensive operation and we want the previous state change to take full
          // effect first
          100,
        );
      }
    }
  }

  scrollToFocusValue = () => {
    const { current } = this.getElementsArroundCurrentFocus();
    if (current) {
      this.scrollToEntry(current);
    }
  }

  moveFocusTop = () => {
    const firstElem = this.state.filteredList && this.state.filteredList[0];
    if (firstElem) {
      this.scrollToEntry(firstElem);
    }
  }

  moveFocusUp = () => {
    const { previous } = this.getElementsArroundCurrentFocus();
    if (previous) {
      this.scrollToEntry(previous);
    }
  }

  moveFocusDown = () => {
    const { next } = this.getElementsArroundCurrentFocus();
    if (next) {
      this.scrollToEntry(next);
    }
  }

  listEntryClicked = (entry) => {
    this.props.listEntryClicked(entry);
    this.setState({
      currentFocusValue: entry.value,
    });
  }

  enterPressed = () => {
    const { current } = this.getElementsArroundCurrentFocus();
    if (current) {
      this.listEntryClicked(current);
    }
  }

  render = () => this.state.filteredList.map(entry => (
    <Option
      innerRef={ref => this.setOptionRefAt(entry, ref)}
      id={entry.value}
      value={entry.value}
      isFocusOption={entry.value === this.state.currentFocusValue}
      key={entry.label}
      className="item"
      onMouseDown={() => {
        this.listEntryClicked(entry);
      }}
    >
      {entry.image &&
        <div className="imgCountry">
          {entry.image}
        </div>
      }

      <ItemName className="ItemName">{entry.label}</ItemName>
      {entry.rightPulledLabel &&
        entry.rightPulledLabel
      }
    </Option>
  ));
}

FilteredItemsList.defaultProps = {
  filter: null,
};

FilteredItemsList.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    image: PropTypes.element,
    value: PropTypes.string,
    attrs: PropTypes.shape({}),
  })).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  filter: PropTypes.string,
  listEntryClicked: PropTypes.func.isRequired,
};
