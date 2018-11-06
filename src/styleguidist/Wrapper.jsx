import React from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider } from 'emotion-theming';
import Theme from '~/modules/core/containers/main/defaultTheme';
import { LinearLayout } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import MediaProvider from '~/modules/core/utils/mediaHelpers/MediaProvider';

const Wrapper = props => (
  <ThemeProvider theme={Theme}>
    <MediaProvider>
      <LinearLayout row leftJustified topAligned>
        {props.children}
      </LinearLayout>
    </MediaProvider>
  </ThemeProvider>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
