import { css } from 'styled-components';
import t from 'tcomb-form';
import React from 'react';
import Checkbox from '~/modules/coreUI/components/basic/Checkbox';
import { XSmallLabel } from '~/modules/coreUI/components/basic/Labels';
import { XSmallSpacer, SmallSpacer } from '~/modules/coreUI/components/layouts/helpers/Spacers';
import { TopAlignedRow } from '~/modules/coreUI/components/layouts/helpers/Rows';
import PhoneNumber from '~/modules/coreUI/components/compound/PhoneNumber';
import CountriesDropdown from '~/modules/coreUI/components/compound/CountriesDropdown';

import Gender from '~/modules/coreUI/components/compound/Gender';
import TextBox from '~/modules/coreUI/components/basic/TextBox';

import renderError from './Errors';

// TODO : Change to a more suitable name (i.e. global state)
const getGlobalAttrs = locals => ({
  onKeyUp: locals.context.onKeyUp,
});

export default {
  textbox: t.form.Form.templates.textbox.clone({
    renderInput: locals => (
      <TextBox
        {...getGlobalAttrs(locals)}
        {...locals.attrs}
        value={locals.value}
        placeholder={locals.attrs.placeholder}
        tabIndex={locals.attrs.tabIndex}
      />
    ),
    renderError: locals => renderError(locals),
  }),
  password: t.form.Form.templates.textbox.clone({
    renderInput: locals => (
      <TextBox
        {...getGlobalAttrs(locals)}
        {...locals.attrs}
        value={locals.value}
        placeholder={locals.attrs.placeholder}
        password
        icon="fas fa-eye fa-lg"
        iconPosition="right"
      />
    ),
    renderError: locals => renderError(locals),
  }),
  phoneNumber: t.form.Form.templates.textbox.clone({
    renderInput: locals => (
      <PhoneNumber
        {...getGlobalAttrs(locals)}
        {...locals.attrs}
        value={locals.value}
        onChange={(value) => {
          locals.onChange(value);
        }}
        placeholder={locals.attrs.placeholder}
      />
    ),
    renderError: locals => renderError(locals),
  }),
  country: t.form.Form.templates.textbox.clone({
    renderInput: locals => (
      <CountriesDropdown
        {...getGlobalAttrs(locals)}
        {...locals.attrs}
        value={locals.value}
        onChange={value => locals.onChange(value)}
        placeholder={locals.attrs.placeholder}
      />
    ),
    renderError: locals => renderError(locals),
  }),
  gender: t.form.Form.templates.radio.clone({
    renderRadios: locals => <Gender onChange={locals.onChange} />,
    renderError: (locals) => {
      const customErrorTextStyle = css`
        text-align: center;
      `;
      return renderError(locals, customErrorTextStyle);
    },
  }),
  checkbox: t.form.Form.templates.checkbox.clone({
    renderCheckbox: (locals) => {
      const attrs = t.form.Form.templates.checkbox.getAttrs(locals);

      return (
        <React.Fragment>
          <Checkbox
            elemID={attrs.id}
            bold={attrs.importantLabel}
            label={attrs.label}
            fontSize={attrs.fontSize}
            {...attrs}
          />
          {attrs.checkboxNote &&
            <React.Fragment>
              <SmallSpacer />
              <TopAlignedRow>
                <XSmallSpacer />
                <XSmallLabel color="subtle" paragraph>
                  {attrs.checkboxNote}
                </XSmallLabel>
              </TopAlignedRow>
            </React.Fragment>
          }
        </React.Fragment>
      );
    },
    renderError: locals => renderError(locals),
  }),
};
