import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import SignForm from './SignForm';

const FormMutation = graphql`
  mutation SignupPageMutation (
    $data: CreateUserInput!,
  ) {
    createUser (
      data : $data
    ) {
      id name
    }
  }
`;
const SignUpPage = props => (
  <SignForm
    {...props}
    signUp
    onSuccess={data => localStorage.setItem('userId', data.createUser.id)}
    signSwitch={() => props.history.push('/todos/signin')}
    formMutation={FormMutation}
  />
);

SignUpPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignUpPage;
