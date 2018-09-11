import React from 'react';
import { Row, Column } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import { Header } from '~/modules/coreUI/components/basic/Labels';
import Button from '~/modules/coreUI/components/basic/Button';

const ButtonDocs = () => (
  <Column leftAligned>
    <Header>Buttons</Header>
    <Row s_spaceBetween_2>
      <Column leftAligned s_spaceBetween_2>
        <Button s_xl>Click This</Button>
        <Button s_lg>Click This</Button>
        <Button>Click This</Button>
        <Button s_sm>Click This</Button>
        <Button s_xs>Click This</Button>
      </Column>
      <Column leftAligned s_spaceBetween_2>
        <Button s_inverted s_xl>Click This</Button>
        <Button s_inverted s_lg>Click This</Button>
        <Button s_inverted>Click This</Button>
        <Button s_inverted s_sm>Click This</Button>
        <Button s_inverted s_xs>Click This</Button>
      </Column>
      <Column leftAligned s_spaceBetween_2>
        <Button s_primary s_xl>Click This</Button>
        <Button s_primary s_lg>Click This</Button>
        <Button s_primary>Click This</Button>
        <Button s_primary s_sm>Click This</Button>
        <Button s_primary s_xs>Click This</Button>
      </Column>
      <Column leftAligned s_spaceBetween_2>
        <Button s_inverted s_primary s_xl>Click This</Button>
        <Button s_inverted s_primary s_lg>Click This</Button>
        <Button s_inverted s_primary>Click This</Button>
        <Button s_inverted s_primary s_sm>Click This</Button>
        <Button s_inverted s_primary s_xs>Click This</Button>
      </Column>
    </Row>
  </Column>
);

export default ButtonDocs;
