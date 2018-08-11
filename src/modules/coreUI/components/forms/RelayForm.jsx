import React, { Component } from 'react';
import { commitMutation } from 'react-relay';

import t from 'tcomb-form';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import cuid from 'cuid';

import assert from '~/modules/core/utils/jsHelpers/assert';
import objectsDeepNotEqualComparison from '~/modules/core/utils/jsHelpers/objectsDeepComparison';

import {
  getTcombOptionsFromRawOptions,
  getTcombTypesFromRawOptions,
} from '~/modules/coreUI/components/forms/TcombHelpers';

import withRelayEnvironment from '~/modules/core/utils/relayHelpers/withRelayEnvironment';

const { Form } = { Form: t.form.Form };

class SeededTcombForm extends Form {
  // Without this, all forms' input fields will have
  // similar generated ids, and browswer will complaint
  getSeed = () => cuid();
}

const FullWidthForm = styled.form`
  width: 100%;
`;
class RelayForm extends Component {
  static getDerivedStateFromProps(nextProps, currentState) {
    const cond = objectsDeepNotEqualComparison(currentState.prevOptions, nextProps.options);

    if (cond) {
      return {
        prevOptions: nextProps.options,
        tcombOptions: getTcombOptionsFromRawOptions(nextProps.options),
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      isLoading: false,
      tcombOptions: {},
    };
  }

  componentDidMount = () => {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  };

  onChange = (value, path) => {
    // reset this field's error state
    if (this.Form) {
      this.resetTcompOptionsErrors(path[0]);
      this.Form.getComponent(path).validate();
    }
    this.setState({ value });
  };

  onLoading = (isLoading) => {
    this.setState({ isLoading });
    const { onFormLoading } = this.props;
    onFormLoading(isLoading);
  };

  onSubmit = (evt) => {
    evt.preventDefault();
  };

  getFieldName = path => path[0];

  getValue = () => this.Form.getValue();

  updateTcompOptionsWithErrors(fieldsErrors) {
    const { options } = this.props;
    const fields = {};

    options.fields.forEach((option) => {
      if (fieldsErrors[option.name]) {
        fields[option.name] = {
          hasError: {
            $set: true,
          },
          error: {
            // FIXME : Replace the 'SERVER_ERROR: ' part, with a more elegant solution.
            //        It's used mainly in the Errors.jsx to differentiate local & server errors
            $set: `SERVER_ERROR: ${fieldsErrors[option.name]}`,
          },
        };
      }
    });

    const updatedOptions = t.update(this.state.tcombOptions, { fields });
    this.setState({ tcombOptions: updatedOptions });
  }

  resetTcompOptionsErrors(fieldName) {
    const { options } = this.props;
    const fields = {};

    const fieldsToChange = fieldName ? [fieldName] : options.fields.map(option => option.name);

    fieldsToChange.forEach((field) => {
      fields[field] = {
        hasError: {
          $set: false,
        },
        error: {
          $set: null,
        },
      };
    });

    const updatedOptions = t.update(this.state.tcombOptions, { fields });
    this.setState({ tcombOptions: updatedOptions });
  }

  commitFormMutation = (environment, mutation, variables, mutationRoot, callbacks) => {
    const knownFields = {};
    if (this.state.tcombOptions.fields) {
      Object.keys(this.state.tcombOptions.fields).forEach((field) => {
        knownFields[field] = true;
      });
    }

    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: (response, errors) => {
        const serverErrors = {};
        const globalError = errors && errors.length > 0 && errors[0];

        if (globalError) {
          serverErrors.global = globalError.message;
        }

        const unKnownFieldsErrors = {};

        if (response && response[mutationRoot] && response[mutationRoot].errors) {
          response[mutationRoot].errors.forEach((error) => {
            const errorMessage = `${error.message || error.messages[0]}`;
            if (knownFields[error.field]) {
              serverErrors[error.field] = errorMessage;
            } else {
              unKnownFieldsErrors[error.field] = errorMessage;
            }
          });
        }

        if (Object.keys(unKnownFieldsErrors).length > 0) {
          // FIXME : Remove only on production
          serverErrors.global = ''; // JSON.stringify(unKnownFieldsErrors);
        }

        // form to render to show server errors (When no local errors are there)
        callbacks.completed(response, serverErrors);
      },

      onError: (err) => {
        callbacks.completed(null, err.message || err.toString());
      },
    });
  };

  submitForm = () => {
    const {
      onFormError, onFormSuccess, mutationRoot, environment, mutation,
    } = this.props;

    this.resetTcompOptionsErrors();

    // onFormError & onFormSuccess shouldn't be empty or undefined
    assert(onFormError, 'onFormError Should Not Be Undefined');
    assert(onFormSuccess, 'onFormSuccess Should Not Be Undefined');

    if (this.state.isLoading) {
      return;
    }

    // Apply local validations first
    this.Form.validate();

    const formValues = this.Form.getValue();

    if (!formValues) {
      onFormError(null);
      return;
    }

    const addiontalMutationVariables = this.props.addiontalMutationVariables || {};

    const variables = {
      ...formValues,
      ...addiontalMutationVariables,
    };

    this.onLoading(true);

    this.commitFormMutation(
      environment,
      mutation,
      variables,
      mutationRoot,
      {
        preCommit: () => {

        },
        completed: (response, errors) => {
          if (errors) {
            this.updateTcompOptionsWithErrors(errors);
          }

          if (response && errors.global) {
            onFormError(errors.global);
          } else if (typeof errors === 'string') {
            onFormError(errors);
          } else {
            onFormError(null);
          }

          const errorsExist = errors && (Object.keys(errors).length > 0 || errors.length > 0);

          if (!errorsExist) {
            onFormSuccess(response);
          }
          this.onLoading(false);
        },
      },
    );
  };

  render = () => {
    const { options } = this.props;

    const { isLoading } = this.state;

    const type = getTcombTypesFromRawOptions(options);

    // FIXME: Nested values needs different handling
    const formValues = {
      ...options.initialFormValue,
      ...this.state.value,
    };

    return (
      <FullWidthForm
        // External form helps with Autocomplete from browsers
        onSubmit={this.onSubmit}
      >
        <SeededTcombForm
          ref={(ref) => {
            this.Form = ref;
          }}
          type={type}
          options={this.state.tcombOptions}
          value={formValues}
          onChange={(value, path) => this.onChange(value, path)}
          context={{
            customInputsContainer: options.customInputsContainer, // Options are not being passed
            // to Form Layout, so that we put it in context
            isLoading,
            onSubmit: this.submitForm,
            onKeyUp: (event) => {
              if (event.keyCode === 13) {
                this.submitForm();
              }
            },
          }}
        />
      </FullWidthForm>
    );
  };
}

RelayForm.propTypes = PropTypes.shape({
  options: PropTypes.shape({
    initialFormValue: PropTypes.shape({}),
    fields: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      input_type: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      label: PropTypes.string,
      displayName: PropTypes.string,
      customInputsContainer: PropTypes.element,
      customLayout: PropTypes.func,
    })),
  }).isRequired,
  onFormError: PropTypes.func.isRequired,
  onFormSuccess: PropTypes.func.isRequired,
  onFormLoading: PropTypes.func.isRequired,
  addiontalMutationVariables: PropTypes.shape({}),
  onChange: PropTypes.func,
}).isRequired;

export default withRelayEnvironment(RelayForm);
