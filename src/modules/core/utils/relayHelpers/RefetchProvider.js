import React from 'react';
import PropTypes from 'prop-types';
import RefetchContext from './RefetchContext';

const RefetchProvider = props => (
  <RefetchContext.Provider value={{
    refetchData: props.refetchData,
    refetchMethod: props.refetchMethod,
    refetchVariables: props.refetchVariables,
    refetchSubscribeToPreflight: props.refetchSubscribeToPreflight,
    isLoading: props.isLoading,
  }}
  >
    {props.children}
  </RefetchContext.Provider>
);

RefetchProvider.propTypes = {
  refetchData: PropTypes.shape({}).isRequired,
  children: PropTypes.element.isRequired,
  refetchMethod: PropTypes.func.isRequired,
  refetchVariables: PropTypes.func.isRequired,
  refetchSubscribeToPreflight: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default RefetchProvider;
