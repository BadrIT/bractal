import React from 'react';
import PropTypes from 'prop-types';
import { Trans, translate } from 'react-i18next';
import styled from 'styled-components';
import { XXXLargeSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';
import { BasicButton } from '~/modules/coreUI/components/legacies/Button';
import { Row } from '~/modules/coreUI/components/layouts/helpers/Rows';
import Icon from '~/modules/coreUI/components/basic/Icon';
import { loadPrev, loadNext, leftClassName, rightClassName } from './PaginationNextAndPrevious';

const Left = styled.div`
  position: absolute;
  left: ${props => props.theme.paddings.large}px;
`;

const Right = styled.div`
  position: absolute;
  right: ${props => props.theme.paddings.large}px;
`;

const PaginationBoxResponsive = ({ paginator, pageInfo }) => (
  <Row spaceBetween>
    <BasicButton
      block
      primary
      onClicked={() => loadPrev(paginator, pageInfo)}
    >
      <Left><Icon className={leftClassName} /></Left>
      <Trans i18nKey="Pagination.PreviousButton" />
    </BasicButton>
    <XXXLargeSpacer />
    <BasicButton
      block
      primary
      onClicked={() => loadNext(paginator, pageInfo)}
    >
      <Right><Icon className={rightClassName} /></Right>
      <Trans i18nKey="Pagination.NextButton" />
    </BasicButton>
  </Row >
);

PaginationBoxResponsive.propTypes = {
  pageInfo: PropTypes.shape({}).isRequired,
  paginator: PropTypes.shape({}.isRequired),
}.isRequired;

export default translate('ecommerceCoreUI')(PaginationBoxResponsive);
