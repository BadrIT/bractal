/* eslint-disable react/prop-types */
import React from 'react';
import styled from '@emotion/styled';
import { css } from 'emotion';
import { Column } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import Spacer from '~/modules/coreUI/components/layouts/helpers/Spacer';
import SectionHeader from '~/modules/coreUI/components/layouts/SectionHeader';
import { Label } from '~/modules/coreUI/components/basic/Labels';
import { responsiveStyle } from '~/modules/coreUI/utils/infereStyle';
import withMedia from '~/modules/core/utils/mediaHelpers/withMedia';

const ContentText = withMedia(styled(Label)`
  ${props => responsiveStyle(props, 'maxWidth', maxWidth => css`
    max-width: ${maxWidth * props.theme.new.spacer}px;
  `)};
  text-align: center;
`);

const ContentHeaderLabel = props => (
  <ContentText size={['lg', 'lg', 'lg', 'xxl']} semiBold important {...props} />
);

const ContentLabel = props => (
  <ContentText
    size={['md', 'md', 'md', 'lg']}
    maxWidth={[22, 22, 22, 25]}
    subtle
    {...props}
  />
);

export default ({
  title,
  subtitle,
  imagePath,
  contentHeader,
  content,
}) => (
  <Column stretchAlign>
    {(title || subtitle) &&
      <React.Fragment>
        <SectionHeader title={title} subtitle={subtitle} />
        <Spacer size={4} />
      </React.Fragment>
    }
    <img src={imagePath} alt="" />
    <Spacer size={2.5} />
    <ContentHeaderLabel>{contentHeader}</ContentHeaderLabel>
    <Spacer size={1.5} />
    <ContentLabel>{content}</ContentLabel>
  </Column>
);
