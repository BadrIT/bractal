import React from 'react';
import { translate, Trans } from 'react-i18next';
import { Header, Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';

import PostsListPage from './PostsListPage';
import PostDetailsPage from './PostDetailsPage';

const ItemsListPage = () => PostsListPage;
const ItemDetailsPage = () => PostDetailsPage;

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
      <Route path="/posts" exact component={ItemsListPage()} />
      <Route path="/posts/:id" exact component={ItemDetailsPage()} />
    </React.Fragment>
  );

export default translate('posts')(HomePage);
