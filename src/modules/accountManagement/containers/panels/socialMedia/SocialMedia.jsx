import React from 'react';
import { Trans } from 'react-i18next';
import styled, { css } from 'styled-components';
import Media from 'react-media';

import Icon from '~/modules/coreUI/components/basic/Icon';
import { CenterAlignedRow } from '~/modules/coreUI/components/layouts/helpers/Rows';
import { Column, CenterAlignedColumn, LeftAlignedColumn } from '~/modules/coreUI/components/layouts/helpers/Columns';
import { SocialMediaSectionTitle, SocialMediaNameLabel, SocialMediaPromptLabel } from '~/modules/accountManagement/components/basic/Labels';
import { XXXXXLargeSpacer, MediumSpacer, XXSmallSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';
import Separator from '~/modules/coreUI/components/layouts/helpers/Separator';
import { cssMediaMax, mediaQueryMin, mediaQueryMax } from '~/modules/core/utils/cssHelpers/cssMedia';

// TODO: Create one component for all these
const SocialMediaButton = styled(CenterAlignedColumn)`
  width: 117px;
  height:35px;

  color:  ${props => props.theme.colors.named.white};
  background-color: ${props => props.background};  

  font-size: ${props => props.theme.fonts.sizes.xxxSmall}px;
  font-weight: bold;
  
  display:flex;
  justify-content:center;
  flex-direction: row;
  margin-right: 10px;

  border-radius:3px;

  text-align: center;
  
  ${props => props.isInstagram && css`
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );
  `}

  ${cssMediaMax.tablet`
    width: 35px;
    height: 35px;
  `}
`;

const SocialMediaNameContainer = styled(LeftAlignedColumn)`
  color:white;
  line-height: ${props => props.theme.fonts.sizes.xxxSmall}px;

  ${cssMediaMax.tablet`
    display:none;
  `}
`;

const LeftIcon = styled(CenterAlignedColumn)`
    width: 28px;
    font-size: 23px;

    @media (max-width:1024px){
      font-size: 27px;
      padding-left: 1px;
    }
`;

const socialMedias = [
  {
    name: 'Facebook',
    icon: 'icon-fb',
    background: '#3b5998',
  },
  {
    name: 'Twitter',
    icon: 'icon-twitter',
    background: '#1da1f2',
  },
  {
    name: 'Google Plus',
    icon: 'icon-googlepls',
    background: '#db4437',
  },
  {
    name: 'Instagram',
    icon: 'icon-inst',
    background: '#f09433',
    isInstagram: true,
  },
];

// TODO: Move each to a separate comp
export default function SocialMedia() {
  return (
    <Column centerJustified centerAligned fullWidth>
      <Media
        query={mediaQueryMin('desktop')}
        render={() => (
          <Separator separatorLength="full" separatorColorTone="normal" />
        )}
      />
      <XXXXXLargeSpacer />
      <CenterAlignedColumn>
        <SocialMediaSectionTitle>
          <Trans i18nKey="CONNECTWITH" />
        </SocialMediaSectionTitle>
        <MediumSpacer />
        <CenterAlignedRow>
          {socialMedias.map(socialMedia => (
            <SocialMediaButton
              key={socialMedia.name}
              background={socialMedia.background}
              isInstagram={socialMedia.isInstagram}
            >
              <LeftIcon>
                <Icon className={socialMedia.icon} />
              </LeftIcon>
              <SocialMediaNameContainer>
                <SocialMediaPromptLabel>
                  <Trans i18nKey="LogInWith" />
                </SocialMediaPromptLabel>
                <XXSmallSpacer />
                <SocialMediaNameLabel>
                  {socialMedia.name}
                </SocialMediaNameLabel>
              </SocialMediaNameContainer>
            </SocialMediaButton>
          ))}
        </CenterAlignedRow>
        <XXXXXLargeSpacer />
        <Media
          query={mediaQueryMax('tablet')}
          render={() => (
            <XXXXXLargeSpacer />
          )}
        />
      </CenterAlignedColumn>
    </Column>
  );
}
