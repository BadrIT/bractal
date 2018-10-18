import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import SignForm from './SignForm';

const FormMutation = graphql`
  mutation SigninPageMutation (
    $data: SignInInput!,
  ) {
    Signin (
      data : $data
    ) {
      id name
    }
  }
`;

const SignInPage = props => (
  <SignForm
    {...props}
    signIn
    onSuccess={data => localStorage.setItem('userId', data.Signin.id)}
    signSwitch={() => props.history.push('/todos/signup')}
    formMutation={FormMutation}
  />
);

SignInPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignInPage;
