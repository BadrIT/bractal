import React from 'react';
import styled from '@emotion/styled';
import { Image } from 'semantic-ui-react';

const LogoImage = styled(Image)`
  padding: 0px;
`;

const HomePageLogo = props => (
  <LogoImage
    {...props}
    src="/images/Header/logo-english.png"
  />
);

export default HomePageLogo;
