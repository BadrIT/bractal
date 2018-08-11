import React from 'react';
import { graphql } from 'react-relay';
import PropTypes from 'prop-types';

import RelayForm from '~/modules/coreUI/components/forms/RelayForm';

const FormMutation = graphql`
  mutation RecoverVerifyByEmailFormMutation (
    $email: String!,
    $code: String!,
  ) {
    forgot_password_verify_code (
      email: $email
      code: $code,
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
        mutationRoot="forgot_password_verify_code"
        options={{
          fields: [
            {
              name: 'code',
              placeholder: 'Add Code Here',
              input_type: 'textbox',
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
