import React from 'react';
import PropTypes from 'prop-types';
import Button from '~/modules/coreUI/components/basic/Button';
import { Row } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import Icon from '~/modules/coreUI/components/basic/Icon';
import { defaultLeftClassName, defaultRightClassName } from './PaginationNextAndPrevious';

const PaginationBoxMobile = props => (
  <Row spaceBetween="1">
    <Button
      {...props}
      primary
      onClicked={() => props.loadPrevPage()}
    >
      <Icon className={props.leftIconClassName || defaultLeftClassName} />
      PreviousButton
    </Button>
    <Button
      {...props}
      primary
      onClicked={() => props.loadNextPage()}
    >
      NextButton
      <Icon className={props.rightIconClassName || defaultRightClassName} />
    </Button>
  </Row>
);

PaginationBoxMobile.propTypes = {
  loadNextPage: PropTypes.func.isRequired,
  loadPrevPage: PropTypes.func.isRequired,
}.isRequired;

export default PaginationBoxMobile;

