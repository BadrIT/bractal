import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { CenterAlignedRow } from '~/modules/coreUI/components/layouts/helpers/Rows';

// TODO : Externalize the background color to the theme
export const ParagraphFooterContent = styled(CenterAlignedRow)`
  width: 100%;
  display: flex;

  line-height: ${props => props.theme.fonts.sizes.xSmall * 1.7}px;
  font-size: ${props => props.theme.fonts.sizes.small}px;
  
  ${/* // TODO : Use a color from the theme */null};
  background-color: #faf9f9;
  
  padding: 11px;
  justify-content: center;

  border-bottom-left-radius: ${props => props.theme.borders.radius.normal}px;
  border-bottom-right-radius: ${props => props.theme.borders.radius.normal}px;
`;

const Footer = ({ children }) => (
  <ParagraphFooterContent>
    {children}
  </ParagraphFooterContent>
);

Footer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Footer;
