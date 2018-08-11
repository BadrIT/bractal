// eslint-disable-next-line
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import i18next from 'i18next';

export default class EmailOrSms extends Component {
  handleChange = (event) => {
    this.props.handleChange(event);
  };
  handleVerifyCode = (event) => {
    this.props.handleVerifyCode(event);
  };
  ResendAccountConfiramtion = (event) => {
    this.props.ResendAccountConfiramtion(event);
  };
  render() {
    return (
      <div>
        <div className="SmsOrEmailVerify">
          <div>
            {this.props.toggleEmail
                  ? <div><img src="/images/AccountManagement/SMSImages.png" alt="Email" /></div>
                  : ''}
            {this.props.toggleSms
                  ? <div> <img src="/images/AccountManagement/sms.png" alt="Mobile" /></div>
                  : ''}
            <p>
              <Trans i18nKey="VerfySMSOrEmail_Lorem" />
              {' '}
            </p>
          </div>
          <div className="CodeContainer">
            <div>
              <input
                type="text"
                placeholder={i18next.t('accountManagement:AddCodeHere')}
                id="Code"
                onChange={this.handleChange}
              />
            </div>
            <p className="ErrorMsg">
              {this.props.ErrorCode}
            </p>
            <div>
              <button onClick={this.handleVerifyCode}>
                <Trans i18nKey="VerifyYourAccount" />
              </button>
            </div>
            <div className="ResendCont">
              <span className="QouteFoter">
                <Trans i18nKey="Didreceivethecodeyet" />
              </span>
              <span className="Resend" onClick={this.ResendAccountConfiramtion} >
                <Trans i18nKey="Resendit" />
              </span>
              <p className="ErrorMsg">
                {this.props.ResndEmailerror}
              </p>
              <p className="SuccessMsg">
                {this.props.SuccessCode}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EmailOrSms.propTypes = {
  ResendAccountConfiramtion: PropTypes.func.isRequired,
  handleVerifyCode: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
}.isRequired;
