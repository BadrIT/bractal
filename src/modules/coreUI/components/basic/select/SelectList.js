// eslint-disable-next-line
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import FilteredItemsList from './FilteredItemsList';

const Dropdown = styled.div`
  width: 100%;
  height: 200px;
  visibility: visible;
  transform: scaleY(1);
  z-index: 10;  

  left: 0%;

  position: absolute;
  margin-top: 31px; 
  
  background-color: ${props => props.theme.colors.named.white};
  border: solid ${props => props.theme.inputs.borderWidth}px ${props => props.theme.inputs.borderColor};

  box-shadow: 0px 2px 6px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
`;
const List = styled.ul`
  width: 100%;
  height: 150px;  
  z-index: 10;
  transform-origin: top;

  overflow-y: auto;
  overflow-x: hidden;

  position: absolute;

  padding: 0;
  margin-top: 0px; 
  
  list-style: none;
`;

const Input = styled.input`
  border-radius: 0px;
  margin: 7px;
  width: 93%;
  padding: 7px;
  border-bottom: 1px solid ${props => props.theme.borders.color.light};
  border-top: none;
  border-right: none;
  border-left: none;
  outline: none;

  ::placeholder {
    color: ${props => props.theme.inputs.placeholderColor};
  }
`;
const Arrow = styled.div`
  content: "";
  height: 11px;
  width: 11px;
  background: white;
  position: absolute;
  top: 48px;
  left: 50px;
  transform: rotate(134deg);
  border-left:  solid ${props => props.theme.inputs.borderWidth}px ${props => props.theme.inputs.borderColor};
  border-bottom: solid ${props => props.theme.inputs.borderWidth}px ${props => props.theme.inputs.borderColor};
  z-index: 1000;
`;

const ListContainer = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
`;

export default class SelectList extends Component {
  state = {
    filter: null,
    visible: false,
  };

  onBlur = () => {
    setTimeout(() => this.hide(), 300);
  }
  onKeyDown = (event) => {
    if (event.key === 'Tab' || event.key === 'Escape') {
      this.props.onItemSelected(null);
      event.stopPropagation();
    } else if (event.key === 'ArrowDown') {
      this.filteredListRef.moveFocusDown();
      event.stopPropagation();
    } else if (event.key === 'ArrowUp') {
      this.filteredListRef.moveFocusUp();
      event.stopPropagation();
    } else if (event.key === 'Enter') {
      this.filteredListRef.enterPressed();
      event.stopPropagation();
    }
  }
  onFilterInputTextChange = (event) => {
    this.setFilter(event.target.value);
  }
  setFilter = (value) => {
    this.setState({
      filter: value,
    });
    setTimeout(
      // Give it sometime to handle the event (In case the user was deleting this helps)
      () => this.filteredListRef.moveFocusTop(),
      10,
    );
  }
  isShowHideAllowable = () => {
    const currTime = (new Date()).getTime();
    const HAND_OFF_PERIOD = 200;
    let allowed = false;
    if (!this.lastShowHideEventTimestamp) {
      this.lastShowHideEventTimestamp = 0;
    }
    if (currTime - this.lastShowHideEventTimestamp > HAND_OFF_PERIOD) {
      allowed = true;
    }
    // Store timestamp of the show/Hide, to implement
    // handoff checks to handle various corner cases
    // And not handled as state, to have immediate effect
    this.lastShowHideEventTimestamp = currTime;

    return allowed;
  }
  show = () => {
    if (!this.isShowHideAllowable()) {
      return;
    }
    this.setState({
      visible: true,
    });
    setTimeout(
      () => {
        this.inputRef.focus();
        this.filteredListRef.scrollToFocusValue();
      },
      10,
    );
    if (this.props.onDropdownShown) {
      this.props.onDropdownShown();
    }
  }
  hide = () => {
    if (!this.isShowHideAllowable()) {
      return;
    }
    this.setState({
      visible: false,
    });

    if (this.props.onDropdownHidden) {
      this.props.onDropdownHidden();
    }
  }
  toggle = () => {
    if (this.state.visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  listEntryClicked = (entry) => {
    if (this.props.onItemSelected) {
      this.props.onItemSelected(entry);
      this.hide(true);
      this.setState({
        filter: '',
      });
    }
  }

  render() {
    const { options, selectedValue } = this.props;
    const { filter, visible } = this.state;

    return (
      <ListContainer visible={visible}>
        <Arrow />
        <Dropdown>
          <Input
            value={this.state.filter || ''}
            placeholder="Search..."
            innerRef={(ref) => { this.inputRef = ref; }}
            onBlur={this.onBlur}
            type="text"
            onChange={this.onFilterInputTextChange}
            onKeyDown={this.onKeyDown}
          />
          <List>
            <FilteredItemsList
              ref={(ref) => { this.filteredListRef = ref; }}
              selectedValue={selectedValue}
              options={options}
              filter={filter}
              listEntryClicked={this.listEntryClicked}
            />
          </List>
        </Dropdown>
      </ListContainer>
    );
  }
}

SelectList.defaultProps = {
  onDropdownShown: null,
  onDropdownHidden: null,
  selectedValue: null,
};

SelectList.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    image: PropTypes.element,
    value: PropTypes.string,
    attrs: PropTypes.shape({}),
  })).isRequired,
  selectedValue: PropTypes.string,
  onItemSelected: PropTypes.func.isRequired,
  onDropdownShown: PropTypes.func,
  onDropdownHidden: PropTypes.func,
};
