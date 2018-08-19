import React from 'react';
import styled from 'styled-components';
import { Image } from 'semantic-ui-react';

const LogoImage = styled(Image)`
  padding: 0px;
`;
const WidthDiv = styled.div`
height:70px;
`;
const HomePageLogo = props => (
  <WidthDiv>
    <LogoImage
      {...props}
      src="/images/Header/logo-english.png"
    />
  </WidthDiv>
);

export default HomePageLogo;
