import React from 'react';
import { graphql } from 'react-relay';
import PropTypes from 'prop-types';

import RelayForm from '~/modules/coreUI/components/forms/RelayForm';

const FormMutation = graphql`
  mutation VerifyByEmailFormMutation (
    $confirmation_token: String!,
  ) {
    confirm_email(
      confirmation_token: $confirmation_token,
    ) {
      token
      client_id
      expiry
      user {
        id
        first_name
        last_name
        email
      }
      errors {
        field
        messages
      }
    }
  }
`;


class VerifyByEmailForm extends React.Component {
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
        mutationRoot="confirm_email"
        options={{
          fields: [
            {
              name: 'confirmation_token',
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
}).isRequired;

export default VerifyByEmailForm;
