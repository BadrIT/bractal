/* eslint-disable react/prop-types */
import React from 'react';
import i18next from 'i18next';
import _ from 'lodash';
import ForceDirectionContext from './ForceDirectionContext';

export default WrappedComponent => class InnerDirectionDetector extends React.Component {
  componentDidMount = () => {
    if (i18next) {
      i18next.on('languageChanged loaded', this.onI18nChanged);
    }
  };

  componentWillUnmount = () => {
    if (i18next) {
      i18next.off('languageChanged loaded', this.onI18nChanged);
    }
  };

  onI18nChanged = () => {
    // this.forceUpdate();
  };

  render = () => (
    <ForceDirectionContext.Consumer>
      {(forcedDirection) => {
        let direction = i18next.language === 'ar' ? 'rtl' : 'ltr';
        if (forcedDirection) {
          direction = forcedDirection;
        }
        return (
          <WrappedComponent
            // TODO: to be removed
            {..._.omit(this.props, ['i18nOptions', 'defaultNS', 'reportNS', 't'])}
            direction={direction}
          >
            {this.props.children}
          </WrappedComponent>
        );
      }}
    </ForceDirectionContext.Consumer>
  );
};
