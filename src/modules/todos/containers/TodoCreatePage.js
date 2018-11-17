import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { translate, Trans } from 'react-i18next';
import { graphql } from 'react-relay';
import PropTypes from 'prop-types';
import { Column } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import RelayForm from '~/modules/coreUI/components/forms/RelayForm';
import Spacer from '~/modules/coreUI/components/layouts/helpers/Spacer';
import { ErrorLabel } from '~/modules/coreUI/components/basic/Labels';
import Button from '~/modules/coreUI/components/basic/Button';
import { withRouter, Link } from 'react-router-dom';
import { sentenceCase } from 'change-case';

const FormMutation = graphql`
  mutation TodoCreatePageMutation (
    $data: TodoCreateInput!,
  ) {
    createTodo (
      data : $data
    ) {
      id title description
    }
  }
`;

class TodoCreatePage extends Component {
  state = {
    panelError: null,
    isLoading: false,
  };

  onSuccess = () => {
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
  render() {
    const { isLoading, panelError } = this.state;
    const fieldOptions = 'id title description'.split(' ')
      .filter(field => field !== 'id')
      .map(field => ({
        name: field,
        placeholder: sentenceCase(field),
        input_type: 'textbox',
        type: 'RequiredString',
      }));
    return (
      <Container>
        <Link to="/todos" >
          <h1> {'< Todo List'} </h1>
        </Link>
        <br />
        <br />
        <Header size="huge">
          <Trans i18nKey="form.todo" />
        </Header>
        <ErrorLabel>
          {panelError}
        </ErrorLabel>
        <RelayForm
          onRef={(ref) => { this.form = ref; }}
          onFormError={error => this.onError(error)}
          onFormSuccess={response => this.onSuccess(response)}
          onFormLoading={loading => this.setLoadingState(loading)}
          mutationRoot="createTodo"
          mutation={FormMutation}
          options={{
            fields: fieldOptions,
          }}
          getSubmissionVariables={formVariables => ({
            data: {
              ...formVariables,
              userId: localStorage.getItem('userId'),
            },
          })}
        />
        <Column leftAligned fullWidth>
          <Button width="200px" fullRound primary disabled={isLoading} onClicked={() => this.submitForm()}>
            <Trans i18nKey="form.todo" />
          </Button>
          <Spacer xl />
        </Column>
      </Container>
    );
  }
}

TodoCreatePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default translate('todos')(withRouter(TodoCreatePage));
