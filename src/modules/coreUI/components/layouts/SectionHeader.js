/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from '@emotion/styled';
import { Column } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import { Header } from '~/modules/coreUI/components/basic/Labels';
import { cssMediaMax } from '~/modules/core/utils/cssHelpers/cssMedia';

const HeaderContainer = styled(Column)`
  align-items: center;
  ${props => props.customStyle && props.customStyle(props)}
`;

const HeaderLabel = styled(Header)`
  color: ${props => props.theme.colors.primary};
  ${props => cssMediaMax.tablet`
    font-size: ${props.theme.new.fonts.sizes.xxl}px;
  `}
  ${props => cssMediaMax.mobile`
    font-size: ${props.theme.new.fonts.sizes.xl}px;
  `}

  ${props => props.customStyle && props.customStyle(props)}
`;

const EmphasizedText = styled.span`
  font-size: ${props => props.theme.fonts.sizes.large}px;
  color: ${props => props.theme.colors.primary};
  ${props => cssMediaMax.tablet`
    font-size: ${props.theme.new.fonts.sizes.sm}px;
  `}
  ${props => cssMediaMax.mobile`
    font-size: ${props.theme.new.fonts.sizes.xs}px;
  `}

  ${props => props.customStyle && props.customStyle(props)}
`;

const SubHeaderLabel = styled.div`
  color: ${props => props.theme.colors.labels.subtle};
  font-size: ${props => props.theme.fonts.sizes.large}px;
  text-align: center;
  ${props => cssMediaMax.tablet`
    font-size: ${props.theme.new.fonts.sizes.sm}px;
  `}
  ${props => cssMediaMax.mobile`
    font-size: ${props.theme.new.fonts.sizes.xs}px;
  `}
  ${props => props.customStyle && props.customStyle(props)}
`;

const getSubtitleArray = (subtitle) => {
  const regex = /(.*?)<e>(.*?)<\/e>|(.+)/g;
  const result = [];

  let match = null;
  do {
    match = regex.exec(subtitle);
    if (match != null) {
      const fullMatch = match[0];
      const normalText = match[1];
      const emphasizedPart = match[2];

      if (emphasizedPart) {
        result.push({
          text: normalText,
          emphasized: emphasizedPart,
        });
      } else {
        result.push({
          text: fullMatch,
        });
      }
    }
  } while (match != null);

  return result;
};

export default ({
  title,
  subtitle,
  headerStyle,
  headerLabelStyle,
  subHeaderLabelStyle,
  emphasizedTextStyle,
}) => (
  <HeaderContainer centerAligned spaceBetween={0.5} customStyle={headerStyle}>
    <HeaderLabel customStyle={headerLabelStyle}>{title}</HeaderLabel>
    {subtitle &&
      <SubHeaderLabel customStyle={subHeaderLabelStyle}>
        {getSubtitleArray(subtitle).map((subtitlePart, index) => (
          <React.Fragment key={index}>
            {subtitlePart.emphasized ? (
              <React.Fragment>
                {subtitlePart.text}
                <EmphasizedText
                  customStyle={emphasizedTextStyle}
                >
                  {subtitlePart.emphasized}
                </EmphasizedText>
              </React.Fragment>
            ) : (
              subtitlePart.text
            )}
          </React.Fragment>
        ))}
      </SubHeaderLabel>
    }
  </HeaderContainer>
);
