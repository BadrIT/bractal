import React from 'react';
import ModalTrackerContext from './ModalTrackerContext';

export default function withUserInfo(WrappedComponent) {
  return function render(props) {
    return (
      <ModalTrackerContext.Consumer>
        {({ isModalOpen, closeCurrentModal, onModalOpened }) => (
          <WrappedComponent
            closeCurrentModal={closeCurrentModal}
            onModalOpened={onModalOpened}
            isModalOpen={isModalOpen}
            {...props}
          />
        )}
      </ModalTrackerContext.Consumer>
    );
  };
}
