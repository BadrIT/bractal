/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
// import { Trans, translate } from 'react-i18next';
import styled from 'styled-components';
import { XXXLargeSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';
import Button from '~/modules/coreUI/components/basic/Button';
import { Row } from '~/modules/coreUI/components/layouts/helpers/Rows';
import Icon from '~/modules/coreUI/components/basic/Icon';
import { Label } from '~/modules/coreUI/components/basic/Labels';
import { defaultLeftClassName, defaultRightClassName } from './PaginationNextAndPrevious';

const IconStyle = styled(Icon)`
  position: relative;
  left: ${props => props.theme.paddings.large}px;
`;

const Right = styled.div`
  position: absolute;
  right: ${props => props.theme.paddings.large}px;
`;

const PaginationBoxResponsive = props => (
  <Row spaceBetween>
    <Button
      primary
      onClicked={() => props.loadPrevPage()}
    >
    <Row>
      <Icon className={defaultLeftClassName} />
      {/* <Trans i18nKey="Pagination.PreviousButton" /> */}
      PreviousButton
    </Row>
    </Button>
    <XXXLargeSpacer />
    <Button
      primary
      onClicked={() => props.loadNextPage()}
    >
      <Label>NextButton</Label>
      <Right><Icon className={defaultRightClassName} /></Right>
      {/* <Trans i18nKey="Pagination.NextButton" /> */}
    </Button>
  </Row >
);

// export default translate('ecommerceCoreUI')(PaginationBoxResponsive);

export default PaginationBoxResponsive;

