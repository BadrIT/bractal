import React from 'react';
import { Trans } from 'react-i18next';

import { SmallSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';
import { SmallLabel } from '~/modules/coreUI/components/basic/Labels';
import ModalLink from '~/modules/core/components/Modal/ModalLink';

import Footer from './Footer';

export default () => (
  <Footer>
    <SmallLabel>
      <Trans i18nKey="verifyAccount.footerTxt" />
    </SmallLabel>
    <SmallSpacer />
    <ModalLink to="/accountManagement/login">
      <Trans i18nKey="verifyAccount.footerLink" />
    </ModalLink>
  </Footer>
);
