import React from 'react';
import t from 'tcomb-form';
// import styled from 'styled-components';

const { Form } = { Form: t.form.Form };


const Car = t.enums.of('Audi Chrysler Ford Renault Peugeot');

const Select = t.struct({
  car: Car,
});

const myTemplate = t.form.Form.templates.select.clone({
  renderSelect: () => (
    <ul>
      <li> <img src="/images/Accountmanagement/male.png" alt="alt" /> <span>002</span> <span>Egypt</span></li>
      <li> <img src="/images/Accountmanagement/male.png" alt="alt" /> <span>002</span> <span>Egypt</span></li>
    </ul>
  ),
});


const options = {
  fields: {
    car: {
      templates: myTemplate,
    },
  },
};


const SelectInp = () => (
  <div>
    <React.Fragment>
      <Form
        options={options}
        type={Select}
      />
    </React.Fragment>
  </div>
);
export default SelectInp;
