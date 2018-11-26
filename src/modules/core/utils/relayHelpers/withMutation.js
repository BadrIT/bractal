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
  };

  onError = (errors, rawErrors) => {
    if (this.wrappedComponent) {
      this.wrappedComponent.onMutationError(errors, rawErrors);
    }
  };

  onSuccess = (response) => {
    if (this.wrappedComponent) {
      this.wrappedComponent.onMutationSuccess(response);
    }
  };

  onLoading = (loading) => {
    if (this.wrappedComponent) {
      this.wrappedComponent.onMutationLoading(loading);
    }
  };

  submit = (variables, successCallback = null) => {
    const { environment, mutation, mutationRoot } = this.props;

    this.onLoading(true);

    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: (response, errors) => {
        let rawErrors;
        const serverErrors = {};
        const globalError = errors && errors.length > 0 && errors[0];

        if (globalError) {
          serverErrors.global = globalError.message;
        }

        const errorsExist = response
          && response[mutationRoot]
          && response[mutationRoot].errors
          && response[mutationRoot].errors.length;

        if (errorsExist) {
          rawErrors = response[mutationRoot].errors;
          rawErrors.forEach((error) => {
            // TODO : Till the return from the backend isn't 'email' any more
            serverErrors[error.field] = `${error.messages[0]}`;
          });
          serverErrors.rawErrors = rawErrors;
        }

        this.onLoading(false);
        // form to render to show server errors (When no local errors are there)
        if (serverErrors && Object.keys(serverErrors).length > 0) {
          this.onError(serverErrors, rawErrors);
        } else if (successCallback) {
          successCallback(response);
        } else {
          this.onSuccess(response);
        }
      },
      onError: (err) => {
        this.onLoading(false);
        this.onError(err.message || err.toString());
      },
    });
  };

  render = () => {
    const { WrappedComponent } = this.props;

    return (
      <WrappedComponent
        ref={(ref) => {
          this.wrappedComponent = ref;
        }}
        onMutationSubmit={this.submit}
        submitMutation={this.submit}
        {...this.props}
      />
    );
  };
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
  mutationRoot: PropTypes.string,
  WrappedComponent: PropTypes.func.isRequired,
};
Wrapper.defaultProps = {
  mutationRoot: null,
};
