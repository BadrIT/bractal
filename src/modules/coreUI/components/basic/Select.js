/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { createFilter } from 'react-select';
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';

const Input = styled.input`
  width: 100%; /* TO BE COMPATIBLE WITH ANY CONTAINER */

  padding-left: ${props => (props.inputHorizontalPadding || props.theme.inputs.padding.left)}px;
  padding-right: ${props => (props.inputHorizontalPadding || props.theme.inputs.padding.right)}px;
  padding-top: ${props => (props.inputHorizontalPadding || props.theme.inputs.padding.top)}px;
  padding-bottom: ${props => (props.inputHorizontalPadding || props.theme.inputs.padding.bottom)}px;

  border: 0;
  border-radius: ${props => (props.borderRadius || props.theme.inputs.radius)}px;
  outline: none;

  color: ${props => (props.inputColor || props.theme.inputs.color)}; 
  font-size: ${props => (props.inputFontSize || props.theme.inputs.fontSize)}px;

  &:-webkit-autofill {
    box-shadow: 0 0 0 60px white inset;
  }
`;

const Placeholder = styled.span`
  position: absolute;
  
  padding-left: ${props => (props.inputHorizontalPadding || props.theme.inputs.padding.left)}px;
  padding-right: ${props => (props.inputHorizontalPadding || props.theme.inputs.padding.right)}px;

  color: ${props => (props.placeholderColor || props.theme.inputs.placeholderColor)};
  font-size: ${props => (props.placeholderSize || props.theme.inputs.fontSize)}px;
`;

const ListItem = styled.li`
  display:flex;
  position: relative;
  min-height: 40px;

  padding: 5px 15px 5px 15px;

  justify-content: flex-start;
  align-items: center;

  color: ${props => props.theme.colors.labels.normal};
  background: ${props => (props.theme.colors.named.white)};
  font-size: 13px;
  
  box-sizing: border-box;
  border-bottom: 1px solid #f5f5f5;

  cursor: pointer;
  transition: background 0.2s ease;
  
  &&:hover{
    background: ${props => props.theme.colors.cellHoverColor};
    transition: background 0.2s ease;
  }
`;

const Image = styled.img`
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;

  top: 0px;

  border-radius: 50%;
`;

const Label = styled.span`
  overflow: hidden;
  
  padding-left: ${props => props.theme.paddings.medium}px;
  padding-right: ${props => props.theme.paddings.medium}px;

  white-space: nowrap;
`;

const Option = props => (
  <ListItem
    onClick={() => {
      props.setValue(props.data);
    }}
    key={props.data.value}
  >
    <Image src={props.data.imageUrl} />
    <Label>{props.data.label}</Label>
  </ListItem>
);


class Select extends React.Component {
  getSortedCountries = () => ([
    {
      name: 'Egypt',
      flag: 'https://www.shamrocksuperstore.com/ekmps/shops/b32a9d/images/egypt-flag-461-p.png',
      value: 'egypt',
      phone_code: '+20',
    },
    {
      name: 'Saudi',
      flag: 'https://cdn.flags-flagpoles-banners.co.uk/uploads/2015/01/Saudi-Arabia-flag.jpg',
      value: 'saudi',
      phone_code: '+966',
    },
  ]);

  getCountriesOptions = () => this.getSortedCountries().map(country => ({
    label: country.name,
    image: <Image src={country.flag} alt={country.flag} />,
    imageUrl: country.flag,
    value: country.ref_id,
    attrs: {
      callingCodes: country.phone_code,
    },
  }));

  render = () => {
    const { onChange } = this.props;
    const CountriesOptions = this.getCountriesOptions();

    const customStyles = {
      clearIndicator: base => ({
        ...base,
      }),
      menu: base => ({
        ...base,
        'max-height': '250px',
      }),
      menuList: base => ({
        ...base,
        'max-height': '250px',
      }),
      container: base => ({
        ...base,
      }),
      control: (base, state) => ({
        ...base,
        'background-color': 'white',
        'border-width': `${this.props.theme.inputs.borderWidth}px`,
        'border-radius': `${this.props.theme.inputs.radius}px`,
        'border-color': state.isFocused ? this.props.theme.inputs.borderColorActive : this.props.theme.inputs.borderColor,
        'box-shadow': 'none',
      }),
      indicatorsContainer: base => ({
        ...base,
        'padding-left': `${this.props.theme.paddings.medium}px`,
        'padding-right': `${this.props.theme.paddings.medium}px`,
      }),
      dropdownIndicator: (base, state) => ({
        ...base,
        width: '30px',
        color: state.isFocused ? (
          this.props.theme.inputs.borderColorActive
        ) : (
          this.props.theme.inputs.borderColor),
        ':hover': {
          color: state.isFocused ? (
            this.props.theme.inputs.borderColorActive
          ) : (
            this.props.theme.inputs.borderColor),
        },
      }),
      indicatorSeparator: () => ({
        // ...base,
        display: 'none',
      }),
      singleValue: base => ({
        ...base,
        'padding-left': `${this.props.theme.inputs.padding.left}px`,
        'padding-right': `${this.props.theme.inputs.padding.right}px`,
      }),
      valueContainer: base => ({
        ...base,
        padding: 0,
        margin: 0,
      }),
    };

    return (
      <React.Fragment>
        <ReactSelect
          options={CountriesOptions}
          placeholder="Nationality"
          styles={customStyles}
          onChange={e => onChange && onChange(e.value)}
          isLoading={this.props.queryResult.list_countries.length === 0}
          filterOption={createFilter({ matchFrom: 'start' })}
          components={{
            Input,
            Placeholder,
            Option,
          }}
        />
      </React.Fragment >
    );
  }
}

Select.defaultProps = {
  value: '',
  isLoading: false,
  queryResult: {
    list_countries: [],
  },
};

Select.propTypes = {
  // value: PropTypes.string,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default withTheme(Select);
