import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { applyPatchChain, applyPatch } from '~/modules/core/utils/jsHelpers/recursiveObjectPatch';

import RefetchProvider from './RefetchProvider';
import RefetchDependencyResolver from './RefetchDependencyResolver';

const getVariables = props => (_.isFunction(props.variables)
  ? props.variables(props)
  : props.variables
);

const refetchData = props =>
  props.dataHooks
    && props.queryResult
    && _.mapValues(props.dataHooks, hookFunc => hookFunc(props.queryResult));

class RefetchContainer extends React.Component {
  static getDerivedStateFromProps(nextProps, currentState) {
    if (nextProps.isLoading !== currentState.prevIsLoading) {
      return {
        prevIsLoading: nextProps.isLoading,
        isLoading: nextProps.isLoading,
      };
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.refetchDependencyResolver =
      new RefetchDependencyResolver(this.refetch, props.refetchDependencies);
  }
  state = {
    isLoading: false,
    prevIsLoading: false, // eslint-disable-line react/no-unused-state
    variables: null,
  };

  componentDidMount = () => {
    this.setState({
      variables: getVariables(this.props),
    });
  };

  applyDebouncedRefetch = () => {
    if (this.props.onRefetch) {
      this.props.onRefetch(this.state.variables, this.props.externalProps);
    }
    if (this.props.autoRefetch) {
      this.props.relay.refetch(
        this.state.variables,
        null,
        () => { this.setState({ isLoading: false }); return true; },
      );
    }
  }

  refetchDebounce = _.debounce(this.applyDebouncedRefetch, 500, { trailing: true });

  startRefetch = (variables) => {
    this.setState({
      isLoading: true,
      variables,
    }, () => this.refetchDebounce());
  }

  refetch = (updatesObject, path) => {
    if (_.isArray(updatesObject)) {
      this.refetchChain(updatesObject);
      return;
    }
    const variables = applyPatch(path, this.state.variables, updatesObject);
    this.startRefetch(variables);
  }

  refetchChain = (updatesObject) => {
    const variables = applyPatchChain(updatesObject, this.state.variables);
    this.startRefetch(variables);
  }

  render = () => (
    <RefetchProvider
      refetchData={refetchData(this.props)}
      refetchMethod={this.refetchDependencyResolver.refetch}
      refetchSubscribeToPreflight={this.refetchDependencyResolver.subscribe}
      refetchVariables={this.state.variables}
      isLoading={this.state.isLoading}
    >
      <this.props.WrappedComponent
        {...this.props}
        queryResult={this.props.queryResult}
        refetchVariables={this.state.variables}
        refetchMethod={this.refetchDependencyResolver.refetch}
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
