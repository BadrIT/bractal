import React from 'react';
import { translate } from 'react-i18next';
import ButtonDocs from '~/modules/coreUI/docs/basic/button';

const HomePage = () => (
  <ButtonDocs />
);

export default translate('modulesDocs')(HomePage);
