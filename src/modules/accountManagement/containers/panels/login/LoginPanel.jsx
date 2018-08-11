import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { PanelContentMinorLabel, PanelContentSmallLabel } from '~/modules/accountManagement/components/basic/Labels';
import { Row, CenterAlignedRow } from '~/modules/coreUI/components/layouts/helpers/Rows';
import { BasicButton } from '~/modules/coreUI/components/basic/Button';
import ModalLink from '~/modules/core/components/Modal/ModalLink';
import { XSmallSpacer, LargeSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';
import withRelayEnvironment from '~/modules/core/utils/relayHelpers/withRelayEnvironment';
import { RightAlignedColumn } from '~/modules/coreUI/components/layouts/helpers/Columns';
import withUserInfo from '~/modules/core/utils/accessManagementHelpers/withUserInfo';
import { navigateToModal } from '~/modules/core/utils/modalHelpers';

import LoginForm from './LoginForm';

const InputLayout = styled.div`
  width: 100%;  
`;
const CustomFormLayout = locals => (
  <InputLayout>
    <div>{locals.inputs.user_signin}</div>
    <div>{locals.inputs.password}</div>
    <Row spaceBetweenJustified topAligned fullWidth>
      <div>{locals.inputs.remember_me}</div>
      <PanelContentSmallLabel>
        <RightAlignedColumn>
          <XSmallSpacer />
          <ModalLink to="/accountManagement/recoverPassword">
            Lost Your Password
          </ModalLink>
        </RightAlignedColumn>
      </PanelContentSmallLabel>
    </Row>
  </InputLayout>
);

class LoginPanel extends React.Component {
  state = {
    panelError: null,
    isLoading: false,
  };

  onSuccess = (response) => {
    const { history, location, updateUserInfo } = this.props;

    if (!this.form || !response || !response.signin_user) {
      return;
    }

    updateUserInfo({
      token: response.signin_user.token,
      clientID: response.signin_user.client_id,
      expiry: response.signin_user.expiry,
      email: response.signin_user.user.email,
      firstName: response.signin_user.user.first_name,
      lastName: response.signin_user.user.last_name,
      rememberMe: this.form.getValue().remember_me,
    });

    navigateToModal(location, history, '/accountManagement/showSuccess');
  }

  onError = (error) => {
    const { invalidateUser } = this.props;

    if (!this.form) {
      return;
    }

    this.setState({ panelError: error });

    if (error) {
      invalidateUser();
    }
  }

  setLoadingState = (isLoading) => {
    this.setState({ isLoading });
  }

  render = () => {
    const { panelContentContainer, panelContainer } = this.props;
    const { isLoading, panelError } = this.state;
    const ContentContainer = panelContentContainer;
    const PanelContainer = panelContainer;

    return (
      <PanelContainer
        titleLabel="Login"
        subTitleLabel="Get in, and discover your daily gift"
        error={panelError}
      >
        <ContentContainer>
          <LoginForm
            // FIXME : React sees the LoginForm as a stateless function and complalins when the
            //        Normal 'ref' is used
            onRef={(ref) => { this.form = ref; }}
            customLayout={CustomFormLayout}
            onFormError={error => this.onError(error)}
            onFormSuccess={response => this.onSuccess(response)}
            onFormLoading={loading => this.setLoadingState(loading)}
          />
          <BasicButton
            secondary
            disabled={isLoading}
            loading={isLoading}
            onClicked={() => this.form.submitForm()}
          >
            Login
          </BasicButton>
          <LargeSpacer />
          <PanelContentMinorLabel>
            <CenterAlignedRow>
              <ModalLink to="/accountManagement/recoverPassword">
                Terms &amp; Conditions
              </ModalLink>
            </CenterAlignedRow>
          </PanelContentMinorLabel>
        </ContentContainer>
      </PanelContainer>
    );
  };
}

LoginPanel.propTypes = PropTypes.shape({
  panelContentContainer: PropTypes.element,
  userInfo: PropTypes.shape({}),
}).isRequired;

export default withRelayEnvironment(withUserInfo(withRouter(LoginPanel)));
