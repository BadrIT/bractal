import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Label } from '~/modules/coreUI/components/basic/Labels';
import { Row } from '~/modules/coreUI/components/layouts/helpers/Rows';
import { StepStatus } from '~/modules/apiMonitoring/utils/TestRunner';
import { MediumSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';


const getHeaderBackground = (mode) => {
  switch (mode) {
    case StepStatus.NORMAL:
      return 'rgba(0,0,0,0.03)';
    case StepStatus.IN_PROGRESS:
      return 'rgba(255, 130, 0, 0.2)';
    case StepStatus.SUCCEEDED:
      return 'rgba(0, 130, 0, 0.2)';
    case StepStatus.FAILED:
      return 'rgba(130, 0, 0, 0.2)';
    default:
      return 'rgba(0,0,0,0.03';
  }
};

const getBorderColor = (mode) => {
  switch (mode) {
    case StepStatus.NORMAL:
      return 'rgba(0,0,0,0.2)';
    case StepStatus.IN_PROGRESS:
      return 'rgba(255, 130, 0, 0.4)';
    case StepStatus.SUCCEEDED:
      return 'rgba(0, 130, 0, 0.4)';
    case StepStatus.FAILED:
      return 'rgba(130, 0, 0, 0.5)';
    default:
      return 'rgba(0,0,0,0.3';
  }
};

const getStatusColor = (mode) => {
  switch (mode) {
    case StepStatus.NORMAL:
      return 'gray';
    case StepStatus.IN_PROGRESS:
      return 'orage';
    case StepStatus.SUCCEEDED:
      return 'green';
    case StepStatus.FAILED:
      return 'red';
    default:
      return 'black';
  }
};

const EntryCard = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  border: solid ${props => (props.showBorder ? 1 : 0)}px gray;
  border-radius: ${props => props.theme.borders.radius.normal}px;

  color: ${props => props.color || props.theme.colors.labels.normal}; 
  border-color: ${props => props.borderColor || props.theme.colors.labels.normal};
`;

const Content = styled.div`
  padding: 10px;
  display: ${props => (props.visible ? 'block' : 'none')};
`;

const Header = styled(Row)`
  color: ${props => props.color || props.theme.colors.labels.normal};
  padding: ${props => props.theme.paddings.medium}px;
  background-color: ${props => (!props.showBorder ? null : props.backgroundColor || getHeaderBackground(null))};
  border-top-left-radius: ${props => props.theme.borders.radius.normal}px;
  border-top-right-radius: ${props => props.theme.borders.radius.normal}px;

  cursor: pointer;
`;
export default class ToggleCard extends Component {
  static propTypes = {
    titleSize: PropTypes.string,
    title: PropTypes.string.isRequired,
    showBorder: PropTypes.bool,
    mode: PropTypes.oneOf([
      StepStatus.IN_PROGRESS,
      StepStatus.SUCCEEDED,
      StepStatus.FAILED,
      StepStatus.NORMAL,
    ]),
    children: PropTypes.element.isRequired,
    colorizeTitle: PropTypes.bool,
  }

  static defaultProps = {
    titleSize: 'medium',
    showBorder: true,
    mode: StepStatus.NORMAL,
    colorizeTitle: false,
  }

  state = {
    contentVisible: false,
  }

  toggleVisibility = () => {
    this.setState({
      contentVisible: !this.state.contentVisible,
    });
  }

  render = () => (
    <EntryCard
      {...this.props}
      color={getStatusColor(this.props.mode)}
      borderColor={getBorderColor(this.props.mode)}
      showBorder={this.props.showBorder}
    >
      <Header
        leftJustified
        color={this.props.colorizeTitle ? getStatusColor(this.props.mode) : null}
        showBorder={this.props.showBorder}
        backgroundColor={getHeaderBackground(this.props.mode)}
        onClick={() => this.toggleVisibility()}
      >
        <FontAwesomeIcon icon={this.state.contentVisible ? faCaretDown : faCaretRight} />
        <MediumSpacer />
        <Label
          color={this.props.colorizeTitle ? getStatusColor(this.props.mode) : 'important'}
          size={this.props.titleSize}
        >
          {this.props.title}
        </Label>
      </Header>
      <Content visible={this.state.contentVisible}>
        {this.props.children}
      </Content>
    </EntryCard>
  )
}
