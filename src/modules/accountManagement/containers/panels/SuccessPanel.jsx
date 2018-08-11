/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { Column } from '~/modules/coreUI/components/layouts/helpers/Columns';
import { Row } from '~/modules/coreUI/components/layouts/helpers/Rows';

import withModalTracker from '~/modules/core/utils/modalHelpers/withModalTracker';

const StyledIcon = styled.div`
  svg {
    width: 100px;
    display: block;
    margin: 40px auto 0;
  }

  .path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
    &.circle {
      animation: dash .9s ease-in-out;
    }
    &.line {
      stroke-dashoffset: 1000;      
      animation: dash .9s .35s ease-in-out forwards;
    }
    &.check {
      stroke-dashoffset: -100;
      animation: dash-check .9s .35s ease-in-out forwards;
    }
  }

  p {
    text-align: center;
    margin: 20px 0 60px;
    font-size: 1.25em;
    &.success {
      color: #73AF55;
    }
    &.error {
      color: #D06079;
    }
  }


  @-webkit-keyframes dash {
    0% {
      stroke-dashoffset: 1000;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes dash {
    0% {
      stroke-dashoffset: 1000;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @-webkit-keyframes dash-check {
    0% {
      stroke-dashoffset: -100;
    }
    100% {
      stroke-dashoffset: 900;
    }
  }

  @keyframes dash-check {
    0% {
      stroke-dashoffset: -100;
    }
    100% {
      stroke-dashoffset: 900;
    }
  }
`;

class SuccessPanel extends React.Component {
  componentDidMount = () => {
    const { location, history, closeCurrentModal } = this.props;
    setTimeout(() => {
      closeCurrentModal(location, history);
    }, 1000);
  }
  render = () => {
    const mode = this.props.mode || 'success';
    return (
      <Row centerAligned fullWidth fullHeight>
        <Column centerAligned fullWidth>
          <StyledIcon>
            {mode === 'success' &&
              <React.Fragment>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                  <circle className="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                  <polyline className="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                </svg>
                <p className="success">Welcome !</p>
              </React.Fragment>
            }
            {mode === 'error' &&
              <React.Fragment>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                  <circle className="path circle" fill="none" stroke="#D06079" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                  <line className="path line" fill="none" stroke="#D06079" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3" />
                  <line className="path line" fill="none" stroke="#D06079" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2" />
                </svg>
                <p className="error">Bummer!</p>
              </React.Fragment>
            }
          </StyledIcon>
        </Column>
      </Row>
    );
  };
}

SuccessPanel.propTypes = PropTypes.shape({
  mode: PropTypes.oneOf(['success', 'error']).isRequired,
}).isRequired;

export default withRouter(withModalTracker(SuccessPanel));
