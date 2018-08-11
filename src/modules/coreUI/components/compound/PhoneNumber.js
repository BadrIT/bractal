import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';

import InputSelect from '~/modules/coreUI/components/basic/select/InputSelect';
import withRootQuery from '~/modules/core/utils/relayHelpers/withRootQuery';

class PhoneNumber extends React.Component {
  getSortedCountries = () =>
    this.props.queryResult.list_countries.slice().sort((c1, c2) =>
      c1.name.localeCompare(c2.name));

  getCountryWithId = refId => this.props.queryResult.list_countries
    .find(c => c.ref_id === refId);

  getCountryWithCallingCode = phoneCode => this.props.queryResult.list_countries
    .find(c => c.phone_code === phoneCode);

  getFullPhoneNumber = (countryCode, phone) =>
    `(+${this.getCountryWithId(countryCode).phone_code}) ${phone}`;

  getCountriesOptions = () => this.getSortedCountries().map(country => ({
    label: country.name,
    image: <Image src={country.flag} alt={country.flag} />,
    value: country.ref_id,
    rightPulledLabel: `+${country.phone_code}`,
    attrs: {
      callingCodes: country.phone_code,
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
      isLoading={this.props.isLoading}
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
  isLoading: false,
  queryResult: {
    list_countries: [],
  },
};

PhoneNumber.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  isLoading: PropTypes.bool,
  queryResult: PropTypes.shape({
    list_countries: PropTypes.arrayOf(PropTypes.shape({
      iso3: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      ref_id: PropTypes.string.isRequired,
      flag: PropTypes.string.isRequired,
      phone_code: PropTypes.string.isRequired,
    })),
  }),
};

export default withRootQuery(
  PhoneNumber,
  graphql`
    query PhoneNumberQuery {    
      list_countries {
        iso3
        name
        ref_id
        flag
        phone_code
      }
    }
  `,
  PhoneNumber,
);
