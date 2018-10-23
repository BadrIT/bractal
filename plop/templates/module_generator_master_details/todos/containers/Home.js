import React from 'react';
import { translate, Trans } from 'react-i18next';
import { Header, Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';

import TodosListPage from './TodosListPage';
import TodoDetailsPage from './TodoDetailsPage';
import TodoCreatePage from './TodoCreatePage';

const ItemsListPage = () => TodosListPage;
const ItemDetailsPage = () => TodoDetailsPage;
const ItemCreatePage = () => TodoCreatePage;

const HomePage = () =>
  (
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
        <Route path="/todos" exact component={ItemsListPage()} />
        <Route path="/todos/create" exact component={ItemCreatePage()} />
        <Route path="/todos/:id" exact component={ItemDetailsPage()} />
      </Switch>
    </React.Fragment>
  );

export default translate('todos')(HomePage);
