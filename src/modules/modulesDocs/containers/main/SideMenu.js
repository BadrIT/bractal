import React from 'react';
import PropTypes from 'prop-types';

import { withModules } from '~/modules/core/utils/modulesLoader';
import SideMenuItemsContainer from '~/modules/coreUI/components/layouts/defaultSiteLayout/siteHeader/SideMenuItemsContainer';

const loadedModulesHeaderEntries = modules => modules.map(module => ({
  itemRenderer: (
    <React.Fragment>
      {module.menuItemTitle}
    </React.Fragment>
  ),
  targetURL: module.homePath,
}));


const SideMenu = ({ modules }) => {
  const menuInfo = {
    top: [
      ...loadedModulesHeaderEntries(modules),
    ],
  };

  return (
    <SideMenuItemsContainer menuInfo={menuInfo} />
  );
};

SideMenu.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape({
    menuItemTitle: PropTypes.string.isRequired,
    targetURL: PropTypes.string.isRequired,
  })).isRequired,
};

export default withModules(SideMenu);
