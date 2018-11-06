import t, {
  maybe,
} from 'tcomb-form';

import FormLayout from './FormLayout';
import Templates from './Template';

t.String.getValidationErrorMessage = () =>
  'value is invalid';

const defineSubtype = (type, predicate, getValidationErrorMessage, name) => {
  const Subtype = t.refinement(
    type,
    predicate,
    name,
  );
  Subtype.getValidationErrorMessage = getValidationErrorMessage;
  return Subtype;
};

const RequiredString = defineSubtype(
  maybe(t.String),
  val => val && val.trim().length > 0,
  (val) => {
    if (!val || val.trim().length === 0) {
      return 'is missing';
    }
    return null;
  },
  'Required',
);

const removeCountryCodeFromPhoneNumber = phoneNumber =>
  phoneNumber && phoneNumber.replace(/\(\+?\d+\)/, '').trim();

const removeInitialZerosFromNumber = phoneNumber =>
  phoneNumber && phoneNumber.replace(/^0+/g, '');

const isValidPhoneNumber = (val) => {
  let cleanedVal = removeCountryCodeFromPhoneNumber(val);
  cleanedVal = removeInitialZerosFromNumber(cleanedVal);
  cleanedVal = cleanedVal && cleanedVal.replace(/[ ()+-]/g, '');
  return parseInt(cleanedVal, 10).toString() === cleanedVal &&
    cleanedVal.length <= 12 &&
    cleanedVal.length >= 6;
};

const RequiredNumber = defineSubtype(
  maybe(t.String),
  val => isValidPhoneNumber(val),
  (val) => {
    let phoneNumber = removeCountryCodeFromPhoneNumber(val);
    phoneNumber = removeInitialZerosFromNumber(phoneNumber);

    if (!phoneNumber || phoneNumber.trim().length === 0) {
      return 'is missing';
    } else if (phoneNumber.length < 6 || phoneNumber.length > 12) {
      return 'should have 6-12 digits';
    } else if (!isValidPhoneNumber(phoneNumber)) {
      return "isn't number";
    }
    return null;
  },
  'Required',
);

const RequiredEnum = defineSubtype(
  maybe(t.String),
  val => val && val.trim().length > 0,
  (val) => {
    if (!val || val.trim().length === 0) {
      return 'is Required';
    }
    return null;
  },
  'Required',
);


const Email = defineSubtype(
  RequiredString,
  (val) => {
    // eslint-disable-next-line
    const emailMatch = val && val.search(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return emailMatch >= 0;
  },
  () => "isn't valid",
  'Required',
);


const Types = {
  RequiredString,
  RequiredNumber,
  RequiredEnum,
  Email,
  Boolean: t.Boolean,
};


export const getTcombOptionsFromRawOptions = (rawOptions) => {
  const tcombOptions = {
    template: rawOptions.customLayout || FormLayout,
    auto: 'placeholders',
    fields: {},
  };

  rawOptions.fields.forEach((option) => {
    tcombOptions.fields[option.name] = {
      template: Templates[option.input_type],
      attrs: {
        placeholder: option.placeholder,
        label: option.label,
        checkboxNote: option.checkboxNote,
        importantLabel: option.importantLabel,
        displayName: option.displayName,
      },
      error: null,
      hasError: false,
    };
  });

  return tcombOptions;
};

export const getTcombTypesFromRawOptions = (rawOptions) => {
  const tcombTypesObject = {};

  rawOptions.fields.forEach((option) => {
    tcombTypesObject[option.name] = Types[option.type];
  });

  return t.struct(tcombTypesObject);
};
