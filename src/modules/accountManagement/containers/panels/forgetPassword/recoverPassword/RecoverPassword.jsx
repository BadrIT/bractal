import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ParagraphPanelContent } from '~/modules/accountManagement/components/basic/Labels';
import { LeftAlignedColumn } from '~/modules/coreUI/components/layouts/helpers/Columns';
import Image from '~/modules/coreUI/components/basic/Image';
import { BasicButton } from '~/modules/coreUI/components/basic/Button';
import { MediumSpacer, XXXXXLargeSpacer, XLargeSpacer, XXLargeSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';
import { Trans } from 'react-i18next';
import Panel from '~/modules/accountManagement/components/basic/Panel';
import { navigateToModal } from '~/modules/core/utils/modalHelpers';
import withUserInfo from '~/modules/core/utils/accessManagementHelpers/withUserInfo';

import RecoverPasswordForm from './RecoverPasswordForm';

const RecoverPasswordImage = styled(Image)`
  height: unset;
  width: unset;
  max-height: 120px;
`;

const IMAGE_PATH = '/images/accountManagement/forgetPassword/recoverPassword';


class RecoverPasswords extends React.Component {
  state = {
    panelError: null,
    isLoading: false,
  };

  onSuccess = () => {
    const { history, location, updateUserInfoTempPartial } = this.props;

    if (!this.form) {
      return;
    }

    updateUserInfoTempPartial({
      email: this.form.getValue().email,
    });

    navigateToModal(location, history, '/accountManagement/recoverpassword/VerifyByEmail');
  }

  onError = error => this.setState({ panelError: error });

  setLoadingState = (isLoading) => {
    this.setState({ isLoading });
  }

  render = () => {
    const { isLoading, panelError } = this.state;

    return (
      <Panel
        titleLabel="RECOVER YOUR PASSWORD"
        subTitleLabel="Follow the steps to reset your password"
        error={panelError}
      >
        <XXXXXLargeSpacer />
        <RecoverPasswordImage
          src={`${IMAGE_PATH}/image@2x.png`}
          srcset={`${IMAGE_PATH}/image@2x.png 2x,
          ${IMAGE_PATH}/image@3x.png 3x`}
        />
        <XXXXXLargeSpacer />
        <ParagraphPanelContent>
          <LeftAlignedColumn>
            <Trans i18nKey="recoverPassword.Enteryourusernameemailaddress" />
          </LeftAlignedColumn>
        </ParagraphPanelContent>
        <MediumSpacer />
        <RecoverPasswordForm
          ref={(ref) => { this.form = ref; }}
          onFormError={error => this.onError(error)}
          onFormSuccess={response => this.onSuccess(response)}
          onFormLoading={loading => this.setLoadingState(loading)}
        />
        <XLargeSpacer />
        <BasicButton
          loading={isLoading}
          disabled={isLoading}
          onClicked={() => this.form.submitForm()}
        >
          <Trans i18nKey="recoverPassword.Button" />
        </BasicButton>
        <XXLargeSpacer />
      </Panel>
    );
  }
}

RecoverPasswords.propTypes = {
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  updateUserInfoTempPartial: PropTypes.func.isRequired,
};

export default withUserInfo(RecoverPasswords);
