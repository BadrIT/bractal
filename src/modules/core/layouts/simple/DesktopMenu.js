import React from 'react';
import { Input, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { translate, Trans } from 'react-i18next';
import PropTypes from 'prop-types';

import LanguageSelector from '../../components/common/LanguageSelector';
import { withModules } from '../../utils/modulesLoader';

const DesktopMenu = ({ modules }) => (

  <Menu >
    <Menu.Item header>
      <Trans i18nKey="metadata.appName" />
    </Menu.Item>

    { modules.map(module => (
      <Menu.Item header key={module.name} as={NavLink} exact to={module.homePath}>
        {module.menuItemTitle}
      </Menu.Item>
    ))}

    <Menu.Menu position="right">
      <Menu.Item>
        <Input icon="search" placeholder="Search..." />
      </Menu.Item>
      <Menu.Item>
        <LanguageSelector />
      </Menu.Item>
      <Menu.Item name="logout" />
    </Menu.Menu>
  </Menu>
);

DesktopMenu.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    homePath: PropTypes.string.isRequired,
  })).isRequired,
};

export default translate('core')(withModules(DesktopMenu));
