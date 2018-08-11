import React from 'react';
import styled from 'styled-components';
import { Image } from 'semantic-ui-react';
import i18next from 'i18next';

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
      src={i18next.language === 'en' ? ('/images/Header/logo-english.png') : ('/images/Header/logo-header.png')}
    />
  </WidthDiv>
);

export default HomePageLogo;
