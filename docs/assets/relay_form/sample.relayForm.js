import React, { Component } from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import { Container } from 'semantic-ui-react';
import { graphql } from 'react-relay';
import RelayForm from '~/modules/coreUI/components/forms/RelayForm';
import { SectionHeader } from '~/modules/ecommerceCoreUI/components/basic/Labels';
import { XXXXLargeSpacer, LargeSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';
import { cssMediaMax } from '~/modules/core/utils/cssHelpers/cssMedia';
import withUserInfo from '~/modules/core/utils/accessManagementHelpers/withUserInfo';
import { ErrorLabel } from '~/modules/coreUI/components/basic/Labels';

const FormMutation = graphql`
  mutation NewsletterMutation (
    $email: String!,
  ) {
    newsletter_subscribe(
      email: $email,
    ) {
      errors {
        field
        messages
      }
    }
  }
`;

const NewsletterWrapper = styled.div`
  position: relative;
  .InputLayout{
    width: 100% !important;
  }
  .form-group.form-group-depth-1.form-group-email {
    width: 50%;
    position: relative;
    ${cssMediaMax.tablet`
      width: 100%;
    `}
    input {
      padding-right: 50px;
    }
  }
`;
const SectionHeaderContent = styled(SectionHeader)`
  ${cssMediaMax.tablet`
     display: block;
     text-align: center;
     font-size: 24px;
  `}
`;
const SendButton = styled.button`
  position: absolute;
  top: 60px;
  left: 47%;
  background-color: transparent;
  border: none;
  color: #09b4f1;
  font-size: 20px;
  cursor: pointer;

  ${cssMediaMax.tablet`
    top: 49px;
    right: 3%;
    left: auto;
  `},
  :focus{
    outline: none;
  }
  :disabled{
    color: rgba(0,0,0,0.3);
  }
`;

class Newsletter extends Component {
  state = {
    panelError: null,
    isLoading: false,
  };
  onSuccess = () => {
    const { updateUserInfoTempPartial } = this.props;

    if (!this.form) {
      return;
    }

    updateUserInfoTempPartial({
      email: this.form.getValue().email,
    });
  }

  onError = (error) => {
    this.setState({ panelError: error });
  };

  setLoadingState = (isLoading) => {
    this.setState({ isLoading });
  }

  submitForm = () => {
    this.form.submitForm();
  }

  render() {
    const { isLoading, panelError } = this.state;
    return (
      <NewsletterWrapper>
        <Container>
          <SectionHeaderContent>Join Our Newsletter</SectionHeaderContent>
          <ErrorLabel>
            {panelError}
          </ErrorLabel>
          <LargeSpacer />
          <RelayForm
            onRef={(ref) => { this.form = ref; }}
            onFormError={error => this.onError(error)}
            onFormSuccess={response => this.onSuccess(response)}
            onFormLoading={loading => this.setLoadingState(loading)}
            mutationRoot="newsletter_subscribe"
            options={{
            fields: [
              {
                name: 'email',
                placeholder: 'Enter Your Email',
                input_type: 'textbox',
                type: 'RequiredString',
              },
            ],
          }}
            mutation={FormMutation}
          />
          <SendButton className="icon-send" disabled={isLoading} onClick={this.submitForm} />
          <XXXXLargeSpacer />
        </Container>
      </NewsletterWrapper>
    );
  }
}
Newsletter.propTypes = {
  updateUserInfoTempPartial: PropTypes.func.isRequired,
};

export default withUserInfo(Newsletter);
