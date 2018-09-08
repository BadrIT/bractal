import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from 'semantic-ui-react';

import { LargeSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';
import { cssMediaMax } from '~/modules/core/utils/cssHelpers/cssMedia';

import HeaderRow from './HeaderRow';
// The following is a solution to give the dropdown content from
// the menu a first position parent, so that it stay within the page limits
const PositionedContainer = styled(Container)`
  position: relative;

  &&& {
    ${cssMediaMax.tablet`
      width: 100% !important;
      padding-left: ${props => props.theme.paddings.xxLarge}px;
      padding-right: ${props => props.theme.paddings.xxLarge}px;
    `}
  }
`;
const PositionedDiv = styled.div`
  position: relative;
`;

const Header = ({
  menuInfo,
  topRowContainer,
  bottomRowContainer,
}) => (
  <PositionedContainer>
    <PositionedDiv>
      <HeaderRow menuInfo={menuInfo.top} headerRowContainer={topRowContainer} />
    </PositionedDiv>
    <LargeSpacer />
    <PositionedDiv>
      <HeaderRow menuInfo={menuInfo.bottom} headerRowContainer={bottomRowContainer} />
    </PositionedDiv>
  </PositionedContainer>
);

Header.MenuInfoPropTypes = {
  top: PropTypes.shape({
    ...HeaderRow.MenuInfoPropTypes,
  }).isRequired,
  bottom: PropTypes.shape({
    ...HeaderRow.MenuInfoPropTypes,
  }).isRequired,
};

Header.propTypes = {
  topRowContainer: PropTypes.element.isRequired,
  bottomRowContainer: PropTypes.element.isRequired,
  menuInfo: PropTypes.shape({
    ...Header.MenuInfoPropTypes,
  }).isRequired,
};

export default Header;
