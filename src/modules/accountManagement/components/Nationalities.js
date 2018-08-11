
import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import i18next from 'i18next';

export default class Nationalities extends Component {
  componentDidMount() {
    this.shortString();
  }
   shortString= () => {
     const shorts = document.querySelectorAll('.short');
     if (shorts) {
       Array.prototype.forEach.call(shorts, (ele) => {
         let str = ele.innerText;
         const indt = '...';

         if (ele.hasAttribute('data-limit')) {
           if (str.length > ele.dataset.limit) {
             let result = `${str.substring(0, ele.dataset.limit - indt.length).trim()}${indt}`;
             // eslint-disable-next-line
             ele.innerText = result;
             str = null;
             result = null;
           }
         } else {
           throw Error('Cannot find attribute \'data-limit\'');
         }
       });
     }
   }
  handleChange = (event) => {
    this.props.handleChange(event);
  };
  render() {
    const NationalitiesList = this.props.CountriesData.map(Nationality => (
      <option value={Nationality.name} key={Nationality.name} className="short" data-limit="30">
        {Nationality.name}
      </option>
    ));
    return (
      <div>
        <select required placeholder={i18next.t('accountManagement:Nationality')} id="nationality" onChange={this.handleChange} className="nationalitySelect">
          <option value="" disabled selected>
            <Trans i18nKey="Nationality" />
          </option>
          {NationalitiesList}
        </select>
      </div>
    );
  }
}

Nationalities.propTypes = {
  CountriesData: PropTypes.arrayOf(PropTypes.any).isRequired,
}.isRequired;
