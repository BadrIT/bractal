import React from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider } from 'styled-components';
import Theme from '~/modules/core/containers/main/defaultTheme';
import LinearLayout from '~/modules/coreUI/components/layouts/helpers/LinearLayout';

const Wrapper = props => (
  <ThemeProvider theme={Theme}>
    <LinearLayout row leftJustified topAligned>
      {props.children}
    </LinearLayout>
  </ThemeProvider>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
