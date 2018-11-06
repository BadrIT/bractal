import React from 'react';
import SideMenuTrackerContext from './SideMenuTrackerContext';

export default function withSideMenuTracker(WrappedComponent) {
  return function render(props) {
    return (
      <SideMenuTrackerContext.Consumer>
        {({ toggleSideMenuVisibility, isSideMenuOpen }) => (
          <WrappedComponent
            toggleSideMenuVisibility={toggleSideMenuVisibility}
            isSideMenuOpen={isSideMenuOpen}
            {...props}
          />
        )}
      </SideMenuTrackerContext.Consumer>
    );
  };
}
