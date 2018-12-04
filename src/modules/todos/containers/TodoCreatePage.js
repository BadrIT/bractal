import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { graphql } from 'react-relay';
import PropTypes from 'prop-types';

import RelayForm from '~/modules/coreUI/components/forms/RelayForm';
import Spacer from '~/modules/coreUI/components/layouts/helpers/Spacer';
import { ErrorLabel } from '~/modules/coreUI/components/basic/Labels';
import Button from '~/modules/coreUI/components/basic/Button';
import { withRouter } from 'react-router-dom';
import { sentenceCase } from 'change-case';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';


const FormMutation = graphql`
  mutation TodoCreatePageMutation (
    $data: TodoCreateInput!,
  ) {
    createTodo (
      data : $data
    ) {
      id title reminder_date description
    }
  }
`;

class TodoCreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = { startDate: new Date() };
    this.handleChange = this.handleChange.bind(this);
  }


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

  getdate() {
    return this.state.startDate.toDateString();
  }

    submitForm = () => {
      this.form.submitForm();
    }
    handleChange(date) {
      this.setState({
        startDate: date,
      });
      this.form.state.value.reminder_date = this.getdate();
    }

    render() {
      const { isLoading, panelError } = this.state;
      const fieldOptions = 'id title reminder_date description'.split(' ')
        .filter(field => field !== 'id')
        .map(field => ({
          name: field,
          placeholder: sentenceCase(field),
          input_type: 'text',
          type: 'RequiredString',
        }));

      return (
        <Container>
          <h1> you can  select date from calender or you can write it in your own form </h1>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
          <ErrorLabel>
            {panelError}
          </ErrorLabel>
          <Spacer size={1.5} />
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
            },
          })}
          />

          <Button width="100px" primary disabled={isLoading} onClicked={() => this.submitForm()}>
          Create
          </Button>
          <Spacer size={3.5} />
        </Container>
      );
    }
}

TodoCreatePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(TodoCreatePage);
