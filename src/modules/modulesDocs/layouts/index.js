import React from 'react';
import { translate } from 'react-i18next';

import AllLoadedModulesContent from '~/modules/modulesDocs/containers/AllLoadedModulesContent';
import Header from './Header';

const Layout = () => (
  <React.Fragment>
    <Header />
    <AllLoadedModulesContent />
  </React.Fragment>
);

export default translate('core')(Layout);
