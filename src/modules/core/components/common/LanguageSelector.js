import React from 'react';
import { I18n } from 'react-i18next';
import { Dropdown } from 'semantic-ui-react';

const languageOptions = [
  { key: 'English', text: 'En', value: 'en' },
  { key: 'عربي', text: 'عربي', value: 'ar' },
];

const changeLanguage = (value, i18n) => {
  i18n.changeLanguage(value);
};

const LanguageSelector = () => (
  <I18n>
    {
      (t, { i18n }) => (
        <Dropdown
          button
          className="icon"
          floating
          labeled
          icon="world"
          options={languageOptions}
          search
          text="Select Language"
          onChange={(e, { value }) => changeLanguage(value, i18n)}
        />
      )
    }
  </I18n>
);

export default LanguageSelector;
