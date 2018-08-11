/* eslint-disable import/prefer-default-export */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ErrorLabel } from '~/modules/coreUI/components/basic/Labels';
import { Column, CenterAlignedColumn } from '~/modules/coreUI/components/layouts/helpers/Columns';
import { PanelTitle, PanelSubtitle } from '~/modules/accountManagement/components/basic/Labels';
import { XSmallSpacer, LargeSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';

export const PanelRoot = styled(Column)`
  width: ${props => props.panelWidth || '252px'};
  flex-grow: 1;
`;


const PanelHeaderSpacing = styled(CenterAlignedColumn)`
  width: ${props => (props.width ? props.width : '100%')};  
  height: ${props => props.theme.paddings.xxxxxLarge}px;
`;

const Panel = (props) => {
  const {
    title,
    subTitle,
    titleLabel,
    subTitleLabel,
    showHeader,
    error,
    children,
  } = props;

  return (
    <PanelRoot {...props} topAligned topJustified>
      {showHeader && (
        <CenterAlignedColumn>
          <PanelTitle uppercase>
            {title || titleLabel}
          </PanelTitle>
          <XSmallSpacer />
          <PanelSubtitle>
            {subTitle || subTitleLabel}
          </PanelSubtitle>
        </CenterAlignedColumn>
      )}
      <PanelHeaderSpacing>
        <XSmallSpacer />
        <ErrorLabel>
          {error}
        </ErrorLabel>
        <LargeSpacer />
      </PanelHeaderSpacing>
      <Column fullWidth centerAligned centerJustified grow>
        { children }
      </Column>
    </PanelRoot>
  );
};

Panel.propTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  titleLabel: PropTypes.string.isRequired,
  subTitleLabel: PropTypes.string.isRequired,
  showHeader: PropTypes.bool,
  error: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}).isRequired;

Panel.defaultProps = {
  showHeader: true,
};


export default Panel;
