import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { applyPatchChain, applyPatch } from '~/modules/core/utils/jsHelpers/recursiveObjectPatch';
import objectsDeepNotEqualComparison from '~/modules/core/utils/jsHelpers/objectsDeepComparison';

import RefetchProvider from './RefetchProvider';
import RefetchDependencyResolver from './RefetchDependencyResolver';

const getVariables = props => (_.isFunction(props.variables)
  ? props.variables(props)
  : props.variables);

const refetchData = props => props.dataHooks
  && props.queryResult
  && _.mapValues(props.dataHooks, hookFunc => hookFunc(props.queryResult));

class RefetchContainer extends React.Component {
  static getDerivedStateFromProps(nextProps, currentState) {
    let newPropsReceived = objectsDeepNotEqualComparison(
      getVariables(nextProps),
      currentState.prevVariables,
    );

    newPropsReceived = newPropsReceived || nextProps.isLoading !== currentState.prevIsLoading;

    if (newPropsReceived) {
      return {
        prevIsLoading: nextProps.isLoading,
        isLoading: nextProps.isLoading,
        variables: getVariables(nextProps),
        prevVariables: getVariables(nextProps), // eslint-disable-line react/no-unused-state
      };
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.refetchDependencyResolver = new RefetchDependencyResolver(
      this.refetch,
      props.refetchDependencies,
    );
  }

  state = {
    isLoading: false,
    prevIsLoading: false, // eslint-disable-line react/no-unused-state
    variables: getVariables(this.props),
    prevVariables: getVariables(this.props), // eslint-disable-line react/no-unused-state
  };

  componentDidMount = () => {
    this.setState({
      variables: getVariables(this.props),
    });
  };

  applyDebouncedRefetch = () => {
    let refetchVariables = this.state.variables;
    if (this.props.onRefetch) {
      const updatedVariables = this.props.onRefetch(this.state.variables, this.props.externalProps);
      if (updatedVariables) {
        this.setState({
          variables: updatedVariables,
        });
        refetchVariables = updatedVariables;
      }
    }
    if (this.props.autoRefetch) {
      this.props.relay.refetch(refetchVariables, null, () => this.setState({ isLoading: false }));
    }
  };

  // eslint-disable-next-line react/sort-comp
  refetchDebounce = _.debounce(this.applyDebouncedRefetch, 500, { trailing: true });

  startRefetch = (variables) => {
    this.setState(
      {
        isLoading: true,
        variables,
      },
      () => this.refetchDebounce(),
    );
  };

  forceLoadingState = () => {
    this.setState({
      isLoading: true,
    });
  };

  refetch = (updatesObject, path) => {
    if (_.isArray(updatesObject)) {
      this.refetchChain(updatesObject);
      return;
    }
    const variables = applyPatch(path, this.state.variables, updatesObject);
    this.startRefetch(variables);
  };

  refetchChain = (updatesObject) => {
    const variables = applyPatchChain(updatesObject, this.state.variables);
    this.startRefetch(variables);
  };

  render = () => (
    <RefetchProvider
      refetchMethod={this.refetchDependencyResolver.refetch}
      refetchSubscribeToPreflight={this.refetchDependencyResolver.subscribe}
      refetchVariables={this.state.variables}
      refetchForceLoadingState={this.forceLoadingState}
      refetchData={refetchData(this.props)}
      isLoading={this.state.isLoading}
    >
      <this.props.WrappedComponent
        {...this.props}
        queryResult={this.props.queryResult}
        refetchMethod={this.refetchDependencyResolver.refetch}
        refetchSubscribeToPreflight={this.refetchDependencyResolver.subscribe}
        refetchVariables={this.state.variables}
        refetchForceLoadingState={this.forceLoadingState}
        refetchData={refetchData(this.props)}
        isLoading={this.state.isLoading}
      />
    </RefetchProvider>
  );
}

RefetchContainer.propTypes = {
  relay: PropTypes.shape({}).isRequired,
}.isRequired;

export default RefetchContainer;
