import React from 'react';
import { ThemeProvider } from 'styled-components';

import Theme from '~/modules/ecommerceCore/Theme';
import Dropdown from '../Dropdown';

export default props => (
  <ThemeProvider theme={Theme}>
    <Dropdown {...props} />
  </ThemeProvider>
);
