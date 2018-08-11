import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import styled from 'styled-components';

import { CenterAlignedRow } from '~/modules/coreUI/components/layouts/helpers/Rows';
import { BasicButton } from '~/modules/coreUI/components/basic/Button';
import { LargeSpacer, XXXXXLargeSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';
import withRelayEnvironment from '~/modules/core/utils/relayHelpers/withRelayEnvironment';
import { mediaQueryMin } from '~/modules/core/utils/cssHelpers/cssMedia';
import { CenterAlignedColumn } from '~/modules/coreUI/components/layouts/helpers/Columns';
import Panel, { PanelRoot } from '~/modules/accountManagement/components/basic/Panel';
import Separator from '~/modules/coreUI/components/layouts/helpers/Separator';
import { navigateToModal, scrollCurrentModalToTop } from '~/modules/core/utils/modalHelpers';
import withUserInfo from '~/modules/core/utils/accessManagementHelpers/withUserInfo';

import SignupForm from './SignupForm';

const InputLayout = styled(PanelRoot)`
  display: flex;
  align-items: stretch;
`;
const DesktopFormLayout = locals => (
  <CenterAlignedRow>
    <CenterAlignedColumn>
      <CenterAlignedRow>
        <CenterAlignedColumn>
          <InputLayout>
            <div>{locals.inputs.first_name}</div>
            <div>{locals.inputs.email}</div>
            <div>{locals.inputs.nationality}</div>
          </InputLayout>
        </CenterAlignedColumn>
        <LargeSpacer />
        <CenterAlignedColumn>
          <InputLayout>
            <div>{locals.inputs.last_name}</div>
            <div>{locals.inputs.password}</div>
            <div>{locals.inputs.mobile_number}</div>
          </InputLayout>
        </CenterAlignedColumn>
      </CenterAlignedRow>
      <InputLayout>
        <div>{locals.inputs.gender}</div>
      </InputLayout>
    </CenterAlignedColumn>
    <Separator
      vertical
      spacerSize="xxxxxLarge"
      separatorLength="full"
      separatorColorTone="normal"
    />
    <InputLayout>
      <div>{locals.inputs.register_for_news}</div>
      <BasicButton
        loading={locals.context.isLoading}
        disabled={locals.context.isLoading}
        secondary
        onClicked={() => locals.context.onSubmit()}
      >
        Signup
      </BasicButton>
      <XXXXXLargeSpacer />
    </InputLayout>
  </CenterAlignedRow>
);

class SignupPanel extends React.Component {
  state = {
    panelError: null,
    isLoading: false,
  };

  onSuccess = (response) => {
    const { history, location, updateUserInfo } = this.props;

    if (!this.form || !response || !response.create_user) {
      return;
    }

    updateUserInfo({
      token: response.create_user.token,
      clientID: response.create_user.client_id,
      expiry: response.create_user.expiry,
      email: response.create_user.user.email,
      firstName: response.create_user.user.first_name,
      lastName: response.create_user.user.last_name,
      rememberMe: true, // TODO : Double check this ??
    });

    navigateToModal(location, history, '/accountManagement/VerifyAccountEmailOrSms');
  }

  onError = (error) => {
    this.setState({ panelError: error });
    scrollCurrentModalToTop();
  }

  setLoadingState = (isLoading) => {
    this.setState({ isLoading });
  }

  render = () => {
    const { isLoading, panelError } = this.state;

    return (
      <Media query={mediaQueryMin('desktop')}>
        {isOnDesktop => (
          <Panel
            titleLabel="Register"
            subTitleLabel="Join our community"
            error={panelError}
            panelWidth={isOnDesktop ? '100%' : null}
          >
            <React.Fragment>
              <SignupForm
                onRef={(ref) => { this.form = ref; }}
                customLayout={isOnDesktop ? DesktopFormLayout : null}
                customInputsContainer={isOnDesktop ? null : InputLayout}
                onFormError={error => this.onError(error)}
                onFormSuccess={response => this.onSuccess(response)}
                onFormLoading={loading => this.setLoadingState(loading)}
              />
              {!isOnDesktop &&
                <InputLayout>
                  <BasicButton
                    loading={isLoading}
                    disabled={isLoading}
                    secondary
                    onClicked={() => this.form.submitForm()}
                  >
                    Signup
                  </BasicButton>
                </InputLayout>
              }
            </React.Fragment>
          </Panel>
        )}
      </Media>
    );
  };
}

SignupPanel.propTypes = PropTypes.shape({
  panelContentContainer: PropTypes.element,
}).isRequired;

export default withRelayEnvironment(withUserInfo(SignupPanel));
