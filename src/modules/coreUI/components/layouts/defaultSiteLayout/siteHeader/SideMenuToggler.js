import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '~/modules/coreUI/components/basic/Icon';
import withSideMenuTracker from '~/modules/core/utils/sideMenuHelpers/withSideMenuTracker';

const LargeBurgerIcon = styled(Icon)`
  font-size: ${props => props.theme.fonts.sizes.xLarge}px;
`;

const SideMenuToggler = ({ toggleSideMenuVisibility }) => (
  <LargeBurgerIcon
    className="fas fa-bars"
    onClick={() => toggleSideMenuVisibility()}
  />
);

SideMenuToggler.propTypes = {
  toggleSideMenuVisibility: PropTypes.func.isRequired,
};

export default withSideMenuTracker(SideMenuToggler);
