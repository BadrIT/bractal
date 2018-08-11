import React from 'react';
import { translate, Trans } from 'react-i18next';
import { Header, Container } from 'semantic-ui-react';

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

      <h3>I love BADR :)</h3>
    </React.Fragment>
  );

export default translate('coreUI')(HomePage);
