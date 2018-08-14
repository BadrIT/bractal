import React from 'react';
import { translate } from 'react-i18next';

import PageContent from '~/modules/core/containers/AllLoadedModulesContent';
import DesktopMenu from './DesktopMenu';

const Layout = () => (
  <React.Fragment>
    <DesktopMenu />
    <PageContent />
  </React.Fragment>
);

export default translate('core')(Layout);
