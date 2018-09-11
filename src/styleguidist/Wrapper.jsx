import React from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider } from 'styled-components';
import Theme from '~/modules/core/containers/main/defaultTheme';
import { Row } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';

const Wrapper = props => (
  <ThemeProvider theme={Theme}>
    <Row leftJustified topAligned s_spaceBetween_2>
      {props.children}
    </Row>
  </ThemeProvider>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
