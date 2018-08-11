/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

class DropdownContentTracker extends React.Component {
  state = {
    dropdownContentVisible: false,
  };

  toggleVisible = () => {
    this.setState({ dropdownContentVisible: !this.state.dropdownContentVisible });
  };

  render = () => {
    const { itemRenderer, dropdownContent } = this.props;
    const { dropdownContentVisible } = this.state;

    return (
      <div>
        <div onClick={() => this.toggleVisible()} >
          { itemRenderer }
        </div>
        {
          dropdownContentVisible ? dropdownContent : null
        }
      </div>
    );
  }
}

DropdownContentTracker.propTypes = PropTypes.shape({
  itemRenderer: PropTypes.element.isRequired,
  dropdownContent: PropTypes.element.isRequired,
}).isRequired;

export default DropdownContentTracker;
