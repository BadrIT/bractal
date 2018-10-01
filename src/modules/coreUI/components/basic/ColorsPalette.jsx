import React from 'react';
import _ from 'lodash';
import { withTheme } from 'emotion-theming';
import changeCase from 'change-case';
import styled from 'react-emotion';

import { Box, Column, Row } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import Spacer from '~/modules/coreUI/components/layouts/helpers/Spacer';

import { Label } from './Labels';

const ColorBox = styled(Box)`
  width: 200px;
  height: 100px;
  background: ${props => props.color};
  border: solid 1px;
`;

const LabelsBox = styled(Column)`
  border: solid 1px;
  background: ${props => props.background};
`;

export default withTheme(({ theme }) => (
  <React.Fragment>
    <Column fullWidth>
      {_.values(_.mapValues(_.omit(theme.new.colors, 'labels'), (colorGroup, groupName) => (
        <Column fullWidth leftAligned>
          <Label xl important>{changeCase.pascalCase(groupName)}</Label>
          <Row fullWidth leftJustified spaceBetween={1}>
            {_.keys(colorGroup).map(colorKey => (
              <ColorBox color={colorGroup[colorKey]}>
                {changeCase.pascalCase(colorKey)}
                <Label xs>
                  theme.colors.{groupName}.{colorKey}
                </Label>
              </ColorBox>
            ))}
          </Row>
          <Spacer size={1} />
        </Column>
      )))}
      {_.values(_.mapValues(theme.new.colors.labels, (colorGroup, groupName) => (
        <Column fullWidth leftAligned>
          <Label xl important>{changeCase.pascalCase(groupName)} Labels</Label>
          <LabelsBox fullWidth leftAligned spaceBetween={1} background={groupName === 'inverted' && 'blue'}>
            {_.keys(colorGroup).map(colorKey => (
              <Row fullWidth leftJustified>
                <Label lg color={colorGroup[colorKey]}>
                  {changeCase.pascalCase(colorKey)} Label
                </Label>
                <Spacer size={2} />
                <Label xs color={colorGroup[colorKey]}>
                  (theme.colors.labels.{groupName}.{colorKey})
                </Label>
              </Row>
            ))}
          </LabelsBox>
          <Spacer size={1} />
        </Column>
      )))}
    </Column>
  </React.Fragment>
));
