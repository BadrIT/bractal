// eslint-disable-next-line
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class countriesList extends Component {
  componentDidMount() {
    document.getElementById('input').focus();
  }
  SearchInp= (event) => {
    event.preventDefault();
    const input = document.getElementById('input');
    const filter = input.value.toUpperCase();
    const lis = document.getElementsByClassName('CountryDataLi');
    for (let i = 0; i < lis.length; i += 1) {
      const name = lis[i].getElementsByClassName('countryName')[0].innerHTML;
      if (name.toUpperCase().indexOf(filter) === 0) {
        lis[i].style.display = 'list-item';
      } else {
        lis[i].style.display = 'none';
      }
    }
  }
  render() {
    let countriesCodeOpt = '';
    countriesCodeOpt = this.props.CountriesData.map(country => (
      <li
        id={country.name}
        code={country.callingCodes}
        value={country.callingCodes}
        key={country.name}
        className="CountryDataLi"
        onClick={() => this.props.GetSelectedOpt(country)}
      >
        <div className="imgCountry">
          <img src={country.flag} alt={country.name} className={country.name} />
        </div>
        <div className="codeLbl">
            +{country.callingCodes}
        </div>
        <div className="countryName">{country.name}</div>
      </li>
    ));
    return (
      <div>
        <div className="Arrowul" />
        <ul className="dropdown-selection" id="CountriesCodeList">
          <li><input type="text" className="searchInp" id="input" onKeyUp={this.SearchInp} /></li>
          {countriesCodeOpt}
        </ul>
      </div>
    );
  }
}


countriesList.propTypes = {
  CountriesData: PropTypes.arrayOf(PropTypes.any).isRequired,
  GetSelectedOpt: PropTypes.func.isRequired,
};
