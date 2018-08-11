import React from 'react';
import { graphql } from 'react-relay';
import PropTypes from 'prop-types';

import RelayForm from '~/modules/coreUI/components/forms/RelayForm';
import withUserInfo from '~/modules/core/utils/accessManagementHelpers/withUserInfo';

const FormMutation = graphql`
  mutation LoginFormMutation (
    $user_signin: String!,
    $password: String!,
    $remember_me: Boolean!
  ) {
    signin_user(
      user_signin: $user_signin, 
      password: $password, 
      remember_me: $remember_me
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


class LoginForm extends React.Component {
  componentDidMount = () => {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  getValue = () => this.form.getValue();

  submitForm = () => {
    this.form.submitForm();
  }

  render = () => {
    const {
      customLayout,
      onFormError,
      onFormSuccess,
      onFormLoading,
      userInfo,
    } = this.props;

    return (
      <RelayForm
        onRef={(ref) => { this.form = ref; }}
        onFormError={onFormError}
        onFormSuccess={onFormSuccess}
        onFormLoading={onFormLoading}
        mutationRoot="signin_user"
        options={{
          customLayout,
          initialFormValue: {
            user_signin: userInfo && userInfo.email,
          },
          fields: [
            {
              name: 'user_signin',
              displayName: 'Email/Mobile Number',
              placeholder: 'Email/Mobile Number',
              input_type: 'textbox',
              type: 'RequiredString',
            },
            {
              name: 'password',
              placeholder: 'Password',
              input_type: 'password',
              type: 'RequiredString',
            },
            {
              name: 'remember_me',
              label: 'Remember Me',
              input_type: 'checkbox',
              type: 'Boolean',
            },
          ],
        }}
        mutation={FormMutation}
      />
    );
  }
}

LoginForm.propTypes = PropTypes.shape({
  onFormError: PropTypes.func.isRequired,
  onFormSuccess: PropTypes.func.isRequired,
  onFormLoading: PropTypes.func.isRequired,
}).isRequired;

export default withUserInfo(LoginForm);
