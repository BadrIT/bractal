import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { Trans } from 'react-i18next';
import PropTypes from 'prop-types';

export default class RegisterData extends Component {
  toggleLoginContnt = () => {
    this.props.toggleLoginContent();
    this.props.toggleCreateAccountContent();
  };
  render() {
    return (
      <div>
        <Grid.Row>
          <div className="createAccount">
            <div className="BkHdr">
              <Header as="h3" textAlign="center" className="Hdr">
                <Trans i18nKey="REGISTER" />
              </Header>
              <p className="TextCenter">
                {' '}<Trans i18nKey="JoinOurCommunity" />
              </p>
            </div>
            <div className="crteAcuntSec">
              <Grid.Column className="TextCenter">
                <div className="FixedHeight">
                  <div className="AYKMailLogo">
                    <img src="/images/AccountManagement/logo.png" alt="Ayk Logo" />
                  </div>
                  <p className="TextCenter RegisterTxt">
                    <Trans i18nKey="Login_Lorem" />
                  </p>
                </div>
                <button
                  className="creatAccBtn"
                  onClick={this.toggleLoginContnt}
                >
                  <Trans i18nKey="CreateAnAccount" />
                </button>
              </Grid.Column>
            </div>
          </div>
        </Grid.Row>
      </div>
    );
  }
}
RegisterData.propTypes = {
  toggleLoginContnt: PropTypes.func.isRequired,
  toggleCreateAccountContent: PropTypes.func.isRequired,
}.isRequired;

