/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { Column, Row, LinearLayout } from './LinearLayout';
import Separator from './Separator';

const GridContainer = styled.div`
  display: grid;
  grid-template: ${props => props.gridTemplate};
  width: ${props => props.width};
`;

export const FullWidthColumn = props => (
  <Column
    {...props}
    fullWidth
  />);

export const GridArea = styled(FullWidthColumn)`
  grid-area: ${props => props.gridArea};
  justify-self: ${props => props.justify};
  line-height: 1;
`;

export const ProductDetailsVerticalSeparator = props => (
  <Row fullWidth fullHeight>
    <Separator
      {...props}
      vertical
      separatorLength="full"
    />
  </Row>
);

export const ProductDetailsHorizontalSeparator = props => (
  <Column fullWidth fullHeight>
    <Separator
      {...props}
      separatorLength="full"
    />
  </Column>
);

// OBSOLETE OBSOLETE OBSOLETE Wallahy, use GridArea
export const GridItem = styled.div`
  grid-area: ${props => props.gridArea};
  line-height: 1;
`;

export const BottomBorderedGridArea = ({ row, ...rest }) => (
  <GridArea {...rest}>
    <LinearLayout {...rest} row={row} fullWidth >
      {rest.children}
    </LinearLayout>
    {rest.children && <ProductDetailsHorizontalSeparator />}
  </GridArea>
);

export default function GridLayout(props) {
  return (
    <GridContainer gridTemplate={props.gridTemplate} {...props}>
      {props.children}
    </GridContainer>
  );
}

GridLayout.propTypes = {
  gridTemplate: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
