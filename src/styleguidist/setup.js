/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Column } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import Spacer from '~/modules/coreUI/components/layouts/helpers/Spacer';

global.Box = props => (
  <Spacer size={props.size || 6} style={{ backgroundColor: props.color || 'gray' }} />
);
global.Row = Row;
global.Column = Column;
global.Examples = props => (
  <Row topAligned spaceBetween="0.5">
    {props.children}
  </Row>
);
