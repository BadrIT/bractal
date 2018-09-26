import React from 'react';
import styled from 'styled-components';
import { Column, Row } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import Spacer from '~/modules/coreUI/components/layouts/helpers/Spacer';
import Loader from '~/modules/coreUI/components/basic/GradientLoader';
import PropTypes from 'prop-types';

const CardContainer = styled(Column)`
  padding: 20px;
`;
const ImageLoader = styled(Loader)`
  width: ${props => props.width || (props.size || 10) * props.theme.new.spacer}px;
  height: ${props => props.height || (props.size || 10) * props.theme.new.spacer}px;
`;

const HeaderLoader = styled(Loader)`
  width: ${props => (props.width || 1) * props.theme.new.spacer}px;
  height: ${props => (props.height || 1) * props.theme.new.spacer}px;
`;

const TextLoader1 = styled(Loader)`
  width: 50%;
  height: ${props => 1 * props.theme.new.spacer}px;
`;

const TextLoader2 = styled(Loader)`
  width: 40%;
  height: ${props => 1 * props.theme.new.spacer}px;
`;

const TextLoader3 = styled(Loader)`
  width: 45%;
  height: ${props => 1 * props.theme.new.spacer}px;
`;

const TextLoader4 = styled(Loader)`
  width: 30%;
  height: ${props => 1 * props.theme.new.spacer}px;
`;

const LightCardBackground = styled(Loader)`
  animation-duration: 3s;
  background: #f6f7f8;
  background: linear-gradient(to right, #f9f9f9 8%, #f5f5f5 30%, #f9f9f9 50%);
`;
const SearchCardLoader = ({ vertical }) => (
  <LightCardBackground>
    <div>
      <CardContainer leftAligned>
        {!vertical ? (
          <Row fullWidth centerAligned spaceBetween={3}>
            <ImageLoader />
            <Row fullHeight fullWidth spaceBetweenJustified>
              <Column fullWidth leftAligned spaceBetween={1}>
                <TextLoader1 />
                <TextLoader2 />
                <TextLoader3 />
                <TextLoader4 />
              </Column>
              <Column fullHeight spaceBetweenJustified rightAligned>
                <Row spaceBetween={1}>
                  <HeaderLoader width={2} height={2} />
                  <HeaderLoader width={2} height={2} />
                </Row>
                <Spacer size={5} />
                <HeaderLoader width={2} height={2} />
              </Column>
            </Row>
          </Row>
        ) : (
          <Column fullWidth centerAligned spaceBetween={3}>
            <Row fullWidth spaceBetweenJustified>
              <HeaderLoader width={4} />
              <Row spaceBetween={1}>
                <HeaderLoader width={2} height={2} />
                <HeaderLoader width={2} height={2} />
              </Row>
            </Row>
            <ImageLoader size={20} width="100%" />
            <Column fullWidth leftAligned spaceBetween={1}>
              <TextLoader1 />
              <TextLoader2 />
              <TextLoader3 />
              <TextLoader4 />
            </Column>
          </Column>
        )}
      </CardContainer>
    </div>
  </LightCardBackground>
);

SearchCardLoader.defaultProps = {
  vertical: true,
};

SearchCardLoader.propTypes = {
  vertical: PropTypes.bool,
};

export default SearchCardLoader;
