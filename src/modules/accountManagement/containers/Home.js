import React from 'react';
import { translate, Trans } from 'react-i18next';
import { Container, Header } from 'semantic-ui-react';


const HomePage = () =>
  (
    <Container text>
      <br />
      <React.Fragment>
        <Header size="huge">
          <Trans i18nKey="metadata.displayName" />
        </Header>
        <Header.Subheader>
          <Trans i18nKey="metadata.description" />
        </Header.Subheader>
      </React.Fragment>
    </Container>
  );

export default translate('accountManagement')(HomePage);
