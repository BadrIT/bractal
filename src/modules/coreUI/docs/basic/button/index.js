import React from 'react';
import { Row, Column } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import { Header } from '~/modules/coreUI/components/basic/Labels';
import Button from '~/modules/coreUI/components/basic/Button';

const ButtonDocs = () => (
  <Column leftAligned>
    <Header>Buttons</Header>
    <Row spaceBetween="1">
      <Column leftAligned spaceBetween="1">
        <Button xl>Click This</Button>
        <Button lg>Click This</Button>
        <Button>Click This</Button>
        <Button sm>Click This</Button>
        <Button xs>Click This</Button>
      </Column>
      <Column leftAligned spaceBetween="1">
        <Button inverted xl>Click This</Button>
        <Button inverted lg>Click This</Button>
        <Button inverted>Click This</Button>
        <Button inverted sm>Click This</Button>
        <Button inverted xs>Click This</Button>
      </Column>
      <Column leftAligned spaceBetween="1">
        <Button primary xl>Click This</Button>
        <Button primary lg>Click This</Button>
        <Button primary>Click This</Button>
        <Button primary sm>Click This</Button>
        <Button primary xs>Click This</Button>
      </Column>
      <Column leftAligned spaceBetween="1">
        <Button inverted primary xl>Click This</Button>
        <Button inverted primary lg>Click This</Button>
        <Button inverted primary>Click This</Button>
        <Button inverted primary sm>Click This</Button>
        <Button inverted primary xs>Click This</Button>
      </Column>
    </Row>
  </Column>
);

export default ButtonDocs;
