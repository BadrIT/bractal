import React from 'react';
import styled from 'styled-components';
import { translate } from 'react-i18next';

import ModalRoute from '~/modules/core/components/Modal/ModalRoute';
import { Column } from '~/modules/coreUI/components/layouts/helpers/Columns';
import Modal from '~/modules/core/components/Modal/index';
import { cssMediaMin, cssMediaMax } from '~/modules/core/utils/cssHelpers/cssMedia';

import Login from '~/modules/accountManagement/containers/panels/login/LoginContainer';
import SuccessPanel from '~/modules/accountManagement/containers/panels/SuccessPanel';
import SocialMedia from '~/modules/accountManagement/containers/panels/socialMedia/SocialMedia';

import Signup from '~/modules/accountManagement/containers/panels/signup/SignupPanel';
import RecoverPassword from '~/modules/accountManagement/containers/panels/forgetPassword/recoverPassword/RecoverPassword';
import CreateNewPassword from '~/modules/accountManagement/containers/panels/forgetPassword/createNewPassword/CreateNewPassword';

import VerifyAccountByEmailOrSms from '~/modules/accountManagement/containers/panels/verifyAccount/veryAccountEmailOrSMS/VerifyAccountEmailOrSMSPanel';

import VerifyAccountByEmail from '~/modules/accountManagement/containers/panels/verifyAccount/verifyByEmail/VerifyByEmail';
import VerifyRecoverByEmail from '~/modules/accountManagement/containers/panels/forgetPassword/verifyByEmail/RecoverVerifyByEmail';

import ModalLoginFooter from '~/modules/accountManagement/components/footers/ModalLoginFooter';
import AykCopyRightsFooter from '~/modules/accountManagement/components/footers/AykCopyRightsFooter';

const PanelsContainer = styled(Column)` 
  justify-content: stretch;
  align-items: center;

  ${cssMediaMax.tablet`
    padding-top: 20px;
    padding-bottom: 30px;
  `}
  ${cssMediaMin.desktop`
    padding: 40px;
  `}
  
  flex-grow: 1;
`;

const PanelsFooter = styled(Column)`
  justify-self: flex-end;
`;

const backgroundImagePath = '/images/AccountManagement/panel_background/bg.png';

const ModalContent = styled(Column)`
  position: unset;

  height: 100%;
  width: 100%;

  ${cssMediaMin.desktop`
    width: 920px;
    height: 610px;
    position: relative;
  `}

  ${cssMediaMax.tablet`
    min-height: 100vh;
  `}

  align-items: stretch;
  justify-content: space-between;

  background-color: ${props => props.theme.colors.named.white};

  border: 1px solid;
  border-radius: ${props => props.theme.borders.radius.normal}px;
  border-color: white; 

  ${cssMediaMin.desktop`
    background-image: url(${backgroundImagePath});
    background-repeat: no-repeat;
    background-position: right top;
  `}
`;

const AccountManagementModals = () => (
  <Modal>
    <ModalContent>
      <PanelsContainer>
        <ModalRoute exact path="/accountManagement/login" component={Login} />
        <ModalRoute exact path="/accountManagement/showSuccess" component={SuccessPanel} />

        <ModalRoute exact path="/accountManagement/singup" component={Signup} />

        <ModalRoute exact path="/accountManagement/recoverPassword" component={RecoverPassword} />
        <ModalRoute exact path="/accountManagement/recoverpassword/VerifyByEmail" component={VerifyRecoverByEmail} />
        <ModalRoute exact path="/accountManagement/recoverpassword/CreateNewPassword" component={CreateNewPassword} />

        <ModalRoute exact path="/accountManagement/VerifyAccountEmailOrSms" component={VerifyAccountByEmailOrSms} />
        <ModalRoute exact path="/accountManagement/VerifyByEmail" component={VerifyAccountByEmail} />
      </PanelsContainer>


      <PanelsFooter>
        <ModalRoute exact path="/accountManagement/login" component={SocialMedia} />

        <ModalRoute exact path="/accountManagement/singup" component={SocialMedia} />
        <ModalRoute exact path="/accountManagement/singup" component={ModalLoginFooter} />

        <ModalRoute exact path="/accountManagement/VerifyAccountEmailOrSms" component={ModalLoginFooter} />

        <ModalRoute exact path="/accountManagement/VerifyByEmail" component={SocialMedia} />
        <ModalRoute exact path="/accountManagement/VerifyByEmail" component={ModalLoginFooter} />

        <ModalRoute exact path="/accountManagement/recoverPassword" component={ModalLoginFooter} />

        <ModalRoute exact path="/accountManagement/recoverpassword/VerifyByEmail" component={SocialMedia} />
        <ModalRoute exact path="/accountManagement/recoverpassword/VerifyByEmail" component={AykCopyRightsFooter} />

        <ModalRoute exact path="/accountManagement/recoverpassword/CreateNewPassword" component={ModalLoginFooter} />
      </PanelsFooter>
    </ModalContent>
  </Modal>
);

export default translate('accountManagement')(AccountManagementModals);
