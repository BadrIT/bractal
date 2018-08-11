import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { CenteredParagraphPanelContent } from '~/modules/accountManagement/components/basic/Labels';
import Image from '~/modules/coreUI/components/basic/Image';
import { BasicButton } from '~/modules/coreUI/components/basic/Button';
import { MediumSpacer, XXXXXLargeSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';
import { Trans } from 'react-i18next';
import { navigateToModal } from '~/modules/core/utils/modalHelpers';
import Panel from '~/modules/accountManagement/components/basic/Panel';
import withUserInfo from '~/modules/core/utils/accessManagementHelpers/withUserInfo';

import CreateNewPasswordForm from './CreateNewPasswordForm';


const RecoverPasswordImage = styled(Image)`
  height: unset;
  width: unset;
  max-height: 80px;
`;

const IMAGE_PATH = '/images/accountManagement/forgetPassword/renewPassword';

class CreateNewPassword extends React.Component {
  state = {
    panelError: null,
    isLoading: false,
  };

  onSuccess = () => {
    const { history, location } = this.props;

    navigateToModal(location, history, '/accountManagement/showSuccess');
  }

  onError = error => this.setState({ panelError: error });

  setLoadingState = (isLoading) => {
    this.setState({
      isLoading,
    });
  }

  render = () => {
    const { isLoading, panelError } = this.state;
    const { userInfo } = this.props;

    let currentPanelError = panelError;
    if (!userInfo || !userInfo.email || !userInfo.code) {
      currentPanelError = 'Email not found, go back and re-enter your email, or contact customer support';
    }

    return (
      <Panel
        titleLabel="RECOVER YOUR PASSWORD"
        subTitleLabel="Follow the steps to reset your password"
        error={currentPanelError}
      >
        <RecoverPasswordImage
          src={`${IMAGE_PATH}/finger.png`}
          srcset={`${IMAGE_PATH}/finger@2x.png 2x,
          ${IMAGE_PATH}/finger@3x.png 3x`}
        />
        <XXXXXLargeSpacer />
        <CenteredParagraphPanelContent>
          <Trans i18nKey="CreateNewPassword.CreateNewPassParagraph" />
        </CenteredParagraphPanelContent>
        <MediumSpacer />
        <CreateNewPasswordForm
          ref={(ref) => { this.form = ref; }}
          addiontalMutationVariables={{
            email: userInfo && userInfo.email,
            code: userInfo && userInfo.code,
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
          <Trans i18nKey="CreateNewPassword.Button" />
        </BasicButton>
      </Panel>
    );
  };
}

CreateNewPassword.propTypes = {
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  userInfo: PropTypes.shape({}).isRequired,
};

export default withUserInfo(CreateNewPassword);
