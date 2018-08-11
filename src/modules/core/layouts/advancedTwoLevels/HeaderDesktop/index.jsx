import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from 'semantic-ui-react';

import { LargeSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';

import TopNav from './TopNav';
import BottomNav from './BottomNav';

// The following is a solution to give the dropdown content from
// the menu a first position parent, so that it stay within the page limits
const PositionedContainer = styled(Container)`
  position: relative;
`;
const PositionedDiv = styled.div`
  position: relative;
`;

const HeaderDesktop = ({ menuInfo, topHeaderStyles, bottomHeaderStyles }) => (
  <PositionedContainer>
    <PositionedDiv>
      <TopNav menuInfo={menuInfo.top} customHeaderStyles={topHeaderStyles} />
    </PositionedDiv>
    <LargeSpacer />
    <PositionedDiv>
      <BottomNav menuInfo={menuInfo.bottom} customHeaderStyles={bottomHeaderStyles} />
    </PositionedDiv>
  </PositionedContainer>
);

HeaderDesktop.MenuInfoPropTypes = {
  top: PropTypes.shape({
    ...TopNav.MenuInfoPropTypes,
  }).isRequired,
  bottom: PropTypes.shape({
    ...BottomNav.MenuInfoPropTypes,
  }).isRequired,
};

HeaderDesktop.propTypes = PropTypes.shape({
  topHeaderStyles: PropTypes.string,
  bottomHeaderStyles: PropTypes.string,
  menuInfo: PropTypes.shape({
    ...HeaderDesktop.MenuInfoPropTypes,
  }).isRequired,
}).isRequired;

export default HeaderDesktop;
