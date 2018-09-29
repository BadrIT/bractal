import React from 'react';
import { translate, Trans } from 'react-i18next';
import { Container, Header, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import withModules from '../utils/modulesLoader/withModules';

const HomePage = ({ modules }) => (
  <Container text>
    <br />
    <React.Fragment>
      <Header size="huge">
        <Trans i18nKey="metadata.appName" />
      </Header>
      <Header.Subheader>
        <Trans i18nKey="metadata.description" />
      </Header.Subheader>
    </React.Fragment>
    <React.Fragment>
      <Header size="large">
        <Trans i18nKey="home.howToUse.title" />
      </Header>
      <Header.Subheader>
        <Trans i18nKey="home.howToUse.description" />
      </Header.Subheader>
    </React.Fragment>
    <React.Fragment>
      <Header size="large">
        <Trans i18nKey="home.modules.title" />
      </Header>
      <List ordered>
        {modules.map(module => (
          <List.Item key={module.name} as="a">{ module.displayName }</List.Item>
        ))}
      </List>
    </React.Fragment>
  </Container>
);

HomePage.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default translate('core')(withModules(HomePage));
