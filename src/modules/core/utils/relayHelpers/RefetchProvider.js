import React from 'react';
import PropTypes from 'prop-types';
import RefetchContext from './RefetchContext';

const RefetchProvider = props => (
  <RefetchContext.Provider
    value={{
      refetchData: props.refetchData,
      refetchMethod: props.refetchMethod,
      refetchForceLoadingState: props.refetchForceLoadingState,
      refetchVariables: props.refetchVariables,
      refetchSubscribeToPreflight: props.refetchSubscribeToPreflight,
      isLoading: props.isLoading,
    }}
  >
    {props.children}
  </RefetchContext.Provider>
);

RefetchProvider.propTypes = {
  refetchData: PropTypes.shape({}),
  children: PropTypes.element.isRequired,
  refetchMethod: PropTypes.func.isRequired,
  refetchForceLoadingState: PropTypes.func.isRequired,
  refetchVariables: PropTypes.objectOf(PropTypes.any),
  refetchSubscribeToPreflight: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

RefetchProvider.defaultProps = {
  refetchData: null,
  refetchVariables: null,
};
export default RefetchProvider;
