import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import { responsiveStyle, infereSpaceSize } from '~/modules/coreUI/utils/infereStyle';

import spaceStyles from '~/modules/coreUI/utils/styleSystem';

export const StyledSpacer = styled.div`
  flex-grow: ${props => (props.grow ? 1 : null)};
  
  ${props => responsiveStyle(props, 'size', size => css`
    min-width: ${infereSpaceSize(props, size)};
    min-height: ${infereSpaceSize(props, size)};
  `)};

  ${props => spaceStyles(props)}
`;

const Spacer = props => <StyledSpacer {...props} />;

Spacer.defaultProps = {
  size: 1,
};

Spacer.propTypes = PropTypes.shape({
  size: PropTypes.number,
}).isRequired;

export default Spacer;

export const HSpacer = props => (
  <Spacer minHeight="1px" {...props} />
);

export const VSpacer = props => (
  <Spacer minWidth="1px" {...props} />
);
