import React from 'react';
import styled from 'styled-components';
import { Trans } from 'react-i18next';
import Media from 'react-media';
import PropTypes from 'prop-types';

import { ParagraphPanelContent } from '~/modules/accountManagement/components/basic/Labels';
import { CenterAlignedColumn, LeftAlignedColumn } from '~/modules/coreUI/components/layouts/helpers/Columns';
import { CenterAlignedRow } from '~/modules/coreUI/components/layouts/helpers/Rows';
import { LinearLayout } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import { BasicButton } from '~/modules/coreUI/components/basic/Button';
import { MediumSpacer, XLargeSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';
import Panel, { PanelRoot } from '~/modules/accountManagement/components/basic/Panel';
import { cssMediaMax, mediaQueryMin } from '~/modules/core/utils/cssHelpers/cssMedia';

import HomePageLogo from '~/modules/coreUI/components/projects/HomePageLogo';
import withMutation from '~/modules/core/utils/relayHelpers/withMutation';
import withUserInfo from '~/modules/core/utils/accessManagementHelpers/withUserInfo';

import { navigateToModal } from '~/modules/core/utils/modalHelpers';

import ResendConfirmationCodeMutation, { ResendConfirmationCodeMutationRoot } from '~/modules/accountManagement/containers/panels/verifyAccount/verifyByEmail/ResendConfirmationCodeMutation';

const InputLayout = styled(PanelRoot)`
  display: flex;
  align-items: stretch;

  ${cssMediaMax.mobile`
    width: 270px;
  `}
  ${cssMediaMax.tablet`
    width: 220px;
  `}
`;

const ResponsivePanel = styled(Panel)`
  ${cssMediaMax.mobile`
    width: 90%;
  `}
`;

const MediumLogo = styled(HomePageLogo)`
  height: unset;
  width: unset;
  max-width: 80px;
`;

const SpacedList = styled.ul`
  &&& {
    width:90%;

    margin-top: 0px;
    margin-bottom: 0px;

    ${cssMediaMax.tablet`
      margin: auto; 
    `}
    
    li {
      margin-top: 10px;
    }
  }
`;

class EmailOrSMS extends React.Component {
  state = {
    panelError: null,
    isLoading: false,
  };

  componentDidMount = () => {
    if (!this.props.userInfo || !this.props.userInfo.email) {
      this.setState({
        panelError: 'Seems like you reached here by mistake, email is missing, kindly go to the previous step and try again',
      });
    }
  }

  onMutationError = (error) => {
    this.setState({ panelError: JSON.stringify(error) });
  }
  onMutationSuccess = () => {
    navigateToModal(this.props.location, this.props.history, '/accountManagement/VerifyByEmail');
  }
  onMutationLoading = (isLoading) => {
    this.setState({
      isLoading,
    });
  }
  verifyByEmail = () => {
    this.props.onMutationSubmit({
      email: this.props.userInfo.email,
    });
  }
  render = () => (
    <ResponsivePanel
      titleLabel="VERIFY YOUR ACCOUNT"
      subTitleLabel="Necessary Step to active your account"
      error={this.state.panelError}
    >
      <CenterAlignedColumn>
        <MediumLogo />
        <XLargeSpacer />
        <ParagraphPanelContent>
          <CenterAlignedRow>
            <CenterAlignedColumn>
              <Trans i18nKey="verifyAccount.verifyParagraph" />
            </CenterAlignedColumn>
          </CenterAlignedRow>
        </ParagraphPanelContent>
        <MediumSpacer />
        <Media query={mediaQueryMin('mobile')}>
          {isOnDesktop => (
            <LinearLayout row={isOnDesktop}>
              <InputLayout>
                <BasicButton disabled={this.state.isLoading} loading={this.state.isLoading} onClicked={this.verifyByEmail} width="100%">
                  <Trans i18nKey="verifyAccount.VerifyByMail" />
                </BasicButton>
              </InputLayout>
              <MediumSpacer />
              <InputLayout>
                <BasicButton disabled={this.state.isLoading} width="100%">
                  <Trans i18nKey="verifyAccount.VerifyBySMS" />
                </BasicButton>
              </InputLayout>
            </LinearLayout>
          )}
        </Media>
        <MediumSpacer />
        <LeftAlignedColumn>
          <SpacedList>
            <li key="1">
              <span>
                <b> <Trans i18nKey="verifyAccount.VerifyByMail" /> </b>
                <Trans i18nKey="verifyAccount.VerifyEmailTxt" />
              </span>
            </li>
            <li key="2">
              <span>
                <b> <Trans i18nKey="verifyAccount.VerifyBySMS" /> </b>
                <Trans i18nKey="verifyAccount.VerifySMSTxt" />
              </span>
            </li>
          </SpacedList>
        </LeftAlignedColumn>
      </CenterAlignedColumn>
    </ResponsivePanel>
  );
}

EmailOrSMS.propTypes = {
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  onMutationSubmit: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default withUserInfo(withMutation(
  EmailOrSMS,
  ResendConfirmationCodeMutation,
  ResendConfirmationCodeMutationRoot,
));
