import React from 'react';
import { graphql } from 'react-relay';
import PropTypes from 'prop-types';

import RelayForm from '~/modules/coreUI/components/forms/RelayForm';

const FormMutation = graphql`
  mutation RecoverPasswordFormMutation (
    $email: String!,
  ) {
    forgot_password_send_code(
      email: $email,
    ) {
      errors {
        field
        messages
      }
      message
    }
  }
`;


class RecoverByPasswordForm extends React.Component {
  getValue = () => this.form.getValue();

  submitForm = () => {
    this.form.submitForm();
  }

  render = () => {
    const {
      onFormError,
      onFormSuccess,
      onFormLoading,
    } = this.props;

    return (
      <RelayForm
        onRef={(ref) => { this.form = ref; }}
        onFormError={onFormError}
        onFormSuccess={onFormSuccess}
        onFormLoading={onFormLoading}
        mutationRoot="forgot_password_send_code"
        options={{
          fields: [
            {
              name: 'email',
              placeholder: 'Email / Mobile Number',
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

RecoverByPasswordForm.propTypes = PropTypes.shape({
  onFormError: PropTypes.func.isRequired,
  onFormSuccess: PropTypes.func.isRequired,
  onFormLoading: PropTypes.func.isRequired,
}).isRequired;

export default RecoverByPasswordForm;
