import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { withModules } from '~/modules/core/utils/modulesLoader';

import SiteHeader from '~/modules/coreUI/containers/siteHeader';
import BractalLogo from '~/modules/modulesDocs/atoms/BractalLogo';
import BractalLogoMobile from '~/modules/modulesDocs/atoms/BractalLogoMobile';

import LanguageSelector from '~/modules/modulesDocs/atoms/LanguageSelector';

import { MediumLabel } from '~/modules/coreUI/components/basic/Labels';
import injectElementBetweenArrayItems from '~/modules/core/utils/jsHelpers/injectElementBetweenArrayItems';

import { DefaultHeaderTopRowContainer, DefaultHeaderBottomRowContainer } from '~/modules/coreUI/containers/siteHeader/HeaderRowContainers';


const HeaderTopRowContainer = styled(DefaultHeaderTopRowContainer)`
  margin-top: ${props => props.theme.paddings.xLarge}px;
`;

const HeaderBottomRowContainer = styled(DefaultHeaderBottomRowContainer)`
  margin-top: ${props => props.theme.paddings.medium}px;
  padding-left: ${props => props.theme.paddings.medium}px;
  border-radius: ${props => props.theme.paddings.medium}px;
`;

const HeaderBottomRowMenuItem = styled.div`
  padding: ${props => props.theme.paddings.medium}px;
`;

const loadedModulesHeaderEntries = modules => modules.map(module => ({
  itemRenderer: (
    <HeaderBottomRowMenuItem>
      <MediumLabel>
        {module.menuItemTitle}
      </MediumLabel>
    </HeaderBottomRowMenuItem>
  ),
  targetURL: module.homePath,
}));


const Header = ({ modules }) => {
  const menuInfo = {
    desktop: {
      top: {
        left: [
          {
            itemRenderer: <BractalLogo />,
            targetURL: '/',
          },
        ],
        right: [
          {
            itemRenderer: <LanguageSelector />,
          },
        ],
      },
      bottom: {
        left: [
          ...injectElementBetweenArrayItems(
            loadedModulesHeaderEntries(modules),
            {
              verticalSeparator: true,
              separatorColorTone: 'normal',
            },
          ),
        ],
      },
    },
    mobile: {
      top: {
        right: [
          {
            itemRenderer: <BractalLogoMobile />,
            targetURL: '/',
          },
        ],
      },
      bottom: {
        left: [],
        right: [],
      },
    },
  };

  return (
    <SiteHeader
      menuInfo={menuInfo}
      desktopTopRowContainer={HeaderTopRowContainer}
      desktopBottomRowContainer={HeaderBottomRowContainer}
      mobileTopRowContainer={HeaderTopRowContainer}
      mobileBottomRowContainer={HeaderBottomRowContainer}
    />
  );
};

Header.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape({
    menuItemTitle: PropTypes.string.isRequired,
    targetURL: PropTypes.string.isRequired,
  })).isRequired,
};

export default withModules(Header);
