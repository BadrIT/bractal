// eslint-disable-next-line
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CountriesCode extends Component {
  componentDidMount() {
    this.props.loadSelectedCode();
  }
  showDropdown = () => {
    this.props.showDropdown();
  };
  render() {
    return (
      <div>
        <button id="dropdown-button" className="dropdown-button" onClick={this.showDropdown} >
          {this.props.SelectedImg !== ''
        ? <img src={this.props.SelectedImg} alt={this.props.SelectedMobCode} />
        : ''
        }
          <span className="codeSelected">
            {this.props.SelectedMobCode}
          </span>
        </button>
        <span className="triangle">&#9660;</span>
      </div>
    );
  }
}

CountriesCode.propTypes = {
  showDropdown: PropTypes.func.isRequired,
  SelectedImg: PropTypes.string.isRequired,
  SelectedMobCode: PropTypes.string.isRequired,
  loadSelectedCode: PropTypes.func.isRequired,
};
