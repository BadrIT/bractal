import React from 'react';
import styled from '@emotion/styled';

const DefaultContainer = styled.div`
  width: 100%;
`;

export default (locals) => {
  const Container = locals.context.customInputsContainer || DefaultContainer;

  return (
    <Container>
      {Object.keys(locals.inputs).map((fieldName => (
        <div key={fieldName}>{locals.inputs[fieldName]}</div>
      )))}
    </Container>
  );
};
