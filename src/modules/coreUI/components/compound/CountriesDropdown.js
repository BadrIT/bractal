import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';

import InputSelect from '~/modules/coreUI/components/basic/select/InputSelect';
import withRootQuery from '~/modules/core/utils/relayHelpers/withRootQuery';

class CountriesDropdown extends React.Component {
  getSortedCountries = () =>
    this.props.queryResult.list_countries.slice().sort((c1, c2) =>
      c1.name.localeCompare(c2.name));

  getCountriesOptions = () => this.getSortedCountries().map(country => ({
    label: country.name,
    image: <Image src={country.flag} alt={country.flag} />,
    value: country.ref_id,
    attrs: {
      callingCodes: country.phone_code,
    },
  }));

  render = () => {
    const { onChange, value } = this.props;
    const CountriesOptions = this.getCountriesOptions();

    return (
      <InputSelect
        showInput={false}
        value={value}
        isLoading={this.props.isLoading}
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
  isLoading: false,
  queryResult: {
    list_countries: [],
  },
};

CountriesDropdown.propTypes = {
  value: PropTypes.string,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
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
  CountriesDropdown,
  graphql`
    query CountriesDropdownQuery {    
      list_countries {
        iso3
        name
        ref_id
        flag
        phone_code
      }
    }
  `,
  CountriesDropdown,
);
