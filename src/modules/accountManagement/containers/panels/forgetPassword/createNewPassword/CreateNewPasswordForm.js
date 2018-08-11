import React from 'react';
import { graphql } from 'react-relay';
import PropTypes from 'prop-types';

import RelayForm from '~/modules/coreUI/components/forms/RelayForm';

const FormMutation = graphql`
  mutation CreateNewPasswordFormMutation (
    $email: String!,
    $code: String!,
    $password: String!
    $password_confirmation: String!
  ) {
    forgot_password_update_password ( 
      email: $email
      code: $code,
      password: $password
      password_confirmation: $password_confirmation
    ) {      
      errors {
        field
        messages
      }
      message
    }
  }
`;


class VerifyByEmailForm extends React.Component {
  getValue = () => this.form.getValue();

  submitForm = () => {
    this.form.submitForm();
  }

  render = () => {
    const {
      onFormError,
      onFormSuccess,
      onFormLoading,
      addiontalMutationVariables,
    } = this.props;

    return (
      <RelayForm
        onRef={(ref) => { this.form = ref; }}
        onFormError={onFormError}
        onFormSuccess={onFormSuccess}
        onFormLoading={onFormLoading}
        addiontalMutationVariables={addiontalMutationVariables}
        mutationRoot="forgot_password_update_password"
        options={{
          fields: [
            {
              name: 'password',
              placeholder: 'Add Password',
              input_type: 'password',
              type: 'RequiredString',
            },
            {
              name: 'password_confirmation',
              placeholder: 'Confirm Password',
              input_type: 'password',
              type: 'RequiredString',
            },
          ],
        }}
        mutation={FormMutation}
      />
    );
  }
}

VerifyByEmailForm.propTypes = PropTypes.shape({
  onFormError: PropTypes.func.isRequired,
  onFormSuccess: PropTypes.func.isRequired,
  onFormLoading: PropTypes.func.isRequired,
  addiontalMutationVariables: PropTypes.shape({}).isRequired,
}).isRequired;

export default VerifyByEmailForm;
