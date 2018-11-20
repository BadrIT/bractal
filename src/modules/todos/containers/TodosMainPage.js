import React from 'react';

import { login } from '~/modules/todos/Auth';

const TodosPage = (props) => {
  login(props);
  return (
    <React.Fragment />
  );
};

export default TodosPage;
