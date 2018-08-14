import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import InputSelect from '~/modules/coreUI/components/basic/select/InputSelect';

import AllCountries from './AllCountries.json';

class PhoneNumber extends React.Component {
  getSortedCountries = () =>
    AllCountries.sort((c1, c2) =>
      c1.name.localeCompare(c2.name));

  getCountryWithId = alpha3Code =>
    AllCountries.find(c => c.alpha3Code === alpha3Code);

  getCountryWithCallingCode = phoneCode =>
    AllCountries.find(c => c.callingCodes[0] === phoneCode);

  getFullPhoneNumber = (alpha3Code, phone) =>
    `(+${this.getCountryWithId(alpha3Code).callingCodes[0]}) ${phone}`;

  getCountriesOptions = () => this.getSortedCountries().map(country => ({
    label: country.name,
    image: <Image src={country.flag} alt={country.flag} />,
    value: country.alpha3Code,
    rightPulledLabel: `+${country.callingCodes[0]}`,
    attrs: {
      callingCodes: country.callingCodes[0],
    },
  }));

  transformValue = (value) => {
    const parsedParts = value.replace(/[ (+]/g, '').split(')');
    let countryValue = -1;
    let phone = '';

    if (parsedParts.length > 0) {
      const country = this.getCountryWithCallingCode(parsedParts[0]);
      countryValue = country ? country.ref_id : '';
    }

    if (parsedParts.length > 1) {
      [, phone] = parsedParts;
    }
    return `(${countryValue}) ${phone}`;
  }

  render = () => (
    <InputSelect
      showInput
      value={this.transformValue(this.props.value)}
      selectButtonRatio={40}
      onChange={(countryCode, phone) =>
        this.props.onChange(this.getFullPhoneNumber(countryCode, phone))}
      showImageOnButton={false}
      getSelectedItemLabel={entry => `+${entry.attrs.callingCodes}`}
      getSelectedItemImage={entry => entry.image}
      placeholder="Phone Number"
      options={this.getCountriesOptions()}
    />
  );
}

PhoneNumber.defaultProps = {
  value: '',
};

PhoneNumber.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default PhoneNumber;
