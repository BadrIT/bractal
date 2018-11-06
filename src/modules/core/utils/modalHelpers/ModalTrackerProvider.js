/* eslint-disable react/sort-comp */
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { closeCurrentModal } from '~/modules/core/utils/modalHelpers';

import ModalTrackerContext from './ModalTrackerContext';

class ModalTrackerProvider extends React.Component {
  state = {
    isModalOpen: false,
  };

  closeCurrentModal = () => {
    closeCurrentModal(
      this.props.location,
      this.props.history,
    );

    this.setState({
      isModalOpen: false,
    });
  }

  onModalOpened = () => {
    if (!this.state.isModalOpen) {
      this.setState({
        isModalOpen: true,
      });
    }
  }

  render = () => (
    <ModalTrackerContext.Provider value={{
        isModalOpen: this.state.isModalOpen,
        closeCurrentModal: this.closeCurrentModal,
        onModalOpened: this.onModalOpened,
      }}
    >
      {this.props.children}
    </ModalTrackerContext.Provider>
  )
}

ModalTrackerProvider.propTypes = PropTypes.shape({
  children: PropTypes.shape({}),
}).isRequired;

export default withRouter(ModalTrackerProvider);
