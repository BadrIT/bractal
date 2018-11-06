import React from 'react';
import styled from 'react-emotion';
import { Image } from 'semantic-ui-react';

const LogoImage = styled(Image)`
  padding: 0px;
  max-height: 35px;
`;

const HomePageLogo = props => (
  <LogoImage
    {...props}
    src="/images/Header/logo-icon.png"
  />
);

export default HomePageLogo;
