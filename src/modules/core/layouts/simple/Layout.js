import React from 'react';

import PageContent from '~/modules/core/containers/AllLoadedModulesContent';
import DesktopMenu from './DesktopMenu';

export default function Layout() {
  return (
    <React.Fragment>
      <DesktopMenu />
      <PageContent />
    </React.Fragment>
  );
}
