import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import InputSelect from '~/modules/coreUI/components/basic/select/InputSelect';

import AllCountries from './AllCountries.json';

class CountriesDropdown extends React.Component {
  getSortedCountries = () =>
    AllCountries.slice().sort((c1, c2) =>
      c1.name.localeCompare(c2.name));

  getCountriesOptions = () => AllCountries.map(country => ({
    label: country.name,
    image: <Image src={country.flag} alt={country.flag} />,
    value: country.alpha3Code,
    attrs: {
      callingCodes: country.callingCodes[0],
    },
  }));

  render = () => {
    const { onChange, value } = this.props;
    const CountriesOptions = this.getCountriesOptions();

    return (
      <InputSelect
        showInput={false}
        value={value}
        onChange={newValue => onChange(newValue)}
        showImageOnButton={false}
        getSelectedItemLabel={entry => `${entry.label}`}
        getSelectedItemImage={() => null}
        placeholder="Nationality"
        options={CountriesOptions}
      />
    );
  }
}

CountriesDropdown.defaultProps = {
  value: '',
};

CountriesDropdown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CountriesDropdown;
