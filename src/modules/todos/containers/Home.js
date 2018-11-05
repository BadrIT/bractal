import React from 'react';
import { translate, Trans } from 'react-i18next';
import { Header, Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';

import TodosMainPage from './TodosMainPage';
import TodoCreatePage from './TodoCreatePage';
import TodoDetailsPage from './TodoDetailsPage';
import TodosListPage from './TodosListPage';

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
      <Route path="/todos/list" exact component={TodosListPage} />
      {/* <Route path="/todos/signin" exact component={SigninPage} /> */}
      <Route path="/todos/create" exact component={TodoCreatePage} />
      <Route path="/todos/:id" exact component={TodoDetailsPage} />
    </Switch>
  </React.Fragment>
);

export default translate('todos')(HomePage);
