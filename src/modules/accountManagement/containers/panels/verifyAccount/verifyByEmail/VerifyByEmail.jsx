// eslint-disable-next-line
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { CenteredParagraphPanelContent } from '~/modules/accountManagement/components/basic/Labels';
import { BasicButton } from '~/modules/coreUI/components/basic/Button';
import { LargeSpacer, XLargeSpacer, XXLargeSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';
import { Trans } from 'react-i18next';
import Image from '~/modules/coreUI/components/basic/Image';
import Panel, { PanelRoot } from '~/modules/accountManagement/components/basic/Panel';
import withUserInfo from '~/modules/core/utils/accessManagementHelpers/withUserInfo';
import { navigateToModal } from '~/modules/core/utils/modalHelpers';
import { LinearLayout } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import { Label } from '~/modules/coreUI/components/basic/Labels';
import withMutation from '~/modules/core/utils/relayHelpers/withMutation';

import ResendConfirmationCodeMutation, { ResendConfirmationCodeMutationRoot } from './ResendConfirmationCodeMutation';
import VerifyByEmailForm from './VerifyByEmailForm';

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

  onSuccess = (response) => {
    const { history, location, updateUserInfo } = this.props;

    if (!this.form || !response || !response.confirm_email) {
      return;
    }

    updateUserInfo({
      token: response.confirm_email.token,
      clientID: response.confirm_email.client_id,
      expiry: response.confirm_email.expiry,
      email: response.confirm_email.user.email,
      firstName: response.confirm_email.user.first_name,
      lastName: response.confirm_email.user.last_name,
      rememberMe: true,
    });

    navigateToModal(location, history, '/accountManagement/showSuccess');
  }

  onError = error => this.setState({ panelError: error });

  onMutationError = (error) => {
    this.setState({ panelError: JSON.stringify(error) });
  }
  onMutationSuccess = () => {
    // No-op
  }
  onMutationLoading = (isLoading) => {
    this.setState({
      isLoading,
    });
  }

  setLoadingState = (isLoading) => {
    this.setState({ isLoading });
  }

  resendEmail = () => {
    this.props.onMutationSubmit({
      email: this.props.userInfo.email,
    });
  }

  render = () => {
    const { isLoading, panelError } = this.state;

    return (
      <Panel
        titleLabel="VERIFY YOUR ACCOUNT"
        subTitleLabel="Necessary Step to active your account"
        error={panelError}
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
          <XXLargeSpacer />
          <LinearLayout row fullWidth centerAligned>
            <Label>
              { "Didn't receive the code yet," }
              &nbsp;
              <a style={{ cursor: 'pointer' }} onClick={() => this.resendEmail()}>
                Resend it
              </a>
            </Label>
          </LinearLayout>
        </InputLayout>
      </Panel>
    );
  }
}

VerficationCodeEmail.propTypes = {
  userInfo: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  updateUserInfo: PropTypes.func.isRequired,
  onMutationSubmit: PropTypes.func.isRequired,
};

export default withUserInfo(withMutation(
  VerficationCodeEmail,
  ResendConfirmationCodeMutation,
  ResendConfirmationCodeMutationRoot,
));
