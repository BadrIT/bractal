import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { CenteredParagraphPanelContent } from '~/modules/accountManagement/components/basic/Labels';
import { BasicButton } from '~/modules/coreUI/components/basic/Button';
import { LargeSpacer, XLargeSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';
import { Trans } from 'react-i18next';
import Image from '~/modules/coreUI/components/basic/Image';
import Panel, { PanelRoot } from '~/modules/accountManagement/components/basic/Panel';
import withUserInfo from '~/modules/core/utils/accessManagementHelpers/withUserInfo';
import { navigateToModal } from '~/modules/core/utils/modalHelpers';

import VerifyByEmailForm from './RecoverVerifyByEmailForm';

const IMAGE_PATH = '/images/AccountManagement';

const RecoverPasswordImage = styled(Image)`
  height: unset;
  width: unset;
  max-height: 80px;
`;

const InputLayout = styled(PanelRoot)`
  display: flex;
  align-items: stretch;
`;

class VerficationCodeEmail extends React.Component {
  state = {
    panelError: null,
    isLoading: false,
  };

  onSuccess = () => {
    const {
      history,
      location,
      updateUserInfoTempPartial,
      userInfo,
    } = this.props;

    if (!this.form) {
      return;
    }

    updateUserInfoTempPartial({
      email: userInfo.email,
      code: this.form.getValue().code,
    });

    navigateToModal(location, history, '/accountManagement/recoverpassword/CreateNewPassword');
  }

  onError = error => this.setState({ panelError: error });

  setLoadingState = (isLoading) => {
    this.setState({ isLoading });
  }

  render = () => {
    const { isLoading, panelError } = this.state;
    const { userInfo } = this.props;

    let currentPanelError = panelError;
    if (!userInfo || !userInfo.email) {
      currentPanelError = 'Email not found, go back and re-enter your email, or contact customer support';
    }

    return (
      <Panel
        titleLabel="RECOVER YOUR PASSWORD"
        subTitleLabel="Follow the steps to reset your password"
        error={currentPanelError}
        panelWidth="100%"
      >
        <RecoverPasswordImage
          src={`${IMAGE_PATH}/SMSImages.png`}
          srcset={`${IMAGE_PATH}/SMSImages.png 2x,
          ${IMAGE_PATH}/SMSImages.png 3x`}
        />
        <LargeSpacer />
        <XLargeSpacer />
        <CenteredParagraphPanelContent>
          <Trans i18nKey="verifyAccount.EmailTxt" />
        </CenteredParagraphPanelContent>
        <XLargeSpacer />
        <InputLayout>
          <VerifyByEmailForm
            ref={(ref) => { this.form = ref; }}
            addiontalMutationVariables={{
              email: userInfo && userInfo.email,
            }}
            onFormError={error => this.onError(error)}
            onFormSuccess={response => this.onSuccess(response)}
            onFormLoading={loading => this.setLoadingState(loading)}
          />
          <BasicButton
            loading={isLoading}
            disabled={isLoading}
            onClicked={() => this.form.submitForm()}
          >
            <Trans i18nKey="verifyAccount.ButtonCreateAccount" />
          </BasicButton>
        </InputLayout>
      </Panel>
    );
  }
}

VerficationCodeEmail.propTypes = {
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  userInfo: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  updateUserInfoTempPartial: PropTypes.func.isRequired,
};

export default withUserInfo(VerficationCodeEmail);
