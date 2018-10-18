import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate, Trans } from 'react-i18next';
import styled from 'react-emotion';
import { Header } from 'semantic-ui-react';

import RelayForm from '~/modules/coreUI/components/forms/RelayForm';
import Spacer from '~/modules/coreUI/components/layouts/helpers/Spacer';
import { ErrorLabel } from '~/modules/coreUI/components/basic/Labels';
import Button from '~/modules/coreUI/components/basic/Button';
import LinearLayout from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import { withRouter } from 'react-router-dom';

const ContainerStyled = styled.div`
  width: 400px;
`;
class SignForm extends Component {
  state = {
    panelError: null,
    isLoading: false,
  };

  onSuccess = (data) => {
    this.props.onSuccess(data);
    this.props.history.push('/todos');
  }

  onError = (error) => {
    this.setState({ panelError: error });
  };

  setLoadingState = (isLoading) => {
    this.setState({ isLoading });
  }

  submitForm = () => {
    this.form.submitForm();
  }
  signSwitch = () => {
    this.props.signSwitch();
  }
  render() {
    const { isLoading, panelError } = this.state;
    const fieldOptions = [
      {
        name: 'name',
        placeholder: 'User Name',
        input_type: 'textbox',
        type: 'RequiredString',
      },
      {
        name: 'password',
        placeholder: 'Password',
        input_type: 'password',
        type: 'RequiredString',
      },
    ];

    return (
      <ContainerStyled>
        <Header size="huge">
          <Trans i18nKey={this.props.signIn ? 'form.signin' : 'form.signup'} />
        </Header>
        <ErrorLabel>
          {panelError}
        </ErrorLabel>
        <Spacer lg />
        <RelayForm
          onRef={(ref) => { this.form = ref; }}
          onFormError={error => this.onError(error)}
          onFormSuccess={response => this.onSuccess(response)}
          onFormLoading={loading => this.setLoadingState(loading)}
          mutationRoot="createUser"
          mutation={this.props.formMutation}
          options={{
            fields: fieldOptions,
          }}
          getSubmissionVariables={formVariables => ({
            data: {
              ...formVariables,
            },
          })}
        />
        <LinearLayout row spaceBetweenJustified>
          <Button fullRound primary disabled={isLoading} onClicked={() => this.submitForm()}>
            <Trans i18nKey={this.props.signIn ? 'form.signin' : 'form.signup'} />
          </Button>
          <Spacer xl />
          <Button fullRound primary disabled={isLoading} onClicked={() => this.signSwitch()}>
            <Trans i18nKey={this.props.signIn ? 'form.signup' : 'form.signin'} />
          </Button>
        </LinearLayout>
        <Spacer xl />
      </ContainerStyled>
    );
  }
}

SignForm.propTypes = {
  signIn: PropTypes.bool.isRequired,
  signSwitch: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  formMutation: PropTypes.shape({}).isRequired,
};

export default translate('todos')(withRouter(SignForm));
