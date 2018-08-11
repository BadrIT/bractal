import React from 'react';
import { graphql } from 'react-relay';
import PropTypes from 'prop-types';

import RelayForm from '~/modules/coreUI/components/forms/RelayForm';
import withUserInfo from '~/modules/core/utils/accessManagementHelpers/withUserInfo';

const FormMutation = graphql`
  mutation SignupFormMutation (
    $email: String!
    $password: String!
    $first_name: String!
    $last_name: String!
    $nationality: String!
    $mobile_number: String!
    $gender: String!
  ) {
    create_user(
      email: $email
      password: $password
      first_name: $first_name
      last_name: $last_name
      nationality: $nationality
      mobile_number: $mobile_number
      gender: $gender
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


class SignupForm extends React.Component {
  componentDidMount = () => {
    this.props.onRef(this);
  }

  submitForm = () => {
    this.form.submitForm();
  }

  render = () => {
    const {
      customLayout,
      customInputsContainer,
      onFormError,
      onFormSuccess,
      onFormLoading,
      userInfo,
    } = this.props;

    let defaultCountry = '974';
    if (userInfo && userInfo.settings) {
      defaultCountry = userInfo.settings.currecnt_location_country_code;
    }

    return (
      <RelayForm
        onRef={(ref) => { this.form = ref; }}
        onFormError={onFormError}
        onFormSuccess={onFormSuccess}
        onFormLoading={onFormLoading}
        mutationRoot="create_user"
        options={{
          customLayout,
          customInputsContainer,
          initialFormValue: {
            register_for_news: true,
            mobile_number: `(+${defaultCountry})`,
          },
          fields: [
            {
              name: 'first_name',
              placeholder: 'First Name',
              input_type: 'textbox',
              type: 'RequiredString',
            },
            {
              name: 'last_name',
              placeholder: 'Last Name',
              input_type: 'textbox',
              type: 'RequiredString',
            },
            {
              name: 'email',
              placeholder: 'Email',
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
              name: 'nationality',
              placeholder: 'Nationality',
              input_type: 'country',
              type: 'RequiredString',
            },
            {
              name: 'mobile_number',
              placeholder: 'Mobile Number',
              input_type: 'phoneNumber',
              type: 'RequiredNumber',
            },
            {
              name: 'gender',
              input_type: 'gender',
              type: 'RequiredEnum',
            },
            {
              name: 'register_for_news',
              label: 'Register For Newsletter',
              importantLabel: true,
              checkboxNote: '*After Registering, you will recieve an email with a verification code to verify your account.',
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

SignupForm.propTypes = PropTypes.shape({
  onFormError: PropTypes.func.isRequired,
  onFormSuccess: PropTypes.func.isRequired,
  onFormLoading: PropTypes.func.isRequired,
}).isRequired;

export default withUserInfo(SignupForm);
