/* eslint-disable react/prop-types */
import React from 'react';
import LinearLayout, { Row, Column } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';

global.Column = Column;
global.Row = Row;
global.Examples = props => (
  <LinearLayout row topAligned s_spaceBetween_1>
    {props.children}
  </LinearLayout>
);
