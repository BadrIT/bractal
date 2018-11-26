import React from 'react';
import { translate, Trans } from 'react-i18next';
import { Header, Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import RelayProvider from '~/modules/core/utils/relayHelpers/RelayProvider';
import AlertProvider from '~/modules/core/utils/alertHelpers/AlertProvider';
import TodosMainPage from './TodosMainPage';
import SignupPage from './SignupPage';
import SigninPage from './SigninPage';
import TodoCreatePage from './TodoCreatePage';
import TodoDetailsPage from './TodoDetailsPage';

const HomePage = () => (
  <React.Fragment>
    <Container>
      <br />
      <Header size="huge">
        <Trans i18nKey="metadata.displayName" />
      </Header>
      <Header.Subheader>
        <Trans i18nKey="metadata.description" />
      </Header.Subheader>
      <br />
      <br />
      <br />
    </Container>
    <Switch>
      <Route path="/todos/" exact component={TodosMainPage} />
      <Route path="/todos/signup" exact component={SignupPage} />
      <Route path="/todos/signin" exact component={SigninPage} />
      <Route path="/todos/create" exact component={TodoCreatePage} />
      <Route path="/todos/:id" exact component={TodoDetailsPage} />
    </Switch>
  </React.Fragment>
);

const Wrapper = () => (
  <AlertProvider>
    <RelayProvider>
      <HomePage />
    </RelayProvider>
  </AlertProvider>
);

export default translate('todos')(Wrapper);
