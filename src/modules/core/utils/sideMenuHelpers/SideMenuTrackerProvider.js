/* eslint-disable react/sort-comp */
import React from 'react';
import PropTypes from 'prop-types';

import SideMenuTrackerContext from './SideMenuTrackerContext';

class SideMenuTrackerProvider extends React.Component {
  state = {
    isSideMenuOpen: false,
  };

  toggleSideMenuVisibility = () => {
    this.setState({
      isSideMenuOpen: !this.state.isSideMenuOpen,
    });
  }

  render = () => (
    <SideMenuTrackerContext.Provider value={{
        toggleSideMenuVisibility: this.toggleSideMenuVisibility,
        isSideMenuOpen: this.state.isSideMenuOpen,
      }}
    >
      {this.props.children}
    </SideMenuTrackerContext.Provider>
  )
}

SideMenuTrackerProvider.propTypes = PropTypes.shape({
  children: PropTypes.shape({}),
}).isRequired;

export default SideMenuTrackerProvider;
