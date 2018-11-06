/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styled from 'react-emotion';
import { withTheme } from 'emotion-theming';
import Select from 'react-select';
import { css } from 'emotion';


import { colors } from 'react-select/lib/theme';

import { Row } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import Spacer from '~/modules/coreUI/components/layouts/helpers/Spacer';
import PulseLoader from 'react-spinners/PulseLoader';
import { propsForPrefix } from '~/modules/coreUI/utils/infereStyle';

import ToggleButton from './ToggleButton';
import Icon from './Icon';

const stateOptions = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District Of Columbia' },
  { value: 'FM', label: 'Federated States Of Micronesia' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'GU', label: 'Guam' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MH', label: 'Marshall Islands' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'MP', label: 'Northern Mariana Islands' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PW', label: 'Palau' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VI', label: 'Virgin Islands' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

const selectStyles = {
  control: base => css`
    ${base}
    margin: 8px;
    border-width: 0px 0px 1px 0px;
    border-radius: 0px;
    border-color: #cccccc;
    background: none;
    box-shadow: none;
    padding-bottom: 5px;
  `,
  menu: () => css`
    box-shadow: none;
    border-width: 0px 1px 1px 1px;
    background-color: white;
  `,
  input: base => css`
    ${base}
    border: none;
    background-color: rgba(0,0,0,0);
  `,
};

const Menu = (props) => {
  const shadow = 'hsla(218, 50%, 10%, 0.1)';
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: 4,
        boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
        marginTop: 8,
        position: 'absolute',
        zIndex: 2,
        width: '100%',
      }}
      {...props}
    />
  );
};
const Blanket = props => (
  <div
    style={{
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
      position: 'fixed',
      zIndex: 1,
    }}
    {...props}
  />
);

const Dropdown = ({
  children,
  isOpen,
  target,
  onClose,
}) => (
  <div style={{ position: 'relative', width: '100%' }}>
    {target}
    {isOpen ? <Menu>{children}</Menu> : null}
    {isOpen ? <Blanket onClick={onClose} /> : null}
  </div>
);
const Svg = p => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    focusable="false"
    role="presentation"
    {...p}
  />
);
const DropdownIndicator = () => (
  <div style={{ color: colors.neutral20, height: 24, width: 32 }}>
    <Svg>
      <path
        d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </Svg>
  </div>
);

const StyledOpenCloseIcon = styled(Icon)`
  padding-top: 3px;
`;

const Indicator = props => (
  <Row fullWidth grow rightJustified>
    {props.isLoading &&
      <React.Fragment>
        <PulseLoader size={5} color="rgba(0,0,0,0.2)" />
        <Spacer />
      </React.Fragment>
    }
    <StyledOpenCloseIcon className={props.iconClass} />
  </Row>
);

const OpenIndicator = props =>
  <Indicator iconClass={props.selected ? 'fas fa-chevron-up' : 'fas fa-chevron-down'} />;

class PopupSelect extends Component {
  state = { isOpen: false, value: undefined };
  onSelectChange = (value) => {
    this.closeMenu();
    this.setState({ value });
  };
  closeMenu = () => {
    this.setState({ isOpen: false });
  }
  toggleOpen = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  };
  render() {
    const { isOpen, value } = this.state;

    return (
      <Dropdown
        isOpen={isOpen}
        onClose={this.toggleOpen}
        target={
          <ToggleButton
            style={{ width: '100%' }}
            iconAfter={<OpenIndicator selected={isOpen} />}
            onClicked={this.toggleOpen}
            selected={isOpen}
            forceSelected={this.props.trigger_bright}
            {...propsForPrefix(this.props, 'trigger_')}
          />
        }
      >
        <Select
          autoFocus
          backspaceRemovesValue={false}
          components={{
            DropdownIndicator,
            IndicatorSeparator: null,
          }}
          controlShouldRenderValue={false}
          hideSelectedOptions={false}
          isClearable={false}
          menuIsOpen
          onMenuClose={this.closeMenu}
          onChange={this.onSelectChange}
          options={stateOptions}
          placeholder="Search..."
          styles={selectStyles}
          tabSelectsValue
          escapeClearsValue
          value={value}
        />
      </Dropdown>
    );
  }
}

export default withTheme(PopupSelect);
