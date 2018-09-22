/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Column } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import Spacer from '~/modules/coreUI/components/layouts/helpers/Spacer';
import { Label } from '~/modules/coreUI/components/basic/Labels';

// Loading gloabl styles
// eslint-disable-next-line no-unused-vars
import fontFamily from '~/modules/coreUI/globalStyles/fontFamily';

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
global.VerticalExamples = props => (
  <Column leftAligned spaceBetween="0.5">
    {props.children}
  </Column>
);
global.Label = Label;
