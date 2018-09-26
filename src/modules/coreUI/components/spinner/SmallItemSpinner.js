import React from 'react';
import styled from 'styled-components';
import { TopAlignedRow } from '~/modules/coreUI/components/layouts/helpers/Rows';
import { LeftAlignedColumn } from '~/modules/coreUI/components/layouts/helpers/Columns';
import { LargeSpacer, SmallSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';
import Loader from '~/modules/coreUI/components/basic/GradientLoader';

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

const SearchCardLoader = () => (
  <div>
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
  </div>
);

export default SearchCardLoader;
