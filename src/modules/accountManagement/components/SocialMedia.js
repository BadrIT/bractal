import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Trans } from 'react-i18next';

export default function SocialMedia() {
  return (
    <div>
      <div className="SocialMediaCont">
        <h5 className="TextCenter connectWith">
          <Trans i18nKey="CONNECTWITH" />
        </h5>
        <Grid columns={4} divided>
          <Grid.Row className="allSocialMedia">
            <Grid.Column className="faceBok TextCenter">
              <i className="icon-fb" />

              <div className="IconsCont">
                <p className="SmFontSocial"><Trans i18nKey="LogInWith" /></p>
                <p className="LgFontSocial"><Trans i18nKey="Facebook" /></p>

              </div>
            </Grid.Column>
            <Grid.Column className="Tiwiter TextCenter">
              <i className="icon-twitter" />
              <div className="IconsCont">
                <p className="SmFontSocial">
                  <Trans i18nKey="LogInWith" />
                </p>
                <p className="LgFontSocial"><Trans i18nKey="Twitter" /></p>
              </div>

            </Grid.Column>
            <Grid.Column className="Google TextCenter">
              <i className="icon-googleplus" />
              <div className="IconsCont">
                <p className="SmFontSocial"><Trans i18nKey="LogInWith" /> </p>
                <p className="LgFontSocial"><Trans i18nKey="GooglePlus" /></p>
              </div>
            </Grid.Column>
            <Grid.Column className="Insta TextCenter">
              <i className="icon-inst" />

              <div className="IconsCont">
                <p className="SmFontSocial"><Trans i18nKey="LogInWith" /></p>
                <p className="LgFontSocial"><Trans i18nKey="Instagram" /></p>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}
