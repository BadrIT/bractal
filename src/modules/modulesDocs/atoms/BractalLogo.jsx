import React from 'react';
import styled from 'styled-components';
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
