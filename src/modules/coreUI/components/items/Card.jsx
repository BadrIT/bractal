import React from 'react';
import styled from 'styled-components';

import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { LeftAlignedColumn } from '~/modules/coreUI/components/layouts/helpers/Columns';


const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardImageContainer = styled.div`
  height: 268px;
  
  display: flex;
  align-items: center;
  justify-content: center;

  padding-bottom: 15px;
  padding-top: 15px;
  
  border-bottom: 1px solid #f5f5f5;  

  img {
    max-height: 100%;
    margin: auto !important;
    max-width: 100%;
  }
`;

const ContentContainer = styled(LeftAlignedColumn)`
  height: 62px;
`;

const StyledCard = styled(Segment)`
  margin: '1em';
  box-shadow: none !important;
`;

const Card = ({
  headerLeftRenderer,
  headerRightRenderer,
  imageRenderer,
  contentSectionRenderer,
  footerLeftRenderer,
  footerRightRenderer,
}) => (
  <StyledCard className="product-card">
    <CardHeader>
      {headerLeftRenderer}
      {headerRightRenderer}
    </CardHeader>
    <CardImageContainer>
      {imageRenderer}
    </CardImageContainer>
    <ContentContainer>
      {contentSectionRenderer}
    </ContentContainer>
    <CardFooter>
      <LeftAlignedColumn>
        {footerLeftRenderer}
      </LeftAlignedColumn>
      {footerRightRenderer}
    </CardFooter>
  </StyledCard>
);


Card.propTypes = {
  headerLeftRenderer: PropTypes.element.isRequired,
  headerRightRenderer: PropTypes.element.isRequired,
  imageRenderer: PropTypes.element.isRequired,
  contentSectionRenderer: PropTypes.element.isRequired,
  footerLeftRenderer: PropTypes.element.isRequired,
  footerRightRenderer: PropTypes.element.isRequired,
};

export default Card;
