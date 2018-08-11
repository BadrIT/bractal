
import React from 'react';
import { commitMutation } from 'react-relay';
import PropTypes from 'prop-types';
import assert from '~/modules/core/utils/jsHelpers/assert';

import withRelayEnvironment from '~/modules/core/utils/relayHelpers/withRelayEnvironment';

class Wrapper extends React.Component {
  componentDidMount = () => {
    assert(this.wrappedComponent.onMutationError, 'onMutationError Should Not Be Undefined');
    assert(this.wrappedComponent.onMutationSuccess, 'onMutationSuccess Should Not Be Undefined');
    assert(this.wrappedComponent.onMutationLoading, 'onMutationLoading Should Not Be Undefined');
  }
  onError = (error) => {
    this.wrappedComponent.onMutationError(error);
  }
  onSuccess = (response) => {
    this.wrappedComponent.onMutationSuccess(response);
  }
  onLoading = (loading) => {
    this.wrappedComponent.onMutationLoading(loading);
  }
  submit = (variables) => {
    const {
      environment,
      mutation,
      mutationRoot,
    } = this.props;

    this.onLoading(true);

    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: (response, errors) => {
        const serverErrors = {};
        const globalError = errors && errors.length > 0 && errors[0];

        if (globalError) {
          serverErrors.global = globalError.message;
        }

        if (response && response[mutationRoot] && response[mutationRoot].errors) {
          response[mutationRoot].errors.forEach((error) => {
            // TODO : Till the return from the backend isn't 'email' any more
            serverErrors[error.field] = `${error.messages[0]}`;
          });
        }

        this.onLoading(false);
        // form to render to show server errors (When no local errors are there)
        if (serverErrors && Object.keys(serverErrors).length > 0) {
          this.onError(serverErrors);
        } else {
          this.onSuccess(response);
        }
      },
      onError: (err) => {
        this.onLoading(false);
        this.onError(err.message || err.toString());
      },
    });
  }

  render = () => {
    const { WrappedComponent } = this.props;

    return (
      <WrappedComponent
        ref={(ref) => { this.wrappedComponent = ref; }}
        onMutationSubmit={this.submit}
        {...this.props}
      />
    );
  }
}

export default function withMutation(WrappedComponent, mutation, mutationRoot) {
  return withRelayEnvironment(props => (
    <Wrapper
      {...props}
      mutation={mutation}
      mutationRoot={mutationRoot}
      WrappedComponent={WrappedComponent}
    />
  ));
}

Wrapper.propTypes = {
  environment: PropTypes.shape({}).isRequired,
  mutation: PropTypes.func.isRequired,
  mutationRoot: PropTypes.string.isRequired,
  WrappedComponent: PropTypes.func.isRequired,
};
