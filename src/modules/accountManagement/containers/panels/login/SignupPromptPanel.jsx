import React from 'react';
import styled from 'styled-components';
import Media from 'react-media';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { PanelContentLabel, PanelContentMinorLabel } from '~/modules/accountManagement/components/basic/Labels';
import { BasicButton } from '~/modules/coreUI/components/basic/Button';
import { MediumSpacer, XLargeSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';
import { mediaQueryMin } from '~/modules/core/utils/cssHelpers/cssMedia';
import { Column } from '~/modules/coreUI/components/layouts/helpers/Columns';
import { navigateToModal } from '~/modules/core/utils/modalHelpers';

import HomePageLogo from '~/modules/coreUI/components/projects/HomePageLogo';

const MediumLogo = styled(HomePageLogo)`
  height: unset;
  width: unset;
  max-width: 80px;
`;

const PanelImage = () => (
  <Column grow centerAligned>
    <MediumLogo />
  </Column>
);

const SignUpFormPanel = (props) => {
  const ContentContainer = props.panelContentContainer;
  const PanelContainer = props.panelContainer;
  const { history, location } = props;

  return (
    <Media query={mediaQueryMin('desktop')}>
      {matched => (
        <PanelContainer showHeader={matched} titleLabel="Register" subTitleLabel="Join our community">
          <ContentContainer>
            {matched && <PanelImage />}
            <PanelContentLabel >
              {"Don't have an account ?"}
            </PanelContentLabel>
            <XLargeSpacer />
            <BasicButton
              primary
              inverted
              onClicked={() => navigateToModal(location, history, '/accountManagement/singup')}
            >
              Create an account
            </BasicButton>
            <MediumSpacer />
            <PanelContentMinorLabel>
              {/* Placeholder to justify the Registeration to be similar to the login */}
              &nbsp;
            </PanelContentMinorLabel>
          </ContentContainer>
        </PanelContainer>
      )}
    </Media>
  );
};

SignUpFormPanel.propTypes = PropTypes.shape({
  panelContentContainer: PropTypes.element,
}).isRequired;

export default withRouter(SignUpFormPanel);
