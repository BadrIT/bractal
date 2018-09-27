import React from 'react';
import styled from 'styled-components';
import { TopAlignedRow } from '~/modules/coreUI/components/layouts/helpers/Rows';
import { LeftAlignedColumn } from '~/modules/coreUI/components/layouts/helpers/Columns';
import { LargeSpacer, SmallSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';
import Loader from './GradientLoader';

const ImageLoader = styled(Loader)`
  width: ${props => 5 * props.theme.new.spacer}px;
  height: ${props => 5 * props.theme.new.spacer}px;
`;

const TextLoader1 = styled(Loader)`
  width: ${props => 20 * props.theme.new.spacer}px;
  height: ${props => 0.75 * props.theme.new.spacer}px;
`;

const TextLoader2 = styled(Loader)`
  width: ${props => 10 * props.theme.new.spacer}px;
  height: ${props => 0.75 * props.theme.new.spacer}px;
`;

const RowVerticalAligned = styled(TopAlignedRow)`
  align-items: center;
`;
const LightCardBackground = styled(Loader)`
  width: 100%;
  animation-duration: 3s;
  background: #f6f7f8;
  background: linear-gradient(to right, #f9f9f9 8%, #f5f5f5 30%, #f9f9f9 50%);
`;
const CardContainer = styled.div`
  padding-left: ${props => 1.5 * props.theme.new.spacer}px;
`;
const SearchCardLoader = () => (
  <LightCardBackground>
    <CardContainer>
      <LargeSpacer />
      <RowVerticalAligned>
        <ImageLoader />
        <LargeSpacer />
        <LeftAlignedColumn>
          <TextLoader1 />
          <SmallSpacer />
          <TextLoader2 />
        </LeftAlignedColumn>
      </RowVerticalAligned>
      <LargeSpacer />
    </CardContainer>
  </LightCardBackground>
);

export default SearchCardLoader;
